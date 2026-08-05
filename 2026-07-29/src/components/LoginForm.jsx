export function LoginForm({ mode, email, password, loading, message, onModeChange, onEmailChange, onPasswordChange, onSubmit }) {
  return (
    <>
      <div className="btn-group w-100 mb-4" role="group">
        <button
          type="button"
          className={`btn ${mode === 'login' ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => onModeChange('login')}
        >
          Iniciar sesión
        </button>
        <button
          type="button"
          className={`btn ${mode === 'register' ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => onModeChange('register')}
        >
          Registrarse
        </button>
      </div>

      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label className="form-label">Correo electrónico</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(event) => onEmailChange(event.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(event) => onPasswordChange(event.target.value)}
            required
          />
        </div>

        {message ? <div className="alert alert-info py-2">{message}</div> : null}

        <button type="submit" className="btn btn-primary w-100" disabled={loading}>
          {loading ? 'Procesando...' : mode === 'login' ? 'Entrar' : 'Crear cuenta'}
        </button>
      </form>
    </>
  )
}
