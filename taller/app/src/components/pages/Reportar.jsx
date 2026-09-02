import { useState } from 'react'
import { createReport } from '../../lib/reports'

const reportTypes = [
  { value: 'psicologico', label: 'Bullying psicológico' },
  { value: 'fisico', label: 'Bullying físico' },
  { value: 'verbal', label: 'Bullying verbal' },
  { value: 'ciberbullying', label: 'Ciberbullying' },
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

  const handleSubmit = async (event) => {
    event.preventDefault()
    setMessage('')
    setError('')

    if (!description.trim()) {
      setError('La descripción es obligatoria.')
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
      <h2>Reporte de bullying</h2>
      <p>Envía una denuncia anónima para que el equipo pueda gestionarla.</p>

      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-3">
          <label className="form-label">Tipo de bullying</label>
          <select className="form-select" value={type} onChange={(event) => setType(event.target.value)}>
            {reportTypes.map((item) => (
              <option key={item.value} value={item.value}>{item.label}</option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Descripción</label>
          <textarea
            className="form-control"
            rows="5"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Evidencia (URL opcional)</label>
          <input
            type="url"
            className="form-control"
            value={evidenceUrl}
            onChange={(event) => setEvidenceUrl(event.target.value)}
            placeholder="https://"
          />
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
