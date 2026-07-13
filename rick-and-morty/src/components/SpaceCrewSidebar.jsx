function SpaceCrewSidebar({ crew = [], onRemove, loading = false }) {
  const renderContent = () => (
    <>
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h2 className="h5 text-light mb-0">Space Crew</h2>
        <span className="badge text-bg-success rounded-pill">{crew.length}</span>
      </div>

      {crew.length === 0 ? (
        <div className="alert alert-secondary small mb-0" role="status">
          Aún no hay tripulantes asignados.
        </div>
      ) : (
        <div className="list-group list-group-flush space-crew-scroll">
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
                    disabled={loading}
                  >
                    <i className="bi bi-person-x-fill" aria-hidden="true"></i>
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </>
  )

  return (
    <>
      <div className="d-none d-md-block">
        <aside className="industrial-panel portal-glow rounded-4 p-3 h-100 space-crew-scroll">
          {renderContent()}
        </aside>
      </div>

      <div className="d-block d-md-none">
        <button
          className="btn btn-success rounded-pill px-3 py-2 shadow-lg portal-glow position-fixed bottom-0 end-0 m-3"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#spaceCrewOffcanvas"
          aria-controls="spaceCrewOffcanvas"
        >
          <i className="bi bi-backpack me-2" aria-hidden="true"></i>
          Space Crew
        </button>

        <div
          className="offcanvas offcanvas-end bg-dark text-light"
          tabIndex="-1"
          id="spaceCrewOffcanvas"
          aria-labelledby="spaceCrewOffcanvasLabel"
        >
          <div className="offcanvas-header border-bottom border-secondary-subtle">
            <h2 id="spaceCrewOffcanvasLabel" className="h5 text-light mb-0">
              Space Crew
            </h2>
            <button
              type="button"
              className="btn-close btn-close-white"
              data-bs-dismiss="offcanvas"
              aria-label="Cerrar tripulación"
            ></button>
          </div>
          <div className="offcanvas-body space-crew-scroll">{renderContent()}</div>
        </div>
      </div>
    </>
  )
}

export default SpaceCrewSidebar
