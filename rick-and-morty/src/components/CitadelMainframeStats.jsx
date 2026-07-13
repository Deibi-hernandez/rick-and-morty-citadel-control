function CitadelMainframeStats({ totalCharacters = 0, crewCount = 0, exiledCount = 0 }) {
  const cards = [
    {
      label: 'Variantes en el Radar',
      value: totalCharacters,
      accent: 'border-success',
    },
    {
      label: 'Crew Reclutada',
      value: crewCount,
      accent: 'border-primary',
    },
    {
      label: 'Desterrados en la Licuadora',
      value: exiledCount,
      accent: 'border-danger',
    },
  ]

  return (
    <section className="row g-3 mb-4">
      {cards.map((card) => (
        <div className="col-12 col-md-4" key={card.label}>
          <div className={`card h-100 border ${card.accent} bg-dark text-light shadow-sm`}>
            <div className="card-body text-center">
              <p className="text-uppercase text-secondary small mb-2">{card.label}</p>
              <h3 className="display-6 fs-4 fw-semibold mb-0">{card.value}</h3>
            </div>
          </div>
        </div>
      ))}
    </section>
  )
}

export default CitadelMainframeStats
