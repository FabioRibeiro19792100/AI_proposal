import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import '../styles/design-system.css'
import '../styles/PropostaIADetalhe.css'

// Dados dos casos de uso
const cases = [
  { category: 'pre', title: 'Análise de sentimento de audiência', description: 'Processar comentários de redes sociais para entender reações a programas' },
  { category: 'pre', title: 'Mapeamento de tendências culturais', description: 'Identificar temas emergentes para inspirar pautas jornalísticas' },
  { category: 'pre', title: 'Análise de concorrência', description: 'Monitorar padrões de programação em outras emissoras' },
  { category: 'pre', title: 'Previsão de audiência', description: 'Modelos preditivos baseados em histórico de programas similares' },
  { category: 'pre', title: 'Descoberta de talentos regionais', description: 'Identificar criadores emergentes em plataformas públicas' },
  { category: 'pre', title: 'Assistente de continuidade', description: 'Verificar inconsistências em roteiros longos' },
  { category: 'pre', title: 'Gerador de sinopses', description: 'Criar versões de sinopses para diferentes plataformas' },
  { category: 'pre', title: 'Análise de ritmo narrativo', description: 'Mapear curvas de tensão em roteiros' },
  { category: 'pre', title: 'Sugestão de referências', description: 'Identificar obras similares no acervo para inspiração' },
  { category: 'pre', title: 'Verificação factual automática', description: 'Checar datas, nomes, eventos históricos em roteiros' },
  { category: 'prod', title: 'Otimização de cronograma', description: 'Minimizar deslocamentos e custos de produção' },
  { category: 'prod', title: 'Previsão meteorológica', description: 'Integrar dados climáticos para gravações externas' },
  { category: 'prod', title: 'Gestão de figurino e adereços', description: 'Busca visual no acervo por época/estilo' },
  { category: 'prod', title: 'Controle de continuidade visual', description: 'Detectar erros comparando takes' },
  { category: 'prod', title: 'Simulação de iluminação', description: 'Preview de setups de luz antes da gravação' },
  { category: 'prod', title: 'Transcrição automática', description: 'Converter áudio em texto para decupagem' },
  { category: 'prod', title: 'Detecção de problemas técnicos', description: 'Identificar issues de áudio/vídeo em tempo real' },
  { category: 'prod', title: 'Geração de metadados', description: 'Etiquetar conteúdo capturado automaticamente' },
  { category: 'prod', title: 'Backup inteligente', description: 'Priorizar backup de material crítico' },
  { category: 'prod', title: 'Controle de versões', description: 'Rastrear múltiplas versões de cenas' },
  { category: 'pos', title: 'Detecção de melhores takes', description: 'Sugerir takes com melhor performance técnica' },
  { category: 'pos', title: 'Edição de silêncios', description: 'Remover pausas longas automaticamente' },
  { category: 'pos', title: 'Sincronização de áudio', description: 'Alinhar múltiplas fontes de áudio' },
  { category: 'pos', title: 'Detecção de repetições', description: 'Identificar trechos duplicados' },
  { category: 'pos', title: 'Geração de thumbnails', description: 'Selecionar frames representativos automaticamente' },
  { category: 'pos', title: 'Análise de cor', description: 'Ajustar paleta de cores consistentemente' },
  { category: 'pos', title: 'Detecção de objetos', description: 'Identificar produtos/marcas para edição' },
  { category: 'pos', title: 'Geração de legendas', description: 'Criar legendas em múltiplos idiomas' },
  { category: 'pos', title: 'Análise de qualidade', description: 'Avaliar resolução, bitrate, compressão' },
  { category: 'pos', title: 'Otimização de export', description: 'Recomendar formatos por plataforma' },
  { category: 'acervo', title: 'Busca semântica', description: 'Encontrar conteúdo por significado, não apenas palavras-chave' },
  { category: 'acervo', title: 'Restauração automática', description: 'Melhorar qualidade de material antigo' },
  { category: 'acervo', title: 'Categorização inteligente', description: 'Organizar conteúdo por tema, época, gênero' },
  { category: 'acervo', title: 'Detecção de direitos', description: 'Identificar material com restrições de uso' },
  { category: 'acervo', title: 'Recomendação de reuso', description: 'Sugerir conteúdo do acervo para novas produções' },
  { category: 'acervo', title: 'Transcrição histórica', description: 'Converter áudio antigo em texto pesquisável' },
  { category: 'acervo', title: 'Análise de valor', description: 'Priorizar digitalização por relevância' },
  { category: 'acervo', title: 'Detecção de duplicatas', description: 'Identificar versões do mesmo conteúdo' },
  { category: 'acervo', title: 'Metadados enriquecidos', description: 'Gerar tags automáticas de pessoas, lugares, eventos' },
  { category: 'acervo', title: 'Preservação preditiva', description: 'Antecipar degradação de material' },
  { category: 'dist', title: 'Otimização de título', description: 'Testar variações de título para melhor descoberta' },
  { category: 'dist', title: 'Recomendação de horário', description: 'Sugerir melhor slot de programação' },
  { category: 'dist', title: 'Análise de competição', description: 'Evitar conflitos com programação concorrente' },
  { category: 'dist', title: 'Personalização de trailer', description: 'Criar trailers por perfil de audiência' },
  { category: 'dist', title: 'Detecção de conteúdo sensível', description: 'Identificar classificação etária necessária' },
  { category: 'dist', title: 'Otimização de thumbnails', description: 'Testar e selecionar versão mais efetiva' },
  { category: 'dist', title: 'Predição de churn', description: 'Identificar risco de cancelamento' },
  { category: 'dist', title: 'Controle de qualidade stream', description: 'Detectar problemas de transmissão' },
  { category: 'dist', title: 'Otimização de bitrate', description: 'Ajustar qualidade por conexão' },
  { category: 'dist', title: 'Detecção de pirataria', description: 'Identificar uploads não autorizados' },
  { category: 'dist', title: 'Moderação de comentários', description: 'Filtrar conteúdo ofensivo (primeira camada)' },
  { category: 'dist', title: 'Análise multiplataforma', description: 'Comparar métricas entre canais' }
]

