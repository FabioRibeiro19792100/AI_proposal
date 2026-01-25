import { useParams, Link } from 'react-router-dom'
import { useMemo } from 'react'
import { propostaPPAContent, propostaIAContent } from '../data/documentos'
import '../styles/PropostaDetalhe.css'

// Dados das propostas
const propostasData = {
  7: {
    id: 7,
    titulo: 'Proposta 1 - Desafio PPA',
    descricao: 'Proposta para operacionalizar o Desafio PPA (Profissionais do Ano)',
    categoria: 'Academia LED',
    conteudo: propostaPPAContent
  },
  8: {
    id: 8,
    titulo: 'Proposta 2 - Desafio IA',
    descricao: 'Proposta para Desafio de Inteligência Artificial com Fase 0 de construção do mote',
    categoria: 'Tecnologia',
    conteudo: propostaIAContent
  }
}

// Funções de renderização de markdown (reutilizadas de DocumentoDetalhe)
function isTableLine(line) {
  return line.trim().startsWith('|') && line.trim().endsWith('|')
}

function isTableSeparator(line) {
  return /^\|[\s\-\|:]+\|$/.test(line.trim())
}

function parseTableRow(line) {
  const cells = line.split('|')
  // Remove primeira e última se vazias (bordas da tabela markdown)
  const trimmed = cells.slice(1, -1)
  return trimmed.map(cell => cell.trim())
}

function formatInlineMarkdown(text) {
  const parts = []
  let currentIndex = 0
  let key = 0

  const boldRegex = /\*\*(.*?)\*\*/g
  let match
  const boldMatches = []
  while ((match = boldRegex.exec(text)) !== null) {
    boldMatches.push({
      start: match.index,
      end: match.index + match[0].length,
      content: match[1]
    })
  }

  if (boldMatches.length === 0) {
    return text
  }

  boldMatches.forEach((boldMatch, i) => {
    if (boldMatch.start > currentIndex) {
      parts.push(text.substring(currentIndex, boldMatch.start))
    }
    parts.push(<strong key={key++}>{boldMatch.content}</strong>)
    currentIndex = boldMatch.end

    if (i === boldMatches.length - 1 && boldMatch.end < text.length) {
      parts.push(text.substring(boldMatch.end))
    }
  })

  return parts.length > 0 ? parts : text
}

