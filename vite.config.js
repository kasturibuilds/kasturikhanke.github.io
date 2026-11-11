import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/',  // Changed to absolute path
  plugins: [react(), {
    name: 'preview-2025-archive',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = new URL(req.url, 'http://localhost');
        if (url.pathname === '/2025') {
          res.writeHead(302, { Location: `/2025/${url.search}` });
          res.end();
          return;
        }
        if (/^\/2025\/(?:about\/?|aia\/?|design-system\/?|feedback\/?|pdf-spaces\/?|sezzle-up\/?)?$/.test(url.pathname)) {
          req.url = `/2025/index.html${url.search}`;
        }
        next();
      });
    },
  }],
  assetsInclude: ['**/*.mov'],
  build: {
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'Topbar.png') {
            return 'favicon/[name][extname]'
          }
          return 'assets/[name]-[hash][extname]'
        }
      }
    }
  }
})