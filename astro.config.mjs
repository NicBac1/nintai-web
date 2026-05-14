import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';

// GitHub Pages project site config.
// When migrating to a custom domain on Netlify, change `site` to the real
// domain and set `base: '/'`.
const REPO_NAME = 'nintai-web';
const GITHUB_USER = 'CHANGE-ME-GITHUB-USERNAME';

export default defineConfig({
  site: `https://${GITHUB_USER}.github.io`,
  base: `/${REPO_NAME}`,
  output: 'static',
  trailingSlash: 'ignore',
  integrations: [
    tailwind({ applyBaseStyles: false }),
    sitemap(),
    icon({
      include: {
        lucide: [
          'leaf',
          'handshake',
          'brain',
          'sparkles',
          'graduation-cap',
          'heart-handshake',
          'building-2',
          'sprout',
          'menu',
          'x',
          'message-circle',
          'mail',
          'instagram',
          'map-pin',
          'arrow-right',
          'arrow-up-right',
          'calendar',
          'clock',
          'check',
        ],
      },
    }),
  ],
  build: {
    inlineStylesheets: 'auto',
  },
  image: {
    service: { entrypoint: 'astro/assets/services/sharp' },
  },
});
