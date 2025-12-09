import { defineConfig } from 'vite';

export default defineConfig({
  base: '/WebGames/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'esbuild',
    target: 'esnext',
    rollupOptions: {
      input: {
        main: 'arcade.html',
        fallingblocks: 'index.html',
        breakout: 'breakout/index.html'
      },
      output: {
        manualChunks: undefined,
        entryFileNames: (chunkInfo) => {
          if (chunkInfo.name === 'main') {
            return 'assets/[name]-[hash].js';
          }
          return 'assets/[name]-[hash].js';
        },
        assetFileNames: 'assets/[name]-[hash][extname]'
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
