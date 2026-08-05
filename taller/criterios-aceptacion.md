# Criterios de Aceptación

## Historia 1
Historia: Como miembro de la comunidad, quiero enviar una denuncia anónima de bullying, para que el equipo la reciba sin miedo.

Criterio 1:
  Dado que estoy en la pantalla `Reportar`
  Cuando completo el tipo y la descripción y presiono "Enviar"
  Entonces se crea un registro en `reports` con `status = "pendiente"`

Criterio 2:
  Dado que dejo la descripción vacía
  Cuando presiono "Enviar"
  Entonces no se crea la denuncia y veo un mensaje de error.

## Historia 2
Historia: Como administrador, quiero iniciar sesión con mi correo y contraseña, para acceder al panel de administración.

Criterio 1:
  Dado que estoy en la pantalla `Login`
  Cuando ingreso un correo y contraseña válidos y presiono "Entrar"
  Entonces inicio sesión y veo el `Panel admin`.

Criterio 2:
  Dado que ingreso una contraseña incorrecta
  Cuando presiono "Entrar"
  Entonces no se inicia sesión y veo un mensaje de error.

## Historia 3
Historia: Como administrador, quiero ver la lista de denuncias, para poder clasificarlas.

Criterio 1:
  Dado que estoy autenticado como administrador
  Cuando accedo a `Panel admin`
  Entonces veo una tabla/lista con las denuncias de `reports`.

Criterio 2:
  Dado que no soy administrador
  Cuando intento acceder a `Panel admin`
  Entonces no se muestra la lista y recibo un mensaje de acceso denegado.

## Historia 4
Historia: Como administrador, quiero asignar una denuncia a un docente, para que alguien se encargue del seguimiento.

Criterio 1:
  Dado que estoy en `Panel admin`
  Cuando selecciono un docente y guardo la asignación
  Entonces el campo `assigned_to` en `reports` se actualiza.

Criterio 2:
  Dado que no selecciono un docente y trato de guardar
  Cuando envío el formulario
  Entonces veo un mensaje de validación y no se guarda el cambio.

## Historia 5
Historia: Como administrador, quiero cambiar el estado de una denuncia, para indicar si está en revisión o resuelta.

Criterio 1:
  Dado que estoy viendo una denuncia en `Panel admin`
  Cuando cambio el estado a "resuelta" y guardo
  Entonces el campo `status` en `reports` se actualiza.

Criterio 2:
  Dado que cambio el estado a un valor inválido
  Cuando guardo el formulario
  Entonces no se actualiza y veo un error de validación.
