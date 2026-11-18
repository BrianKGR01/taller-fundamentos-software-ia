import { expect, test } from '@playwright/test';

test.describe('Taller Fundamentos de Software con IA', () => {
  test('navegación completa, widgets interactivos, tema y vista presentador en escritorio', async ({
    page,
    isMobile,
  }) => {
    test.skip(isMobile, 'Flujo de escritorio');
    await page.goto('/');

    // Portada visible en modo presentación
    await expect(page.locator('body')).toHaveAttribute('data-mode', 'presentacion');
    await expect(page.getByRole('heading', { name: 'Fundamentos de Software con IA' })).toBeVisible();

    // Avanza a diapositiva del expositor (CV)
    await page.keyboard.press('ArrowRight');
    const speakerSlide = page.locator('[data-slide-id="0-2"]');
    await expect(speakerSlide).toHaveClass(/is-active/);
    await expect(speakerSlide.getByRole('heading', { name: 'Kevin Brayan Gómez Rocha' })).toBeVisible();
    await expect(speakerSlide.getByText('7+ años')).toBeVisible();

    // Bloque 1: Anatomía interactiva
    await page.goto('/#/1/1');
    await page.locator('[data-station-btn][data-station-id="db"]').click();
    await expect(page.locator('[data-panel-tech]')).toHaveText('Base de Datos');

    // Bloque 2: UX 4 estados
    await page.goto('/#/2/2');
    await page.locator('[data-ux-state="error"]').click();
    await expect(page.locator('[data-state-panel="error"]')).toBeVisible();

    // Bloque 3: Backend Trap Demo
    await page.goto('/#/3/2');
    await page.locator('[data-tamper-btn]').click();
    await expect(page.locator('[data-server-result]')).toContainText('Cobro aprobado por Bs. 1');
    await page.locator('[data-backend-mode="secure"]').click();
    await expect(page.locator('[data-server-result]')).toContainText('Bloqueado: monto real es Bs. 120');

    // Bloque 8: Git Time Machine
    await page.goto('/#/8/2');
    await page.locator('[data-commit="3"]').click();
    await expect(page.locator('[data-git-rollback]')).toBeVisible();
    await page.locator('[data-git-rollback]').click();
    await expect(page.locator('[data-git-badge]')).toContainText('Commit 2');

    // Tema oscuro y modal de índice
    await page.locator('[data-toggle-theme]').click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');

    await page.keyboard.press('o');
    await expect(page.locator('[data-overview-modal]')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.locator('[data-overview-modal]')).toBeHidden();

    // Consola de presentador carga correctamente
    await page.goto('/presentador');
    await expect(page.locator('[data-p-title]')).toContainText('Fundamentos de Software con IA');
  });

  test('en móvil carga en modo guía sin desbordamiento horizontal', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'Prueba específica de móvil');
    await page.goto('/');
    await expect(page.locator('body')).toHaveAttribute('data-mode', 'lectura');

    const hasHorizontalOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth + 2;
    });
    expect(hasHorizontalOverflow).toBe(false);
  });
});
