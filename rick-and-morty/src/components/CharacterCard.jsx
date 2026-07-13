function CharacterCard({ character, isActiveMember = false, onToggleCrew, onExileCharacter }) {
  const image = character?.image ?? ''
  const name = character?.name ?? 'Personaje sin nombre'
  const species = character?.species ?? 'Desconocida'
  const status = character?.status ?? 'Unknown'

  return (
    <article className="card h-100 border-0 shadow-sm overflow-hidden">
      <img src={image} className="card-img-top" alt={name} />
      <div className="card-body d-flex flex-column gap-3">
        <div>
          <h3 className="card-title h5 mb-2">{name}</h3>
          <p className="card-text text-secondary mb-1">Especie: {species}</p>
          <p className="card-text text-secondary mb-0">Estado: {status}</p>
        </div>

        <div className="d-flex flex-column flex-sm-row gap-2 mt-auto">
          <button
            type="button"
            className={`btn btn-sm flex-fill ${isActiveMember ? 'btn-success' : 'btn-outline-success'}`}
            onClick={() => onToggleCrew?.(character)}
            aria-pressed={isActiveMember}
          >
            {isActiveMember ? 'Miembro de la Crew' : 'Reclutar Crew'}
          </button>
          <button
            type="button"
            className="btn btn-outline-danger btn-sm flex-fill"
            onClick={() => onExileCharacter?.(character?.id)}
          >
            Desterrar a la Licuadora
          </button>
        </div>
      </div>
    </article>
  )
}

export default CharacterCard
