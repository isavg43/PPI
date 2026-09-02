import { useEffect, useState } from 'react'
import { clearReports, getReports } from '../../lib/reports'

function PageHeader({ eyebrow, titulo, descripcion }) {
  return (
    <header className="section-header">
      <span className="section-eyebrow">{eyebrow}</span>
      <h2>{titulo}</h2>
      <p>{descripcion}</p>
    </header>
  )
}

function InfoSection({ titulo, children }) {
  return (
    <section className="info-section">
      <h3>{titulo}</h3>
      {children}
    </section>
  )
}

export function AcercaDe() {
  return (
    <div className="page-content">
      <PageHeader eyebrow="El propósito" titulo="Acerca del sistema" descripcion="Una herramienta confidencial para detectar, documentar y atender situaciones de bullying." />
      <div className="content-grid">
        <InfoSection titulo="¿Qué hacemos?">
          <p>Facilitamos que estudiantes, familias y personal educativo comuniquen una situación de acoso de forma clara y segura. Cada reporte llega al equipo responsable para su revisión.</p>
        </InfoSection>
        <InfoSection titulo="Nuestro compromiso">
          <p>Tratamos la información con respeto, evitamos exponer a las personas involucradas y promovemos respuestas oportunas centradas en el bienestar.</p>
        </InfoSection>
      </div>
      <div className="callout callout-accent">
        <strong>Tu voz importa.</strong>
        <span>Reportar ayuda a construir espacios de convivencia más seguros.</span>
      </div>
    </div>
  )
}

export function Ayuda() {
  const questions = [
    ['¿Cómo envío un reporte?', 'Inicia sesión, entra en Reportar bullying, elige el tipo de situación y describe lo ocurrido con la mayor claridad posible.'],
    ['¿El reporte es anónimo?', 'El formulario no solicita tu nombre. Evita incluir datos personales en la descripción si no son necesarios para entender el caso.'],
    ['¿Qué pasa después de reportar?', 'El equipo responsable revisa la información, actualiza el estado del caso y decide las acciones de acompañamiento correspondientes.'],
    ['¿Qué hago si estoy en peligro ahora?', 'Busca un adulto de confianza, aléjate del riesgo y contacta a los servicios de emergencia de tu localidad. El formulario no sustituye una atención urgente.'],
  ]

  return (
    <div className="page-content">
      <PageHeader eyebrow="Centro de ayuda" titulo="Preguntas frecuentes" descripcion="Respuestas rápidas para usar el sistema y pedir apoyo de forma responsable." />
      <div className="faq-list">
        {questions.map(([question, answer]) => (
          <details className="faq-item" key={question}>
            <summary>{question}</summary>
            <p>{answer}</p>
          </details>
        ))}
      </div>
    </div>
  )
}

export function MisReportes() {
  return (
    <div className="page-content">
      <PageHeader eyebrow="Seguimiento" titulo="Mis reportes" descripcion="Consulta cómo se gestiona una denuncia y qué puedes esperar del proceso." />
      <div className="status-timeline">
        <div className="timeline-step is-current"><span>1</span><div><strong>Recibido</strong><p>El equipo recibe la información y verifica que sea comprensible.</p></div></div>
        <div className="timeline-step"><span>2</span><div><strong>En revisión</strong><p>Se analiza la situación y se determinan las medidas de apoyo.</p></div></div>
        <div className="timeline-step"><span>3</span><div><strong>Resuelto</strong><p>El caso cuenta con una respuesta y acciones de seguimiento.</p></div></div>
      </div>
      <div className="callout callout-muted"><strong>Privacidad primero.</strong><span>Los reportes son anónimos; por eso no mostramos una bandeja personal con datos que puedan identificarte.</span></div>
    </div>
  )
}

export function GuiaSeguridad() {
  const steps = ['Aléjate de la situación si puedes hacerlo sin ponerte en riesgo.', 'Habla con una persona adulta de confianza y cuéntale lo ocurrido.', 'Guarda evidencias relevantes, como fechas, mensajes o capturas, sin difundirlas.', 'Usa el sistema para reportar los hechos con detalles concretos y sin insultos.', 'Si existe peligro inmediato, llama a emergencias o acude a un lugar seguro.']

  return (
    <div className="page-content">
      <PageHeader eyebrow="Acompañamiento" titulo="Guía de seguridad" descripcion="Pasos sencillos para protegerte y ayudar a que una situación sea atendida." />
      <ol className="safety-list">
        {steps.map((step) => <li key={step}><span>✓</span><p>{step}</p></li>)}
      </ol>
      <div className="callout callout-warning"><strong>No estás solo.</strong><span>Pedir ayuda no es exagerar: es una forma válida de cuidarte y cuidar a otras personas.</span></div>
    </div>
  )
}

