import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  plugins: [react()],

  // Relative asset paths, so a build works at a domain root or under a
  // subdirectory without being rebuilt. Combined with HashRouter this means the
  // app can be moved between hosts without touching any server config.
  base: './',

  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },

  server: { port: 5174 },
});
