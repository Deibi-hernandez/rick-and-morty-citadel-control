function SpaceCrewSidebar({ crew = [], onRemove }) {
  return (
    <aside className="industrial-panel rounded-4 p-3 h-100">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h2 className="h5 text-light mb-0">Space Crew</h2>
        <span className="badge text-bg-success rounded-pill">{crew.length}</span>
      </div>

      {crew.length === 0 ? (
        <div className="alert alert-secondary small mb-0" role="status">
          Aún no hay tripulantes asignados.
        </div>
      ) : (
        <div className="list-group list-group-flush">
          {crew.map((member) => {
            const memberName = member?.name ?? 'Tripulante sin nombre'

            return (
              <div
                key={member?.id ?? memberName}
                className="list-group-item bg-transparent border-secondary-subtle px-0 py-2"
              >
                <div className="d-flex align-items-center gap-2">
                  <img
                    src={member?.image ?? ''}
                    alt={memberName}
                    className="rounded-circle border border-secondary-subtle"
                    style={{ width: '44px', height: '44px', objectFit: 'cover' }}
                  />
                  <span className="text-light small fw-semibold flex-grow-1">{memberName}</span>
                  <button
                    type="button"
                    className="btn btn-outline-danger btn-sm rounded-circle d-flex align-items-center justify-content-center"
                    onClick={() => onRemove(member)}
                    aria-label={`Expulsar ${memberName}`}
                  >
                    <i className="bi bi-person-x-fill" aria-hidden="true"></i>
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </aside>
  )
}

export default SpaceCrewSidebar
