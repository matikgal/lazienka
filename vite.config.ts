import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'icons.svg', 'pwa-192.png', 'pwa-512.png'],
      manifest: {
        name: 'Wizualizator Łazienki 3D',
        short_name: 'Łazienka',
        description: 'Wizualizator i wymiarowanie 3D/2D łazienki ze skosem',
        lang: 'pl',
        theme_color: '#0b0f17',
        background_color: '#0b0f17',
        display: 'standalone',
        orientation: 'any',
        start_url: './',
        scope: './',
        icons: [
          {
            src: 'pwa-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'pwa-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        // Precache całą zbudowaną aplikację (JS/CSS/HTML/assets)
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff,woff2,webp,jpg,jpeg,json,wasm}'],
        // three.js i chunki bywają > 2 MB
        maximumFileSizeToCacheInBytes: 8 * 1024 * 1024,
        navigateFallback: 'index.html',
        navigateFallbackDenylist: [/^\/api/],
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        skipWaiting: true,
        runtimeCaching: [
          {
            // Na wypadek zewnętrznych fontów / CDN (jeśli kiedyś dojdą)
            urlPattern: ({ request }) =>
              request.destination === 'font' ||
              request.destination === 'image' ||
              request.destination === 'style' ||
              request.destination === 'script',
            handler: 'CacheFirst',
            options: {
              cacheName: 'runtime-assets',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 365,
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
      devOptions: {
        enabled: false,
      },
    }),
  ],
  base: './',
})
