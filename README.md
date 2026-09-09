# Sistema Anónimo de Reporte de Bullying

Aplicación web desarrollada con React para recibir y gestionar reportes de bullying de forma confidencial. Permite a los miembros de la comunidad describir una situación, indicar su tipo y adjuntar una URL de evidencia opcional; el equipo administrador puede revisar cada reporte, asignarlo a un docente y actualizar su estado.

> **Estado actual:** el flujo funcional usa `localStorage` del navegador como almacenamiento temporal. Supabase está preparado como dependencia y cliente de conexión, pero todavía no hay consultas ni tablas conectadas en la aplicación.

## Tecnologías

- React 19
- Vite 8
- Bootstrap 5
- Supabase JS, preparado para la integración de autenticación y base de datos
- JavaScript (JSX)

## Funcionalidades

### Implementadas

- Inicio de sesión y registro simulados en el navegador.
- Menú dinámico para visitantes, usuarios y administradores.
- Creación de denuncias anónimas sin solicitar el nombre de la persona que reporta.
- Clasificación del reporte: bullying psicológico, físico, verbal o ciberbullying.
- Descripción obligatoria y URL de evidencia opcional.
- Confirmación antes del envío y mensaje de resultado.
- Panel de administración para consultar los reportes guardados.
- Actualización del estado de una denuncia: pendiente, en revisión o resuelta.
- Asignación de una denuncia a un docente o responsable.
- Diseño responsive para móvil, tableta y escritorio.
- Guía de seguridad, ayuda y otras pantallas informativas en desarrollo.

### En desarrollo

- Persistencia real en Supabase mediante la tabla `reports`.
- Autenticación real con Supabase Auth.
- Control de roles y permisos mediante perfiles y políticas RLS.
- Seguimiento individual de reportes, estadísticas y configuración avanzada.

## Requisitos

- Node.js 18 o superior.
- npm.

## Instalación y ejecución

Desde la raíz del repositorio:

```bash
cd 2026-07-29
npm install
npm run dev
```

Después, abre en el navegador la URL que muestre Vite, normalmente `http://localhost:5173`.

Para generar una compilación de producción:

```bash
cd 2026-07-29
npm run build
npm run preview
```

Para ejecutar el análisis de código:

```bash
cd 2026-07-29
npm run lint
```

## Variables de entorno

La conexión de Supabase se prepara mediante variables de entorno de Vite. Si vas a continuar esa integración, crea `2026-07-29/.env.local` con:

```env
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu_clave_publica_de_supabase
```

No subas archivos `.env` ni claves reales al repositorio. En el estado actual, la aplicación usa valores de respaldo y guarda las sesiones y denuncias en `localStorage`.

## Uso de los roles

- **Visitante:** puede consultar el inicio, la información del sistema y la ayuda.
- **Usuario:** puede acceder al formulario de reporte y a las secciones informativas.
- **Administrador:** además puede abrir el panel de gestión, revisar denuncias, cambiar estados y asignar responsables.

En la implementación actual, un correo terminado en `@admin.com` se identifica como administrador. Esta regla es temporal y debe sustituirse por autenticación y autorización reales antes de usar el sistema en producción.

## Estructura del proyecto

```text
PPI/
├── 2026-07-29/                 # Aplicación React principal
│   ├── package.json             # Scripts y dependencias
│   ├── vite.config.js           # Configuración de Vite
│   └── src/
│       ├── App.jsx              # Sesión, roles y navegación
│       ├── components/
│       │   ├── LoginForm.jsx    # Formulario de acceso
│       │   ├── MenuAdvanced.jsx # Menú según el rol
│       │   └── pages/            # Inicio, reportes y panel admin
│       └── lib/
│           ├── reports.js       # Persistencia temporal en localStorage
│           └── supabase.js      # Cliente preparado para Supabase
├── taller/                      # Entregables y documentación del taller
│   ├── app/                     # Copia ejecutable de la aplicación
│   ├── backlog.md               # Historias y tareas pendientes
│   ├── criterios-aceptacion.md  # Criterios en formato Gherkin
│   ├── inventario.md            # Roles, tablas y pantallas previstas
│   └── deuda-datos.md           # Pendientes de modelado de datos
└── mapas_sitio_bullying.md      # Mapa de navegación y componentes
```

## Modelo de datos previsto

La integración futura con Supabase contempla, como mínimo, estas tablas:

- `profiles`: usuarios, correo y rol.
- `reports`: tipo, descripción, evidencia, estado, responsable y fecha de creación.
- `staff` o `teachers`: docentes o responsables disponibles para asignación.

La definición detallada y la deuda actual de datos se encuentran en [taller/deuda-datos.md](taller/deuda-datos.md) y [taller/inventario.md](taller/inventario.md).

## Documentación adicional

- [Mapa del sitio](mapas_sitio_bullying.md)
- [Backlog del proyecto](taller/backlog.md)
- [Criterios de aceptación](taller/criterios-aceptacion.md)
- [Documentación de la aplicación](2026-07-29/src/README_MENU_AVANZADO.md)

## Autores

Proyecto académico PPI. Completa esta sección con los nombres y usuarios de GitHub del equipo antes de entregar el repositorio.

## Licencia

Este proyecto es de uso académico.
