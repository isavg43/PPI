export function Inicio({ isAdmin }) {
  return (
    <div>
      <h2>Inicio</h2>
      <p>Bienvenido al Sistema Anónimo de Bullying. Aquí puedes reportar incidentes de manera segura y encontrar las herramientas para que el equipo responsable los gestione.</p>
      <div className="alert alert-info mt-4">
        <p>Usa el menú para ir a <strong>Reportar</strong> o, si tienes acceso, a <strong>Panel de gestión</strong>.</p>
        {isAdmin ? (
          <p className="mb-0">Tu cuenta tiene permisos de gestión anónima.</p>
        ) : (
          <p className="mb-0">Como usuario anónimo puedes enviar una denuncia sin revelar tu identidad.</p>
        )}
      </div>
    </div>
  )
}
