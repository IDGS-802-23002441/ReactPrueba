import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),

    // Convierte la app en PWA (Progressive Web App):
    // - Genera el service worker automaticamente (offline + cache).
    // - Genera el manifest.webmanifest (icono, nombre, colores).
    // registerType: 'autoUpdate' hace que el service worker se actualice
    // solo cuando hay una nueva version, sin que el usuario tenga que hacer nada.
    VitePWA({
      registerType: 'autoUpdate',
      // El registro del service worker lo hace la app con
      // `virtual:pwa-register/react` (ver src/components/PwaAviso.jsx),
      // asi se evita registrarlo dos veces y podemos avisar al usuario
      // cuando la app quedo lista para usarse sin conexion.
      injectRegister: null,
      includeAssets: ['favicon.svg', 'icons.svg', 'apple-touch-icon.png'],
      manifest: {
        id: '/',
        name: 'Progresivas Décimo - Registro',
        short_name: 'Progresivas',
        description:
          'Aplicación de registro de datos y scoreboard de la clase de Progresivas Décimo, instalable y funciona offline',
        theme_color: '#863bff',
        background_color: '#ffffff',
        lang: 'es',
        display: 'standalone', // se abre como app, sin la barra del navegador
        start_url: '/',
        scope: '/',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable', // version que se adapta a iconos redondos/cuadrados en Android
          },
        ],
      },
      workbox: {
        // Cachea automaticamente todo lo que Vite genera en el build (JS, CSS, HTML, imagenes)
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        // Borra los cache viejos cuando hay una version nueva.
        cleanupOutdatedCaches: true,
      },
      // Permite probar la PWA tambien en desarrollo (`npm run dev`).
      devOptions: {
        enabled: true,
      },
    }),
  ],
})
