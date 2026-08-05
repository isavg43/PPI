# Taller completo en `taller/app`

## Qué contiene
- Código React + Vite funcional del proyecto.
- Login / registro con Supabase.
- Pantallas: Inicio, Reportar, Panel admin.
- Estructura completa del proyecto en `taller/app`.

## Cómo ejecutar
1. Abrir terminal en `taller/app`
2. Ejecutar `npm install`
3. Ejecutar `npm run dev`
4. Abrir el navegador en la URL que indique Vite

## Notas
- Debes configurar las variables de entorno en `.env` si quieres usar tu proyecto Supabase.
- El app usa `src/lib/supabase.js` con `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY`.
- El administrador se detecta por rol en `profiles.role` o por email terminado en `@admin.com`.
