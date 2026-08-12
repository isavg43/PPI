export function EnConstruccion({ titulo = 'Página en construcción', descripcion }) {
  return (
    <div className="construction-container">
      <div className="construction-content">
        <div className="construction-icon">🏗️</div>
        <h2>{titulo}</h2>
        <p className="construction-message">
          {descripcion || 'Estamos trabajando en esta sección. Vuelve pronto para nuevas funcionalidades.'}
        </p>
        
        <div className="construction-info">
          <div className="info-card">
            <span className="info-icon">⏱️</span>
            <p>Se estima completar pronto</p>
          </div>
          <div className="info-card">
            <span className="info-icon">💡</span>
            <p>Tus sugerencias nos ayudan a mejorar</p>
          </div>
          <div className="info-card">
            <span className="info-icon">🔔</span>
            <p>Te notificaremos cuando esté lista</p>
          </div>
        </div>

        <div className="construction-progress">
          <label>Progreso:</label>
          <div className="progress-bar">
            <div className="progress-fill"></div>
          </div>
          <small>En desarrollo...</small>
        </div>

        <button 
          className="btn-return"
          onClick={() => window.location.hash = '#'}
        >
          ← Volver al inicio
        </button>
      </div>
    </div>
  )
}

// Componentes para páginas específicas en construcción
export function AcercaDe() {
  return (
    <EnConstruccion 
      titulo="Acerca de"
      descripcion="Conoce más sobre nuestro sistema anónimo de reporte de bullying."
    />
  )
}

export function Ayuda() {
  return (
    <EnConstruccion 
      titulo="Ayuda"
      descripcion="Preguntas frecuentes y guía de uso del sistema."
    />
  )
}

export function MisReportes() {
  return (
    <EnConstruccion 
      titulo="Mis Reportes"
      descripcion="Aquí podrás ver el seguimiento de tus denuncias."
    />
  )
}

export function GuiaSeguridad() {
  return (
    <EnConstruccion 
      titulo="Guía de Seguridad"
      descripcion="Consejos y recomendaciones para protegerte del bullying."
    />
  )
}

export function Estadisticas() {
  return (
    <EnConstruccion 
      titulo="Estadísticas"
      descripcion="Análisis y datos sobre los reportes en el sistema."
    />
  )
}

export function Configuracion() {
  return (
    <EnConstruccion 
      titulo="Configuración"
      descripcion="Personaliza tu experiencia en el sistema."
    />
  )
}
