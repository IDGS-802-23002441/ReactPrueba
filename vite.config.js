import { readFileSync, writeFileSync } from 'node:fs'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

// Ruta base del despliegue:
// - Con dominio personalizado (o en la raiz de un dominio) es '/'.
// - Sin dominio personalizado, GitHub Pages sirve el repo en /ReactPrueba/:
//   en ese caso haz el build con VITE_BASE_PATH=/ReactPrueba/.
const base = process.env.VITE_BASE_PATH || '/'

// Los archivos de public/ se copian tal cual al build, por eso la pagina
// 404 lleva el marcador __BASE__ y este plugin lo reemplaza por la ruta real.
function pluginBaseEn404(rutaBase) {
  return {
    name: 'base-en-404',
    apply: 'build',
    closeBundle() {
      const archivo = new URL('./dist/404.html', import.meta.url)
      const html = readFileSync(archivo, 'utf-8')
      writeFileSync(archivo, html.replaceAll('__BASE__', rutaBase))
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  base,
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
        // start_url y scope se calculan solos a partir de `base`,
        // asi funcionan igual en local que en GitHub Pages.
        name: 'Progresivas Décimo - Halo',
        short_name: 'Progresivas',
        description:
          'Módulo Halo (scoreboard de puntajes) de la clase de Progresivas Décimo, instalable y funciona offline',
        theme_color: '#863bff',
        background_color: '#ffffff',
        lang: 'es',
        display: 'standalone', // se abre como app, sin la barra del navegador
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

    pluginBaseEn404(base),
  ],
})
