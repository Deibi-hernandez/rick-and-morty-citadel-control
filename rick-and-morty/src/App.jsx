import { useMemo, useState } from 'react'
import Footer from './components/Footer'
import PortalLoader from './components/PortalLoader'
import ErrorBanner from './components/ErrorBanner'
import MultiverseDatabase from './components/MultiverseDatabase'
import PortalGunScanner from './components/PortalGunScanner'
import SpaceCrewSidebar from './components/SpaceCrewSidebar'
import BlenderDimensionPrison from './components/BlenderDimensionPrison'
import CitadelMainframeStats from './components/CitadelMainframeStats'
import useFetchCharacters from './hooks/useFetchCharacters'
import useLocalStorage from './hooks/useLocalStorage'
import './App.css'

const metrics = [
  { label: 'Conexión de código', value: '92% SYN' },
  { label: 'Gestión de variantes', value: '17 nodos' },
  { label: 'Integridad del portal', value: 'Afirmada' },
]

const directives = [
  {
    title: 'Segmentación de variantes',
    description: 'Se consolida el control del flujo principal y las rutas de escape.',
  },
  {
    title: 'Respuesta del núcleo',
    description: 'Los sensores del recinto muestran estabilidad técnica en tiempo real.',
  },
  {
    title: 'Barrera de seguridad',
    description: 'El acceso a los laboratorios queda restringido a perfiles autorizados.',
  },
]

function App() {
  const { data = [], loading, error } = useFetchCharacters()
  const [searchTerm, setSearchTerm] = useState('')
  const [crew, setCrew] = useLocalStorage('citadel-crew', [])
  const [exiled, setExiled] = useLocalStorage('citadel-exiled', [])

  const characters = useMemo(() => (Array.isArray(data) ? data : []), [data])

  // El estado de búsqueda se deriva en memoria con useMemo para crear un catálogo
  // filtrado sin disparar efectos secundarios o sincronizaciones reactivas complejas.
  // En vez de recalcular en cada render con useEffect, el valor memoizado sólo cambia
  // cuando cambian las entradas reales del catálogo, la lista negra o el término escrito.
  const filteredCharacters = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase()

    return characters.filter((character) => {
      const id = character?.id
      const isExiled = exiled.includes(id)

      if (isExiled) {
        return false
      }

      const matchesSearch = !normalizedSearch
        ? true
        : String(character?.name ?? '').toLowerCase().includes(normalizedSearch)

      return matchesSearch
    })
  }, [characters, exiled, searchTerm])

  const handleToggleCrew = (character) => {
    setCrew((previousCrew) => {
      const isAlreadyMember = previousCrew.some((member) => member?.id === character?.id)

      if (isAlreadyMember) {
        return previousCrew.filter((member) => member?.id !== character?.id)
      }

      return [...previousCrew, character]
    })
  }

  // La regla de negocio exige atomicidad en el estado cruzado: al expulsar un personaje
  // del catálogo se remueve automáticamente de la tripulación en el mismo ciclo de render.
  // Gracias a esa sincronización directa, el estado nuevo se persiste de forma consistente
  // a través del hook de localStorage sin dejar inconsistencias entre crew y exiled.
  const handleExileCharacter = (id) => {
    setExiled((previousExiled) => {
      if (previousExiled.includes(id)) {
        return previousExiled
      }

      return [...previousExiled, id]
    })

    setCrew((previousCrew) => previousCrew.filter((member) => member?.id !== id))
  }

  const handleReleaseCharacter = (id) => {
    setExiled((previousExiled) => previousExiled.filter((exiledId) => exiledId !== id))
  }

  const exiledCharacters = characters.filter((character) => exiled.includes(character?.id))

  return (
    <div className="app-shell min-vh-100 text-light">
      <main className="container py-4 pb-5">
        <CitadelMainframeStats
          totalCharacters={characters.length}
          crewCount={crew.length}
          exiledCount={exiled.length}
        />

        <div className="row g-4 align-items-start">
          <div className="col-12 col-xl-9">
            <section className="industrial-panel portal-glow rounded-4 p-4 p-lg-5 h-100">
              <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-3 mb-4">
                <div>
                  <p className="text-uppercase text-secondary mb-2 small fw-semibold tracking-wide">
                    Citadel Variant Control Mainframe
                  </p>
                  <h1 className="display-6 fw-semibold mb-0">Panel de vigilancia de la Ciudadela</h1>
                </div>
                <span className="status-pill rounded-pill px-3 py-2 small fw-semibold">
                  Marco de control: activo
                </span>
              </div>

              <div className="row g-3 mb-4">
                {metrics.map((item) => (
                  <div className="col-12 col-md-4" key={item.label}>
                    <div className="control-card card-mainframe-active h-100 px-3 py-4 rounded-3">
                      <p className="text-secondary small text-uppercase mb-2">{item.label}</p>
                      <p className="terminal-line mb-0 fs-5 fw-semibold text-light">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="row g-3">
                <div className="col-12 col-lg-6">
                  <div className="control-card card-mainframe-active h-100 rounded-3 p-4">
                    <h2 className="h5 text-light mb-3">Estado operativo</h2>
                    <p className="text-secondary mb-3">
                      La infraestructura del mainframe presenta un flujo estable y una vista
                      centralizada para supervisar la variante activa del primer nivel.
                    </p>
                    <div className="bg-black bg-opacity-25 rounded-3 p-3 border border-secondary-subtle">
                      <p className="terminal-line mb-1 text-info">&gt; Sistema sincronizado</p>
                      <p className="terminal-line mb-1 text-light">&gt; Rutas de contingencia listas</p>
                      <p className="terminal-line mb-0 text-light">&gt; Laboratorio central bajo observación</p>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-lg-6">
                  <div className="control-card card-mainframe-active h-100 rounded-3 p-4">
                    <h2 className="h5 text-light mb-3">Resumen táctico</h2>
                    <div className="d-grid gap-2">
                      {directives.map((item) => (
                        <div key={item.title} className="border border-secondary-subtle rounded-3 p-3">
                          <h3 className="h6 text-light mb-1">{item.title}</h3>
                          <p className="text-secondary small mb-0">{item.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <div className="col-12 col-md-3">
            <SpaceCrewSidebar crew={crew} onRemove={handleToggleCrew} loading={loading} />
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-12">
            <PortalGunScanner
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              disabled={loading}
            />

            {loading ? (
              <PortalLoader />
            ) : error ? (
              <ErrorBanner />
            ) : filteredCharacters.length > 0 ? (
              <MultiverseDatabase
                characters={filteredCharacters}
                crew={crew}
                onToggleCrew={handleToggleCrew}
                onExileCharacter={handleExileCharacter}
                loading={loading}
              />
            ) : (
              <div className="alert alert-dark text-center border-success mb-0" role="status">
                ⚠️ ESCÁNER VACÍO: No se encontraron variantes en este cuadrante interdimensional. Comprueba los filtros o revisa si las has desterrado a todas a la Licuadora
              </div>
            )}

            <BlenderDimensionPrison
              exiledCharacters={exiledCharacters}
              onReleaseCharacter={handleReleaseCharacter}
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default App
