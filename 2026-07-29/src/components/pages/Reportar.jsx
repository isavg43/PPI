import { useState } from 'react'
import { createReport } from '../../lib/reports'

const reportTypes = [
  {
    value: 'fisico',
    label: 'Bullying físico',
    description: 'Golpes, empujones, bloqueo de paso, daños a pertenencias o agresiones directas.',
    guidance: 'Describe qué sucedió, dónde ocurrió, quién participó y si hubo golpes, empujones o daños a objetos.',
    example: 'Un compañero me empujó en el pasillo y me quitó mi mochila en varias ocasiones mientras otros se reían y me bloqueaban el paso.',
  },
  {
    value: 'psicologico',
    label: 'Bullying psicológico',
    description: 'Aislamiento, insultos, burlas, humillaciones, intimidación o manipulación emocional.',
    guidance: 'Explica las burlas, exclusión, amenazas verbales o presión emocional que recibiste y con qué frecuencia.',
    example: 'Me aislaron del grupo y me dijeron que no pertenecía al curso; además me menospreciaban en clase y me hicieron sentir humillado.',
  },
  {
    value: 'robo',
    label: 'Robo / sustracción',
    description: 'Hurto, apropiación de objetos, celulares, dinero, documentos o pertenencias personales.',
    guidance: 'Menciona qué fue robado, cuándo, dónde y si hubo presión, amenaza o presencia de terceros.',
    example: 'Me robaron mi celular durante el receso y luego alguien hizo circular mensajes con fotos personales en el grupo.',
  },
  {
    value: 'discriminacion',
    label: 'Discriminación',
    description: 'Comentarios, exclusión o trato agresivo por origen, identidad, apariencia, discapacidad, género o religión.',
    guidance: 'Indica por qué fue una discriminación, qué comentario o trato ofensivo recibiste y quién lo realizó.',
    example: 'Me excluyeron por mi forma de hablar y mi aspecto físico; hicieron comentarios ofensivos y dejaron claro que no me aceptaban en el grupo.',
  },
  {
    value: 'amenazas',
    label: 'Amenazas',
    description: 'Amenazas verbales o escritas, intimidación, presión o riesgo para la seguridad personal.',
    guidance: 'Describe las amenazas concretas, el contexto, el medio utilizado y si se sintió riesgo para tu seguridad.',
    example: 'Me enviaron mensajes diciendo que me iban a hacer daño si no hacía lo que pedían, lo que me provocó miedo y presión.',
  },
  {
    value: 'redes',
    label: 'Acoso por redes / ciberacoso',
    description: 'Mensajes ofensivos, publicaciones, difusión de contenido, chantaje o acoso digital.',
    guidance: 'Incluye plataformas, capturas, mensajes o publicaciones, y explica cómo te afectó emocionalmente o socialmente.',
    example: 'Publicaron comentarios ofensivos sobre mí en Instagram y me enviaron mensajes insultantes desde cuentas anónimas.',
  },
  {
    value: 'verbal',
    label: 'Bullying verbal',
    description: 'Insultos, burlas, comentarios degradantes o humillaciones repetidas.',
    guidance: 'Describe los insultos, la repetición de comentarios o la forma en que te humillaron delante de otros.',
    example: 'Durante clase y en los grupos, me llamaban por apodos ofensivos y repetían burlas sobre mi rendimiento y apariencia.',
  },
  {
    value: 'otro',
    label: 'Otra situación',
    description: 'Cualquier otro caso de violencia, acoso o riesgo que no encaje en las categorías anteriores.',
    guidance: 'Explica la situación de forma clara, menciona hechos concretos y por qué consideras que exige intervención.',
    example: 'Me presionaron para participar en actividades que me incomodan y me aislaron del resto de los estudiantes para provocar miedo.',
  },
]

