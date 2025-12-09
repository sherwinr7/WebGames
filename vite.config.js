import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'esbuild',
    target: 'esnext',
    rollupOptions: {
      input: {
        main: 'arcade.html',
        game: 'index.html',
        breakout: 'breakout/index.html'
      },
      output: {
        manualChunks: undefined
      }
    }
  },
  server: {
    port: 3000,
    open: '/arcade.html'
  },
  optimizeDeps: {
    include: []
  }
});
