import { Link, useLocation } from 'react-router-dom'
import '../styles/Header.css'

function Header() {
  const location = useLocation()
  
  if (location.pathname === '/') {
    return null
  }
  
  return (
    <header className="header" style={{ marginTop: 0, paddingTop: 0 }}>
      <div className="header-container">
        <nav className="nav">
          <Link to="/" className="header-nav-link">Home</Link>
          <Link to="/propostas" className="header-nav-link">Propostas</Link>
          <Link to="/briefings" className="header-nav-link">Briefings & Refs</Link>
        </nav>
      </div>
    </header>
  )
}

export default Header