export function Reportar() {
  const [type, setType] = useState('psicologico')
  const [description, setDescription] = useState('')
  const [evidenceUrl, setEvidenceUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [confirmBeforeSubmit] = useState(
    () => localStorage.getItem('confirmBeforeSubmit') !== 'false'
  )

  const selectedType = reportTypes.find((item) => item.value === type) ?? reportTypes[0]

  const handleSubmit = async (event) => {
    event.preventDefault()
    setMessage('')
    setError('')

    if (!description.trim()) {
      setError('La justificación es obligatoria para completar la denuncia.')
      return
    }

    if (confirmBeforeSubmit && !window.confirm('¿Deseas enviar esta denuncia?')) {
      return
    }

    setLoading(true)
    createReport({
      type,
      description: description.trim(),
      evidence_url: evidenceUrl.trim() || null,
      status: 'pendiente',
      assigned_to: null,
    })
    setLoading(false)

    if (localStorage.getItem('showNotifications') !== 'false') {
      setMessage('Denuncia enviada correctamente. Gracias por reportar.')
    }
    setDescription('')
    setEvidenceUrl('')
    setType('psicologico')
  }

  return (
    <div>
      <h2>Reporte de situación</h2>
      <p>Selecciona la categoría que mejor describa lo ocurrido y agrega una justificación clara. La denuncia es anónima.</p>

      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-4">
          <label className="form-label fw-semibold">Categoría del problema</label>
          <div className="row g-2 align-items-stretch" style={{ margin: 0 }}>
            {reportTypes.map((item) => (
              <div className="col-md-6 col-xl-4 px-1" key={item.value}>
                <button
                  type="button"
                  className="w-100 text-start rounded-4 border"
                  onClick={() => setType(item.value)}
                  style={{
                    transition: 'all 0.2s ease',
                    minHeight: '86px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    borderColor: type === item.value ? '#8b5cf6' : '#d7cfe7',
                    backgroundColor: type === item.value ? '#f3ecff' : '#f3f0f8',
                    boxShadow: type === item.value ? '0 0 0 1px rgba(139, 92, 246, 0.15)' : 'inset 0 0 0 1px rgba(255,255,255,0.2)',
                    padding: '0.7rem 0.9rem',
                    width: '100%',
                    margin: 0,
                    overflow: 'hidden',
                  }}
                >
                  <div
                    className="fw-semibold text-dark mb-1"
                    style={{
                      fontSize: '0.94rem',
                      lineHeight: 1.25,
                      whiteSpace: 'normal',
                      wordBreak: 'break-word',
                      overflowWrap: 'anywhere',
                    }}
                  >
                    {item.label}
                  </div>
                  <small
                    className="text-body-secondary d-block"
                    style={{
                      lineHeight: 1.3,
                      fontSize: '0.72rem',
                      whiteSpace: 'normal',
                      wordBreak: 'break-word',
                      overflowWrap: 'anywhere',
                    }}
                  >
                    {item.description}
                  </small>
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="alert alert-light border mb-3">
          <strong>Categoría seleccionada:</strong> {selectedType.label}
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">Justificación del caso</label>
          <div className="alert alert-light border mb-2 py-2">
            <small><strong>Guía:</strong> {selectedType.guidance}</small>
          </div>
          <textarea
            className="form-control"
            rows="5"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            required
            placeholder={selectedType.example}
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">Evidencia opcional</label>
          <input
            type="url"
            className="form-control"
            value={evidenceUrl}
            onChange={(event) => setEvidenceUrl(event.target.value)}
            placeholder="https://captura-o-enlace.com"
          />
          <div className="form-text">Puedes agregar una captura, mensaje, enlace o evidencia documental si la tienes.</div>
        </div>

        {error ? <div className="alert alert-danger py-2">{error}</div> : null}
        {message ? <div className="alert alert-success py-2">{message}</div> : null}

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Enviando...' : 'Enviar denuncia'}
        </button>
      </form>
    </div>
  )
}
