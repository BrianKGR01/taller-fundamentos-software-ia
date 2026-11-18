export type BlockAccent = 'blue' | 'red' | 'yellow' | 'green';

export interface BlockMeta {
  id: number;
  slug: string;
  label: string;
  title: string;
  accent: BlockAccent;
  durationMin: number;
  summary: string;
}

export interface SlideRef {
  id: string;
  blockId: number;
  indexInBlock: number;
  globalIndex: number;
  title: string;
  accent: BlockAccent;
  presenterNote: string;
}

/**
 * Parsea el hash de URL (`#/2/1` o `#/3`) y devuelve un índice global válido.
 */
export function resolveSlideIndexFromHash(
  hash: string,
  slides: readonly Pick<SlideRef, 'blockId' | 'indexInBlock'>[],
): number {
  if (!slides.length) return 0;
  const cleaned = hash.replace(/^#\/?/, '').trim();
  if (!cleaned) return 0;

  const parts = cleaned.split('/').map((part) => Number.parseInt(part, 10));
  if (parts.length === 2 && Number.isFinite(parts[0]) && Number.isFinite(parts[1])) {
    const matchIndex = slides.findIndex(
      (slide) => slide.blockId === parts[0] && slide.indexInBlock === parts[1],
    );
    if (matchIndex >= 0) return matchIndex;
  }

  if (parts.length === 1 && Number.isFinite(parts[0])) {
    const clamped = Math.max(0, Math.min(slides.length - 1, parts[0] - 1));
    return clamped;
  }

  return 0;
}

/**
 * Formatea una diapositiva como hash compartible (`#/bloque/diapositiva`).
 */
export function formatSlideHash(slide: Pick<SlideRef, 'blockId' | 'indexInBlock'>): string {
  return `#/${slide.blockId}/${slide.indexInBlock}`;
}

/**
 * Calcula el porcentaje de avance (0–100) dentro del deck.
 */
export function computeProgressPercent(currentIndex: number, totalSlides: number): number {
  if (totalSlides <= 1) return 100;
  const safeIndex = Math.max(0, Math.min(totalSlides - 1, currentIndex));
  return Math.round(((safeIndex + 1) / totalSlides) * 100);
}

/**
 * Devuelve el siguiente índice acotado a los límites del deck.
 */
export function stepSlideIndex(currentIndex: number, delta: number, totalSlides: number): number {
  if (totalSlides <= 0) return 0;
  return Math.max(0, Math.min(totalSlides - 1, currentIndex + delta));
}
