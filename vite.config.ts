/// <reference types="vitest" />

import legacy from '@vitejs/plugin-legacy'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { defineConfig } from 'vite'
import ui from '@nuxt/ui/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    ui(),
    legacy({
      targets: ['edge >= 79', 'firefox >= 68', 'chrome >= 67', 'safari >= 14'],
      additionalLegacyPolyfills: ['regenerator-runtime/runtime']
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
  server: {
    host: true,
    port: 5173,
  },
  build: {
    // On aligne le target sur es2020 pour supporter les BigInt literals (0n)
    target: 'es2020', 
    chunkSizeWarningLimit: 1600, // Augmenté pour éviter les alertes inutiles sur les gros bundles UI
    rollupOptions: {
      output: {
        // Logique de split optimisée pour éviter les dépendances circulaires
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('@ionic')) return 'vendor-ionic';
            if (id.includes('vue')) return 'vendor-vue';
            if (id.includes('lottie')) return 'vendor-lottie';
            return 'vendor-others';
          }
        }
      }
    }
  },
  optimizeDeps: {
    esbuildOptions: {
      // Support des BigInt pendant la phase de développement/optimisation
      target: 'es2020',
    },
  },
})