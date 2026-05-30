import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [],
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
