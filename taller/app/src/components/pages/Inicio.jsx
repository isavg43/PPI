export function Inicio({ isAdmin, onNavigate }) {
  const actions = isAdmin
    ? [
        { key: 'panel-admin', icon: '⚙️', title: 'Gestionar reportes', text: 'Revisa casos pendientes y actualiza su estado.' },
        { key: 'estadisticas', icon: '📊', title: 'Ver estadísticas', text: 'Consulta el resumen de atención del sistema.' },
        { key: 'reportar', icon: '📝', title: 'Crear un reporte', text: 'Registra una situación para dejar constancia.' },
      ]
    : [
        { key: 'reportar', icon: '📝', title: 'Reportar bullying', text: 'Cuenta lo ocurrido de forma anónima y segura.' },
        { key: 'mis-reportes', icon: '📋', title: 'Ver seguimiento', text: 'Conoce las etapas por las que pasa tu reporte.' },
        { key: 'guia-seguridad', icon: '🛡️', title: 'Guía de seguridad', text: 'Encuentra pasos concretos para pedir ayuda.' },
      ]

  return (
    <div className="home-page">
      <section className="home-hero">
        <div>
          <span className="section-eyebrow">Espacio seguro</span>
          <h2>{isAdmin ? 'Centro de gestión' : 'Tu voz puede cambiar las cosas'}</h2>
          <p>{isAdmin ? 'Organiza la atención de cada caso y ayuda a que ninguna situación quede sin respuesta.' : 'Comparte una situación de bullying para que el equipo responsable pueda acompañarte.'}</p>
        </div>
        <div className="hero-mark" aria-hidden="true">{isAdmin ? '🧭' : '🫶'}</div>
      </section>

      <section className="home-actions">
        <div className="home-section-heading"><div><span className="section-eyebrow">Accesos rápidos</span><h3>¿Qué necesitas hacer?</h3></div><span className="home-status">● Sistema disponible</span></div>
        <div className="action-grid">
          {actions.map((action) => (
            <button type="button" className="action-card" key={action.key} onClick={() => onNavigate(action.key)}>
              <span className="action-icon">{action.icon}</span><span className="action-title">{action.title}</span><span className="action-text">{action.text}</span><span className="action-link">Abrir sección →</span>
            </button>
          ))}
        </div>
      </section>

      <section className="home-guide">
        <div><span className="section-eyebrow">Cómo funciona</span><h3>Un proceso sencillo</h3></div>
        <div className="guide-steps"><div><strong>01</strong><span>Describe</span><p>Explica qué pasó y cuándo ocurrió.</p></div><div><strong>02</strong><span>Envía</span><p>Revisa la información y confirma el envío.</p></div><div><strong>03</strong><span>Actuamos</span><p>El equipo responsable revisa el caso.</p></div></div>
      </section>

      <div className="callout callout-warning home-note"><strong>Si hay peligro inmediato:</strong><span>aléjate de la situación, busca a un adulto de confianza y contacta a emergencias.</span></div>
    </div>
  )
}