function renderContent(content, keyPrefix) {
  const elements = []
  let currentList = []
  let inList = false
  let currentTable = []
  let inTable = false
  let tableHeaders = null
  let tableKey = 0

  content.forEach((line, index) => {
    const fullIndex = `${keyPrefix}-${index}`
    
    if (isTableLine(line) && !isTableSeparator(line)) {
      if (!inTable) {
        if (inList) {
          elements.push(<ul key={`list-${fullIndex}`}>{currentList}</ul>)
          currentList = []
          inList = false
        }
        inTable = true
        currentTable = []
        tableHeaders = null
      }
      const cells = parseTableRow(line)
      currentTable.push(cells)
      return
    }

    if (isTableSeparator(line)) {
      if (inTable && currentTable.length > 0) {
        tableHeaders = currentTable[0]
        currentTable = []
      }
      return
    }

    if (inTable && !isTableLine(line) && !isTableSeparator(line)) {
      // Finaliza tabela quando encontra linha não-tabela
      if (tableHeaders && currentTable.length > 0) {
        const isTimeline = tableHeaders.some(h => 
          h.toLowerCase().includes('data') || 
          h.toLowerCase().includes('mês') || 
          h.toLowerCase().includes('período') ||
          h.toLowerCase().includes('fase') ||
          h.toLowerCase().includes('duração') ||
          h.toLowerCase().includes('timeline')
        )
        const isInvestment = tableHeaders.some(h => 
          h.toLowerCase().includes('valor') || 
          h.toLowerCase().includes('investimento') ||
          h.toLowerCase().includes('preço') ||
          h.toLowerCase().includes('custo') ||
          h.toLowerCase().includes('total')
        )
        const colCount = tableHeaders.length
        
        elements.push(
          <table 
            key={`table-${tableKey++}`} 
            className={`proposta-table ${isTimeline ? 'timeline-table' : ''} ${isInvestment ? 'investment-table' : ''} ${colCount > 4 ? 'wide-table' : ''}`}
          >
            <thead>
              <tr>
                {tableHeaders.map((header, hIndex) => (
                  <th key={hIndex}>{formatInlineMarkdown(header)}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentTable.map((row, rIndex) => (
                <tr key={rIndex}>
                  {row.map((cell, cIndex) => (
                    <td key={cIndex}>{formatInlineMarkdown(cell)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )
      } else if (currentTable.length > 0) {
        const colCount = currentTable[0]?.length || 0
        elements.push(
          <table 
            key={`table-${tableKey++}`} 
            className={`proposta-table ${colCount > 4 ? 'wide-table' : ''}`}
          >
            <tbody>
              {currentTable.map((row, rIndex) => (
                <tr key={rIndex}>
                  {row.map((cell, cIndex) => (
                    <td key={cIndex}>{formatInlineMarkdown(cell)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )
      }
      inTable = false
      currentTable = []
      tableHeaders = null
    }

    if (inTable) return

    // Headers
    if (line.startsWith('# ')) {
      if (inList) {
        elements.push(<ul key={`list-${fullIndex}`}>{currentList}</ul>)
        currentList = []
        inList = false
      }
      elements.push(<h1 key={fullIndex}>{line.substring(2)}</h1>)
    } else if (line.startsWith('## ') && !line.startsWith('### ')) {
      if (inList) {
        elements.push(<ul key={`list-${fullIndex}`}>{currentList}</ul>)
        currentList = []
        inList = false
      }
      elements.push(<h2 key={fullIndex}>{line.substring(3)}</h2>)
    } else if (line.startsWith('### ') && !line.startsWith('#### ')) {
      if (inList) {
        elements.push(<ul key={`list-${fullIndex}`}>{currentList}</ul>)
        currentList = []
        inList = false
      }
      elements.push(<h3 key={fullIndex}>{line.substring(4)}</h3>)
    } else if (line.startsWith('#### ')) {
      if (inList) {
        elements.push(<ul key={`list-${fullIndex}`}>{currentList}</ul>)
        currentList = []
        inList = false
      }
      elements.push(<h4 key={fullIndex}>{line.substring(5)}</h4>)
    } else if (line.trim() === '---') {
      if (inList) {
        elements.push(<ul key={`list-${fullIndex}`}>{currentList}</ul>)
        currentList = []
        inList = false
      }
      elements.push(<hr key={fullIndex} />)
    } else if (line.trim().startsWith('- ')) {
      inList = true
      const listItem = line.substring(2).trim()
      currentList.push(<li key={fullIndex}>{formatInlineMarkdown(listItem)}</li>)
    } else if (line.trim() !== '') {
      if (inList) {
        elements.push(<ul key={`list-${fullIndex}`}>{currentList}</ul>)
        currentList = []
        inList = false
      }
      elements.push(<p key={fullIndex}>{formatInlineMarkdown(line)}</p>)
    }
  })

  // Finaliza tabela se ainda estiver aberta no final
  if (inTable) {
    if (tableHeaders && currentTable.length > 0) {
      const isTimeline = tableHeaders.some(h => 
        h.toLowerCase().includes('data') || 
        h.toLowerCase().includes('mês') || 
        h.toLowerCase().includes('período') ||
        h.toLowerCase().includes('fase') ||
        h.toLowerCase().includes('duração') ||
        h.toLowerCase().includes('timeline')
      )
      const isInvestment = tableHeaders.some(h => 
        h.toLowerCase().includes('valor') || 
        h.toLowerCase().includes('investimento') ||
        h.toLowerCase().includes('preço') ||
        h.toLowerCase().includes('custo') ||
        h.toLowerCase().includes('total')
      )
      const colCount = tableHeaders.length
      
      elements.push(
        <table 
          key={`table-${tableKey++}`} 
          className={`proposta-table ${isTimeline ? 'timeline-table' : ''} ${isInvestment ? 'investment-table' : ''} ${colCount > 4 ? 'wide-table' : ''}`}
        >
          <thead>
            <tr>
              {tableHeaders.map((header, hIndex) => (
                <th key={hIndex}>{formatInlineMarkdown(header)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentTable.map((row, rIndex) => (
              <tr key={rIndex}>
                {row.map((cell, cIndex) => (
                  <td key={cIndex}>{formatInlineMarkdown(cell)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )
    } else if (currentTable.length > 0) {
      const colCount = currentTable[0]?.length || 0
      elements.push(
        <table 
          key={`table-${tableKey++}`} 
          className={`proposta-table ${colCount > 4 ? 'wide-table' : ''}`}
        >
          <tbody>
            {currentTable.map((row, rIndex) => (
              <tr key={rIndex}>
                {row.map((cell, cIndex) => (
                  <td key={cIndex}>{formatInlineMarkdown(cell)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )
    }
  }

  if (inList) {
    elements.push(<ul key="list-final">{currentList}</ul>)
  }

  return elements
}

function PropostaDetalhe() {
  const { id } = useParams()
  const proposta = propostasData[id]

  if (!proposta) {
    return (
      <div className="proposta-detalhe">
        <div className="error-message">
          <h2>Proposta não encontrada</h2>
          <Link to="/outcomes" className="back-link">
            ← Voltar para Outcomes
          </Link>
        </div>
      </div>
    )
  }

  const content = useMemo(() => {
    return proposta.conteudo ? proposta.conteudo.split('\n') : []
  }, [proposta.conteudo])

  const renderedContent = useMemo(() => {
    if (!content.length) return null
    return renderContent(content, 'proposta')
  }, [content])

  return (
    <div className="proposta-detalhe">
      <Link to="/outcomes" className="back-link">
        ← Voltar para Outcomes
      </Link>

      <article className="proposta-article">
        <div className="proposta-meta">
          <span className="proposta-categoria">{proposta.categoria}</span>
        </div>
        <h1 className="proposta-titulo">{proposta.titulo}</h1>
        <p className="proposta-descricao">{proposta.descricao}</p>
        <div className="proposta-conteudo">
          {renderedContent}
        </div>
      </article>
    </div>
  )
}

export default PropostaDetalhe
