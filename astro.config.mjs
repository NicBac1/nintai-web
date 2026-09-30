import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';

// Netlify hosts at the site root. Override SITE_URL in Netlify env if needed
// (e.g. custom domain). Netlify also injects URL during builds.
const site = process.env.URL || process.env.SITE_URL || 'https://nintai.netlify.app';

export default defineConfig({
  site,
  base: '/',
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
