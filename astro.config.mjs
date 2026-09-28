// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://dsvellal.com',
  output: 'static',
  trailingSlash: 'never',
  build: { format: 'file' },
  integrations: [
    sitemap({
      // Old URLs that now only redirect.
      filter: (page) => !/^https:\/\/dsvellal\.com\/(record|speaking|giving-back|beyond-work|social)(\/|$)/.test(page),
    }),
  ],
});
