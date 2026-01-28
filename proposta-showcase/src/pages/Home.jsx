import { useState } from 'react'
import { Link } from 'react-router-dom'
import '../styles/Home.css'

const INTRO_TEXT_FIRST = 'Criamos este espaço para compartilhar ideias e propostas no contexto do planejamento das duas novas iniciativas propostas pela Globo:'
const INTRO_TEXT_SECOND = 'o Desafio PPA e o Desafio de IA voltado a conteúdo.'

function Home() {
  const [showIntro, setShowIntro] = useState(true)

  const start = () => setShowIntro(false)

  return (
    <div className="home">
      {showIntro ? (
        <div className="home-intro">
          <p className="home-intro-text">{INTRO_TEXT_FIRST}<br />{INTRO_TEXT_SECOND}</p>
          <p className="home-intro-credits">Produzido por Mastertech, versionado em 28 de janeiro de 2026.</p>
          <button type="button" className="home-intro-skip" onClick={start}>
            Começar
          </button>
        </div>
      ) : (
        <nav className="home-nav">
          <Link to="/" className="home-nav-link">Home</Link>
          <Link to="/propostas" className="home-nav-link">Propostas</Link>
          <Link to="/briefings" className="home-nav-link">Briefings & Refs</Link>
        </nav>
      )}
    </div>
  )
}

export default Home
