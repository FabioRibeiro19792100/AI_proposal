import { useParams, Link } from 'react-router-dom'
import { useMemo, useState, useEffect } from 'react'
import { propostaPPAContent, propostaIAContent } from '../data/documentos'
import { DiferenciaisSection } from '../components/DiferenciaisSection'
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
    descricao: 'Construção colaborativa do conceito e desenho da proposta operacional para desafio de IA',
    categoria: 'Tecnologia',
    conteudo: propostaIAContent
  }
}

// Seções H2 principais que devem ser acordeadas (para proposta PPA)
const mainSections = [
  'Objetivo',
  'Atuação da Mastertech',
  'Processo Detalhado',
  'Cronograma e Timeline',
  'Infraestrutura e Tecnologia',
  'Investimento e Precificação',
  'Diferenciais da Mastertech',
  'Próximos Passos'
]

// Funções de renderização de markdown
function isTableLine(line) {
  return line.trim().startsWith('|') && line.trim().endsWith('|')
}

function isTableSeparator(line) {
  return /^\|[\s\-\|:]+\|$/.test(line.trim())
}

function parseTableRow(line) {
  const cells = line.split('|')
  const trimmed = cells.slice(1, -1)
  return trimmed.map(cell => cell.trim())
}

function formatInlineMarkdown(text) {
  if (!text) return text
  
  // Processa tags <br> primeiro
  const parts = []
  let currentIndex = 0
  let key = 0
  
  // Encontra todas as tags <br> e <br/>
  const brRegex = /<br\s*\/?>/gi
  const brMatches = []
  let match
  while ((match = brRegex.exec(text)) !== null) {
    brMatches.push({
      start: match.index,
      end: match.index + match[0].length
    })
  }
  
  // Se não tem <br> nem markdown, retorna o texto
  if (brMatches.length === 0 && !text.includes('**')) {
    return text
  }
  
  // Processa <br> e markdown juntos
  const allMatches = []
  
  // Adiciona matches de <br>
  brMatches.forEach(brMatch => {
    allMatches.push({
      type: 'br',
      start: brMatch.start,
      end: brMatch.end
    })
  })
  
  // Adiciona matches de **bold**
  const boldRegex = /\*\*(.*?)\*\*/g
  while ((match = boldRegex.exec(text)) !== null) {
    allMatches.push({
      type: 'bold',
      start: match.index,
      end: match.index + match[0].length,
      content: match[1]
    })
  }
  
  // Ordena matches por posição
  allMatches.sort((a, b) => a.start - b.start)
  
  // Processa todos os matches
  allMatches.forEach((matchItem, i) => {
    if (matchItem.start > currentIndex) {
      const beforeText = text.substring(currentIndex, matchItem.start)
      if (beforeText) {
        parts.push(beforeText)
      }
    }
    
    if (matchItem.type === 'br') {
      parts.push(<br key={key++} />)
    } else if (matchItem.type === 'bold') {
      parts.push(<strong key={key++}>{matchItem.content}</strong>)
    }
    
    currentIndex = matchItem.end
    
    if (i === allMatches.length - 1 && matchItem.end < text.length) {
      const afterText = text.substring(matchItem.end)
      if (afterText) {
        parts.push(afterText)
      }
    }
  })
  
  // Se não processou nada mas tinha texto, retorna o texto
  if (parts.length === 0) {
    return text
  }
  
  return parts.length > 0 ? parts : text
}

// Processa tabela de investimento para agrupar por fase
function processInvestmentTable(tableHeaders, tableRows) {
  if (!tableHeaders || tableRows.length === 0) return null
  
  const isInvestment = tableHeaders.some(h => 
    h.toLowerCase().includes('valor') || 
    h.toLowerCase().includes('investimento') ||
    h.toLowerCase().includes('preço') ||
    h.toLowerCase().includes('custo') ||
    h.toLowerCase().includes('total')
  )
  
  if (!isInvestment) return null
  
  // Agrupa por fase
  const phaseGroups = {}
  let hasValues = false
  
  tableRows.forEach(row => {
    const firstCell = row[0] || ''
    const valueCell = row[row.length - 1] || ''
    
    // Detecta se contém "Fase X:" no texto
    const phaseMatch = firstCell.match(/Fase\s*(\d+)[:\s]/i)
    if (phaseMatch) {
      const phaseNum = phaseMatch[1]
      const phaseName = firstCell.replace(/Gestão\s*Fase\s*\d+:\s*/i, '').trim()
      const phaseKey = `Fase ${phaseNum}: ${phaseName}`
      
      if (!phaseGroups[phaseKey]) {
        phaseGroups[phaseKey] = 0
      }
      
      // Extrai valor numérico
      const valueMatch = valueCell.match(/R\$\s*([\d.,]+)/)
      if (valueMatch) {
        hasValues = true
        const valueStr = valueMatch[1].replace(/\./g, '').replace(',', '.')
        const value = parseFloat(valueStr)
        if (!isNaN(value)) {
          phaseGroups[phaseKey] += value
        }
      }
    }
  })
  
  // Se não encontrou fases ou não tem valores, retorna null para usar renderização normal
  if (Object.keys(phaseGroups).length === 0 || !hasValues) return null
  
  return phaseGroups
}

