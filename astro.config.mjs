import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : 'https://taller-fundamentos-software-ia.vercel.app';

export default defineConfig({
  site: vercelUrl,
  output: 'static',
  vite: {
    plugins: [tailwindcss()],
  },
});
