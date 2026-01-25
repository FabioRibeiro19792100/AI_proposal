import { Link } from 'react-router-dom'
import '../styles/Home.css'

function Home() {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-image">
          <div className="image-placeholder">
            <span className="placeholder-text">Imagem</span>
          </div>
        </div>
        <div className="hero-overlay">
          <div className="hero-content">
            <h1 className="hero-title">Proposta Globo</h1>
            <p className="hero-subtitle">
              Apresentações profissionais e impactantes
            </p>
            <Link to="/outcomes" className="cta-button">
              Ver Outcomes
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