const categoryNames = {
  'pre': 'Pré-Produção',
  'prod': 'Produção',
  'pos': 'Pós-Produção',
  'acervo': 'Acervo',
  'dist': 'Distribuição'
}

function CinquentaTonsIA() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [likedCases, setLikedCases] = useState(new Set())
  const [dislikedCases, setDislikedCases] = useState(new Set())
  const location = useLocation()

  const filteredCases = activeFilter === 'all' 
    ? cases 
    : cases.filter(c => c.category === activeFilter)

  // Determina a URL de retorno baseada na origem
  const returnUrl = location.state?.from || '/propostas/8#item-5'

  // Scroll para o topo quando a página carrega (especialmente quando vem do link "Ver 50 tons de IA")
  useEffect(() => {
    // Sempre faz scroll para o topo quando a página carrega
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }

    // Múltiplos timeouts para garantir que funcione mesmo com carregamento assíncrono
    setTimeout(scrollToTop, 50)
    setTimeout(scrollToTop, 200)
    setTimeout(scrollToTop, 500)
  }, [])

  return (
    <div className="proposta-ia-page">
      {/* Anchor para scroll ao topo */}
      <div id="top" style={{ position: 'absolute', top: 0, left: 0, width: '1px', height: '1px' }} />
      {/* Navigation */}
      <nav className="ia-nav">
        <div className="nav-content">
          <div className="nav-brand">Mastertech + Globo</div>
          <ul className="nav-links">
            <li><a href="#top" className="nav-link">50 tons de IA</a></li>
          </ul>
        </div>
      </nav>

      {/* Section: 50 tons de IA */}
      <section id="simulacao" className="section">
        <div>
          <div className="section-header" style={{ position: 'relative', paddingRight: '200px' }}>
            <Link 
              to="/propostas/8#item-5"
              className="back-link"
              style={{ 
                position: 'absolute',
                top: 0,
                right: 0,
                marginBottom: 0
              }}
            >
              ← Voltar para Nosso Processo
            </Link>
            <div className="section-number">03</div>
            <h2 className="section-title">50 tons de IA</h2>
            <p className="section-description">
              Fizemos um exercício de contrainteligência: simulamos, usando IA, que tipos de propostas virão quando participantes também usarem IA para propor aplicações de IA. Isso nos permite antecipar o território, refinar premissas e criar guardrails antes do lançamento.
            </p>
          </div>

          <div className="simulation-controls">
            <button 
              className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
              onClick={() => setActiveFilter('all')}
            >
              Todas
            </button>
            <button 
              className={`filter-btn ${activeFilter === 'pre' ? 'active' : ''}`}
              onClick={() => setActiveFilter('pre')}
            >
              Pré-Produção
            </button>
            <button 
              className={`filter-btn ${activeFilter === 'prod' ? 'active' : ''}`}
              onClick={() => setActiveFilter('prod')}
            >
              Produção
            </button>
            <button 
              className={`filter-btn ${activeFilter === 'pos' ? 'active' : ''}`}
              onClick={() => setActiveFilter('pos')}
            >
              Pós-Produção
            </button>
            <button 
              className={`filter-btn ${activeFilter === 'acervo' ? 'active' : ''}`}
              onClick={() => setActiveFilter('acervo')}
            >
              Acervo
            </button>
            <button 
              className={`filter-btn ${activeFilter === 'dist' ? 'active' : ''}`}
              onClick={() => setActiveFilter('dist')}
            >
              Distribuição
            </button>
          </div>

          <div className="cases-cards-grid">
            {filteredCases.map((caseItem, index) => {
              const caseId = index
              const isLiked = likedCases.has(caseId)
              const isDisliked = dislikedCases.has(caseId)
              
              return (
                <div key={index} className="case-card">
                  <div className="case-card-header">
                    <span className="case-card-number">{index + 1}</span>
                    <span className="case-card-category">{categoryNames[caseItem.category]}</span>
                  </div>
                  <h4 className="case-card-title">{caseItem.title}</h4>
                  <p className="case-card-description">{caseItem.description}</p>
                  <div className="case-card-actions">
                    <button 
                      className={`like-btn ${isLiked ? 'active' : ''}`}
                      onClick={() => {
                        const newLiked = new Set(likedCases)
                        const newDisliked = new Set(dislikedCases)
                        if (isLiked) {
                          newLiked.delete(caseId)
                        } else {
                          newLiked.add(caseId)
                          newDisliked.delete(caseId)
                        }
                        setLikedCases(newLiked)
                        setDislikedCases(newDisliked)
                      }}
                    >
                      ✓
                    </button>
                    <button 
                      className={`dislike-btn ${isDisliked ? 'active' : ''}`}
                      onClick={() => {
                        const newLiked = new Set(likedCases)
                        const newDisliked = new Set(dislikedCases)
                        if (isDisliked) {
                          newDisliked.delete(caseId)
                        } else {
                          newDisliked.add(caseId)
                          newLiked.delete(caseId)
                        }
                        setLikedCases(newLiked)
                        setDislikedCases(newDisliked)
                      }}
                    >
                      ✗
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}

export default CinquentaTonsIA
