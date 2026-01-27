import { Link } from 'react-router-dom'
import '../styles/Home.css'

function Home() {
  return (
    <div className="home">
      <nav className="home-nav">
        <Link to="/" className="home-nav-link">Home</Link>
        <Link to="/propostas" className="home-nav-link">Propostas</Link>
        <Link to="/briefings" className="home-nav-link">Briefings & Refs</Link>
      </nav>
    </div>
  )
}

export default Home
