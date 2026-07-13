function BlenderDimensionPrison({ exiledCharacters = [], onReleaseCharacter }) {
  if (!Array.isArray(exiledCharacters) || exiledCharacters.length === 0) {
    return null
  }

  return (
    <section className="mt-4">
      <div className="accordion" id="blenderDimensionPrisonAccordion">
        <div className="accordion-item border-0">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed rounded-3 bg-dark text-light border border-secondary-subtle"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#blenderDimensionPrisonCollapse"
              aria-expanded="false"
              aria-controls="blenderDimensionPrisonCollapse"
            >
              Dimensión de la Licuadora
            </button>
          </h2>
          <div
            id="blenderDimensionPrisonCollapse"
            className="accordion-collapse collapse"
            data-bs-parent="#blenderDimensionPrisonAccordion"
          >
            <div className="accordion-body bg-transparent p-0 pt-3">
              <div className="list-group list-group-flush">
                {exiledCharacters.map((character) => {
                  const characterName = character?.name ?? 'Tripulante bloqueado'

                  return (
                    <div
                      key={character?.id ?? characterName}
                      className="list-group-item bg-transparent border-secondary-subtle px-0 py-3"
                    >
                      <div className="d-flex align-items-center justify-content-between gap-2">
                        <div className="d-flex align-items-center gap-3">
                          <img
                            src={character?.image ?? ''}
                            alt={characterName}
                            className="rounded-circle border border-secondary-subtle"
                            style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                          />
                          <span className="text-light small fw-semibold">{characterName}</span>
                        </div>
                        <button
                          type="button"
                          className="btn btn-sm btn-success"
                          onClick={() => onReleaseCharacter?.(character?.id)}
                        >
                          Restaurar Línea Temporal
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BlenderDimensionPrison
