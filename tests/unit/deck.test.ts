import { describe, expect, it } from 'vitest';
import {
  computeProgressPercent,
  formatSlideHash,
  resolveSlideIndexFromHash,
  stepSlideIndex,
} from '../../src/lib/deck';
import { SLIDES } from '../../src/data/slides';
import { SPEAKER } from '../../src/data/speaker';
import { generateQrSvg } from '../../src/lib/qr';

describe('deck navigation helpers', () => {
  it('resuelve hashes #/bloque/diapositiva y límites', () => {
    expect(resolveSlideIndexFromHash('#/0/1', SLIDES)).toBe(0);
    expect(resolveSlideIndexFromHash('#/1/1', SLIDES)).toBe(3);
    expect(resolveSlideIndexFromHash('#/99/9', SLIDES)).toBe(0);
    expect(resolveSlideIndexFromHash('', SLIDES)).toBe(0);
  });

  it('formatea hashes compartibles y calcula pasos acotados', () => {
    expect(formatSlideHash({ blockId: 3, indexInBlock: 2 })).toBe('#/3/2');
    expect(stepSlideIndex(0, -1, SLIDES.length)).toBe(0);
    expect(stepSlideIndex(0, 1, SLIDES.length)).toBe(1);
    expect(stepSlideIndex(SLIDES.length - 1, 5, SLIDES.length)).toBe(SLIDES.length - 1);
  });

  it('calcula porcentaje de progreso', () => {
    expect(computeProgressPercent(0, 10)).toBe(10);
    expect(computeProgressPercent(9, 10)).toBe(100);
    expect(computeProgressPercent(0, 1)).toBe(100);
  });
});

describe('speaker CV integrity and QR generation', () => {
  it('mantiene los datos oficiales del CV', () => {
    expect(SPEAKER.name).toBe('Kevin Brayan Gómez Rocha');
    expect(SPEAKER.metrics[0].value).toBe('7+ años');
    expect(SPEAKER.contacts.some((c) => c.value === 'brayankgr@gmail.com')).toBe(true);
  });

  it('genera un SVG válido para el QR', async () => {
    const svg = await generateQrSvg('https://taller-fundamentos-software-ia.vercel.app/?modo=lectura');
    expect(svg).toContain('<svg');
    expect(svg).toContain('</svg>');
  });
});
