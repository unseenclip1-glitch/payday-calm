/**
 * vite.config.js
 *   npm run dev          → local dev server
 *   npm run build        → FULL edition  → dist/       (installable PWA, offline, no limits)
 *   npm run build:demo   → DEMO edition  → dist-demo/  (spend limit, not installable)
 * base './' makes the build work from any sub-folder (GitHub Pages, secret paths…).
 */
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(({ mode }) => {
  const isDemo = mode === 'demo';
  return {
    base: './',
    server: { host: '0.0.0.0', port: 5173, allowedHosts: true },
    preview: { host: '0.0.0.0', port: 4173, allowedHosts: true },
    build: { outDir: isDemo ? 'dist-demo' : 'dist', emptyOutDir: true, target: 'es2020' },
    plugins: isDemo ? [] : [
      VitePWA({
        strategies: 'injectManifest',
        srcDir: 'src',
        filename: 'service-worker.js',
        injectRegister: false, // registered manually in main.js
        manifestFilename: 'manifest.json',
        injectManifest: { globPatterns: ['**/*.{js,css,html,svg,png,woff2,ico,webmanifest,json}'] },
        manifest: {
          id: './',
          name: 'Payday Calm – Safe-to-Spend Planner',
          short_name: 'Payday Calm',
          description: 'A calm, ADHD-friendly paycheck planner. One number tells you what is safe to spend.',
          start_url: './',
          scope: './',
          display: 'standalone',
          orientation: 'portrait',
          background_color: '#FBF6EE',
          theme_color: '#3F7D6E',
          categories: ['finance', 'productivity', 'lifestyle'],
          icons: [
            { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png' },
            { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png' },
            { src: 'icons/maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
          ],
        },
      }),
    ],
  };
});
