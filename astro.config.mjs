import vue from '@astrojs/vue';
import cloudflare from '@astrojs/cloudflare';
import { defineConfig } from 'astro/config';
import caddyTls from 'vite-plugin-caddy-multiple-tls';

import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  output: 'server',
  server: { host: true, allowedHosts: true, port: 65000 },
  adapter: cloudflare({
    platformProxy: {
      enabled: true,
      persist: './.cache/wrangler/v3',
    },
  }),
  image: {
    service: {
      entrypoint: 'astro/assets/services/compile',
    },
  },
  integrations: [vue()],
  vite: {
    plugins: [
      caddyTls({ domain: 'template.localhost' }),
      tailwindcss(),
    ],
    resolve: {
      alias: {
        '@': '/src',
      },
    },
    server: {
      watch: {
        ignored: ['**/.wrangler/**', '**/.cache/wrangler/**'],
      },
    },
  },
});
