import './MenuAdvanced.css'

export function MenuAdvanced({
  session,
  isAdmin,
  selectedPage,
  onSelect,
  onLogout
}) {
  /**
   * Genera el menú dinámico basado en:
   * 1. Si está logueado o no
   * 2. Si es admin
   * 3. Estado de construcción de páginas
   */

  // Menú para usuarios NO logueados
  const guestMenuItems = [
    {
      key: 'inicio',
      label: '🏠 Inicio',
      inConstruction: false,
      description: 'Página principal'
    },
    {
      key: 'acerca',
      label: 'ℹ️ Acerca de',
      inConstruction: false,
      description: 'Información del sistema'
    },
    {
      key: 'ayuda',
      label: '❓ Ayuda',
      inConstruction: false,
      description: 'Preguntas frecuentes'
    },
  ]

  // Menú para usuarios logueados (no admin)
  const userMenuItems = [
    {
      key: 'inicio',
      label: '🏠 Inicio',
      inConstruction: false,
      description: 'Página principal'
    },
    {
      key: 'reportar',
      label: '📝 Reportar bullying',
      inConstruction: false,
      description: 'Enviar un reporte anónimo'
    },
    {
      key: 'mis-reportes',
      label: '📋 Mis reportes',
      inConstruction: false,
      description: 'Seguimiento de mis denuncias'
    },
    {
      key: 'guia-seguridad',
      label: '🛡️ Guía de seguridad',
      inConstruction: false,
      description: 'Consejos de protección'
    },
  ]

  // Menú para usuarios ADMIN
  const adminMenuItems = [
    {
      key: 'inicio',
      label: '🏠 Inicio',
      inConstruction: false,
      description: 'Página principal'
    },
    {
      key: 'reportar',
      label: '📝 Reportar bullying',
      inConstruction: false,
      description: 'Enviar un reporte'
    },
    {
      key: 'panel-admin',
      label: '⚙️ Panel de gestión',
      inConstruction: false,
      description: 'Gestionar reportes'
    },
    {
      key: 'mis-reportes',
      label: '📋 Mis reportes',
      inConstruction: false,
      description: 'Seguimiento de mis denuncias'
    },
    {
      key: 'estadisticas',
      label: '📊 Estadísticas',
      inConstruction: false,
      description: 'Análisis de reportes'
    },
    {
      key: 'configuracion',
      label: '⚙️ Configuración',
      inConstruction: false,
      description: 'Configurar el sistema'
    },
  ]

  // Seleccionar menú según estado de sesión
  const menuItems = !session
    ? guestMenuItems
    : isAdmin
      ? adminMenuItems
      : userMenuItems

  const handleMenuClick = (key) => {
    onSelect(key)
  }

  return (
    <nav className="menu-advanced mb-4">
      <div className="menu-header">
        <h4 className="menu-title">
          {session ? (
            <>
              {isAdmin ? '👑 Menú Admin' : '👤 Menú Usuario'}
            </>
          ) : (
            '🌐 Menú Visitante'
          )}
        </h4>
        {session && (
          <span className="user-badge">
            {isAdmin ? 'Administrador' : 'Usuario'}
          </span>
        )}
      </div>

      <div className="menu-items">
        {menuItems.map((item) => (
          <button
            key={item.key}
            type="button"
            className={`menu-item ${
              selectedPage === item.key ? 'active' : ''
            } ${item.inConstruction ? 'construction' : ''}`}
            onClick={() => handleMenuClick(item.key)}
            title={item.description}
          >
            <span className="item-label">{item.label}</span>
          </button>
        ))}
      </div>

      <div className="menu-footer">
        {session && (
          <div className="session-info">
            <small className="user-email">📧 {session.email}</small>
            <button
              type="button"
              className="btn-logout"
              onClick={onLogout}
            >
              🚪 Cerrar sesión
            </button>
          </div>
        )}
      </div>

      {/* Leyenda de funcionalidades */}
      <div className="menu-legend">
        <details>
          <summary>ℹ️ ¿Qué ver según tu rol?</summary>
          <ul>
            <li><strong>Visitante:</strong> Acceso limitado a información pública</li>
            <li><strong>Usuario logueado:</strong> Puede reportar bullying y ver sus denuncias</li>
            <li><strong>Administrador:</strong> Gestiona todos los reportes y estadísticas</li>
          </ul>
        </details>
      </div>
    </nav>
  )
}
