function PortalGunScanner({ searchTerm, onSearchChange }) {
  return (
    <div className="input-group mb-4 shadow-sm">
      <span className="input-group-text bg-dark text-success border-secondary-subtle">
        🔭
      </span>
      <input
        type="text"
        className="form-control bg-dark text-light border-secondary-subtle"
        placeholder="Escanea por nombre de variante..."
        value={searchTerm}
        onChange={(event) => onSearchChange(event.target.value)}
      />
    </div>
  )
}

export default PortalGunScanner
