import { useLocation } from 'react-router-dom'
import '../styles/Footer.css'

function Footer() {
  const location = useLocation()
  
  // Não mostrar footer na home
  if (location.pathname === '/') {
    return null
  }
  
  return (
    <footer className="footer">
      <div className="footer-container">
        <p>&copy; 2025 Proposta Mastertech. Todos os direitos reservados.</p>
      </div>
    </footer>
  )
}

export default Footer
