function Footer() {
  return (
    <footer className="footer-bar fixed-bottom py-3">
      <div className="container">
        <div className="d-flex flex-column flex-md-row align-items-center justify-content-center gap-2 text-center">
          <span className="footer-signal" aria-hidden="true">
            <span className="footer-signal-dot"></span>
            Línea principal
          </span>
          <p className="mb-0 footer-copy small fw-semibold">
            Científicos de la Ciudadela: Deibi Hernández.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
