import { useState, useMemo } from 'react'
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
    titulo: 'Briefing Globo',
    arquivo: 'Briefing Globo.md',
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
    descricao: 'Proposta para Desafio de Inteligência Artificial com Fase 0 de construção do mote',
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
        
        elements.push(
          <table 
            key={`table-${tableKey++}`} 
            className={`documento-table ${isTimeline ? 'timeline-table' : ''} ${isInvestment ? 'investment-table' : ''} ${colCount > 4 ? 'wide-table' : ''}`}
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
      if (!inList) inList = true
      const content = line.substring(2).trim()
      currentList.push(<li key={fullIndex}>{formatInlineMarkdown(content)}</li>)
    } else if (line.trim() === '') {
      if (inList) {
        elements.push(<ul key={`list-${fullIndex}`}>{currentList}</ul>)
        currentList = []
        inList = false
      }
    } else {
      if (inList) {
        elements.push(<ul key={`list-${fullIndex}`}>{currentList}</ul>)
        currentList = []
        inList = false
      }
      if (line.trim()) {
        elements.push(<p key={fullIndex}>{formatInlineMarkdown(line)}</p>)
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
      
      elements.push(
        <table 
          key={`table-${tableKey++}`} 
          className={`documento-table ${isTimeline ? 'timeline-table' : ''} ${isInvestment ? 'investment-table' : ''} ${colCount > 4 ? 'wide-table' : ''}`}
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
    }
  }

  if (inList) {
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

// Componente para seção do acordeon (permite usar hooks)
function AccordionSection({ section, isOpen, onToggle }) {
  const renderedContent = useMemo(() => {
    if (!isOpen) return null
    return renderContent(section.content, `section-${section.key}`)
  }, [isOpen, section.content, section.key])

  const HeadingTag = section.level === 2 ? 'h2' : section.level === 3 ? 'h3' : 'h4'

  return (
    <div className="accordion-section">
      <button
        className={`accordion-header ${isOpen ? 'open' : ''}`}
        onClick={onToggle}
      >
        <HeadingTag className="accordion-title">{section.title}</HeadingTag>
        <span className="accordion-icon">{isOpen ? '−' : '+'}</span>
      </button>
      {isOpen && (
        <div className="accordion-content documento-conteudo">
          {renderedContent}
        </div>
      )}
    </div>
  )
}

// Função para processar markdown e criar seções com acordeons
function processMarkdownForAccordions(text) {
  if (!text) return []
  
  const lines = text.split('\n')
  const sections = []
  let currentSection = null
  let sectionKey = 0
  let preContent = []

  lines.forEach((line, index) => {
    // Detecta apenas h2 como acordeons (não h1) - h3, h4 ficam como conteúdo normal
    const isH1 = line.startsWith('# ') && !line.startsWith('## ')
    const isH2 = line.startsWith('## ') && !line.startsWith('### ')
    
    if (isH1) {
      // h1 vai para o conteúdo prévio, não vira acordeon
      if (currentSection !== null) {
        sections.push({ ...currentSection, key: sectionKey++ })
        currentSection = null
      }
      preContent.push(line)
    } else if (isH2) {
      // Salva seção anterior se existir e tiver conteúdo
      if (currentSection !== null) {
        // Só adiciona seção se tiver conteúdo (não apenas título vazio)
        const hasContent = currentSection.content.some(l => l.trim() !== '')
        if (hasContent) {
          sections.push({ ...currentSection, key: sectionKey++ })
        } else {
          // Se não tem conteúdo, adiciona o título ao prévio
          preContent.push(`## ${currentSection.title}`)
        }
      }
      
      const title = line.substring(3).trim()
      currentSection = {
        title: title,
        level: 2,
        content: [],
        key: sectionKey
      }
    } else {
      // Todo o resto (h3, h4, parágrafos, listas) vai para o conteúdo
      if (currentSection === null) {
        preContent.push(line)
      } else {
        // Adiciona tudo ao conteúdo da seção atual (incluindo h3, h4, etc)
        currentSection.content.push(line)
      }
    }
  })

  // Adiciona última seção apenas se tiver conteúdo
  if (currentSection !== null) {
    const hasContent = currentSection.content.some(l => l.trim() !== '')
    if (hasContent) {
      sections.push({ ...currentSection, key: sectionKey++ })
    } else {
      // Se não tem conteúdo, adiciona o título ao prévio
      preContent.push(`## ${currentSection.title}`)
    }
  }

  return { preContent, sections }
}

function DocumentoDetalhe() {
  const { id } = useParams()
  const documento = documentosData[id]
  const [openSections, setOpenSections] = useState(new Set())

  if (!documento) {
    return (
      <div className="documento-detalhe">
        <div className="error-message">
          <h2>Documento não encontrado</h2>
          <Link to="/biblioteca" className="back-link">
            ← Voltar para Biblioteca
          </Link>
        </div>
      </div>
    )
  }

  const { preContent, sections } = useMemo(() => {
    return processMarkdownForAccordions(documento.conteudo)
  }, [documento.conteudo])

  const renderedPreContent = useMemo(() => {
    if (preContent.length === 0) return null
    return renderContent(preContent, 'pre-content')
  }, [preContent])

  const toggleSection = (key) => {
    const newOpen = new Set(openSections)
    if (newOpen.has(key)) {
      newOpen.delete(key)
    } else {
      newOpen.add(key)
    }
    setOpenSections(newOpen)
  }

  return (
    <div className="documento-detalhe">
      <Link to="/biblioteca" className="back-link">
        ← Voltar para Biblioteca
      </Link>

      <article className="documento-article">
        <div className="documento-conteudo">
          {documento.conteudo ? (
            <>
              {/* Conteúdo antes do primeiro título */}
              {renderedPreContent && (
                <div className="documento-content-section">
                  {renderedPreContent}
                </div>
              )}
              {/* Acordeons apenas para títulos h2, h3, h4 */}
              {sections.map((section) => (
                <AccordionSection
                  key={section.key}
                  section={section}
                  isOpen={openSections.has(section.key)}
                  onToggle={() => toggleSection(section.key)}
                />
              ))}
            </>
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
