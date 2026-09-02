const reportsStorageKey = 'bullyingReports'

export function getReports() {
  try {
    const storedReports = localStorage.getItem(reportsStorageKey)
    return storedReports ? JSON.parse(storedReports) : []
  } catch {
    return []
  }
}

export function createReport(report) {
  const newReport = {
    ...report,
    id: crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`,
    created_at: new Date().toISOString(),
  }
  const reports = [newReport, ...getReports()]
  localStorage.setItem(reportsStorageKey, JSON.stringify(reports))
  return newReport
}

export function updateReport(id, changes) {
  const reports = getReports().map((report) => (
    report.id === id ? { ...report, ...changes } : report
  ))
  localStorage.setItem(reportsStorageKey, JSON.stringify(reports))
}

export function clearReports() {
  localStorage.removeItem(reportsStorageKey)
}
