# 📋 Guía de Integración - Menú Avanzado y Páginas en Construcción

## 📌 Descripción General

Este archivo contiene la guía de cómo integrar el nuevo `MenuAdvanced` (menú dinámico) y los componentes de páginas en construcción en tu aplicación React.

---

## 🎯 Características Implementadas

✅ **Menú dinámico según estado de sesión**
- Muestra opciones diferentes para usuarios logueados vs visitantes

✅ **Menú personalizado por rol**
- Opciones diferentes para administradores vs usuarios normales

✅ **Navegación a componentes en construcción**
- Alerta cuando intenta acceder a secciones en desarrollo
- Componentes listos para uso

✅ **Interfaz moderna y responsive**
- Gradientes profesionales
- Animaciones suaves
- Adaptable a dispositivos móviles

---

## 📦 Archivos Creados

### 1. **MenuAdvanced.jsx**
Componente principal del menú dinámico.

**Props esperadas:**
```javascript
<MenuAdvanced
  session={session}        // Objeto de sesión de Supabase
  isAdmin={isAdmin}        // Boolean indicando si es admin
  selectedPage={selectedPage}  // Página actualmente seleccionada
  onSelect={handleSelect}  // Función callback al seleccionar
  onLogout={handleLogout}  // Función callback al logout
/>
```

### 2. **MenuAdvanced.css**
Estilos del menú con gradientes y animaciones.

### 3. **EnConstruccion.jsx**
Componentes reutilizables para páginas en construcción:
- `EnConstruccion()` - Componente base genérico
- `AcercaDe()` - Página "Acerca de"
- `Ayuda()` - Página "Ayuda"
- `MisReportes()` - Página "Mis Reportes"
- `GuiaSeguridad()` - Página "Guía de Seguridad"
- `Estadisticas()` - Página "Estadísticas"
- `Configuracion()` - Página "Configuración"

### 4. **EnConstruccion.css**
Estilos para las páginas en construcción con animaciones.

---

## 🔧 Cómo Integrar en App.jsx

### Paso 1: Importar los componentes

```javascript
import { MenuAdvanced } from './components/MenuAdvanced'
import {
  AcercaDe,
  Ayuda,
  MisReportes,
  GuiaSeguridad,
  Estadisticas,
  Configuracion
} from './components/pages/EnConstruccion'
import { Inicio } from './components/pages/Inicio'
import { Reportar } from './components/pages/Reportar'
import { PanelAdmin } from './components/pages/PanelAdmin'

// Importar estilos
import './components/pages/EnConstruccion.css'
```

### Paso 2: Reemplazar el menú actual

**Cambiar de esto:**
```javascript
<Menu
  items={menuItems}
  selected={selectedPage}
  onSelect={setSelectedPage}
/>
```

**A esto:**
```javascript
<MenuAdvanced
  session={session}
  isAdmin={isAdmin}
  selectedPage={selectedPage}
  onSelect={setSelectedPage}
  onLogout={handleSignOut}
/>
```

### Paso 3: Actualizar el renderizado de páginas

Agregar casos para las nuevas páginas:

```javascript
const renderPage = () => {
  if (!session) {
    // Usuario no logueado
    if (selectedPage === 'inicio') return <Inicio isAdmin={false} />
    if (selectedPage === 'acerca') return <AcercaDe />
    if (selectedPage === 'ayuda') return <Ayuda />
    return <Inicio isAdmin={false} />
  }

  // Usuario logueado
  if (selectedPage === 'inicio') return <Inicio isAdmin={isAdmin} />
  if (selectedPage === 'reportar') return <Reportar />
  if (selectedPage === 'mis-reportes') return <MisReportes />
  if (selectedPage === 'guia-seguridad') return <GuiaSeguridad />

  // Solo admin
  if (isAdmin) {
    if (selectedPage === 'panel-admin') return <PanelAdmin isAdmin={isAdmin} />
    if (selectedPage === 'estadisticas') return <Estadisticas />
    if (selectedPage === 'configuracion') return <Configuracion />
  }

  return <Inicio isAdmin={isAdmin} />
}

// En el JSX:
<div className="container mt-4">
  {renderPage()}
</div>
```

---

## 🎨 Personalización

### Cambiar colores del menú

En `MenuAdvanced.css`, modifica:

```css
.menu-advanced {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  /* Cambiar estos colores */
}
```

### Agregar nuevas opciones de menú

En `MenuAdvanced.jsx`, agrega a `guestMenuItems`, `userMenuItems` o `adminMenuItems`:

```javascript
{
  key: 'mi-nueva-pagina',
  label: '🎯 Mi Nueva Página',
  inConstruction: false,  // o true si está en construcción
  description: 'Descripción corta'
}
```

### Personalizar páginas en construcción

Puedes crear tu propia página en construcción:

```javascript
import { EnConstruccion } from './pages/EnConstruccion'

export function MiPagina() {
  return (
    <EnConstruccion
      titulo="Mi Página Especial"
      descripcion="Descripción personalizada de esta sección."
    />
  )
}
```

---

## 🧪 Ejemplo Completo Simplificado

```javascript
import { useState, useEffect } from 'react'
import { supabase } from './lib/supabase'
import { MenuAdvanced } from './components/MenuAdvanced'
import { Inicio } from './components/pages/Inicio'
import { Reportar } from './components/pages/Reportar'
import { PanelAdmin } from './components/pages/PanelAdmin'
import { MisReportes, Ayuda } from './components/pages/EnConstruccion'

function App() {
  const [session, setSession] = useState(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [selectedPage, setSelectedPage] = useState('inicio')

  useEffect(() => {
    // Cargar sesión...
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
  }

  const renderPage = () => {
    switch (selectedPage) {
      case 'inicio':
        return <Inicio isAdmin={isAdmin} />
      case 'reportar':
        return <Reportar />
      case 'mis-reportes':
        return <MisReportes />
      case 'panel-admin':
        return isAdmin ? <PanelAdmin isAdmin={isAdmin} /> : <Inicio isAdmin={false} />
      case 'ayuda':
        return <Ayuda />
      default:
        return <Inicio isAdmin={isAdmin} />
    }
  }

  return (
    <div className="container">
      {session ? (
        <>
          <MenuAdvanced
            session={session}
            isAdmin={isAdmin}
            selectedPage={selectedPage}
            onSelect={setSelectedPage}
            onLogout={handleLogout}
          />
          {renderPage()}
        </>
      ) : (
        <>
          <MenuAdvanced
            session={null}
            isAdmin={false}
            selectedPage={selectedPage}
            onSelect={setSelectedPage}
            onLogout={handleLogout}
          />
          <LoginForm {...loginProps} />
        </>
      )}
    </div>
  )
}

export default App
```

---

## 🚀 Próximos Pasos

1. **Integrar en App.jsx** - Copiar la estructura de ejemplo
2. **Probar la navegación** - Verificar que todas las opciones funcionen
3. **Personalizar estilos** - Adaptar colores a tu branding
4. **Implementar páginas reales** - Reemplazar componentes en construcción por funcionalidad real
5. **Testing** - Probar con diferentes roles (admin, usuario, visitante)

---

## 📱 Comportamiento por Rol

### 👥 Visitante (No logueado)
- ✅ Inicio
- 🏗️ Acerca de
- 🏗️ Ayuda

### 👤 Usuario Logueado (Normal)
- ✅ Inicio
- ✅ Reportar bullying
- 🏗️ Mis reportes
- 🏗️ Guía de seguridad

### 👑 Administrador
- ✅ Inicio
- ✅ Reportar bullying
- ⚙️ Panel de gestión
- 🏗️ Mis reportes
- 🏗️ Estadísticas
- 🏗️ Configuración

**Leyenda:** ✅ = Funcional | 🏗️ = En construcción | ⚙️ = Solo admin

---

## 🆘 Solución de Problemas

### El menú no aparece
- Verifica que `MenuAdvanced.jsx` y `MenuAdvanced.css` estén en `components/`
- Comprueba que los estilos estén importados

### Las páginas en construcción no se muestran
- Asegúrate de que `EnConstruccion.css` esté importado
- Verifica que `EnConstruccion.jsx` esté en `components/pages/`

### El logout no funciona
- Verifica que `handleSignOut` esté correctamente implementado
- Asegúrate que la sesión se actualice después del logout

---

**¡Listo! Ahora tienes un menú dinámico y profesional en tu aplicación.** 🎉
