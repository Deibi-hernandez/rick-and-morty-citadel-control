function CharacterCard({
  character,
  isActiveMember = false,
  onToggleCrew,
  onExileCharacter,
  loading = false,
}) {
  const image = character?.image ?? ''
  const name = character?.name ?? 'Personaje sin nombre'
  const species = character?.species ?? 'Desconocida'
  const status = character?.status ?? 'Unknown'
  const fallbackImage = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#0b0c10" />
          <stop offset="100%" stop-color="#39FF14" />
        </linearGradient>
      </defs>
      <rect width="300" height="300" fill="#0b0c10" />
      <circle cx="150" cy="150" r="90" fill="none" stroke="url(#g)" stroke-width="12" opacity="0.85" />
      <path d="M150 90c-22 0-40 18-40 40s18 40 40 40 40-18 40-40-18-40-40-40Z" fill="url(#g)" opacity="0.55" />
      <path d="M108 208h84" stroke="#39FF14" stroke-width="10" stroke-linecap="round" opacity="0.75" />
    </svg>
  `)}`

  return (
    <article className="card card-mainframe-active portal-glow h-100 border-0 shadow-sm overflow-hidden">
      <img
        src={image}
        className="card-img-top"
        alt={name}
        onError={(event) => {
          event.currentTarget.src = fallbackImage
        }}
      />
      <div className="card-body d-flex flex-column gap-3">
        <div>
          <h3 className="card-title h5 mb-2 text-light">{name}</h3>
          <p className="card-text text-secondary mb-1">Especie: {species}</p>
          <p className="card-text text-secondary mb-0">Estado: {status}</p>
        </div>

        <div className="d-flex flex-column flex-sm-row gap-2 mt-auto">
          <button
            type="button"
            className={`btn btn-sm flex-fill ${isActiveMember ? 'btn-success' : 'btn-outline-success'}`}
            onClick={() => onToggleCrew?.(character)}
            aria-pressed={isActiveMember}
            disabled={loading}
          >
            {isActiveMember ? 'Miembro de la Crew' : 'Reclutar Crew'}
          </button>
          <button
            type="button"
            className="btn btn-outline-danger btn-sm flex-fill"
            onClick={() => onExileCharacter?.(character?.id)}
            disabled={loading}
          >
            Desterrar a la Licuadora
          </button>
        </div>
      </div>
    </article>
  )
}

export default CharacterCard
