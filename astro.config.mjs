import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://16s893-ai-for-engineering-research.github.io',
  base: process.env.DEV === 'true' ? '/' : '/nathanaelj',
  integrations: [
    react(),
    tailwind(),
  ],
  output: 'static',
});
