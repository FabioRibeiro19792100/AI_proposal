import { Link, useNavigate } from 'react-router-dom'
import '../styles/PropostaPPAModo.css'

function PropostaIAModo() {
  const navigate = useNavigate()

  const handleSkipConcept = () => {
    navigate('/propostas/8?skipConcept=true', { replace: true })
    setTimeout(() => {
      const element = document.querySelector('#jornada')
      if (element) {
        const nav = document.querySelector('.ia-nav')
        const navHeight = nav ? nav.offsetHeight : 0
        const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - navHeight
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        })
      }
    }, 100)
  }

  return (
    <div className="proposta-ppa-modo">
      <div className="modo-container">
      <div className="modo-header">
          <h1>Desafio IA</h1>
        </div>

        <div className="modo-options">
          <Link 
            to="/propostas/8" 
            className="modo-cta"
            onClick={() => {
              // Garante que o conceito será mostrado
              if (typeof window !== 'undefined') {
                localStorage.removeItem('hasSeenConcept')
              }
            }}
          >
            Ver<br />Conceito
          </Link>
          <button onClick={handleSkipConcept} className="modo-cta" style={{ cursor: 'pointer' }}>
            Proposta operacional
          </button>
        </div>
      </div>
    </div>
  )
}

export default PropostaIAModo
