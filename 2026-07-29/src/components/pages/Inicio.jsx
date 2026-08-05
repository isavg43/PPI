export function Inicio({ isAdmin }) {
  return (
    <div>
      <h2>Inicio</h2>
      <p>Bienvenido al proyecto PPI. Aquí puedes navegar entre las secciones principales.</p>
      <div className="alert alert-info mt-4">
        <p>Usa el menú para ir a <strong>Reportar</strong> o, si tienes acceso, a <strong>Panel admin</strong>.</p>
        {isAdmin ? (
          <p className="mb-0">Tu cuenta tiene permisos de administrador.</p>
        ) : (
          <p className="mb-0">Si no eres administrador, solo podrás enviar denuncias.</p>
        )}
      </div>
    </div>
  )
}
