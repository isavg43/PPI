/**
 * EJEMPLO: App.jsx Actualizado con MenuAdvanced
 * 
 * Este archivo muestra cómo integrar MenuAdvanced en tu App.jsx actual
 * Copia la estructura que se adapte a tu código existente
 */

import { useEffect, useState } from 'react'
import './App.css'
import { supabase } from './lib/supabase'

// ==================== IMPORTAR NUEVOS COMPONENTES ====================
import { MenuAdvanced } from './components/MenuAdvanced'
import { 
  AcercaDe, 
  Ayuda, 
  MisReportes, 
  GuiaSeguridad,
  Estadisticas,
  Configuracion 
} from './components/pages/EnConstruccion'
import './components/pages/EnConstruccion.css'

// ==================== IMPORTAR COMPONENTES EXISTENTES ====================
import { LoginForm } from './components/LoginForm'
import { Inicio } from './components/pages/Inicio'
import { Reportar } from './components/pages/Reportar'
import { PanelAdmin } from './components/pages/PanelAdmin'

function App() {
  // ==================== ESTADO ====================
  const [mode, setMode] = useState('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [session, setSession] = useState(null)
  const [profile, setProfile] = useState(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [selectedPage, setSelectedPage] = useState('inicio')

  // ==================== EFECTOS ====================
  // Cargar sesión al montar
  useEffect(() => {
    const loadSession = async () => {
      const { data } = await supabase.auth.getSession()
      setSession(data.session)
    }

    loadSession()

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, currentSession) => {
      setSession(currentSession)
    })

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [])

  // Detectar si es admin
  useEffect(() => {
    const detectAdmin = async () => {
      if (!session?.user) {
        setProfile(null)
        setIsAdmin(false)
        return
      }

      const metadataRole = session.user?.app_metadata?.role || session.user?.user_metadata?.role
      const isAdminFromMetadata = metadataRole === 'admin'
      const isAdminFromEmail = session.user.email?.endsWith('@admin.com')
      setIsAdmin(isAdminFromMetadata || isAdminFromEmail)

      const { data, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', session.user.id)
        .single()

      if (!error && data) {
        setProfile(data)
        setIsAdmin((prev) => prev || data.role === 'admin')
      }
    }

    detectAdmin()
  }, [session])

  // ==================== MANEJADORES ====================
  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const action = mode === 'login'
        ? supabase.auth.signInWithPassword({ email, password })
        : supabase.auth.signUp({ email, password })

      const { data, error } = await action

      if (error) {
        setMessage(error.message)
      } else if (mode === 'login' && data.session) {
        setMessage('Sesión iniciada correctamente')
      } else if (mode === 'register' && data.user) {
        setMessage('Registro exitoso. Revisa tu correo si la confirmación está activa.')
      }
    } catch (error) {
      setMessage('Ocurrió un error inesperado')
    } finally {
      setLoading(false)
    }
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    setMessage('Sesión cerrada')
    setSelectedPage('inicio')
  }

  // ==================== RENDERIZAR PÁGINA ACTUAL ====================
  const renderPage = () => {
    // Si no hay sesión, mostrar opciones de visitante
    if (!session) {
      switch (selectedPage) {
        case 'inicio':
          return <Inicio isAdmin={false} />
        case 'acerca':
          return <AcercaDe />
        case 'ayuda':
          return <Ayuda />
        default:
          return <Inicio isAdmin={false} />
      }
    }

    // Usuario logueado
    switch (selectedPage) {
      case 'inicio':
        return <Inicio isAdmin={isAdmin} />
      
      case 'reportar':
        return <Reportar />
      
      case 'mis-reportes':
        return <MisReportes />
      
      case 'guia-seguridad':
        return <GuiaSeguridad />

      // Solo para administradores
      case 'panel-admin':
        return isAdmin ? <PanelAdmin isAdmin={isAdmin} /> : <Inicio isAdmin={false} />
      
      case 'estadisticas':
        return isAdmin ? <Estadisticas /> : <Inicio isAdmin={false} />
      
      case 'configuracion':
        return isAdmin ? <Configuracion /> : <Inicio isAdmin={false} />

      default:
        return <Inicio isAdmin={isAdmin} />
    }
  }

  // ==================== RENDER PRINCIPAL ====================
  return (
    <div className="container mt-4">
      <header>
        <h1 className="text-center mb-4">🚫 Sistema Anónimo de Reporte de Bullying</h1>
      </header>

      <main>
        {/* ========== MENÚ DINÁMICO ========== */}
        <MenuAdvanced 
          session={session}
          isAdmin={isAdmin}
          selectedPage={selectedPage}
          onSelect={setSelectedPage}
          onLogout={handleSignOut}
        />

        {/* ========== CONTENIDO PRINCIPAL ========== */}
        {!session ? (
          <div className="auth-container mt-4">
            <LoginForm 
              mode={mode}
              email={email}
              password={password}
              loading={loading}
              message={message}
              onModeChange={setMode}
              onEmailChange={setEmail}
              onPasswordChange={setPassword}
              onSubmit={handleSubmit}
            />
          </div>
        ) : (
          <div className="content-container mt-4">
            {renderPage()}
          </div>
        )}
      </main>

      <footer className="mt-5 mb-4 text-center text-muted">
        <small>© 2026 Sistema de Reporte de Bullying - Todos los derechos reservados</small>
      </footer>
    </div>
  )
}

export default App

/**
 * ==================== CAMBIOS REALIZADOS ====================
 * 
 * 1. ✅ IMPORTACIONES:
 *    - Agregado MenuAdvanced y componentes en construcción
 *    - Importado EnConstruccion.css
 * 
 * 2. ✅ MENÚ:
 *    - Reemplazado <Menu /> por <MenuAdvanced />
 *    - Ahora el menú es dinámico según sesión y rol
 * 
 * 3. ✅ RENDERIZADO:
 *    - Creada función renderPage() que maneja todos los casos
 *    - Visibilidad de opciones según rol (admin vs usuario)
 *    - Diferenciación entre logueado y no logueado
 * 
 * 4. ✅ PÁGINAS EN CONSTRUCCIÓN:
 *    - Agregados componentes: AcercaDe, Ayuda, MisReportes, etc.
 *    - Mostrados cuando se seleccionan del menú
 * 
 * 5. ✅ LOGOUT:
 *    - handleSignOut ahora resetea la página seleccionada
 *    - Se ejecuta correctamente desde MenuAdvanced
 * 
 * ==================== PRÓXIMOS PASOS ====================
 * 
 * 1. Copiar los cambios a tu App.jsx actual
 * 2. Actualizar las importaciones según tu estructura
 * 3. Probar con diferentes roles (visitante, usuario, admin)
 * 4. Personalizar estilos si es necesario
 * 5. Implementar las páginas en construcción cuando estén listas
 */
