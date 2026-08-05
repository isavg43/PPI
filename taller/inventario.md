# Inventario del Taller

## 1A. Roles/actores identificados en el login
| Rol | ¿Cómo se identifica en Supabase? (tabla/campo/rol de RLS) |
|---|---|
| Usuario autenticado | `auth.users` de Supabase, posiblemente complementado con `profiles.email` y `profiles.role` |
| Administrador | `auth.users` + campo `is_admin` o `role` en `profiles` |
| Invitado / anónimo | Usuario sin sesión; no persiste en `auth.users` |

## 1B. Tablas de Supabase
| Tabla | Campos clave | ¿Qué representa en el negocio? |
|---|---|---|
| `profiles` (recomendado) | `id`, `email`, `role`, `created_at` | Datos del usuario autenticado y permisos |
| `reports` | `id`, `type`, `description`, `evidence_url`, `status`, `assigned_to`, `created_at` | Denuncias de bullying enviadas |
| `teachers` / `staff` | `id`, `name`, `email` | Docentes o responsables a los que se asignan casos |

> Nota: el proyecto actual usa Supabase Auth en `src/lib/supabase.js`, pero no contiene tablas concretas en el repositorio.

## 1C. Pantallas del mapa del sitio
| Pantalla | ¿A qué rol(es) le aparece? | ¿Con qué tabla(s) de Supabase se conecta? |
|---|---|---|
| `Inicio` | Todos | Ninguna directa |
| `Reportar` | Invitado/anónimo/usuario | `reports` |
| `Login` | Invitado | `auth.users`, `profiles` |
| `Panel admin` | Administrador | `reports`, `profiles`, `teachers` |
