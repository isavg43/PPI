import { useEffect, useState } from 'react'
import './App.css'
import { MenuAdvanced } from './components/MenuAdvanced'
import { LoginForm } from './components/LoginForm'
import { Inicio } from './components/pages/Inicio'
import { Reportar } from './components/pages/Reportar'
import { PanelAdmin } from './components/pages/PanelAdmin'
import {
  AcercaDe,
  Ayuda,
  MisReportes,
  GuiaSeguridad,
  Estadisticas,
  Configuracion
} from './components/pages/EnConstruccion'
import './components/pages/EnConstruccion.css'

function App() {
  const [mode, setMode] = useState('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [session, setSession] = useState(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [selectedPage, setSelectedPage] = useState('inicio')

  // Cargar sesión al montar
  useEffect(() => {
    const storedSession = localStorage.getItem('userSession')
    if (storedSession) {
      const userData = JSON.parse(storedSession)
      setSession(userData)
      setIsAdmin(userData.email.endsWith('@admin.com'))
    }
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    setMessage('')

    // Simular delay de red
    setTimeout(() => {
      if (!email || !password) {
        setMessage('⚠️ Por favor completa todos los campos')
        setLoading(false)
        return
      }

      // Crear usuario con los datos ingresados
      const userData = {
        email: email.toLowerCase().trim(),
        password: password,
        id: Math.random().toString(36).substr(2, 9),
        createdAt: new Date().toISOString()
      }

      // Guardar en localStorage
      localStorage.setItem('userSession', JSON.stringify(userData))

      // Actualizar estado
      setSession(userData)
      setIsAdmin(userData.email.endsWith('@admin.com'))

      if (userData.email.endsWith('@admin.com')) {
        setMessage('✅ ¡Bienvenido Administrador!')
      } else {
        setMessage('✅ ¡Ingreso exitoso! Bienvenido')
      }

      setEmail('')
      setPassword('')
      setLoading(false)
    }, 500)
  }

  const handleSignOut = async () => {
    localStorage.removeItem('userSession')
    setSession(null)
    setIsAdmin(false)
    setSelectedPage('inicio')
    setMessage('✅ Sesión cerrada correctamente')
    setTimeout(() => setMessage(''), 3000)
  }

  const renderPage = () => {
    // Si no hay sesión, mostrar opciones de visitante
    if (!session) {
      switch (selectedPage) {
        case 'inicio':
          return <Inicio isAdmin={false} onNavigate={setSelectedPage} />
        case 'acerca':
          return <AcercaDe />
        case 'ayuda':
          return <Ayuda />
        default:
          return <Inicio isAdmin={false} onNavigate={setSelectedPage} />
      }
    }

    // Usuario logueado
    switch (selectedPage) {
      case 'inicio':
        return <Inicio isAdmin={isAdmin} onNavigate={setSelectedPage} />

      case 'reportar':
        return <Reportar />

      case 'mis-reportes':
        return <MisReportes />

      case 'guia-seguridad':
        return <GuiaSeguridad />

      // Solo para administradores
      case 'panel-admin':
        return isAdmin ? <PanelAdmin isAdmin={isAdmin} /> : <Inicio isAdmin={false} onNavigate={setSelectedPage} />

      case 'estadisticas':
        return isAdmin ? <Estadisticas /> : <Inicio isAdmin={false} onNavigate={setSelectedPage} />

      case 'configuracion':
        return isAdmin ? <Configuracion /> : <Inicio isAdmin={false} onNavigate={setSelectedPage} />

      default:
        return <Inicio isAdmin={isAdmin} onNavigate={setSelectedPage} />
    }
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* HEADER CON MENÚ */}
      <header className="bg-light border-bottom shadow-sm sticky-top">
        <div className="container-fluid py-3">
          <div className="row align-items-center">
            <div className="col">
              <h1 className="h4 mb-0">🚫 Sistema Anónimo de Reporte de Bullying</h1>
            </div>
            {session && (
              <div className="col-auto text-end">
                <small className="text-muted">
                  {isAdmin && '👑 '}
                  {session.email}
                </small>
              </div>
            )}
          </div>
        </div>

        {/* MENÚ AVANZADO */}
        <div className="container-fluid px-0">
          <MenuAdvanced
            session={session}
            isAdmin={isAdmin}
            selectedPage={selectedPage}
            onSelect={setSelectedPage}
            onLogout={handleSignOut}
          />
        </div>
      </header>

      {/* CONTENIDO PRINCIPAL */}
      <main className="flex-grow-1 py-5">
        <div className="container">
          {/* Si no está logueado y no está en inicio */}
          {!session && selectedPage !== 'inicio' && (
            <div className="row justify-content-center">
              <div className="col-12 col-md-6">
                <div className="card shadow-sm">
                  <div className="card-body text-center p-5">
                    <h2 className="mb-4">🔐 Acceso Requerido</h2>
                    <p className="text-muted mb-4">
                      Debes iniciar sesión para acceder a esta sección.
                    </p>
                    <button
                      className="btn btn-primary"
                      onClick={() => setSelectedPage('inicio')}
                    >
                      ← Volver al Inicio
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Mostrar login si no está logueado */}
          {!session && selectedPage === 'inicio' && (
            <div className="row justify-content-center">
              <div className="col-12 col-md-6">
                <div className="card shadow-sm border-0">
                  <div className="card-body p-5">
                    <h2 className="h5 mb-4">Inicia sesión o regístrate</h2>
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
                </div>
              </div>
            </div>
          )}

          {/* Mostrar contenido si está logueado */}
          {session && (
            <div className="row">
              <div className="col-12">
                {message && <div className="alert alert-info alert-dismissible fade show" role="alert">
                  {message}
                  <button type="button" className="btn-close" onClick={() => setMessage('')}></button>
                </div>}
                {renderPage()}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* FOOTER */}
      <footer className="bg-light border-top mt-5 py-4">
        <div className="container text-center text-muted">
          <small>© 2026 Sistema de Reporte de Bullying - Todos los derechos reservados</small>
        </div>
      </footer>
    </div>
  )
}

export default App
