import CharacterCard from './CharacterCard'

function MultiverseDatabase({ characters = [] }) {
  return (
    <section className="row g-4">
      {characters.map((character, index) => (
        <div key={character?.id ?? `${character?.name ?? 'character'}-${index}`} className="col-12 col-md-4">
          <CharacterCard character={character} />
        </div>
      ))}
    </section>
  )
}

export default MultiverseDatabase
