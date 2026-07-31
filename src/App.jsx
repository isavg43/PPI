import { useEffect, useState } from 'react'
import './App.css'
import { supabase } from './lib/supabase'

function App() {
  const [mode, setMode] = useState('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [session, setSession] = useState(null)

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

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow-sm border-0">
            <div className="card-body p-4">
              <h1 className="h3 mb-3">Proyecto PPI</h1>
              <p className="text-muted mb-4">
                {session ? 'Tu sesión está activa.' : 'Inicia sesión o crea una cuenta.'}
              </p>

              {!session ? (
                <>
                  <div className="btn-group w-100 mb-4" role="group">
                    <button
                      type="button"
                      className={`btn ${mode === 'login' ? 'btn-primary' : 'btn-outline-primary'}`}
                      onClick={() => setMode('login')}
                    >
                      Iniciar sesión
                    </button>
                    <button
                      type="button"
                      className={`btn ${mode === 'register' ? 'btn-primary' : 'btn-outline-primary'}`}
                      onClick={() => setMode('register')}
                    >
                      Registrarse
                    </button>
                  </div>

                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label className="form-label">Correo electrónico</label>
                      <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Contraseña</label>
                      <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        required
                      />
                    </div>

                    {message ? <div className="alert alert-info py-2">{message}</div> : null}

                    <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                      {loading ? 'Procesando...' : mode === 'login' ? 'Entrar' : 'Crear cuenta'}
                    </button>
                  </form>
                </>
              ) : (
                <div>
                  <div className="alert alert-success">Sesión iniciada correctamente</div>
                  <p className="mb-3">Usuario: {session.user?.email}</p>
                  <button className="btn btn-outline-danger" onClick={handleSignOut}>
                    Cerrar sesión
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
