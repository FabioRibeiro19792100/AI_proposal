import { Link } from 'react-router-dom'
import '../styles/Propostas.css'

const propostas = [
  {
    id: 7,
    titulo: 'Desafio PPA',
    descricao: 'Operacionalizar o Desafio PPA (Profissionais do Ano)',
    status: 'Em revisão'
  },
  {
    id: 8,
    titulo: 'Desafio IA',
    descricao: 'Desafio de Inteligência Artificial com Fase 0 de construção do mote',
    status: 'Em revisão'
  }
]

function Propostas() {
  return (
    <div className="propostas">
      <div className="propostas-container">
        <div className="propostas-header">
        </div>

        {propostas.length > 0 ? (
          <div className="propostas-grid">
            {propostas.map((proposta, index) => (
              <Link
                key={proposta.id}
                to={proposta.id === 7 ? `/propostas/${proposta.id}/modo` : proposta.id === 8 ? `/propostas/${proposta.id}/modo` : `/propostas/${proposta.id}`}
                className="proposta-card"
              >
                <span className="proposta-number">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="proposta-titulo">{proposta.titulo}</h3>
                <p className="proposta-descricao">{proposta.descricao}</p>
              </Link>
            ))}
          </div>
        ) : (
          <div className="propostas-empty">
            <p>As propostas serão exibidas aqui quando estiverem prontas.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Propostas
