# Despliegue en GitHub Pages y Supabase

## Objetivo

Publicar la aplicación React del proyecto en GitHub Pages manteniendo la conexión con Supabase en producción.

## Parte 1 — Preparación del dominio y el proyecto

### 1. Verifica que el proyecto compila

```bash
cd 2026-07-29
npm install
npm run build
npm run preview
```

Si `npm run build` falla, no se debe continuar. El preview local debe abrirse en `http://localhost:4173`.

### 2. Comprende la URL de GitHub Pages

GitHub Pages genera una URL según el tipo de repositorio:

- Usuario/organización: `https://usuario.github.io/`
- Repositorio público: `https://usuario.github.io/mi-repositorio/`

En este repositorio real, el nombre del proyecto es `PPI`, por lo que la base debe apuntar a:

```text
/PPI/
```

Esto evita el problema típico de assets cargados desde `/assets/...` en vez de `/PPI/assets/...`.

### 3. Plataforma elegida para la publicación

| Plataforma | Ventaja | Desventaja | Recomendación |
| --- | --- | --- | --- |
| GitHub Pages | Gratis, fácil, perfecto para frontend estático | No sirve backend ni funciones server-side | Sí |
| Vercel | Muy fácil con React, previews automáticos | Requiere integrar un nuevo entorno | Sí, alternativa |
| Netlify | Muy cómodo y rápido | Menos directo para repositorios internos | Sí, alternativa |

En este taller se usa GitHub Pages por el requisito de despliegue estático sobre repositorio público.

### 4. Configuración de Vite para la base del proyecto

El ajuste necesario en `2026-07-29/vite.config.js` es:

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/PPI/',
})
```

El build debe dejar rutas como `/PPI/assets/index...js` en `dist/index.html`.

### 5. Enrutamiento SPA

GitHub Pages no entiende rutas de React como `/dashboard` si no hay una configuración mínima. Las opciones más comunes son:

- `HashRouter`: la más simple y robusta para GitHub Pages.
- `BrowserRouter` + `404.html`: más elegante, pero requiere mayor cuidado.

Como este proyecto por ahora es una SPA sencilla sin rutas complejas, es suficiente mantener una configuración estática adecuada y generar `404.html` desde el build.

## Parte 2 — Publicación en GitHub Pages

### 1. Ajustes de build

El proyecto ya incluye la configuración necesaria para exportar `404.html` y para publicar en el repositorio correcto:

```json
"build": "vite build && cp dist/index.html dist/404.html"
```

Esto ayuda a que el sitio responda bien a rutas internas en un hosting estático.

### 2. Variables de entorno de Supabase

En local se usa `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY`:

```env
VITE_SUPABASE_URL=https://xxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOi...
```

Y el cliente se inicializa así:

```js
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)
```

> La `anon key` sí se publica al navegador; la seguridad real la otorgan las políticas RLS.
> La `service_role` key nunca debe exponerse en el frontend.

### 3. Secrets de GitHub Actions

En GitHub:

`Settings` → `Secrets and variables` → `Actions` → `New repository secret`

Crear:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

### 4. Workflow para despliegue

Archivo recomendado:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: ./2026-07-29
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
          cache-dependency-path: 2026-07-29/package-lock.json

      - run: npm ci

      - run: npm run build
        env:
          VITE_SUPABASE_URL: ${{ secrets.VITE_SUPABASE_URL }}
          VITE_SUPABASE_ANON_KEY: ${{ secrets.VITE_SUPABASE_ANON_KEY }}

      - uses: actions/configure-pages@v5

      - uses: actions/upload-pages-artifact@v3
        with:
          path: ./2026-07-29/dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    permissions:
      pages: write
      id-token: write
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

### 5. Activar GitHub Pages

En GitHub:

`Settings` → `Pages` → `Source` → `GitHub Actions`

### 6. Despliegue

```bash
git add .
git commit -m "chore: configurar despliegue en GitHub Pages"
git push origin main
```

Luego revisa la pestaña `Actions` y la sección `Settings > Pages`.

## Configuración de Supabase para producción

En el panel de Supabase:

- `Authentication` → `URL Configuration`
- `Site URL`: `https://isavg43.github.io/PPI/`
- `Redirect URLs`: `https://isavg43.github.io/PPI/**` y `http://localhost:5173/**`

Además, todas las tablas deben tener políticas **RLS** activadas para evitar accesos no autorizados.

## Errores comunes

- Página en blanco: `base` mal configurado.
- 404 al recargar: router o rutas internas sin soporte.
- `supabaseUrl is required`: secretos no inyectados en el workflow.
- Login redirige a localhost: URLs de producción no configuradas.
- Datos visibles sin iniciar sesión: RLS deshabilitado.

## Estado de este proyecto

El repositorio está listo para la publicación estática con la base correcta para GitHub Pages, y la configuración de despliegue queda documentada para que el proyecto pueda publicarse correctamente cuando se suba a GitHub.