export function Estadisticas() {
  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadReports = async () => {
      setReports(getReports())
      setLoading(false)
    }
    loadReports()
  }, [])

  const total = reports.length
  const resolved = reports.filter((report) => report.status === 'resuelta').length
  const inReview = reports.filter((report) => report.status === 'en_revision').length
  const pending = reports.filter((report) => report.status === 'pendiente').length

  return (
    <div className="page-content">
      <PageHeader eyebrow="Panel de datos" titulo="Estadísticas" descripcion="Resumen actualizado de los reportes recibidos por el sistema." />
      {loading ? <div className="alert alert-info">Cargando datos...</div> : (
        <div className="stats-grid">
          <div className="stat-card"><strong>{total}</strong><span>Reportes totales</span></div>
          <div className="stat-card stat-pending"><strong>{pending}</strong><span>Pendientes</span></div>
          <div className="stat-card stat-review"><strong>{inReview}</strong><span>En revisión</span></div>
          <div className="stat-card stat-resolved"><strong>{resolved}</strong><span>Resueltos</span></div>
        </div>
      )}
    </div>
  )
}

export function Configuracion() {
  const [density, setDensity] = useState(() => localStorage.getItem('density') || 'comfortable')
  const [confirmBeforeSubmit, setConfirmBeforeSubmit] = useState(
    () => localStorage.getItem('confirmBeforeSubmit') !== 'false'
  )
  const [showNotifications, setShowNotifications] = useState(
    () => localStorage.getItem('showNotifications') !== 'false'
  )
  const [reportCount, setReportCount] = useState(() => getReports().length)
  const [message, setMessage] = useState('')

  useEffect(() => {
    document.body.dataset.density = density
  }, [density])

  const saveSetting = (key, value) => {
    localStorage.setItem(key, String(value))
    setMessage('Preferencia guardada correctamente.')
  }

  const handleExport = () => {
    const data = JSON.stringify(getReports(), null, 2)
    const link = document.createElement('a')
    link.href = URL.createObjectURL(new Blob([data], { type: 'application/json' }))
    link.download = 'reportes-bullying.json'
    link.click()
    URL.revokeObjectURL(link.href)
    setMessage('Los reportes se descargaron correctamente.')
  }

  const handleClearReports = () => {
    if (!reportCount || !window.confirm('¿Seguro que deseas borrar todos los reportes guardados en este navegador?')) return
    clearReports()
    setReportCount(0)
    setMessage('Se eliminaron los reportes locales.')
  }

  return (
    <div className="page-content">
      <PageHeader eyebrow="Preferencias" titulo="Configuración" descripcion="Ajusta la experiencia de uso en este dispositivo." />
      <div className="settings-form">
        <label className="setting-row"><span><strong>Densidad de la interfaz</strong><small>Elige cuánto espacio quieres entre los elementos.</small></span><select value={density} onChange={(event) => { setDensity(event.target.value); saveSetting('density', event.target.value) }}><option value="comfortable">Cómoda</option><option value="compact">Compacta</option></select></label>
        <label className="setting-row"><span><strong>Confirmar antes de enviar</strong><small>Evita enviar una denuncia por accidente.</small></span><input type="checkbox" checked={confirmBeforeSubmit} onChange={(event) => { setConfirmBeforeSubmit(event.target.checked); saveSetting('confirmBeforeSubmit', event.target.checked) }} /></label>
        <label className="setting-row"><span><strong>Avisos del sistema</strong><small>Muestra mensajes de confirmación después de cada acción.</small></span><input type="checkbox" checked={showNotifications} onChange={(event) => { setShowNotifications(event.target.checked); saveSetting('showNotifications', event.target.checked) }} /></label>
        <section className="data-tools"><div><strong>Datos locales</strong><small>{reportCount} reporte(s) guardado(s) en este navegador.</small></div><div className="data-actions"><button type="button" className="btn btn-secondary" onClick={handleExport}>Descargar reportes</button><button type="button" className="btn btn-outline-danger" onClick={handleClearReports} disabled={!reportCount}>Borrar reportes</button></div></section>
        {message ? <div className="alert alert-success">{message}</div> : null}
      </div>
    </div>
  )
}
