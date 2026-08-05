# Taller de Historias de Usuario - Proyecto PPI

Este taller está organizado para completar los entregables del workshop en base al proyecto existente.

## Entregables

1. Inventario de roles/supabase/pantallas
2. Backlog de historias de usuario
3. 5 historias con criterios de aceptación (Gherkin)
4. Backlog priorizado con MoSCoW y sprints
5. Deuda de datos

---

## 1. Inventario actual

### 1A. Roles/actores identificados en el login
| Rol | ¿Cómo se identifica en Supabase? (tabla/campo/rol de RLS) |
|---|---|
| Usuario autenticado | `auth.users` (usuario normal) |
| Administrador | `auth.users` + posible flag `is_admin` o `role` en una tabla `profiles` | 
| Invitado / anónimo | no requiere sesión | 

### 1B. Tablas de Supabase
| Tabla | Campos clave | ¿Qué representa en el negocio? |
|---|---|---|
| `profiles` (recomendado) | `id`, `email`, `role`, `created_at` | Información de usuarios autenticados |
| `reports` (recomendado) | `id`, `type`, `description`, `evidence_url`, `created_at`, `status`, `assigned_to` | Denuncias de bullying |
| `staff` / `teachers` (opcional) | `id`, `name`, `email` | Docentes o responsables asignados |

> Nota: el proyecto actual solo muestra el login y la lectura básica de sesión. No hay tablas reales inspeccionadas desde Supabase en el repositorio.

### 1C. Pantallas del sitemap
| Pantalla | ¿A qué rol(es) le aparece? | ¿Con qué tabla(s) de Supabase se conecta? |
|---|---|---|
| `Inicio` | Todos | Ninguna / bienvenida |
| `Reportar` | Todos (anónimo opcional) | `reports` |
| `Panel admin` | Administrador | `reports`, `profiles`, `teachers` |
| `Login` | Invitados | `auth.users`, `profiles` |

---

## 2. Historias de usuario

### Pantalla `Inicio`
- Como usuario anónimo, quiero ver una página de bienvenida, para entender qué ofrece el sistema.

### Pantalla `Reportar`
- Como estudiante o miembro de la comunidad, quiero enviar una denuncia anónima de bullying, para que el equipo reciba el reporte sin miedo a represalias.

### Pantalla `Panel admin`
- Como administrador, quiero ver la lista de denuncias recibidas, para poder clasificarlas y priorizarlas.
- Como administrador, quiero asignar denuncias a docentes, para que cada caso tenga un responsable de seguimiento.
- Como administrador, quiero ver estadísticas de denuncias, para entender la gravedad y tipo de bullying.

### Pantalla `Login`
- Como usuario, quiero iniciar sesión con mi correo y contraseña, para acceder al panel de administración.
- Como usuario, quiero registrarme, para crear una cuenta nueva.

---

## 3. Historias CRUD por tabla

### Tabla `reports`
| Operación | ¿Aplica? | Historia de usuario | Pantalla donde ocurre |
|---|---|---|---|
| Crear | Sí | Como usuario anónimo, quiero enviar una nueva denuncia, para que el equipo la reciba y la gestione. | Reportar |
| Leer | Sí | Como administrador, quiero ver la lista de denuncias, para revisar cada caso. | Panel admin |
| Actualizar | Sí | Como administrador, quiero cambiar el estado de una denuncia, para indicar si está en revisión o resuelta. | Panel admin |
| Eliminar | Depende | Como administrador, quiero eliminar un reporte inválido, para mantener limpias las denuncias. | Panel admin |

### Tabla `profiles`
| Operación | ¿Aplica? | Historia de usuario | Pantalla donde ocurre |
|---|---|---|---|
| Crear | Sí | Como usuario, quiero registrarme, para poder iniciar sesión como administrador (si se habilita). | Login |
| Leer | Sí | Como administrador, quiero ver mi perfil, para saber mi nombre y rol. | Panel admin |
| Actualizar | Sí | Como administrador, quiero actualizar mi contraseña, para mantener mi cuenta segura. | Panel admin |
| Eliminar | Sí | Como administrador, quiero desactivar cuentas, para quitar acceso cuando sea necesario. | Panel admin |

---

## 4. Criterios de aceptación (5 historias)

### Historia 1
Historia: Como usuario anónimo, quiero enviar una denuncia anónima de bullying, para que el equipo la reciba sin miedo.

