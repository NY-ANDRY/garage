/// <reference types="vitest" />

import legacy from '@vitejs/plugin-legacy'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { defineConfig } from 'vite'
import ui from '@nuxt/ui/vite'

export default defineConfig({
  plugins: [
    vue(),
    ui(),
    legacy({
      // On monte le curseur pour Safari : Safari 12 ne comprend pas le BigInt (0n)
      // En forçant safari >= 14, on élimine l'erreur de build esbuild
      targets: ['edge >= 79', 'firefox >= 68', 'chrome >= 67', 'safari >= 14'],
      additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
      // Empêche le plugin legacy de tenter de transformer les BigInt de manière incorrecte
      modernPolyfills: true 
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom'
  },
  build: {
    target: 'es2020', // Crucial pour le support du 0n
    cssTarget: 'chrome61', // Évite des problèmes de minification CSS sur certains navigateurs
    chunkSizeWarningLimit: 2000,
    rollupOptions: {
      output: {
        // Solution radicale pour les Circular Chunks : 
        // On laisse Vite gérer le découpage automatiquement ou on utilise une approche plus simple
        manualChunks: undefined, 
      }
    }
  },
  // On force esbuild à accepter le BigInt partout
  esbuild: {
    supported: {
      'bigint': true
    },
    target: 'es2020'
  },
  optimizeDeps: {
    esbuildOptions: {
      target: 'es2020',
      supported: {
        'bigint': true
      }
    },
  },
})