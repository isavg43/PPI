export function Menu({ items, selected, onSelect }) {
  return (
    <div className="btn-group mb-4" role="group" aria-label="Navegación principal">
      {items.map((item) => (
        <button
          key={item.key}
          type="button"
          className={`btn ${selected === item.key ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => onSelect(item.key)}
        >
          {item.label}
        </button>
      ))}
    </div>
  )
}
