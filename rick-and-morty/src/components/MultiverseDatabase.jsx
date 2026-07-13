import CharacterCard from './CharacterCard'

function MultiverseDatabase({ characters = [] }) {
    if (!Array.isArray(characters) || characters.length === 0) {
    return null
    }
    return (
    <section className="row g-4" aria-label="Base de datos multiversal">
        {characters.map((character, index) => (
        <div key={character?.id ?? `${character?.name ?? 'character'}-${index}`} className="col-12 col-md-4">
            <CharacterCard character={character} />
        </div>
        ))}
    </section>
    )
}

export default MultiverseDatabase
