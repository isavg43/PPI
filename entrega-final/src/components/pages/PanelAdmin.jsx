import { useEffect, useState } from 'react'
import { getReports, updateReport } from '../../lib/reports'

const statusOptions = [
  { value: 'pendiente', label: 'Pendiente' },
  { value: 'en_revision', label: 'En revisión' },
  { value: 'resuelta', label: 'Resuelta' },
]

export function PanelAdmin({ isAdmin }) {
  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [savingId, setSavingId] = useState(null)

  useEffect(() => {
    if (!isAdmin) {
      setLoading(false)
      return
    }

    fetchReports()
  }, [isAdmin])

  const fetchReports = async () => {
    setLoading(true)
    setError('')

    const data = getReports()
    setLoading(false)
    setReports(data)
  }

  const handleUpdateReport = async (id, field, value) => {
    if (field === 'assigned_to' && !value.trim()) {
      setError('Debes indicar un docente antes de guardar la asignación.')
      return
    }

    if (field === 'status' && !statusOptions.some((option) => option.value === value)) {
      setError('El estado seleccionado no es válido.')
      return
    }

    setSavingId(id)
    updateReport(id, { [field]: field === 'assigned_to' ? value.trim() : value })
    setSavingId(null)
    fetchReports()
  }

  if (!isAdmin) {
    return (
      <div className="alert alert-danger">
        No tienes permiso para acceder a esta sección. Solo los administradores pueden ver el panel.
      </div>
    )
  }

  return (
    <div>
      <h2>Panel de administración</h2>
      <p>Gestiona las denuncias recibidas desde esta pantalla.</p>

      {error ? <div className="alert alert-danger">{error}</div> : null}

      {loading ? (
        <div className="alert alert-info">Cargando denuncias...</div>
      ) : reports.length === 0 ? (
        <div className="alert alert-warning">No hay denuncias registradas aún.</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered align-middle">
            <thead>
              <tr>
                <th>Tipo</th>
                <th>Descripción</th>
                <th>Evidencia</th>
                <th>Estado</th>
                <th>Asignado a</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report) => (
                <tr key={report.id}>
                  <td>{report.type}</td>
                  <td>{report.description}</td>
                  <td>
                    {report.evidence_url ? (
                      <a href={report.evidence_url} target="_blank" rel="noreferrer">Ver</a>
                    ) : (
                      'No disponible'
                    )}
                  </td>
                  <td>
                    <select
                      className="form-select"
                      value={report.status}
                      onChange={(event) => handleUpdateReport(report.id, 'status', event.target.value)}
                      disabled={savingId === report.id}
                    >
                      {statusOptions.map((option) => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      value={report.assigned_to || ''}
                      onBlur={(event) => handleUpdateReport(report.id, 'assigned_to', event.target.value)}
                      disabled={savingId === report.id}
                      placeholder="Docente asignado"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
