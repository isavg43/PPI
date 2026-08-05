# Deuda de Datos

## Historia: Enviar una denuncia anónima
Falta en Supabase: tabla `reports` con campos `id`, `type`, `description`, `evidence_url`, `status`, `assigned_to`, `created_at`.

## Historia: Ver la lista de denuncias
Falta en Supabase: permisos RLS para que solo administradores lean `reports`.

## Historia: Asignar denuncia a docente
Falta en Supabase: tabla `teachers` o `staff` con `id`, `name`, `email` y relación con `reports.assigned_to`.

## Historia: Cambiar estado de una denuncia
Falta en Supabase: campo `status` en `reports` y políticas de actualización que permitan a administradores editarlo.

## Historia: Registro y login de administrador
Falta en Supabase: tabla `profiles` con `role` o `is_admin` para diferenciar administradores de usuarios comunes.
