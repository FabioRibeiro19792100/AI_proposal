import { Link } from 'react-router-dom'
import '../styles/Header.css'

function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <h1>Proposta Globo</h1>
        </Link>
        <nav className="nav">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/propostas" className="nav-link">Outcomes</Link>
          <Link to="/biblioteca" className="nav-link">Biblioteca</Link>
          <Link to="/sobre" className="nav-link">Sobre</Link>
        </nav>
      </div>
    </header>
  )
}

export default Header
