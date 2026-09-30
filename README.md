# Progresivas Décimo - Registro (PWA)

App de registro de datos y scoreboard, convertida en **Progressive Web App** con [`vite-plugin-pwa`](https://vite-pwa-org.netlify.app/).

## PWA

- `vite.config.js`: plugin `VitePWA` con `registerType: 'autoUpdate'` (genera el service worker y el `manifest.webmanifest`). El registro lo hace la app desde `PwaAviso.jsx` con `virtual:pwa-register/react` (`injectRegister: null`).
- `src/components/PwaAviso.jsx`: registra el service worker y avisa cuando la app quedó lista para usarse sin conexión.
- `src/components/InstalarApp.jsx`: botón **Instalar app** en el encabezado (evento `beforeinstallprompt`); en iPhone/iPad muestra las instrucciones de Safari.
- `src/App.jsx`: guarda los registros en `localStorage`, así los datos siguen ahí al cerrar la app y sin conexión.
- `public/pwa-192x192.png`, `public/pwa-512x512.png` y `public/apple-touch-icon.png`: íconos de la app (el de 512 se usa también como `maskable`).
- `public/404.html`: página 404 que sirve el hosting cuando la dirección no existe.
- `src/components/Pagina404.jsx`: la página 404 dentro de la app; se muestra en cualquier ruta distinta de `/` (el service worker sirve la app en rutas desconocidas).
- `index.html`: `theme-color`, `apple-touch-icon` y metadatos para iOS.

### Probar la instalación

```bash
npm run build
npm run preview
```

Abre http://localhost:4173 en Chrome (los service workers solo funcionan en `https` o `localhost`) y usa el botón **Instalar app** de la app o el de la barra de direcciones. La app queda con `display: standalone` (sin barra del navegador) y funciona offline gracias al precache de Workbox.

Para probar el modo offline en DevTools: pestaña **Application → Service Workers → Offline** y recarga la página.

También puedes probar la PWA en desarrollo con `npm run dev` (el service worker de desarrollo se genera en `dev-dist/`).

### Desplegar en GitHub Pages

El repo se publica en `https://idgs-802-23002441.github.io/ReactPrueba/`, por lo que el build necesita la ruta base `/ReactPrueba/`:

```bash
npm run build:pages      # build con base /ReactPrueba/
npm run preview:pages    # probarlo en http://localhost:4173/ReactPrueba/
```

El contenido de `dist/` se sube a la rama `gh-pages`, que es la que sirve GitHub Pages:

```bash
rm -rf /tmp/gh-pages-deploy && mkdir -p /tmp/gh-pages-deploy
cp -a dist/. /tmp/gh-pages-deploy/
cd /tmp/gh-pages-deploy
git init -q && git checkout -q -b gh-pages
touch .nojekyll
git add -A && git commit -q -m "Build para GitHub Pages"
git remote add origin https://github.com/IDGS-802-23002441/ReactPrueba.git
git push -f origin gh-pages
```

En GitHub: **Settings → Pages → Deploy from a branch → `gh-pages` / `(root)`**.

## Comandos

| Comando | Descripción |
| --- | --- |
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Genera `dist/` + service worker + manifest |
| `npm run preview` | Sirve el `dist/` para probar la PWA |
| `npm run lint` | Oxlint |

---

## React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.
