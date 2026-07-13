import Footer from './components/Footer'
import PortalLoader from './components/PortalLoader'
import ErrorBanner from './components/ErrorBanner'
import MultiverseDatabase from './components/MultiverseDatabase'
import useFetchCharacters from './hooks/useFetchCharacters'
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
  const characters = Array.isArray(data) ? data : []

  return (
    <div className="app-shell min-vh-100 text-light">
      <main className="container py-4 pb-5">
        <div className="row g-4">
          <div className="col-12 col-xl-8">
            <section className="industrial-panel rounded-4 p-4 p-lg-5 h-100">
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
                    <div className="control-card h-100 px-3 py-4 rounded-3">
                      <p className="text-secondary small text-uppercase mb-2">{item.label}</p>
                      <p className="terminal-line mb-0 fs-5 fw-semibold text-light">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="row g-3">
                <div className="col-12 col-lg-6">
                  <div className="control-card h-100 rounded-3 p-4">
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
                  <div className="control-card h-100 rounded-3 p-4">
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

          <div className="col-12 col-xl-4">
            <aside className="industrial-panel rounded-4 p-4 h-100">
              <p className="text-uppercase text-secondary small fw-semibold mb-3">Jerarquía del recinto</p>
              <div className="list-group list-group-flush">
                <div className="list-group-item bg-transparent border-secondary-subtle px-0 py-3">
                  <span className="d-block text-light fw-semibold">Módulo central</span>
                  <span className="text-secondary small">Nivel 01 · Control operativo</span>
                </div>
                <div className="list-group-item bg-transparent border-secondary-subtle px-0 py-3">
                  <span className="d-block text-light fw-semibold">Protocolos de observación</span>
                  <span className="text-secondary small">Nivel 02 · Supervisión continua</span>
                </div>
                <div className="list-group-item bg-transparent border-secondary-subtle px-0 py-3">
                  <span className="d-block text-light fw-semibold">Mesa de resolución</span>
                  <span className="text-secondary small">Nivel 03 · Validación de decisiones</span>
                </div>
              </div>
            </aside>
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-12">
            {loading ? (
              <PortalLoader />
            ) : error ? (
              <ErrorBanner />
            ) : characters.length > 0 ? (
              <MultiverseDatabase characters={characters} />
            ) : (
              <div className="alert alert-secondary mb-0" role="status">
                El portal está en silencio. No hay personajes disponibles para desplegar.
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default App
