import { Link } from 'react-router-dom'
import '../styles/Biblioteca.css'

function Biblioteca() {
  const documentos = [
    {
      id: 9,
      categoria: 'Premissas e Contexto',
      titulo: 'Briefing Inicial',
      arquivo: 'Briefing Inicial.md',
      tipo: 'Documento de briefing',
      descricao: 'Resumo executivo das ações e responsabilidades da Mastertech baseado em reunião'
    },
    {
      id: 10,
      categoria: 'Premissas e Contexto',
      titulo: 'Briefing PPA',
      arquivo: 'Briefing PPA.md',
      tipo: 'Documento de briefing',
      descricao: 'Edital Universitário para reconhecer estudantes de publicidade e propaganda - Academia LED PPA'
    },
    {
      id: 5,
      categoria: 'Referência de Formato',
      titulo: 'Proposta Mastertech LED 2026-2027',
      arquivo: '{exemplo de proposta}Proposta Mastertech – LED 2026–2027 (v2 -- 19092025)) (1).pdf',
      tipo: 'Proposta comercial',
      descricao: 'Referência de trabalho anterior Mastertech-Globo. Proposta completa LED 2026-2027 com Desafio, Pós-LED e Academia'
    },
    {
      id: 6,
      categoria: 'Referência de Formato',
      titulo: 'Regulamento Desafio LED 2026',
      arquivo: '{exemplo}Regulamento _ Desafio LED - Me dá uma luz aí! _ 2026 (1).pdf',
      tipo: 'Regulamento formal',
      descricao: 'Regulamento completo do Desafio LED com 5 etapas detalhadas'
    }
  ]

  const categorias = ['Premissas e Contexto', 'Referência de Formato']

  return (
    <div className="biblioteca">
      <div className="biblioteca-container">
        <div className="biblioteca-header">
        </div>

        <p className="biblioteca-disclaimer">
          Esses materiais serviram de base para a elaboração das propostas apresentadas. São referências para consulta.
        </p>

        {categorias.map((categoria) => {
          const docsCategoria = documentos.filter((doc) => doc.categoria === categoria)
          return (
            <section key={categoria} className="biblioteca-section">
              <h2 className="section-label">{categoria}</h2>
              <div className="cards-grid">
                {docsCategoria.map((doc, index) => {
                  // Numeração independente para cada categoria (começa do 01 em cada seção)
                  const numero = index + 1
                  return (
                    <Link
                      key={doc.id}
                      to={`/briefings/${doc.id}`}
                      className="documento-card"
                    >
                      <span className="card-number">
                        {String(numero).padStart(2, '0')}
                      </span>
                      <h3 className="card-titulo">{doc.titulo}</h3>
                      <p className="card-descricao">{doc.descricao}</p>
                    </Link>
                  )
                })}
              </div>
            </section>
          )
        })}
      </div>
    </div>
  )
}

export default Biblioteca
