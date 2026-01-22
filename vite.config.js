import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'logo-adventista-preto.png', 'apple-touch-icon.png', 'mask-icon.svg'],
      manifest: {
        name: "Adventista Play - Estudos Bíblicos",
        short_name: "Adventista Play",
        description: "Plataforma completa de estudos bíblicos, devocionais, hinário e recursos adventistas",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#2563eb",
        orientation: "portrait-primary",
        icons: [
          {
            src: "/icon-72x72.png",
            sizes: "72x72",
            type: "image/png",
            purpose: "any"
          },
          {
            src: "/icon-96x96.png",
            sizes: "96x96",
            type: "image/png",
            purpose: "any"
          },
          {
            src: "/icon-128x128.png",
            sizes: "128x128",
            type: "image/png",
            purpose: "any"
          },
          {
            src: "/icon-144x144.png",
            sizes: "144x144",
            type: "image/png",
            purpose: "any"
          },
          {
            src: "/icon-152x152.png",
            sizes: "152x152",
            type: "image/png",
            purpose: "any"
          },
          {
            src: "/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any maskable"
          },
          {
            src: "/icon-384x384.png",
            sizes: "384x384",
            type: "image/png",
            purpose: "any"
          },
          {
            src: "/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable"
          }
        ],
        categories: ["education", "lifestyle", "productivity"],
        shortcuts: [
          {
            name: "Bíblia",
            short_name: "Bíblia",
            description: "Ler a Bíblia Sagrada",
            url: "/biblia",
            icons: [{ src: "/icon-192x192.png", sizes: "192x192" }]
          },
          {
            name: "Devocional",
            short_name: "Devocional",
            description: "Devocional do dia",
            url: "/devocional",
            icons: [{ src: "/icon-192x192.png", sizes: "192x192" }]
          },
          {
            name: "Escola Sabatina",
            short_name: "Lição",
            description: "Lição da Escola Sabatina",
            url: "/escola-sabatina",
            icons: [{ src: "/icon-192x192.png", sizes: "192x192" }]
          },
          {
            name: "Hinário",
            short_name: "Hinário",
            description: "Hinário Adventista",
            url: "/hinario",
            icons: [{ src: "/icon-192x192.png", sizes: "192x192" }]
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,json}'],
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        skipWaiting: true
      }
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: 'es2015',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'animation-vendor': ['framer-motion'],
        },
      },
    },
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'framer-motion',
      'lucide-react'
    ],
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: false,
    allowedHosts: ['5173-iji3mefr88fr32g5dzc8i-a1d31d94.manusvm.computer', '.manusvm.computer'],
  },
})

