import {
  formatSlideHash,
  resolveSlideIndexFromHash,
  stepSlideIndex,
  type SlideRef,
} from '@/lib/deck';

interface DeckMeta {
  slides: SlideRef[];
  blocks: Record<string, string>;
}

const CHANNEL_NAME = 'gdg-fundamentos-deck';

function readMeta(): DeckMeta {
  const raw = document.getElementById('deck-meta')?.textContent;
  if (!raw) return { slides: [], blocks: {} };
  return JSON.parse(raw) as DeckMeta;
}

function initDeck() {
  const meta = readMeta();
  const slides = Array.from(document.querySelectorAll<HTMLElement>('[data-slide]'));
  if (!slides.length) return;

  const channel = typeof BroadcastChannel !== 'undefined' ? new BroadcastChannel(CHANNEL_NAME) : null;

  const progressText = document.querySelector<HTMLElement>('[data-progress-text]');
  const blockChip = document.querySelector<HTMLElement>('[data-block-chip]');
  const prevBtn = document.querySelector<HTMLButtonElement>('[data-prev-slide]');
  const nextBtn = document.querySelector<HTMLButtonElement>('[data-next-slide]');
  const overviewModal = document.querySelector<HTMLElement>('[data-overview-modal]');
  const shortcutsModal = document.querySelector<HTMLElement>('[data-shortcuts-modal]');

  // Modo inicial: lectura en pantallas pequeñas o si ?modo=lectura
  const params = new URLSearchParams(window.location.search);
  const urlMode = params.get('modo');
  const initialMode =
    urlMode === 'presentacion' || urlMode === 'lectura'
      ? urlMode
      : window.innerWidth <= 820
        ? 'lectura'
        : 'presentacion';

  const savedTheme = localStorage.getItem('gdg-tema');
  const initialTheme = savedTheme === 'dark' || savedTheme === 'light' ? savedTheme : 'light';

  let currentIndex = resolveSlideIndexFromHash(window.location.hash, meta.slides);

  function applyTheme(theme: 'light' | 'dark') {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('gdg-tema', theme);
    const btn = document.querySelector<HTMLElement>('[data-toggle-theme]');
    if (btn) btn.textContent = theme === 'dark' ? '☀️ Claro' : '🌙 Oscuro';
  }

  function syncSlideA11y(mode: 'presentacion' | 'lectura') {
    slides.forEach((el, idx) => {
      const hidden = mode === 'presentacion' && idx !== currentIndex;
      el.setAttribute('aria-hidden', hidden ? 'true' : 'false');
      el.inert = hidden;
    });
  }

  function applyMode(mode: 'presentacion' | 'lectura') {
    document.body.setAttribute('data-mode', mode);
    const btn = document.querySelector<HTMLElement>('[data-toggle-mode]');
    if (btn) btn.textContent = mode === 'lectura' ? '🖥️ Presentación' : '📖 Modo guía';
    syncSlideA11y(mode);
    if (mode === 'lectura') {
      const target = slides[currentIndex];
      target?.scrollIntoView({ behavior: 'auto', block: 'start' });
    }
  }

  function setActiveSlide(nextIndex: number, updateHash = true) {
    currentIndex = Math.max(0, Math.min(slides.length - 1, nextIndex));
    const currentSlideEl = slides[currentIndex];
    const currentRef = meta.slides[currentIndex];
    const mode = document.body.getAttribute('data-mode') === 'lectura' ? 'lectura' : 'presentacion';

    slides.forEach((el, idx) => {
      el.classList.toggle('is-active', idx === currentIndex);
    });
    syncSlideA11y(mode);

    if (currentRef) {
      document.documentElement.setAttribute('data-accent', currentRef.accent);
      if (blockChip) {
        blockChip.textContent = meta.blocks[String(currentRef.blockId)] ?? `Bloque ${currentRef.blockId}`;
      }
      if (progressText) {
        progressText.textContent = `${currentIndex + 1} / ${slides.length}`;
      }
      if (updateHash) {
        const nextHash = formatSlideHash(currentRef);
        if (window.location.hash !== nextHash) {
          history.replaceState(null, '', nextHash);
        }
      }
      channel?.postMessage({ type: 'slide-change', index: currentIndex });
    }

    if (prevBtn) prevBtn.disabled = currentIndex === 0;
    if (nextBtn) nextBtn.disabled = currentIndex === slides.length - 1;

    document.querySelectorAll<HTMLElement>('[data-jump-slide]').forEach((item) => {
      const idx = Number(item.dataset.jumpSlide);
      item.classList.toggle('is-current', idx === currentIndex);
    });

    if (document.body.getAttribute('data-mode') === 'presentacion') {
      currentSlideEl.scrollTop = 0;
    } else {
      currentSlideEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  function step(delta: number) {
    setActiveSlide(stepSlideIndex(currentIndex, delta, slides.length));
  }

  function toggleOverview(force?: boolean) {
    if (!overviewModal) return;
    const isHidden = overviewModal.hasAttribute('hidden');
    const shouldShow = force !== undefined ? force : isHidden;
    if (shouldShow) {
      overviewModal.removeAttribute('hidden');
    } else {
      overviewModal.setAttribute('hidden', '');
    }
  }

  function toggleShortcuts(force?: boolean) {
    if (!shortcutsModal) return;
    const isHidden = shortcutsModal.hasAttribute('hidden');
    const shouldShow = force !== undefined ? force : isHidden;
    if (shouldShow) {
      shortcutsModal.removeAttribute('hidden');
    } else {
      shortcutsModal.setAttribute('hidden', '');
    }
  }

  // Controles UI
  prevBtn?.addEventListener('click', () => step(-1));
  nextBtn?.addEventListener('click', () => step(1));
  document.querySelector('[data-start-deck]')?.addEventListener('click', () => step(1));

  document.querySelector('[data-toggle-theme]')?.addEventListener('click', () => {
    const now = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(now);
  });

  document.querySelector('[data-toggle-mode]')?.addEventListener('click', () => {
    const now = document.body.getAttribute('data-mode') === 'lectura' ? 'presentacion' : 'lectura';
    applyMode(now);
  });

  document.querySelector('[data-open-overview]')?.addEventListener('click', () => toggleOverview());
  document.querySelector('[data-close-overview]')?.addEventListener('click', () => toggleOverview(false));
  document.querySelector('[data-open-shortcuts]')?.addEventListener('click', () => toggleShortcuts());
  document.querySelector('[data-close-shortcuts]')?.addEventListener('click', () => toggleShortcuts(false));

  document.querySelectorAll<HTMLElement>('[data-jump-slide]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const idx = Number(btn.dataset.jumpSlide ?? 0);
      setActiveSlide(idx);
      toggleOverview(false);
    });
  });

  document.querySelector('[data-open-presenter]')?.addEventListener('click', () => {
    window.open('/presentador', 'gdg-presentador', 'width=1100,height=740');
  });

  // Navegación por teclado y clicker
  document.addEventListener('keydown', (event) => {
    const tag = (event.target as HTMLElement | null)?.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA') return;

    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowDown':
      case 'PageDown':
      case ' ':
        event.preventDefault();
        step(1);
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
      case 'PageUp':
        event.preventDefault();
        step(-1);
        break;
      case 'Home':
        event.preventDefault();
        setActiveSlide(0);
        break;
      case 'End':
        event.preventDefault();
        setActiveSlide(slides.length - 1);
        break;
      case 'o':
      case 'O':
        toggleOverview();
        break;
      case 'Escape':
        toggleOverview(false);
        toggleShortcuts(false);
        break;
      case 't':
      case 'T': {
        const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        applyTheme(next);
        break;
      }
      case 'l':
      case 'L': {
        const next = document.body.getAttribute('data-mode') === 'lectura' ? 'presentacion' : 'lectura';
        applyMode(next);
        break;
      }
      case 's':
      case 'S':
        window.open('/presentador', 'gdg-presentador', 'width=1100,height=740');
        break;
      case '?':
        toggleShortcuts();
        break;
    }
  });

  // Sincronización con vista presentador
  channel?.addEventListener('message', (event) => {
    if (event.data?.type === 'jump-to' && typeof event.data.index === 'number') {
      setActiveSlide(event.data.index);
    } else if (event.data?.type === 'request-sync') {
      channel.postMessage({ type: 'slide-change', index: currentIndex });
    }
  });

  window.addEventListener('hashchange', () => {
    setActiveSlide(resolveSlideIndexFromHash(window.location.hash, meta.slides), false);
  });

  // Botones copiar prompt
  document.querySelectorAll<HTMLButtonElement>('[data-copy-text]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const text = btn.dataset.copyText ?? '';
      const label = btn.querySelector('[data-copy-label]');
      try {
        await navigator.clipboard.writeText(text);
        btn.classList.add('is-copied');
        if (label) label.textContent = '✓ ¡Copiado!';
        setTimeout(() => {
          btn.classList.remove('is-copied');
          if (label) label.textContent = 'Copiar instrucción';
        }, 1800);
      } catch {
        if (label) label.textContent = 'Selecciona y copia';
      }
    });
  });

  // Widget 1: Anatomía del restaurante
  document.querySelectorAll<HTMLElement>('[data-anatomy]').forEach((widget) => {
    const btns = widget.querySelectorAll<HTMLButtonElement>('[data-station-btn]');
    const panel = widget.querySelector<HTMLElement>('[data-anatomy-panel]');
    const mEl = widget.querySelector('[data-panel-metaphor]');
    const tEl = widget.querySelector('[data-panel-tech]');
    const rEl = widget.querySelector('[data-panel-role]');
    const wEl = widget.querySelector('[data-panel-missing]');
    const aEl = widget.querySelector('[data-panel-ask]');

    btns.forEach((btn) => {
      btn.addEventListener('click', () => {
        btns.forEach((b) => {
          b.classList.remove('is-active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('is-active');
        btn.setAttribute('aria-selected', 'true');
        if (panel && btn.dataset.accentName) panel.setAttribute('data-accent', btn.dataset.accentName);
        if (mEl) mEl.textContent = btn.dataset.metaphor ?? '';
        if (tEl) tEl.textContent = btn.dataset.tech ?? '';
        if (rEl) rEl.textContent = btn.dataset.role ?? '';
        if (wEl) wEl.textContent = btn.dataset.missing ?? '';
        if (aEl) aEl.textContent = btn.dataset.ask ?? '';
      });
    });
  });

  // Widget 2: UX 4 estados
  document.querySelectorAll<HTMLElement>('[data-ux-demo]').forEach((demo) => {
    const tabs = demo.querySelectorAll<HTMLButtonElement>('[data-ux-state]');
    const panels = demo.querySelectorAll<HTMLElement>('[data-state-panel]');
    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        const target = tab.dataset.uxState;
        tabs.forEach((t) => {
          const active = t.dataset.uxState === target;
          t.classList.toggle('is-active', active);
          t.setAttribute('aria-selected', active ? 'true' : 'false');
        });
        panels.forEach((p) => {
          if (p.dataset.statePanel === target) p.removeAttribute('hidden');
          else p.setAttribute('hidden', '');
        });
      });
    });
  });

  // Widget 3: Backend Trap
  document.querySelectorAll<HTMLElement>('[data-backend-demo]').forEach((demo) => {
    let mode: 'insecure' | 'secure' = 'insecure';
    let tampered = false;
    const modeBtns = demo.querySelectorAll<HTMLButtonElement>('[data-backend-mode]');
    const tamperBtn = demo.querySelector<HTMLButtonElement>('[data-tamper-btn]');
    const clientPrice = demo.querySelector('[data-client-price]');
    const clientNote = demo.querySelector('[data-client-note]');
    const serverCard = demo.querySelector('[data-server-card]');
    const serverResult = demo.querySelector('[data-server-result]');
    const serverExplain = demo.querySelector('[data-server-explain]');

    function render() {
      if (clientPrice) clientPrice.textContent = tampered ? 'Bs. 1 (alterado)' : 'Bs. 120';
      if (clientNote) {
        clientNote.textContent = tampered
          ? 'El usuario modificó el valor en la consola del navegador.'
          : 'Precio original visible en pantalla.';
      }
      if (!tampered) {
        serverCard?.classList.remove('flow-card--bad', 'flow-card--ok');
        if (serverResult) serverResult.textContent = 'Pedido normal · Bs. 120';
        if (serverExplain) serverExplain.textContent = 'Pulsa «Simular usuario editando precio» para probar qué pasa.';
        return;
      }

      if (mode === 'insecure') {
        serverCard?.classList.add('flow-card--bad');
        serverCard?.classList.remove('flow-card--ok');
        if (serverResult) serverResult.textContent = '❌ Cobro aprobado por Bs. 1';
        if (serverExplain) {
          serverExplain.textContent =
            'El servidor confió en el monto que llegó desde el navegador. Pérdida directa para el negocio.';
        }
      } else {
        serverCard?.classList.add('flow-card--ok');
        serverCard?.classList.remove('flow-card--bad');
        if (serverResult) serverResult.textContent = '✅ Bloqueado: monto real es Bs. 120';
        if (serverExplain) {
          serverExplain.textContent =
            'El Backend ignoró el precio del navegador y leyó el precio oficial desde la Base de Datos.';
        }
      }
    }

    modeBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        mode = btn.dataset.backendMode === 'secure' ? 'secure' : 'insecure';
        modeBtns.forEach((b) => {
          const active = b === btn;
          b.classList.toggle('is-active', active);
          b.setAttribute('aria-pressed', active ? 'true' : 'false');
        });
        render();
      });
    });

    tamperBtn?.addEventListener('click', () => {
      tampered = !tampered;
      tamperBtn.textContent = tampered
        ? '↺ Restaurar precio original (Bs. 120)'
        : '⚡ Simular usuario editando precio (Bs. 120 → Bs. 1)';
      render();
    });
  });

  // Widget 4: Database Visualizer
  const DB_EXPLAIN: Record<string, string> = {
    cliente:
      '<strong>Tabla Clientes:</strong> guarda cada persona una sola vez. Si Ana cambia su número, se actualiza aquí y todas sus reservas quedan al día sin duplicarse.',
    reserva:
      '<strong>Tabla Reservas:</strong> conecta al cliente con fecha, mesa y estado válido. Así evitamos que dos personas reserven la misma mesa a la misma hora.',
    pago:
      '<strong>Tabla Pagos:</strong> registra el comprobante real vinculado a una reserva específica. Nunca se borra para mantener auditoría financiera.',
  };

  document.querySelectorAll<HTMLElement>('[data-db-viz]').forEach((viz) => {
    const entityBtns = viz.querySelectorAll<HTMLButtonElement>('[data-db-entity]');
    const detail = viz.querySelector('[data-db-detail]');
    const stateBadge = viz.querySelector('[data-db-state-badge]');
    const stateBtns = viz.querySelectorAll<HTMLButtonElement>('[data-res-state]');

    entityBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        entityBtns.forEach((b) => b.classList.remove('is-active'));
        btn.classList.add('is-active');
        const key = btn.dataset.dbEntity ?? 'cliente';
        if (detail) detail.innerHTML = DB_EXPLAIN[key] ?? '';
      });
    });

    stateBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        stateBtns.forEach((b) => b.classList.remove('is-active'));
        btn.classList.add('is-active');
        if (stateBadge) stateBadge.textContent = btn.dataset.resState ?? 'pendiente';
      });
    });
  });

  // Widget 5: Git Time Machine
  document.querySelectorAll<HTMLElement>('[data-git-machine]').forEach((gm) => {
    const nodes = gm.querySelectorAll<HTMLButtonElement>('[data-commit]');
    const badge = gm.querySelector('[data-git-badge]');
    const status = gm.querySelector('[data-git-status]');
    const rollbackBtn = gm.querySelector<HTMLButtonElement>('[data-git-rollback]');

    function selectCommit(n: string) {
      nodes.forEach((node) => node.classList.toggle('is-active', node.dataset.commit === n));
      if (n === '1') {
        if (badge) badge.textContent = 'Versión actual: Commit 1';
        if (status) {
          status.innerHTML =
            'Punto inicial guardado con <code>.gitignore</code> activo (tu archivo <code>.env</code> de claves secretas nunca se sube a GitHub).';
        }
        rollbackBtn?.setAttribute('hidden', '');
      } else if (n === '2') {
        if (badge) badge.textContent = 'Versión actual: Commit 2 · Estable ✅';
        if (status) {
          status.textContent =
            'El login y el catálogo funcionan perfecto. Este punto de guardado queda registrado para siempre en tu historial.';
        }
        rollbackBtn?.setAttribute('hidden', '');
      } else {
        if (badge) badge.textContent = 'Versión actual: Commit 3 · Catálogo roto 💥';
        if (status) {
          status.textContent =
            'Le pediste a la IA agregar pagos y sin querer borró la vista del catálogo. Sin Git entrarías en pánico; con Git vuelves atrás en un clic.';
        }
        rollbackBtn?.removeAttribute('hidden');
      }
    }

    nodes.forEach((node) => {
      node.addEventListener('click', () => selectCommit(node.dataset.commit ?? '1'));
    });
    rollbackBtn?.addEventListener('click', () => selectCommit('2'));
  });

  // Widget 6: Checklist Pre-SDD
  document.querySelectorAll<HTMLElement>('[data-checklist]').forEach((cl) => {
    const boxes = cl.querySelectorAll<HTMLInputElement>('[data-check-input]');
    const countEl = cl.querySelector('[data-check-count]');
    const msgEl = cl.querySelector('[data-check-msg]');
    const fillEl = cl.querySelector<HTMLElement>('[data-check-fill]');

    function update() {
      const done = Array.from(boxes).filter((b) => b.checked).length;
      const total = boxes.length;
      const pct = total ? Math.round((done / total) * 100) : 0;
      if (countEl) countEl.textContent = `${done} / ${total} listos`;
      if (fillEl) fillEl.style.width = `${pct}%`;
      if (msgEl) {
        msgEl.textContent =
          done === total
            ? '🎉 ¡Listo para escribir tu primera Spec en Spec-Driven Development!'
            : 'Marca lo que ya tienes claro para tu próximo proyecto';
      }
    }

    boxes.forEach((box) => box.addEventListener('change', update));
  });

  applyTheme(initialTheme);
  applyMode(initialMode);
  setActiveSlide(currentIndex, false);
}

initDeck();