// Renderiza conteúdo de uma seção (para dentro do acordeon)
function renderSectionContent(content, keyPrefix, isEntregaveisSection = false) {
  const elements = []
  let currentList = []
  let inList = false
  let currentTable = []
  let inTable = false
  let tableHeaders = null
  let tableKey = 0
  let inEntregaveisList = false
  let entregaveisItems = []
  let waitingForEntregaveisList = false
  let waitingForMastertechList = false
  let isMastertechList = false
  let inBlackBox = false
  let blackBoxContent = []

  // Função auxiliar para finalizar e renderizar lista
  const finalizeList = (key) => {
    if (currentList.length > 0) {
      const className = isMastertechList ? 'mastertech-list' : ''
      elements.push(<ul key={key} className={className}>{currentList}</ul>)
      currentList = []
      inList = false
      // Não reseta waitingForMastertechList aqui, para permitir múltiplas listas
      // Só reseta isMastertechList para a próxima lista poder ser verificada
      isMastertechList = false
    }
  }

  content.forEach((line, index) => {
    const fullIndex = `${keyPrefix}-${index}`
    
    // Debug: verifica se a linha contém a tag
    if (line.includes('NOTA-DESTAQUE-PRETA')) {
      console.log('🔴 ENCONTROU TAG DE NOTA na linha', index, ':', line)
    }
    
    // Detecta início de box preto (nova sintaxe)
    if (line.trim() === '[NOTA-DESTAQUE-PRETA]') {
      console.log('🔴 DETECTOU INÍCIO DA NOTA na linha', index, line)
      inBlackBox = true
      blackBoxContent = []
      return
    }
    
    // Detecta fim de box preto (nova sintaxe)
    if (inBlackBox && line.trim() === '[/NOTA-DESTAQUE-PRETA]') {
      console.log('🔴 DETECTOU FIM DA NOTA. Conteúdo coletado:', blackBoxContent)
      
      // Processa o conteúdo - mantém o título se estiver lá
      const allContent = [...blackBoxContent]
      let title = '📌 Nota Importante sobre Submissões Individuais:'
      let paragraphs = []
      
      allContent.forEach(l => {
        const trimmed = l.trim()
        if (trimmed.startsWith('**📌') || trimmed.startsWith('📌')) {
          // É o título, já temos
        } else if (trimmed === '') {
          // Linha vazia, ignora
        } else {
          paragraphs.push(trimmed)
        }
      })
      
      console.log('🔴 Renderizando box com', paragraphs.length, 'parágrafos')
      
      elements.push(
        <div key={`blackbox-${fullIndex}`} style={{
          backgroundColor: '#000000',
          color: '#ffffff',
          padding: '1.5rem',
          margin: '2rem 0',
          borderRadius: '4px'
        }}>
          <p style={{ margin: '0 0 1rem 0', fontWeight: 'bold', fontSize: '1.1rem' }}>
            {title}
          </p>
          {paragraphs.map((paragraph, pIdx) => (
            <p key={pIdx} style={{ margin: pIdx < paragraphs.length - 1 ? '0 0 1rem 0' : '0' }}>
              {formatInlineMarkdown(paragraph)}
            </p>
          ))}
        </div>
      )
      inBlackBox = false
      blackBoxContent = []
      return
    }
    
    // Coleta conteúdo do box preto
    if (inBlackBox) {
      blackBoxContent.push(line)
      return
    }
    
    // Detecta "**Atividades da Mastertech:**" ou similar
    const isMastertechHeader = (line.trim().startsWith('**') && line.trim().endsWith('**') && 
                                line.toLowerCase().includes('atividades da mastertech'))
    
    // Detecta "**Entregáveis:**" ou similar
    const isEntregaveisHeader = (line.trim().startsWith('**') && line.trim().endsWith('**') && 
                                 (line.toLowerCase().includes('entregáveis') || line.toLowerCase().includes('entregavel')))
    
    // Se encontrou o cabeçalho de "Atividades da Mastertech", marca que a próxima lista terá setas vermelhas
    if (isMastertechHeader) {
      // Finaliza qualquer lista anterior
      if (inList) {
        finalizeList(`list-${fullIndex}-before`)
      }
      waitingForMastertechList = true
      // Não retorna, continua processando para renderizar o título
    }
    
    // Se encontrou o cabeçalho de entregáveis, marca que a próxima lista será de entregáveis
    if (isEntregaveisHeader) {
      // Finaliza qualquer lista anterior ANTES de processar entregáveis
      if (inList) {
        finalizeList(`list-${fullIndex}-before`)
      }
      // Finaliza entregáveis anteriores se houver (não deveria, mas por segurança)
      if (inEntregaveisList && entregaveisItems.length > 0) {
        elements.push(
          <div key={`entregaveis-${keyPrefix}-${index}-before`} className="entregaveis-grid">
            {entregaveisItems.map((item, idx) => (
              <div key={idx} className="entregavel-card">
                {formatInlineMarkdown(item)}
              </div>
            ))}
          </div>
        )
        entregaveisItems = []
        inEntregaveisList = false
      }
      // Renderiza o título de entregáveis
      const title = line.replace(/\*\*/g, '').trim()
      elements.push(<h4 key={`entregaveis-title-${fullIndex}`} className="entregaveis-title">{title}</h4>)
      waitingForEntregaveisList = true
      return
    }
    
    // Se está esperando lista de entregáveis e encontrou item de lista
    if (waitingForEntregaveisList && line.trim().startsWith('- ')) {
      inEntregaveisList = true
      const listItem = line.substring(2).trim()
      entregaveisItems.push(listItem)
      return
    }
    
    // Função auxiliar para finalizar entregáveis
    const finalizeEntregaveis = () => {
      if (inEntregaveisList && entregaveisItems.length > 0) {
        elements.push(
          <div key={`entregaveis-${keyPrefix}-${index}`} className="entregaveis-grid">
            {entregaveisItems.map((item, idx) => (
              <div key={idx} className="entregavel-card">
                {formatInlineMarkdown(item)}
              </div>
            ))}
          </div>
        )
        entregaveisItems = []
        inEntregaveisList = false
        waitingForEntregaveisList = false
      } else if (waitingForEntregaveisList) {
        waitingForEntregaveisList = false
      }
    }
    
    // Detecta se é uma nova seção (que deve finalizar entregáveis)
    const isMajorSection = line.startsWith('### ') || line.startsWith('#### ')
    const isBoldLine = line.trim().startsWith('**') && line.trim().endsWith('**')
    const isNewSection = isMajorSection || (isBoldLine && 
                          !line.toLowerCase().includes('entregáveis') && 
                          !line.toLowerCase().includes('entregavel'))
    
    // Se encontrou nova seção, finaliza entregáveis ANTES de processar
    if (isNewSection) {
      finalizeEntregaveis()
      // Reset flag de Mastertech apenas se for uma seção maior (H3, H4)
      // Subseções em negrito dentro de "Atividades da Mastertech" não resetam o flag
      if (isMajorSection) {
        waitingForMastertechList = false
      }
    }
    
    if (isTableLine(line) && !isTableSeparator(line)) {
      if (!inTable) {
        if (inList) {
          finalizeList(`list-${fullIndex}`)
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
      // Finaliza tabela
      if (tableHeaders && currentTable.length > 0) {
        const isTimeline = tableHeaders.some(h => 
          h.toLowerCase().includes('data') || 
          h.toLowerCase().includes('mês') || 
          h.toLowerCase().includes('período') ||
          h.toLowerCase().includes('fase') ||
          h.toLowerCase().includes('duração') ||
          h.toLowerCase().includes('timeline') ||
          h.toLowerCase().includes('cronograma')
        )
        const isInvestment = tableHeaders.some(h => 
          h.toLowerCase().includes('valor') || 
          h.toLowerCase().includes('investimento') ||
          h.toLowerCase().includes('preço') ||
          h.toLowerCase().includes('custo') ||
          h.toLowerCase().includes('total')
        )
        
        // Processa tabela de investimento para agrupar por fase
        const phaseGroups = processInvestmentTable(tableHeaders, currentTable)
        
        if (phaseGroups) {
          // Renderiza tabela simplificada por fase
          const total = Object.values(phaseGroups).reduce((sum, value) => sum + value, 0)
          const tk = tableKey++
          elements.push(
            <div key={`table-wrap-${tk}`} className="table-responsive">
            <table key={`table-${tk}`} className="proposta-table investment-table investment-simplified">
              <thead>
                <tr>
                  <th>Fase</th>
                  <th>Investimento</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(phaseGroups).map(([phase, value]) => (
                  <tr key={phase}>
                    <td>{phase}</td>
                    <td>R$ {value.toLocaleString('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</td>
                  </tr>
                ))}
                <tr className="investment-total">
                  <td><strong>Total</strong></td>
                  <td><strong>R$ {total.toLocaleString('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</strong></td>
                </tr>
              </tbody>
            </table>
            </div>
          )
        } else {
          // Renderiza tabela normal
          const colCount = tableHeaders.length
          // Detecta tabela de "Estrutura da Imersão" (2 colunas: Atividade, Duração)
          const isImersaoTable = colCount === 2 && 
            tableHeaders.some(h => h.toLowerCase().includes('atividade')) &&
            tableHeaders.some(h => h.toLowerCase().includes('duração') || h.toLowerCase().includes('duracao'))
          
          // Detecta tabela de "Estrutura da Mentoria" (4 colunas: Tipo, Frequência, Duração, Participantes)
          const isMentoriaTable = colCount === 4 && 
            tableHeaders.some(h => h.toLowerCase().includes('tipo')) &&
            tableHeaders.some(h => h.toLowerCase().includes('frequência') || h.toLowerCase().includes('frequencia'))
          
          // Renderiza como cards se for tabela de Imersão
          if (isImersaoTable) {
            elements.push(
              <div key={`imersao-cards-${tableKey++}`} className="imersao-cards-grid">
                {currentTable.map((row, rIndex) => (
                  <div key={rIndex} className="imersao-card">
                    <div className="imersao-card-title">{formatInlineMarkdown(row[0])}</div>
                    <div className="imersao-card-duration">{formatInlineMarkdown(row[1])}</div>
                  </div>
                ))}
              </div>
            )
          } else {
            const tk2 = tableKey++
            const isAtuacaoTable = colCount === 3 && (tableHeaders[0] || '').includes('Ponto') && (tableHeaders[1] || '').includes('Atividade')
            elements.push(
              <div key={`table-wrap-${tk2}`} className="table-responsive">
              <table 
                className={`proposta-table ${isTimeline ? 'timeline-table' : ''} ${isInvestment ? 'investment-table' : ''} ${isMentoriaTable ? 'mentoria-table' : ''} ${colCount > 4 ? 'wide-table' : ''} ${isAtuacaoTable ? 'atuacao-table' : ''}`}
              >
                <thead>
                  <tr>
                    {tableHeaders.slice(0, isMentoriaTable ? 4 : tableHeaders.length).map((header, hIndex) => (
                      <th key={hIndex}>{formatInlineMarkdown(header)}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {currentTable.map((row, rIndex) => {
                    const firstCell = row[0] || ''
                    const secondCell = row[1] || ''
                    // Aplica lógica de grupo APENAS para tabela de investimento
                    const isGroupRow = isInvestment && firstCell.trim().startsWith('**') && firstCell.trim().endsWith('**') && !firstCell.toLowerCase().includes('total')
                    const isMentoriaRow = secondCell.includes('Mentoria Master Globo')
                    const headerCount = tableHeaders.slice(0, isMentoriaTable ? 4 : tableHeaders.length).length
                    const maxCells = isMentoriaTable ? 4 : headerCount
                    const cellsToRender = row.slice(0, maxCells)
                    // Garante que sempre temos células suficientes para todos os headers
                    while (cellsToRender.length < headerCount) {
                      cellsToRender.push('')
                    }
                    return (
                      <tr key={rIndex} className={isGroupRow ? 'table-group-row' : ''}>
                        {isGroupRow ? (
                          <td colSpan={headerCount}>{formatInlineMarkdown(row[0])}</td>
                        ) : (
                          cellsToRender.slice(0, headerCount).map((cell, cIndex) => (
                            <td key={cIndex}>
                              {formatInlineMarkdown(cell)}
                              {cIndex === 2 && isMentoriaRow && (
                                <>
                                  <br />
                                  <span className="duvida-text-celula">Responsabilidade a confirmar (Mastertech ou Globo)</span>
                                </>
                              )}
                            </td>
                          ))
                        )}
                      </tr>
                    )
                  })}
                </tbody>
              </table>
              </div>
            )
          }
        }
      } else if (currentTable.length > 0) {
        const colCount = currentTable[0]?.length || 0
        const tk3 = tableKey++
        elements.push(
          <div key={`table-wrap-${tk3}`} className="table-responsive">
            <table 
              key={`table-${tk3}`}
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
          </div>
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
        finalizeList(`list-${fullIndex}`)
      }
      elements.push(<h1 key={fullIndex}>{line.substring(2)}</h1>)
    } else if (line.startsWith('## ') && !line.startsWith('### ')) {
      if (inList) {
        finalizeList(`list-${fullIndex}`)
      }
      elements.push(<h2 key={fullIndex}>{line.substring(3)}</h2>)
    } else if (line.startsWith('### ') && !line.startsWith('#### ')) {
      if (inList) {
        finalizeList(`list-${fullIndex}`)
      }
      const h3Text = line.substring(4)
      const isFase = h3Text.toLowerCase().includes('fase')
      elements.push(<h3 key={fullIndex} className={isFase ? 'fase-title' : ''}>{h3Text}</h3>)
    } else if (line.startsWith('#### ')) {
      if (inList) {
        finalizeList(`list-${fullIndex}`)
      }
      const h4Text = line.substring(5)
      elements.push(<h4 key={fullIndex}>{h4Text}</h4>)
      
      // Se for "FASE 1: Submissão de Propostas", adiciona a nota logo depois
      if (h4Text.includes('FASE 1') && h4Text.includes('Submissão')) {
        // Procura pela tag de nota nas próximas linhas
        let foundNota = false
        let notaStartIdx = -1
        for (let i = index + 1; i < Math.min(index + 20, content.length); i++) {
          if (content[i].trim() === '[NOTA-DESTAQUE-PRETA]') {
            foundNota = true
            notaStartIdx = i + 1
            break
          }
        }
        
        if (foundNota && notaStartIdx > 0) {
          // Coleta o conteúdo da nota até encontrar o fechamento
          let notaContent = []
          for (let i = notaStartIdx; i < content.length; i++) {
            if (content[i].trim() === '[/NOTA-DESTAQUE-PRETA]') {
              break
            }
            notaContent.push(content[i])
          }
          
          const paragraphs = notaContent
            .filter(l => l.trim() !== '' && !l.trim().startsWith('**📌'))
            .map(l => l.trim())
            .filter(p => p)
          
          if (paragraphs.length > 0) {
            elements.push(
              <div key={`nota-fase1-${fullIndex}`} style={{
                backgroundColor: '#000000',
                color: '#ffffff',
                padding: '1.5rem',
                margin: '2rem 0',
                borderRadius: '4px'
              }}>
                <p style={{ margin: '0 0 1rem 0', fontWeight: 'bold', fontSize: '1.1rem' }}>
                  📌 Nota Importante sobre Submissões Individuais:
                </p>
                {paragraphs.map((paragraph, pIdx) => (
                  <p key={pIdx} style={{ margin: pIdx < paragraphs.length - 1 ? '0 0 1rem 0' : '0' }}>
                    {formatInlineMarkdown(paragraph)}
                  </p>
                ))}
              </div>
            )
          }
        }
      }
    } else if (line.trim() === '---') {
      // Finaliza entregáveis ANTES de renderizar a linha separadora
      if (inEntregaveisList && entregaveisItems.length > 0) {
        finalizeEntregaveis()
      }
      if (inList) {
        finalizeList(`list-${fullIndex}`)
      }
      elements.push(<hr key={fullIndex} />)
    } else if (line.trim() === '') {
      // Linha vazia - se estava coletando entregáveis e já tem itens, finaliza
      // (especialmente se a próxima linha for '---' ou uma nova seção)
      if (inEntregaveisList && entregaveisItems.length > 0) {
        // Verifica a próxima linha para ver se é '---' ou nova seção
        const nextLine = index + 1 < content.length ? content[index + 1] : ''
        if (nextLine.trim() === '---' || 
            nextLine.startsWith('### ') || 
            (nextLine.trim().startsWith('**') && nextLine.trim().endsWith('**'))) {
          finalizeEntregaveis()
        }
      }
    } else if (line.trim().startsWith('- ')) {
      // Se não é lista de entregáveis, finaliza entregáveis ANTES de processar lista normal
      if (!inEntregaveisList && !waitingForEntregaveisList) {
        // Finaliza entregáveis se estava esperando (por segurança)
        if (waitingForEntregaveisList) {
          waitingForEntregaveisList = false
        }
        // Se estava esperando lista de Mastertech, marca que esta é a lista
        // Não reseta o flag aqui, para permitir múltiplas listas após subseções
        if (waitingForMastertechList) {
          isMastertechList = true
        }
        // Lista normal
        inList = true
        const listItem = line.substring(2).trim()
        currentList.push(<li key={fullIndex}>{formatInlineMarkdown(listItem)}</li>)
      }
      // Se estava esperando entregáveis, já foi capturado acima
    } else if (line.trim() !== '') {
      // Se estava coletando entregáveis e encontrou conteúdo que não é lista, finaliza ANTES de processar
      if (inEntregaveisList && !line.trim().startsWith('- ')) {
        finalizeEntregaveis()
      }
      
      // Finaliza lista normal se houver
      if (inList) {
        finalizeList(`list-${fullIndex}`)
      }
      
      // Renderiza a linha atual
      elements.push(<p key={fullIndex}>{formatInlineMarkdown(line)}</p>)
    }
  })

  // Finaliza lista de entregáveis se ainda estiver aberta
  if (inEntregaveisList && entregaveisItems.length > 0) {
    elements.push(
      <div key={`entregaveis-final-${keyPrefix}`} className="entregaveis-grid">
        {entregaveisItems.map((item, idx) => (
          <div key={idx} className="entregavel-card">
            {formatInlineMarkdown(item)}
          </div>
        ))}
      </div>
    )
    entregaveisItems = []
    inEntregaveisList = false
  }

  // Finaliza tabela se ainda estiver aberta no final
  if (inTable) {
    if (tableHeaders && currentTable.length > 0) {
      const phaseGroups = processInvestmentTable(tableHeaders, currentTable)
      
      if (phaseGroups) {
        const total = Object.values(phaseGroups).reduce((sum, value) => sum + value, 0)
        const tkF = tableKey++
        elements.push(
          <div key={`table-wrap-${tkF}`} className="table-responsive">
          <table key={`table-${tkF}`} className="proposta-table investment-table investment-simplified">
            <thead>
              <tr>
                <th>Fase</th>
                <th>Investimento</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(phaseGroups).map(([phase, value]) => (
                <tr key={phase}>
                  <td>{phase}</td>
                  <td>R$ {value.toLocaleString('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</td>
                </tr>
              ))}
              <tr className="investment-total">
                <td><strong>Total</strong></td>
                <td><strong>R$ {total.toLocaleString('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</strong></td>
              </tr>
            </tbody>
          </table>
          </div>
        )
      } else {
        const isTimeline = tableHeaders.some(h => 
          h.toLowerCase().includes('data') || 
          h.toLowerCase().includes('mês') || 
          h.toLowerCase().includes('período') ||
          h.toLowerCase().includes('fase') ||
          h.toLowerCase().includes('duração') ||
          h.toLowerCase().includes('timeline') ||
          h.toLowerCase().includes('cronograma')
        )
        const isInvestment = tableHeaders.some(h => 
          h.toLowerCase().includes('valor') || 
          h.toLowerCase().includes('investimento') ||
          h.toLowerCase().includes('preço') ||
          h.toLowerCase().includes('custo') ||
          h.toLowerCase().includes('total')
        )
        const colCount = tableHeaders.length
        // Detecta tabela de "Estrutura da Imersão" (2 colunas: Atividade, Duração)
        const isImersaoTable = colCount === 2 && 
          tableHeaders.some(h => h.toLowerCase().includes('atividade')) &&
          tableHeaders.some(h => h.toLowerCase().includes('duração') || h.toLowerCase().includes('duracao'))
        
        // Detecta tabela de "Estrutura da Mentoria" (4 colunas: Tipo, Frequência, Duração, Participantes)
        const isMentoriaTable = colCount === 4 && 
          tableHeaders.some(h => h.toLowerCase().includes('tipo')) &&
          tableHeaders.some(h => h.toLowerCase().includes('frequência') || h.toLowerCase().includes('frequencia'))
        
        // Renderiza como cards se for tabela de Imersão
        if (isImersaoTable) {
          elements.push(
            <div key={`imersao-cards-${tableKey++}`} className="imersao-cards-grid">
              {currentTable.map((row, rIndex) => (
                <div key={rIndex} className="imersao-card">
                  <div className="imersao-card-title">{formatInlineMarkdown(row[0])}</div>
                  <div className="imersao-card-duration">{formatInlineMarkdown(row[1])}</div>
                </div>
              ))}
            </div>
          )
        } else {
          const tkF2 = tableKey++
          const isAtuacaoTable = colCount === 3 && (tableHeaders[0] || '').includes('Ponto') && (tableHeaders[1] || '').includes('Atividade')
          elements.push(
            <div key={`table-wrap-${tkF2}`} className="table-responsive">
            <table 
              className={`proposta-table ${isTimeline ? 'timeline-table' : ''} ${isInvestment ? 'investment-table' : ''} ${isMentoriaTable ? 'mentoria-table' : ''} ${colCount > 4 ? 'wide-table' : ''} ${isAtuacaoTable ? 'atuacao-table' : ''}`}
            >
              <thead>
                <tr>
                  {tableHeaders.slice(0, isMentoriaTable ? 4 : tableHeaders.length).map((header, hIndex) => (
                    <th key={hIndex}>{formatInlineMarkdown(header)}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {currentTable.map((row, rIndex) => {
                  const firstCell = row[0] || ''
                  const secondCell = row[1] || ''
                  // Aplica lógica de grupo APENAS para tabela de investimento
                  const isGroupRow = isInvestment && firstCell.trim().startsWith('**') && firstCell.trim().endsWith('**') && !firstCell.toLowerCase().includes('total')
                  const isMentoriaRow = secondCell.includes('Mentoria Master Globo')
                  const headerCount = tableHeaders.slice(0, isMentoriaTable ? 4 : tableHeaders.length).length
                  const maxCells = isMentoriaTable ? 4 : headerCount
                  const cellsToRender = row.slice(0, maxCells)
                  // Garante que sempre temos células suficientes para todos os headers
                  while (cellsToRender.length < headerCount) {
                    cellsToRender.push('')
                  }
                  return (
                    <tr key={rIndex} className={isGroupRow ? 'table-group-row' : ''}>
                      {isGroupRow ? (
                        <td colSpan={headerCount}>{formatInlineMarkdown(row[0])}</td>
                      ) : (
                        cellsToRender.slice(0, headerCount).map((cell, cIndex) => (
                          <td key={cIndex}>
                            {formatInlineMarkdown(cell)}
                            {cIndex === 2 && isMentoriaRow && (
                              <>
                                <br />
                                <span className="duvida-text-celula">Responsabilidade a confirmar (Mastertech ou Globo)</span>
                              </>
                            )}
                          </td>
                        ))
                      )}
                    </tr>
                  )
                })}
            </tbody>
          </table>
          </div>
        )
      }
    }
  } else if (currentTable.length > 0) {
      const colCount = currentTable[0]?.length || 0
      const tkF3 = tableKey++
      elements.push(
        <div key={`table-wrap-${tkF3}`} className="table-responsive">
        <table 
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
        </div>
      )
    }
  }

  if (inList) {
    finalizeList("list-final")
  }

  return elements
}

// Função para renderizar seção de investimento do PPA (igual ao resumo)
function renderInvestmentSection(content) {
  // Usa os mesmos dados do resumo
  const investimento = {
    detalhamento: [
      {
        titulo: 'Fases 1, 2 e 4',
        valor: 'R$ 43.500,00',
        entregaveis: [
          'Documentar e executar o processo de avaliação das inscrições',
          'Selecionar e divulgar as 10 equipes semifinalistas',
          'Conduzir o pitch e selecionar as 3 equipes finalistas'
        ]
      },
      {
        titulo: 'Fase 3 - Mentoria',
        valor: 'R$ 21.000,00',
        entregaveis: [
          '10 campanhas aprimoradas e documentadas',
          'Roteiros revisados e otimizados',
          'Equipes preparadas para o pitch'
        ],
        duvida: true
      },
      {
        titulo: 'Fase 5 - Imersão',
        valor: 'R$ 40.000,00',
        entregaveis: [
          'Mediação e condução técnica durante a imersão',
          'Documentação completa do processo',
          'Relatório final com métricas'
        ],
        nota: 'Preço estimado para imersão técnica de 3 a 5 dias.'
      },
      {
        titulo: 'Infraestrutura',
        valor: null,
        entregaveis: [
          'Microsoft Forms ou Typeform',
          'Sistemas de análise de submissões',
          'Plataforma de gestão'
        ]
      }
    ],
    total: 'R$ 104.500,00',
    pagamento: [
      { percent: '30', desc: 'Assinatura do contrato' },
      { percent: '30', desc: 'Início Fase 3 (Mentoria)' },
      { percent: '25', desc: 'Início Fase 5 (Imersão)' },
      { percent: '15', desc: 'Entrega final' }
    ]
  }
  
  // Renderiza com a mesma estrutura do resumo
  return (
    <div className="investimento-section-custom">
      <div className="investimento-resumo">
        <div className="investimento-descricao">
          <p>
            O investimento garante a entrega completa do desafio, incluindo a operacionalização do processo, com criação do regulamento, customização dos formulários de inscrição, avaliação das submissões, condução das mentorias, organização e condução do pitch com banca avaliadora e mediação da imersão presencial.
          </p>
        </div>
        <div className="investimento-total">
          <span>Total</span>
          <strong>{investimento.total}</strong>
          <span className="investimento-sem-mentorias">sem considerar as mentorias: R$ 83.500,00</span>
        </div>
      </div>

      <div className="investimento-detalhamento">
        <h3 className="detalhamento-title">DETALHAMENTO DAS ENTREGAS:</h3>
        {investimento.detalhamento.map((item, index) => (
          <div key={index} className="detalhamento-item">
            <div className="detalhamento-header">
              <div>
                <h4 className="detalhamento-titulo">
                  {item.titulo}
                  {item.duvida && (
                    <span className="duvida-tag" title="Responsabilidade a confirmar (Mastertech ou Globo)">
                      Dúvida
                    </span>
                  )}
                </h4>
                {item.titulo === 'Fases 1, 2 e 4' && (
                  <p className="detalhamento-nota">
                    <strong>(Mesma referência usada na Academia LED onde trabalhamos essas 3 fases)</strong>
                  </p>
                )}
              </div>
              {item.valor && <span className="detalhamento-valor">{item.valor}</span>}
            </div>
            <ul className="detalhamento-entregaveis">
              {item.entregaveis.map((entregavel, i) => (
                <li key={i}>{entregavel}</li>
              ))}
            </ul>
            {item.nota && (
              <p className="detalhamento-nota-imersao">{item.nota}</p>
            )}
          </div>
        ))}
      </div>

      <div className="investimento-pagamento">
        <h4>Forma de Pagamento</h4>
        <div className="pagamento-steps">
          {investimento.pagamento.map((pag, index) => (
            <div key={index} className="pagamento-step">
              <span className="step-percent">{pag.percent}%</span>
              <span className="step-desc">{pag.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Componente de Acordeon
function AccordionSection({ title, content, isOpen, onToggle, sectionKey, isEntregaveis = false, propostaId, customContent }) {
  // Se for a seção de investimento da proposta PPA, renderiza customizado
  if (propostaId === '7' && title === 'Investimento e Precificação' && isOpen) {
    return (
      <div className="accordion-section">
        <button 
          className={`accordion-header ${isOpen ? 'open' : ''}`}
          onClick={onToggle}
          aria-expanded={isOpen}
        >
          <span className="accordion-title">{title}</span>
          <span className="accordion-icon">{isOpen ? '×' : '+'}</span>
        </button>
        {isOpen && (
          <div className="accordion-content">
            {renderInvestmentSection(content)}
          </div>
        )}
      </div>
    )
  }

  const bodyContent = customContent != null ? customContent : renderSectionContent(content, sectionKey, isEntregaveis)
  
  return (
    <div className="accordion-section">
      <button 
        className={`accordion-header ${isOpen ? 'open' : ''}`}
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span className="accordion-title">{title}</span>
        <span className="accordion-icon">{isOpen ? '×' : '+'}</span>
      </button>
      {isOpen && (
        <div className="accordion-content">
          {bodyContent}
        </div>
      )}
    </div>
  )
}

// Processa conteúdo e identifica seções
function processContent(content) {
  const sections = []
  let currentSection = null
  let currentSectionContent = []
  let preContent = []

  content.forEach((line, index) => {
    // Detecta H2
    if (line.startsWith('## ') && !line.startsWith('### ')) {
      const title = line.substring(3).trim()
      const isMainSection = mainSections.includes(title)
      const isEntregaveis = title.toLowerCase().includes('entregáveis') || 
                           title.toLowerCase().includes('entregavel')

      // Adiciona conteúdo prévio se houver
      if (preContent.length > 0) {
        sections.push({ type: 'content', content: [...preContent], index: index - preContent.length })
        preContent = []
      }

      // Finaliza seção anterior
      if (currentSection) {
        sections.push({
          ...currentSection,
          content: [...currentSectionContent]
        })
      }

      // Inicia nova seção
      currentSection = {
        type: isMainSection ? 'accordion' : 'h2',
        title,
        isEntregaveis,
        index
      }
      currentSectionContent = []
      return
    }

    // Adiciona conteúdo à seção atual ou ao pré-conteúdo
    if (currentSection) {
      currentSectionContent.push(line)
    } else {
      preContent.push(line)
    }
  })

  // Adiciona conteúdo prévio final se houver
  if (preContent.length > 0) {
    sections.push({ type: 'content', content: [...preContent], index: content.length - preContent.length })
  }

  // Finaliza última seção
  if (currentSection) {
    sections.push({
      ...currentSection,
      content: [...currentSectionContent]
    })
  }

  return sections
}

function PropostaDetalhe() {
  const { id } = useParams()
  const proposta = propostasData[id]
  const [openSections, setOpenSections] = useState({})

  // Ancorar no topo quando a página carrega
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'auto'
    })
  }, [id])

  if (!proposta) {
    return (
      <div className="proposta-detalhe">
        <div className="error-message">
          <h2>Proposta não encontrada</h2>
          <Link to="/propostas" className="back-link">
            ← Voltar para Propostas
          </Link>
        </div>
      </div>
    )
  }

  const content = useMemo(() => {
    return proposta.conteudo ? proposta.conteudo.split('\n') : []
  }, [proposta.conteudo])

  const sections = useMemo(() => {
    if (!content.length) return []
    return processContent(content)
  }, [content])

  const toggleSection = (sectionTitle) => {
    setOpenSections(prev => ({
      ...prev,
      [sectionTitle]: !prev[sectionTitle]
    }))
  }


  return (
    <div className="proposta-detalhe">
      <div className="proposta-header-sticky">
        <Link to="/propostas" className="back-link">
          ← Voltar para Propostas
        </Link>
        <div className="view-mode-switcher">
          <button 
            className="view-mode-switch active"
            disabled
          >
            Detalhe
          </button>
          {id === '7' && (
            <Link to="/propostas/7/resumo" className="view-mode-switch">
              Resumo
            </Link>
          )}
        </div>
      </div>

      <article className="proposta-article">
        <h1 className="proposta-titulo">{proposta.titulo}</h1>
        <p className="proposta-descricao">{proposta.descricao}</p>
        <div className="proposta-conteudo">
          {sections.map((section, idx) => {
            if (section.type === 'h1') {
              return <h1 key={`h1-${idx}`}>{section.content[0]?.substring(2)}</h1>
            }
            
            if (section.type === 'accordion') {
              const customContent = section.title === 'Diferenciais da Mastertech'
                ? <DiferenciaisSection showTitle={false} />
                : undefined
              return (
                <AccordionSection
                  key={`accordion-${idx}`}
                  title={section.title}
                  content={section.content}
                  isOpen={openSections[section.title] || false}
                  onToggle={() => toggleSection(section.title)}
                  sectionKey={`section-${idx}`}
                  isEntregaveis={section.isEntregaveis}
                  propostaId={id}
                  customContent={customContent}
                />
              )
            }
            
            if (section.type === 'h2') {
              // Renderiza H2 e seu conteúdo
              const isEntregaveis = section.title.toLowerCase().includes('entregáveis') || 
                                   section.title.toLowerCase().includes('entregavel')
              return (
                <div key={`h2-section-${idx}`}>
                  <h2>{section.title}</h2>
                  {renderSectionContent(section.content, `h2-content-${idx}`, isEntregaveis)}
                </div>
              )
            }
            
            // Conteúdo normal
            return (
              <div key={`content-${idx}`}>
                {renderSectionContent(section.content, `content-${idx}`, false)}
              </div>
            )
          })}
        </div>
      </article>
    </div>
  )
}

export default PropostaDetalhe
