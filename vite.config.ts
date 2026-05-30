import { defineConfig } from 'vite'

import { cloudflare } from "@cloudflare/vite-plugin";

export default defineConfig({
  plugins: [cloudflare()],
  server: {
    proxy: {
      '/chime-api': {
        target: 'https://chime-builder.onrender.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/chime-api/, ''),
      },
    },
  },
})