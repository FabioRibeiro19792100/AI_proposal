import { Link } from 'react-router-dom'
import '../styles/Propostas.css'

const outcomes = [
  {
    id: 7,
    titulo: 'Proposta 1 - Desafio PPA',
    descricao: 'Proposta para operacionalizar o Desafio PPA (Profissionais do Ano)',
    status: 'Em revisão'
  },
  {
    id: 8,
    titulo: 'Proposta 2 - Desafio IA',
    descricao: 'Proposta para Desafio de Inteligência Artificial com Fase 0 de construção do mote',
    status: 'Em revisão'
  }
]

function Propostas() {
  return (
    <div className="propostas">
      <div className="propostas-container">
        <div className="propostas-header">
          <h1>Outcomes</h1>
        </div>

        {outcomes.length > 0 ? (
          <div className="propostas-grid">
            {outcomes.map((outcome, index) => (
              <Link
                key={outcome.id}
                to={`/outcomes/${outcome.id}`}
                className="proposta-card"
              >
                <span className="proposta-number">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="proposta-titulo">{outcome.titulo}</h3>
                <p className="proposta-descricao">{outcome.descricao}</p>
              </Link>
            ))}
          </div>
        ) : (
          <div className="propostas-empty">
            <p>Os outcomes serão exibidos aqui quando estiverem prontos.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Propostas