Criterio 1:
  Dado que estoy en la pantalla `Reportar`
  Cuando completo el tipo, la descripción y presiono "Enviar"
  Entonces se crea un registro en la tabla `reports` con `status = "pendiente"`

Criterio 2:
  Dado que dejo la descripción vacía
  Cuando presiono "Enviar"
  Entonces no se crea el reporte y veo un mensaje de error.

### Historia 2
Historia: Como administrador, quiero iniciar sesión con mi correo y contraseña, para acceder al panel de administración.

Criterio 1:
  Dado que estoy en la pantalla `Login`
  Cuando ingreso un correo y contraseña válidos y presiono "Entrar"
  Entonces la sesión se inicia y veo el `Panel admin`.

Criterio 2:
  Dado que ingreso una contraseña incorrecta
  Cuando presiono "Entrar"
  Entonces no se inicia sesión y veo un mensaje de error.

### Historia 3
Historia: Como administrador, quiero ver la lista de denuncias, para poder clasificarlas.

Criterio 1:
  Dado que estoy autenticado como administrador
  Cuando accedo a `Panel admin`
  Entonces veo una tabla/lista con las denuncias de `reports`.

Criterio 2:
  Dado que no soy administrador
  Cuando intento acceder a `Panel admin`
  Entonces no se muestra la lista y recibo un mensaje de acceso denegado.

### Historia 4
Historia: Como administrador, quiero asignar una denuncia a un docente, para que alguien se encargue del seguimiento.

Criterio 1:
  Dado que estoy en `Panel admin`
  Cuando selecciono un docente y guardo la asignación
  Entonces el campo `assigned_to` en `reports` se actualiza.

Criterio 2:
  Dado que no selecciono un docente y trato de guardar
  Cuando envío el formulario
  Entonces veo un mensaje de validación y no se guarda el cambio.

### Historia 5
Historia: Como administrador, quiero cambiar el estado de una denuncia, para indicar si está en revisión o resuelta.

Criterio 1:
  Dado que estoy viendo una denuncia en `Panel admin`
  Cuando cambio el estado a "resuelta" y guardo
  Entonces el campo `status` en `reports` se actualiza.

Criterio 2:
  Dado que intento cambiar el estado a un valor inválido
  Cuando guardo el formulario
  Entonces no se actualiza y veo un error de validación.

---

## 5. Priorización MoSCoW y sprints

### Must
- Enviar denuncia anónima (`Reportar`)
- Login de administrador (`Login`)
- Ver lista de denuncias (`Panel admin`)
- Crear registros de `reports`
- Leer registros de `reports`

### Should
- Cambiar estado de denuncia
- Asignar denuncia a docente
- Mostrar estadísticas básicas
- Validar campos del formulario de reporte

### Could
- Eliminar reporte inválido
- Gestión de usuarios
- Recuperar contraseña
- Panel de estadísticas avanzadas

### Won't
- Chat en vivo
- Integración de pagos
- Funcionalidades de moderación fuera del alcance inicial

### Sprint 1 - login + navegación básica
- Login/registro básico
- Navegación entre Inicio, Reportar y Panel admin
- Formulario de reporte simple
- Guardar `reports` en Supabase

### Sprint 2 - funcionalidad principal
- Ver lista de denuncias
- Cambiar estado de denuncia
- Asignar denuncias
- Validaciones de formulario

### Sprint 3 - extras / roles avanzados
- Gestión de usuarios
- Estadísticas y reportes
- Seguridad RLS en Supabase

---

## 6. Deuda de datos

Historia: Como administrador, quiero ver la lista de denuncias.
Falta en Supabase: tabla `reports` con campos `type`, `description`, `evidence_url`, `status`, `assigned_to`, `created_at`.

Historia: Como administrador, quiero asignar una denuncia a un docente.
Falta en Supabase: tabla `teachers` o `staff` con `id`, `name`, `email` y relación con `reports.assigned_to`.

Historia: Como usuario, quiero registrarme.
Falta en Supabase: tabla `profiles` con `role` y flags de administrador.

Historia: Como administrador, quiero cambiar el estado de una denuncia.
Falta en Supabase: campo `status` en `reports` y políticas RLS para actualización.

---

## Notas de implementación
- El proyecto actual usa `supabase.auth` en `src/lib/supabase.js`.
- El login ya funciona, pero no hay rutas reales ni páginas independientes.
- La app se puede extender construyendo cada componente de página dentro de `src/components/pages/`.
