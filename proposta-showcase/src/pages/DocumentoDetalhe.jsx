import { useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import '../styles/DocumentoDetalhe.css'
import { 
  regulamentoLEDContent,
  propostaLEDContent,
  briefingContent,
  briefingPPAContent,
  propostaPPAContent,
  propostaIAContent
} from '../data/documentos'

// Dados dos documentos
const documentosData = {
  9: {
    titulo: 'Briefing Inicial',
    arquivo: 'Briefing Inicial.md',
    tipo: 'Documento de briefing',
    categoria: 'Premissas e Contexto',
    descricao: 'Resumo executivo das ações e responsabilidades da Mastertech baseado em reunião',
    conteudo: briefingContent
  },
  10: {
    titulo: 'Briefing PPA',
    arquivo: 'Briefing PPA.md',
    tipo: 'Documento de briefing',
    categoria: 'Premissas e Contexto',
    descricao: 'Edital Universitário para reconhecer estudantes de publicidade e propaganda - Academia LED PPA',
    conteudo: briefingPPAContent
  },
  5: {
    titulo: 'Proposta Mastertech LED 2026-2027',
    arquivo: '{exemplo de proposta}Proposta Mastertech – LED 2026–2027 (v2 -- 19092025)) (1).pdf',
    tipo: 'Proposta comercial',
    categoria: 'Referência de Formato',
    descricao: 'Referência de trabalho anterior Mastertech-Globo. Proposta comercial com formato de referência para PPA e IA',
    conteudo: propostaLEDContent
  },
  6: {
    titulo: 'Regulamento Desafio LED 2026',
    arquivo: '{exemplo}Regulamento _ Desafio LED - Me dá uma luz aí! _ 2026 (1).pdf',
    tipo: 'Regulamento formal',
    categoria: 'Referência de Formato',
    descricao: 'Regulamento completo do Desafio LED com 5 etapas detalhadas',
    conteudo: regulamentoLEDContent
  },
  7: {
    titulo: 'Proposta 1 - Desafio PPA',
    arquivo: 'Proposta_1_Desafio_PPA.md',
    tipo: 'Proposta comercial',
    categoria: 'Documentos Criados',
    descricao: 'Proposta para operacionalizar o Desafio PPA (Profissionais do Ano)',
    status: 'Em revisão',
    conteudo: propostaPPAContent
  },
  8: {
    titulo: 'Proposta 2 - Desafio IA',
    arquivo: 'Proposta_2_Desafio_IA.md',
    tipo: 'Proposta comercial',
    categoria: 'Documentos Criados',
    descricao: 'Construção colaborativa do conceito e desenho da proposta operacional para desafio de IA',
    status: 'Em revisão',
    conteudo: propostaIAContent
  }
}

// Função para detectar se uma linha é parte de uma tabela
function isTableLine(line) {
  return line.trim().startsWith('|') && line.trim().endsWith('|')
}

// Função para detectar se uma linha é o separador de tabela (|----|)
function isTableSeparator(line) {
  const trimmed = line.trim()
  if (!trimmed.startsWith('|') || !trimmed.endsWith('|')) return false
  const cells = trimmed.split('|').filter(c => c.trim())
  return cells.every(cell => /^:?-+:?$/.test(cell.trim()))
}

// Função para parsear uma linha de tabela
function parseTableRow(line) {
  const cells = line.split('|')
  // Remove primeira e última se vazias (bordas da tabela markdown)
  const trimmed = cells.slice(1, -1)
  return trimmed.map(cell => cell.trim())
}

// Função para renderizar conteúdo entre títulos
function renderContent(content, keyPrefix) {
  const elements = []
  let currentList = []
  let inList = false
  let currentTable = []
  let inTable = false
  let tableHeaders = null
  let tableKey = 0
  let inTemasSection = false
  let currentTemaCard = null
  let temasCards = []
  let inProximosPassos = false
  let proximosPassosItems = []
  let inTemposMovimentos = false
  let temposMovimentosItems = []
  let currentMes = null
  let currentSectionIndex = 0
  let inOddSection = false
  let oddSectionContent = []
  let oddSectionStartIndex = null

  // Função auxiliar para adicionar elemento na seção correta
  const addElement = (element) => {
    if (inOddSection) {
      oddSectionContent.push(element)
    } else {
      elements.push(element)
    }
  }

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

    if (inTable && !isTableLine(line) && !isTableSeparator(line) && line.trim() !== '') {
      if (tableHeaders && currentTable.length > 0) {
        // Detecta se é uma tabela de cronograma ou investimento
        const isTimeline = tableHeaders.some(h => 
          h.toLowerCase().includes('data') || 
          h.toLowerCase().includes('mês') || 
          h.toLowerCase().includes('período') ||
          h.toLowerCase().includes('fase')
        )
        const isInvestment = tableHeaders.some(h => 
          h.toLowerCase().includes('valor') || 
          h.toLowerCase().includes('investimento') ||
          h.toLowerCase().includes('preço')
        )
        const colCount = tableHeaders.length
        const isAtuacaoTable = colCount === 3 && (tableHeaders[0] || '').includes('Ponto') && (tableHeaders[1] || '').includes('Atividade')
        
        const tk = tableKey++
        const tableElement = (
          <table 
            key={`table-${tk}`} 
            className={`documento-table ${isTimeline ? 'timeline-table' : ''} ${isInvestment ? 'investment-table' : ''} ${colCount > 4 ? 'wide-table' : ''} ${isAtuacaoTable ? 'atuacao-table' : ''}`}
          >
            <thead>
              <tr>
                {tableHeaders.map((header, hIndex) => (
                  <th key={hIndex}>{formatInlineMarkdown(header)}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentTable.map((row, rIndex) => {
                const isMentoriaRow = (row[1] || '').includes('Mentoria Master Globo')
                return (
                  <tr key={rIndex}>
                    {row.map((cell, cIndex) => (
                      <td key={cIndex}>
                        {formatInlineMarkdown(cell)}
                        {cIndex === 2 && isMentoriaRow && (
                          <>
                            <br />
                            <span className="duvida-text-celula">Responsabilidade a confirmar (Mastertech ou Globo)</span>
                          </>
                        )}
                      </td>
                    ))}
                  </tr>
                )
              })}
            </tbody>
          </table>
        )
        addElement(<div key={`table-wrap-${tk}`} className="table-responsive">{tableElement}</div>)
      } else if (currentTable.length > 0) {
        const colCount = currentTable[0]?.length || 0
        const tk2 = tableKey++
        const tableElement = (
          <table 
            key={`table-${tk2}`} 
            className={`documento-table ${colCount > 4 ? 'wide-table' : ''}`}
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
        addElement(<div key={`table-wrap-${tk2}`} className="table-responsive">{tableElement}</div>)
      }
      inTable = false
      currentTable = []
      tableHeaders = null
    }

    if (inTable) return

    // Headers - renderiza todos os níveis mantendo estilos originais
    if (line.startsWith('# ')) {
      if (inList) {
        elements.push(<ul key={`list-${fullIndex}`}>{currentList}</ul>)
        currentList = []
        inList = false
      }
      elements.push(<h1 key={fullIndex}>{line.substring(2)}</h1>)
    } else if (line.startsWith('## ') && !line.startsWith('### ')) {
      if (inList) {
        if (inProximosPassos) {
          proximosPassosItems.push(...currentList)
          currentList = []
        } else {
          elements.push(<ul key={`list-${fullIndex}`}>{currentList}</ul>)
          currentList = []
        }
        inList = false
      }
      
      // Finaliza cards de temas se estiver na seção
      if (inTemasSection && temasCards.length > 0) {
        elements.push(
          <div key={`temas-cards-${index}`} className="temas-cards-grid">
            {temasCards.map((card, i) => (
              <div key={i} className="tema-card">
                <h3 className="tema-card-title">{card.title}</h3>
                <p className="tema-card-description">{card.description}</p>
              </div>
            ))}
          </div>
        )
        temasCards = []
        inTemasSection = false
      }
      
      // Finaliza próximos passos se estiver na seção
      if (inProximosPassos && proximosPassosItems.length > 0) {
        elements.push(
          <div key={`proximos-passos-${index}`} className="proximos-passos-timeline">
            {proximosPassosItems.map((itemText, i) => {
              // Procura por padrão **DATA** ou **DATA - DATA**
              const dateMatch = itemText.match(/\*\*([^*]+)\*\*/)
              const date = dateMatch ? dateMatch[1] : ''
              const task = dateMatch ? itemText.replace(/\*\*[^*]+\*\*/, '').trim() : itemText.trim()
              
              return (
                <div key={i} className="proximo-passo-item">
                  <div className="proximo-passo-task">{formatInlineMarkdown(task)}</div>
                  {date && <div className="proximo-passo-date">{date}</div>}
                </div>
              )
            })}
          </div>
        )
        proximosPassosItems = []
        inProximosPassos = false
      }
      
      // Finaliza tempos e movimentos se estiver na seção
      if (inTemposMovimentos && temposMovimentosItems.length > 0) {
        if (currentMes) {
          temposMovimentosItems.push({ mes: currentMes, atividades: [] })
        }
        elements.push(
          <div key={`tempos-movimentos-${index}`} className="tempos-movimentos-timeline">
            {temposMovimentosItems.map((item, i) => (
              <div key={i} className="tempo-movimento-item">
                <div className="tempo-movimento-mes">{item.mes}</div>
                <div className="tempo-movimento-atividades">
                  {item.atividades.length > 0 ? (
                    item.atividades.map((atividade, j) => (
                      <div key={j} className="tempo-movimento-atividade">
                        {formatInlineMarkdown(atividade)}
                      </div>
                    ))
                  ) : (
                    <div className="tempo-movimento-empty"></div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )
        temposMovimentosItems = []
        currentMes = null
        inTemposMovimentos = false
      }
      
      const h2Text = line.substring(3).trim()
      
      // Detecta seções H2 numeradas (1., 2., 3., etc.)
      const isNumberedSection = /^\d+\./.test(h2Text)
      
      if (isNumberedSection) {
        currentSectionIndex++
        const isOdd = currentSectionIndex % 2 === 1
        
        // Finaliza seção ímpar anterior se existir
        if (inOddSection && oddSectionContent.length > 0) {
          elements.push(
            <div key={`odd-section-${oddSectionStartIndex}`} className="odd-section-wrapper">
              {oddSectionContent}
            </div>
          )
          oddSectionContent = []
          inOddSection = false
        }
        
        // Inicia nova seção ímpar
        if (isOdd) {
          inOddSection = true
          oddSectionStartIndex = index
          oddSectionContent = []
        }
      }
      
      if (h2Text === 'Sugestões de Temas') {
        inTemasSection = true
      } else if (h2Text === 'Próximos Passos') {
        inProximosPassos = true
      } else if (h2Text === 'Tempos & Movimentos' || h2Text === 'Tempos e Movimentos') {
        inTemposMovimentos = true
      }
      
      if (inOddSection) {
        oddSectionContent.push(<h2 key={fullIndex}>{h2Text}</h2>)
      } else {
        elements.push(<h2 key={fullIndex}>{h2Text}</h2>)
      }
    } else if (line.startsWith('### ') && !line.startsWith('#### ')) {
      if (inList) {
        if (inProximosPassos) {
          proximosPassosItems.push(...currentList)
          currentList = []
        } else {
          elements.push(<ul key={`list-${fullIndex}`}>{currentList}</ul>)
          currentList = []
        }
        inList = false
      }
      
      // Se estamos na seção de temas, inicia um novo card
      if (inTemasSection) {
        if (currentTemaCard) {
          temasCards.push(currentTemaCard)
        }
        currentTemaCard = {
          title: line.substring(4).trim(),
          description: ''
        }
      } else {
        addElement(<h3 key={fullIndex}>{line.substring(4)}</h3>)
      }
    } else if (line.startsWith('#### ')) {
      if (inList) {
        const listElement = <ul key={`list-${fullIndex}`}>{currentList}</ul>
        addElement(listElement)
        currentList = []
        inList = false
      }
      addElement(<h4 key={fullIndex}>{line.substring(5)}</h4>)
    } else if (line.trim() === '---') {
      if (inList) {
        const listElement = <ul key={`list-${fullIndex}`}>{currentList}</ul>
        addElement(listElement)
        currentList = []
        inList = false
      }
      // Não renderiza hr - as faixas alternadas já separam as seções
    } else if (line.trim().startsWith('- ')) {
      if (!inList) inList = true
      const content = line.substring(2).trim()
      if (inProximosPassos) {
        // Para próximos passos, guarda a linha original para processar depois
        proximosPassosItems.push(content)
      } else {
        const listItem = <li key={fullIndex}>{formatInlineMarkdown(content)}</li>
        currentList.push(listItem)
      }
    } else if (line.trim() === '') {
      if (inList) {
        const listElement = <ul key={`list-${fullIndex}`}>{currentList}</ul>
        addElement(listElement)
        currentList = []
        inList = false
      }
    } else {
      // Se estamos em um card de tema, adiciona a descrição
      if (inTemasSection && currentTemaCard && line.trim() && !line.trim().startsWith('---')) {
        if (currentTemaCard.description) {
          currentTemaCard.description += ' ' + line.trim()
        } else {
          currentTemaCard.description = line.trim()
        }
      } else if (inTemposMovimentos && line.trim() && !line.trim().startsWith('---')) {
        // Detecta meses em negrito (formato **Mês**)
        const mesMatch = line.trim().match(/^\*\*([^*]+)\*\*$/)
        if (mesMatch) {
          // Salva mês anterior se existir
          if (currentMes) {
            const existingItem = temposMovimentosItems.find(item => item.mes === currentMes)
            if (!existingItem) {
              temposMovimentosItems.push({ mes: currentMes, atividades: [] })
            }
          }
          currentMes = mesMatch[1]
          // Cria novo item para o mês atual
          const existingItem = temposMovimentosItems.find(item => item.mes === currentMes)
          if (!existingItem) {
            temposMovimentosItems.push({ mes: currentMes, atividades: [] })
          }
        } else if (currentMes && line.trim()) {
          // Adiciona atividade ao mês atual
          const existingItem = temposMovimentosItems.find(item => item.mes === currentMes)
          if (existingItem) {
            existingItem.atividades.push(line.trim())
          } else {
            temposMovimentosItems.push({ mes: currentMes, atividades: [line.trim()] })
          }
        }
      } else if (inProximosPassos && line.trim() && !line.trim().startsWith('---')) {
        // Se estamos em próximos passos e há uma linha com data em negrito, adiciona ao último item
        if (proximosPassosItems.length > 0 && line.trim().match(/\*\*[^*]+\*\*/)) {
          const lastIndex = proximosPassosItems.length - 1
          proximosPassosItems[lastIndex] += ' ' + line.trim()
        } else if (inList) {
          // Se está em lista, finaliza e processa
          if (currentList.length > 0) {
            currentList.forEach(item => {
              const itemText = typeof item === 'object' && item.props ? 
                (Array.isArray(item.props.children) ? item.props.children.map(c => typeof c === 'string' ? c : '').join('') : '') : 
                item
              if (typeof itemText === 'string') {
                proximosPassosItems.push(itemText)
              }
            })
            currentList = []
          }
          inList = false
        }
      } else {
        if (inList) {
          if (inProximosPassos) {
            currentList.forEach(item => {
              const itemText = typeof item === 'object' && item.props ? 
                (Array.isArray(item.props.children) ? item.props.children.map(c => typeof c === 'string' ? c : '').join('') : '') : 
                item
              if (typeof itemText === 'string') {
                proximosPassosItems.push(itemText)
              }
            })
            currentList = []
          } else {
            const listElement = <ul key={`list-${fullIndex}`}>{currentList}</ul>
            addElement(listElement)
            currentList = []
          }
          inList = false
        }
        if (line.trim() && !inProximosPassos) {
          addElement(<p key={fullIndex}>{formatInlineMarkdown(line)}</p>)
        }
      }
    }
  })

  if (inTable) {
    if (tableHeaders && currentTable.length > 0) {
      const isTimeline = tableHeaders.some(h => 
        h.toLowerCase().includes('data') || 
        h.toLowerCase().includes('mês') || 
        h.toLowerCase().includes('período') ||
        h.toLowerCase().includes('fase')
      )
      const isInvestment = tableHeaders.some(h => 
        h.toLowerCase().includes('valor') || 
        h.toLowerCase().includes('investimento') ||
        h.toLowerCase().includes('preço')
      )
      const colCount = tableHeaders.length
      const isAtuacaoTable = colCount === 3 && (tableHeaders[0] || '').includes('Ponto') && (tableHeaders[1] || '').includes('Atividade')
      
      const tk3 = tableKey++
      const tableElement = (
        <table 
          key={`table-${tk3}`} 
          className={`documento-table ${isTimeline ? 'timeline-table' : ''} ${isInvestment ? 'investment-table' : ''} ${colCount > 4 ? 'wide-table' : ''} ${isAtuacaoTable ? 'atuacao-table' : ''}`}
        >
          <thead>
            <tr>
              {tableHeaders.map((header, hIndex) => (
                <th key={hIndex}>{formatInlineMarkdown(header)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentTable.map((row, rIndex) => {
              const isMentoriaRow = (row[1] || '').includes('Mentoria Master Globo')
              return (
                <tr key={rIndex}>
                  {row.map((cell, cIndex) => (
                    <td key={cIndex}>
                      {formatInlineMarkdown(cell)}
                      {cIndex === 2 && isMentoriaRow && (
                        <>
                          <br />
                          <span className="duvida-text-celula">Responsabilidade a confirmar (Mastertech ou Globo)</span>
                        </>
                      )}
                    </td>
                  ))}
                </tr>
              )
            })}
          </tbody>
        </table>
      )
      addElement(<div key={`table-wrap-${tk3}`} className="table-responsive">{tableElement}</div>)
      } else if (currentTable.length > 0) {
        const colCount = currentTable[0]?.length || 0
        const tk4 = tableKey++
        const tableElement = (
          <table 
            key={`table-${tk4}`} 
            className={`documento-table ${colCount > 4 ? 'wide-table' : ''}`}
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
        addElement(<div key={`table-wrap-${tk4}`} className="table-responsive">{tableElement}</div>)
      }
  }

  // Finaliza cards de temas se ainda estiver na seção
  // Finaliza seção ímpar se ainda estiver aberta
  if (inOddSection && oddSectionContent.length > 0) {
    elements.push(
      <div key={`odd-section-final`} className="odd-section-wrapper">
        {oddSectionContent}
      </div>
    )
  }

  if (inTemasSection && currentTemaCard) {
    temasCards.push(currentTemaCard)
  }
  if (inTemasSection && temasCards.length > 0) {
    elements.push(
      <div key="temas-cards-final" className="temas-cards-grid">
        {temasCards.map((card, i) => (
          <div key={i} className="tema-card">
            <h3 className="tema-card-title">{card.title}</h3>
            <p className="tema-card-description">{card.description}</p>
          </div>
        ))}
      </div>
    )
  }
  
  // Finaliza próximos passos se ainda estiver na seção
  if (inProximosPassos && proximosPassosItems.length > 0) {
    elements.push(
      <div key="proximos-passos-final" className="proximos-passos-timeline">
        {proximosPassosItems.map((itemText, i) => {
          // Procura por padrão **DATA** ou **DATA - DATA**
          const dateMatch = itemText.match(/\*\*([^*]+)\*\*/)
          const date = dateMatch ? dateMatch[1] : ''
          const task = dateMatch ? itemText.replace(/\*\*[^*]+\*\*/, '').trim() : itemText.trim()
          
          return (
            <div key={i} className="proximo-passo-item">
              <div className="proximo-passo-task">{formatInlineMarkdown(task)}</div>
              {date && <div className="proximo-passo-date">{date}</div>}
            </div>
          )
        })}
      </div>
    )
  }
  
  // Finaliza tempos e movimentos se ainda estiver na seção
  if (inTemposMovimentos && temposMovimentosItems.length > 0) {
    if (currentMes) {
      temposMovimentosItems.push({ mes: currentMes, atividades: [] })
    }
    elements.push(
      <div key="tempos-movimentos-final" className="tempos-movimentos-timeline">
        {temposMovimentosItems.map((item, i) => (
          <div key={i} className="tempo-movimento-item">
            <div className="tempo-movimento-mes">{item.mes}</div>
            <div className="tempo-movimento-atividades">
              {item.atividades.length > 0 ? (
                item.atividades.map((atividade, j) => (
                  <div key={j} className="tempo-movimento-atividade">
                    {formatInlineMarkdown(atividade)}
                  </div>
                ))
              ) : (
                <div className="tempo-movimento-empty">Sem atividades programadas</div>
              )}
            </div>
          </div>
        ))}
      </div>
    )
  } else if (inList && !inProximosPassos && !inTemposMovimentos) {
    elements.push(<ul key="list-final">{currentList}</ul>)
  }

  return elements
}

// Formata markdown inline (bold, italic, code)
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

function DocumentoDetalhe() {
  const { id } = useParams()
  const documento = documentosData[id]

  if (!documento) {
    return (
      <div className="documento-detalhe">
        <div className="error-message">
          <h2>Documento não encontrado</h2>
          <Link to="/briefings" className="back-link">
            ← Voltar para Briefings
          </Link>
        </div>
      </div>
    )
  }

  const renderedContent = useMemo(() => {
    if (!documento.conteudo) return null
    return renderContent(documento.conteudo.split('\n'), 'documento')
  }, [documento.conteudo])

  return (
    <div className="documento-detalhe">
      <Link to="/briefings" className="back-link">
        ← Voltar para Briefings
      </Link>

      <article className="documento-article">
        <div className="documento-conteudo">
          {documento.conteudo ? (
            <div className="documento-content-section">
              {renderedContent}
            </div>
          ) : (
            <p className="documento-nota">
              Este documento está em formato PDF e não pode ser visualizado diretamente no navegador.
              Acesse o arquivo diretamente no repositório para visualizar o conteúdo completo.
            </p>
          )}
        </div>
      </article>
    </div>
  )
}

export default DocumentoDetalhe
