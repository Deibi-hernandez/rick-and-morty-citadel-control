function PortalGunScanner({ searchTerm, onSearchChange, disabled = false }) {
  return (
    <div className="input-group mb-4 shadow-sm portal-glow">
      <span className="input-group-text bg-dark text-success border-secondary-subtle">
        🔭
      </span>
      <input
        type="text"
        className="form-control bg-dark text-light border-secondary-subtle portal-scanner"
        placeholder="Escanear variante interdimensional..."
        value={searchTerm}
        onChange={(event) => onSearchChange(event.target.value)}
        disabled={disabled}
        aria-label="Escanear variante interdimensional"
      />
    </div>
  )
}

export default PortalGunScanner
