import { useEffect, useState } from 'react'
import './App.css'
import { supabase } from './lib/supabase'
import { Menu } from './components/Menu'
import { LoginForm } from './components/LoginForm'
import { Inicio } from './components/pages/Inicio'
import { Reportar } from './components/pages/Reportar'
import { PanelAdmin } from './components/pages/PanelAdmin'

const menuItems = [
  { key: 'inicio', label: 'Inicio' },
  { key: 'reportar', label: 'Reportar' },
  { key: 'panel-admin', label: 'Panel de gestión' },
]

function App() {
  const [mode, setMode] = useState('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [session, setSession] = useState(null)
  const [profile, setProfile] = useState(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [selectedPage, setSelectedPage] = useState('inicio')

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
  }

  useEffect(() => {
    if (!isAdmin && selectedPage === 'panel-admin') {
      setSelectedPage('inicio')
    }
  }, [isAdmin, selectedPage])

  const visibleMenuItems = isAdmin
    ? menuItems
    : menuItems.filter((item) => item.key !== 'panel-admin')

  const renderPage = () => {
    switch (selectedPage) {
      case 'reportar':
        return <Reportar />
      case 'panel-admin':
        return <PanelAdmin isAdmin={isAdmin} />
      default:
        return <Inicio isAdmin={isAdmin} />
    }
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-10">
          <div className="card shadow-sm border-0">
            <div className="card-body p-4">
              <h1 className="h3 mb-3">Sistema Anónimo de Bullying</h1>
              <p className="text-muted mb-4">
                {session ? 'Tu sesión está activa.' : 'Inicia sesión o crea una cuenta para gestionar denuncias de forma anónima.'}
              </p>

              {!session ? (
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
              ) : (
                <>
                  <Menu items={visibleMenuItems} selected={selectedPage} onSelect={setSelectedPage} />
                  {message ? <div className="alert alert-info py-2">{message}</div> : null}
                  <div className="mb-3">
                    <span className="fw-semibold">Usuario:</span> {session.user?.email}
                    {profile?.role ? <span className="ms-2 text-muted">({profile.role})</span> : null}
                  </div>
                  {renderPage()}
                  <div className="mt-4">
                    <button className="btn btn-outline-danger" onClick={handleSignOut}>
                      Cerrar sesión
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
