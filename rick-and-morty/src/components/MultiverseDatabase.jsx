import CharacterCard from './CharacterCard'

function MultiverseDatabase({
  characters = [],
  crew = [],
  onToggleCrew,
  onExileCharacter,
  loading = false,
}) {
  if (!Array.isArray(characters) || characters.length === 0) {
    return null
  }

  return (
    <section className="row g-4" aria-label="Base de datos multiversal">
      {characters.map((character, index) => {
        const isActiveMember = Array.isArray(crew)
          ? crew.some((member) => member?.id === character?.id)
          : false

        return (
          <div key={character?.id ?? `${character?.name ?? 'character'}-${index}`} className="col-12 col-sm-6 col-lg-4">
            <CharacterCard
              character={character}
              isActiveMember={isActiveMember}
              onToggleCrew={onToggleCrew}
              onExileCharacter={onExileCharacter}
              loading={loading}
            />
          </div>
        )
      })}
    </section>
  )
}

export default MultiverseDatabase
