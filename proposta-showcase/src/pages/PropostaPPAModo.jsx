import { Link } from 'react-router-dom'
import '../styles/PropostaPPAModo.css'

function PropostaPPAModo() {
  return (
    <div className="proposta-ppa-modo">
      <div className="modo-container">
        <div className="modo-header">
          <h1>Desafio PPA</h1>
        </div>

        <div className="modo-options">
          <Link to="/propostas/7" className="modo-cta">
            Versão detalhada
          </Link>
          <Link to="/propostas/7/resumo" className="modo-cta">
            Versão resumida
          </Link>
        </div>
      </div>
    </div>
  )
}

export default PropostaPPAModo
