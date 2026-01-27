import { useEffect, useState } from 'react'
import { Link, useSearchParams, useNavigate, useLocation } from 'react-router-dom'
import '../styles/design-system.css'
import '../styles/PropostaIADetalhe.css'

function PropostaIADetalhe() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const location = useLocation()
  const skipConcept = searchParams.get('skipConcept') === 'true'
  
  const [fullscreenContent, setFullscreenContent] = useState(null)
  const [expandedMechanic, setExpandedMechanic] = useState(0) // Nenhum card expandido por padrão
  const [expandedRiscos, setExpandedRiscos] = useState(false) // Controla o acordeon da Análise de Riscos
  const [navHeight, setNavHeight] = useState(0) // Altura do menu de navegação
  
  // Verifica se já viu o conceito
  const checkHasSeenConcept = () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('hasSeenConcept') === 'true'
    }
    return false
  }
  
  const initialHasSeenConcept = (() => {
    try {
      // Se skipConcept estiver na URL, pula o conceito
      if (skipConcept) return true
      return checkHasSeenConcept()
    } catch (error) {
      console.error('Erro ao verificar hasSeenConcept:', error)
      return false
    }
  })()
  
  const [hasSeenConcept, setHasSeenConcept] = useState(initialHasSeenConcept)
  const [currentSlide, setCurrentSlide] = useState(initialHasSeenConcept ? 8 : 0) // Pula o conceito se já viu
  const [typewriterText, setTypewriterText] = useState('') // Texto do efeito máquina de escrever
  const [isTyping, setIsTyping] = useState(false) // Controla se está digitando
  const [thesisTypewriterText, setThesisTypewriterText] = useState('') // Texto do efeito máquina de escrever na tese
  const [isTypingThesis, setIsTypingThesis] = useState(false) // Controla se está digitando a tese
  const [heroTitleText, setHeroTitleText] = useState('') // Texto do hero título
  const [heroSubtitleText, setHeroSubtitleText] = useState('') // Texto do hero subtítulo
  const [isTypingHero, setIsTypingHero] = useState(false) // Controla se está digitando o hero

  // Se skipConcept estiver na URL, pula direto para o conteúdo
  useEffect(() => {
    if (skipConcept && currentSlide < 8) {
      setCurrentSlide(8)
      setHasSeenConcept(true)
      if (typeof window !== 'undefined') {
        localStorage.setItem('hasSeenConcept', 'true')
      }
    }
  }, [skipConcept, currentSlide])

  useEffect(() => {
    // Smooth scroll para links de navegação
    const handleClick = (e) => {
      try {
        const href = e.target.getAttribute('href')
        if (href && href.startsWith('#')) {
          e.preventDefault()
          
          // Se estiver no storytelling, libera o scroll primeiro
          if (currentSlide < 8) {
            setCurrentSlide(8)
            setHasSeenConcept(true)
            if (typeof window !== 'undefined') {
              localStorage.setItem('hasSeenConcept', 'true')
            }
            // Aguarda a transição
            setTimeout(() => {
              const target = document.querySelector(href)
              if (target) {
                const nav = document.querySelector('.ia-nav')
                const navHeight = nav ? nav.offsetHeight : 0
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight
                
                window.scrollTo({
                  top: targetPosition,
                  behavior: 'smooth'
                })
              }
            }, 300)
          } else {
            const target = document.querySelector(href)
            if (target) {
              // Calcula offset considerando o header sticky
              const nav = document.querySelector('.ia-nav')
              const navHeight = nav ? nav.offsetHeight : 0
              const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight
              
              window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
              })
            }
          }
        }
      } catch (error) {
        console.error('Erro no handleClick:', error)
      }
    }

    try {
      document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', handleClick)
      })
    } catch (error) {
      console.error('Erro ao adicionar listeners:', error)
    }

    // Auto-libera scroll quando chegar no Hero (slide 7 - último)
    let finalTimer = null
    if (currentSlide === 7) {
      finalTimer = setTimeout(() => {
        // Salva que já viu o conceito
        if (typeof window !== 'undefined') {
          localStorage.setItem('hasSeenConcept', 'true')
          setHasSeenConcept(true)
        }
        
        // Muda para 8 para liberar scroll, mas o slide 7 permanece visível
        // Não faz scroll adicional para evitar o "quique" - mantém no topo (0,0)
        setCurrentSlide(8)
      }, 2000)
    }

    // Quando currentSlide = 8, libera o scroll mas mantém o slide 7 visível
    // Não força scroll para evitar o "coice"

    // Bloquear scroll vertical durante storytelling horizontal
    // Só adiciona listeners se estiver nos slides do storytelling (0-7)
    if (currentSlide < 8) {
      try {
        const storytellingSection = document.querySelector('.storytelling-section')
        if (storytellingSection) {
          const handleWheel = (e) => {
            try {
              if (currentSlide < 7) {
                e.preventDefault()
                // Converter scroll vertical em navegação horizontal
                if (e.deltaY > 0) {
                  if (currentSlide === 6) {
                    // Quando está no slide 6, vai para o Hero (slide 7)
                    setCurrentSlide(7)
                  } else {
                    setCurrentSlide(prev => Math.min(prev + 1, 7))
                  }
                } else if (e.deltaY < 0) {
                  setCurrentSlide(prev => Math.max(prev - 1, 0))
                }
              }
              // No slide 7 (Hero - último), bloqueia scroll até timer liberar
              else if (currentSlide === 7) {
                e.preventDefault()
              }
            } catch (error) {
              console.error('Erro no handleWheel:', error)
            }
          }
          
          storytellingSection.addEventListener('wheel', handleWheel, { passive: false })
          
          return () => {
            try {
              if (finalTimer) clearTimeout(finalTimer)
              storytellingSection.removeEventListener('wheel', handleWheel)
              document.querySelectorAll('a[href^="#"]').forEach(link => {
                link.removeEventListener('click', handleClick)
              })
            } catch (error) {
              console.error('Erro na limpeza:', error)
            }
          }
        }
      } catch (error) {
        console.error('Erro ao configurar storytelling:', error)
      }
    }

    return () => {
      if (finalTimer) clearTimeout(finalTimer)
      document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.removeEventListener('click', handleClick)
      })
    }
  }, [currentSlide])

  // Efeito máquina de escrever apenas no primeiro slide
  useEffect(() => {
    if (currentSlide !== 0) {
      setTypewriterText('') // Limpa quando sai do slide 0
      setIsTyping(false)
      return
    }

    const fullText = "Em 2005, a Globo criou uma campanha\nque marcou uma geração."
    setTypewriterText('')
    setIsTyping(true)
    
    let currentIndex = 0
    const typeInterval = setInterval(() => {
      if (currentIndex < fullText.length) {
        setTypewriterText(fullText.slice(0, currentIndex + 1))
        currentIndex++
      } else {
        setIsTyping(false)
        clearInterval(typeInterval)
      }
    }, 50) // Velocidade de digitação (50ms por caractere)

    return () => {
      clearInterval(typeInterval)
      setIsTyping(false)
    }
  }, [currentSlide])

  // Efeito máquina de escrever no slide 5 (Tese Final)
  useEffect(() => {
    if (currentSlide !== 5) {
      setThesisTypewriterText('') // Limpa quando sai do slide 5
      setIsTypingThesis(false)
      return
    }

    const fullText = "A forma mudou.\nO conteúdo permanece."
    setThesisTypewriterText('')
    setIsTypingThesis(true)
    
    let currentIndex = 0
    const typeInterval = setInterval(() => {
      if (currentIndex < fullText.length) {
        setThesisTypewriterText(fullText.slice(0, currentIndex + 1))
        currentIndex++
      } else {
        setIsTypingThesis(false)
        clearInterval(typeInterval)
      }
    }, 50) // Velocidade de digitação (50ms por caractere)

    return () => {
      clearInterval(typeInterval)
      setIsTypingThesis(false)
    }
  }, [currentSlide])

  // Scroll para o topo quando entra no Hero (slide 7)
  useEffect(() => {
    if (currentSlide === 7) {
      // Ancorar no topo (0,0) quando entra no Hero - instantâneo para evitar quique
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'auto'
      })
      
      // Garante que permanece no topo quando muda para 8
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'auto'
        })
      }, 100)
    }
    
    // Quando muda para 8, mantém no topo sem scroll suave
    if (currentSlide === 8) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'auto'
      })
    }
  }, [currentSlide])

  // Efeito máquina de escrever no hero (slide 7)
  useEffect(() => {
    if (currentSlide !== 7) {
      setHeroTitleText('')
      setHeroSubtitleText('')
      setIsTypingHero(false)
      return
    }

    const titleText = "Agentes\nse veem por aqui"
    const subtitleText = "Desafio de Inteligência Artificial para\nEstudantes Brasileiros"
    
    setHeroTitleText('')
    setHeroSubtitleText('')
    setIsTypingHero(true)
    
    let currentIndex = 0
    const typeInterval = setInterval(() => {
      if (currentIndex < titleText.length) {
        setHeroTitleText(titleText.slice(0, currentIndex + 1))
        currentIndex++
      } else if (currentIndex === titleText.length) {
        // Aguarda um pouco antes de começar o subtítulo
        setTimeout(() => {
          let subtitleIndex = 0
          const subtitleInterval = setInterval(() => {
            if (subtitleIndex < subtitleText.length) {
              setHeroSubtitleText(subtitleText.slice(0, subtitleIndex + 1))
              subtitleIndex++
            } else {
              setIsTypingHero(false)
              clearInterval(subtitleInterval)
            }
          }, 30) // Velocidade de digitação do subtítulo
        }, 500)
        clearInterval(typeInterval)
      }
    }, 50) // Velocidade de digitação do título

    return () => {
      clearInterval(typeInterval)
      setIsTypingHero(false)
    }
  }, [currentSlide])

  // Pausa o vídeo quando sai do slide 1
  useEffect(() => {
    if (currentSlide !== 1) {
      const iframe = document.getElementById('video-iframe')
      if (iframe) {
        // Pausa o vídeo removendo o src
        iframe.src = ''
      }
    }
  }, [currentSlide])

  // Calcula altura do menu de navegação para o sticky do acordeon
  useEffect(() => {
    const calculateNavHeight = () => {
      const nav = document.querySelector('.ia-nav')
      if (nav) {
        // O menu tem top: 5.5rem (88px), então precisamos somar isso à altura
        const navOffsetTop = 88 // 5.5rem em pixels
        setNavHeight(nav.offsetHeight + navOffsetTop)
      }
    }

    calculateNavHeight()
    window.addEventListener('resize', calculateNavHeight)

    return () => {
      window.removeEventListener('resize', calculateNavHeight)
    }
  }, [])

  // Scroll para hash quando a página carrega (ex: #item-5)
  useEffect(() => {
    if (location.hash) {
      const hash = location.hash.substring(1) // Remove o #
      // Aguarda o carregamento completo da página e do DOM
      const scrollToElement = () => {
        const element = document.getElementById(hash)
        if (element) {
          const nav = document.querySelector('.ia-nav')
          const navHeight = nav ? nav.offsetHeight : 0
          const header = document.querySelector('header')
          const headerHeight = header ? header.offsetHeight : 88
          
          // Calcula a posição considerando o header e a navegação
          const elementTop = element.getBoundingClientRect().top + window.pageYOffset
          const targetPosition = elementTop - navHeight - headerHeight - 20 // 20px de margem extra
          
          window.scrollTo({
            top: Math.max(0, targetPosition),
            behavior: 'smooth'
          })
        }
      }

      // Aguarda múltiplos eventos para garantir que o elemento esteja renderizado
      setTimeout(scrollToElement, 100)
      setTimeout(scrollToElement, 500)
      setTimeout(scrollToElement, 1000)
    }
  }, [location.hash, currentSlide])

  return (
    <div className="proposta-ia-page">
      {/* Storytelling Horizontal */}
      <section className={`storytelling-section ${currentSlide < 8 ? 'locked' : 'unlocked'} ${currentSlide === 8 ? 'unlocking' : ''}`}>
        <div className="storytelling-container">
          {/* Setas de navegação elegantes */}
          {currentSlide > 0 && currentSlide < 7 && (
            <button 
              className="storytelling-arrow storytelling-arrow-left"
              onClick={() => setCurrentSlide(currentSlide - 1)}
              aria-label="Anterior"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6"/>
              </svg>
            </button>
          )}
          {currentSlide < 7 && (
            <button 
              className="storytelling-arrow storytelling-arrow-right"
              onClick={() => {
                if (currentSlide === 6) {
                  // Quando está no slide 6, vai para o Hero (slide 7)
                  setCurrentSlide(7)
                } else {
                  setCurrentSlide(currentSlide + 1)
                }
              }}
              aria-label="Próximo"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </button>
          )}

          {/* Slide 0: Introdução */}
          <div className={`storytelling-slide ${currentSlide === 0 ? 'active' : ''}`}>
            <div className="storytelling-content">
              <p className="mote-intro-text">
                {typewriterText ? (
                  typewriterText.split('\n').map((line, index, array) => (
                    <span key={index}>
                      {line}
                      {index < array.length - 1 && <br />}
                    </span>
                  ))
                ) : null}
                {isTyping && (
                  <span className="typewriter-cursor">|</span>
                )}
              </p>
            </div>
          </div>

          {/* Slide 1: Vídeo 2005 - só vídeo */}
          <div className={`storytelling-slide ${currentSlide === 1 ? 'active' : ''}`}>
            <div className="storytelling-content">
              <div className="mote-image-placeholder">
                <div 
                  style={{ 
                    position: 'relative', 
                    paddingBottom: '56.25%', 
                    height: 0, 
                    overflow: 'hidden', 
                    width: '100%', 
                    maxWidth: '100%', 
                    cursor: 'pointer', 
                    background: '#000000'
                  }}
                  onClick={() => setFullscreenContent('video')}
                >
                  {currentSlide === 1 ? (
                    <iframe 
                      src="https://www.youtube.com/embed/Js7npBSwvd8?rel=0" 
                      style={{ 
                        position: 'absolute', 
                        top: 0, 
                        left: 0, 
                        width: '100%', 
                        height: '100%', 
                        border: 'none'
                      }}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen
                      title="Campanha 2005 - A gente se vê por aqui"
                      frameBorder="0"
                      id="video-iframe"
                    />
                  ) : null}
                </div>
                <div className="expand-icon">⛶</div>
              </div>
            </div>
          </div>

          {/* Slide 2: Legenda do vídeo 2005 */}
          <div className={`storytelling-slide ${currentSlide === 2 ? 'active' : ''}`}>
            <div className="storytelling-content">
              <div className="mote-caption">
                <span className="mote-year">2005</span>
                <p className="mote-quote">"A gente se vê por aqui"</p>
                <p className="mote-context">Uma forma. Uma tela. Um encontro.</p>
              </div>
            </div>
          </div>

          {/* Slide 3: Pergunta */}
          <div className={`storytelling-slide ${currentSlide === 3 ? 'active' : ''}`}>
            <div className="storytelling-content">
              <p className="mote-question-text">
                E se, 21 anos depois,<br />o mesmo conceito pudesse ser relido?
              </p>
            </div>
          </div>

          {/* Slide 4: Imagem 2026 - só imagem */}
          <div className={`storytelling-slide ${currentSlide === 4 ? 'active' : ''}`}>
            <div className="storytelling-content">
              <div className="mote-image-placeholder dark">
                <img 
                  src="/Globo2026.png" 
                  alt="Conceito 2026 - Agentes se veem por aqui" 
                  style={{ width: '100%', height: 'auto', maxWidth: '1000px', margin: '0 auto', display: 'block', cursor: 'pointer' }} 
                  onClick={() => setFullscreenContent('image')}
                />
                <div className="expand-icon">⛶</div>
              </div>
            </div>
          </div>

          {/* Slide 5: Tese Final */}
          <div className={`storytelling-slide ${currentSlide === 5 ? 'active' : ''}`}>
            <div className="storytelling-content">
              <div className="mote-thesis">
                <p className="thesis-text">
                  {thesisTypewriterText ? (
                    thesisTypewriterText.split('\n').map((line, index, array) => (
                      <span key={index}>
                        {line}
                        {index < array.length - 1 && <br />}
                      </span>
                    ))
                  ) : null}
                  {isTypingThesis && (
                    <span className="typewriter-cursor">|</span>
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* Slide 6: Contexto do conceito */}
          <div className={`storytelling-slide ${currentSlide === 6 ? 'active' : ''}`}>
            <div className="storytelling-content">
              <div className="mote-contexto">
                <h3 className="contexto-frame-title">O conceito em um frame</h3>
                <div className="contexto-grid">
                  <div className="contexto-item">
                    <div className="contexto-header">
                      <span className="contexto-numero">1</span>
                      <span className="contexto-tag">origem</span>
                      <strong className="contexto-titulo">Onde tudo começou</strong>
                    </div>
                    <p className="contexto-texto">Em 2005, a Globo se afirmava como um ponto de encontro do país. Um espaço onde o conteúdo conectava pessoas por meio de histórias, linguagens e experiências compartilhadas.</p>
                  </div>
                  <div className="contexto-item">
                    <div className="contexto-header">
                      <span className="contexto-numero">2</span>
                      <span className="contexto-tag">deslocamento temporal</span>
                      <strong className="contexto-titulo">O tempo passou</strong>
                    </div>
                    <p className="contexto-texto">Em 2025, esse encontro continua existindo. Mas o contexto mudou: as formas de criar, editar e distribuir conteúdo se transformaram.</p>
                  </div>
                  <div className="contexto-item">
                    <div className="contexto-header">
                      <span className="contexto-numero">3</span>
                      <span className="contexto-tag">personagens</span>
                      <strong className="contexto-titulo">Quem está em cena agora</strong>
                    </div>
                    <p className="contexto-texto">Hoje, o processo criativo envolve novos agentes. Pessoas, inteligências artificiais e sistemas que participam da criação, da mediação e da ampliação das narrativas.</p>
                  </div>
                  <div className="contexto-item">
                    <div className="contexto-header">
                      <span className="contexto-numero">4</span>
                      <span className="contexto-tag">tese central</span>
                      <strong className="contexto-titulo">O que não muda</strong>
                    </div>
                    <p className="contexto-texto">Mesmo com novas tecnologias, o centro permanece o mesmo. Conteúdo, narrativa e cultura seguem orientando as decisões criativas.</p>
                  </div>
                  <div className="contexto-item">
                    <div className="contexto-header">
                      <span className="contexto-numero">5</span>
                      <span className="contexto-tag">convite / futuro</span>
                      <strong className="contexto-titulo">Para onde estamos indo</strong>
                    </div>
                    <p className="contexto-texto">A chamada pública convida estudantes a explorar esse novo cenário, propondo ideias sobre como agentes humanos e artificiais podem criar juntos novas formas de conteúdo.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Slide 7: Hero - permanece visível mesmo quando currentSlide = 8 */}
          <div className={`storytelling-slide hero-slide ${currentSlide === 7 || currentSlide === 8 ? 'active' : ''}`}>
            <div className="storytelling-content">
              <div className="hero-content">
                <h1 className="hero-title" style={{ marginBottom: '2rem' }}>
                  {heroTitleText ? (
                    heroTitleText.split('\n').map((line, index) => (
                      <span key={index} style={{ fontSize: index === 0 ? '10rem' : '7rem', whiteSpace: index === 1 ? 'nowrap' : 'normal' }}>
                        {line}
                        {index < heroTitleText.split('\n').length - 1 && <br />}
                      </span>
                    ))
                  ) : (
                    <>
                      <span style={{ fontSize: '10rem' }}>Agentes</span><br />
                      <span style={{ fontSize: '7rem', whiteSpace: 'nowrap' }}>se veem por aqui</span>
                    </>
                  )}
                  {isTypingHero && <span className="typewriter-cursor">|</span>}
                </h1>
                <p className="hero-subtitle" style={{ marginBottom: '2rem' }}>
                  {heroSubtitleText ? (
                    <>
                      {heroSubtitleText.split('\n').map((line, index) => (
                        <span key={index}>
                          {line}
                          {index < heroSubtitleText.split('\n').length - 1 && <br />}
                        </span>
                      ))}
                      {isTypingHero && <span className="typewriter-cursor">|</span>}
                    </>
                  ) : (
                    <>
                      Desafio de Inteligência Artificial para<br />Estudantes Brasileiros
                    </>
                  )}
                </p>
                {/* Seta indicando que a navegação continua para baixo - só aparece no slide 6 */}
                {currentSlide === 6 && (
                  <button 
                    className="scroll-down-indicator"
                    onClick={() => {
                      setCurrentSlide(7)
                      // Aguarda um pouco e faz scroll suave para a navegação principal
                      setTimeout(() => {
                        const nav = document.querySelector('.ia-nav')
                        if (nav) {
                          // Posiciona a navegação logo abaixo do header principal
                          const header = document.querySelector('header')
                          const headerHeight = header ? header.offsetHeight : 88
                          const targetPosition = nav.getBoundingClientRect().top + window.scrollY - headerHeight
                          window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                          })
                        }
                      }, 300)
                    }}
                    style={{ 
                      background: 'none', 
                      border: 'none', 
                      cursor: 'pointer', 
                      padding: 0,
                      margin: '2rem auto 0',
                      display: 'block'
                    }}
                    aria-label="Continuar"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 5v14M19 12l-7 7-7-7"/>
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Indicadores de navegação (bolinhas) */}
          {currentSlide < 7 && (
            <div className="storytelling-indicators">
              {[0, 1, 2, 3, 4, 5, 6, 7].map((index) => (
                <button
                  key={index}
                  className={`storytelling-indicator ${currentSlide === index ? 'active' : ''}`}
                  onClick={() => setCurrentSlide(index)}
                  aria-label={`Ir para slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Layer de transição - conceito foi apenas para inspirar - abaixo do hero */}
      <div className="hero-section" style={{ minHeight: 'auto', padding: '12rem 15.68rem', background: '#000000', borderBottom: '2px solid #000000' }}>
        <div className="hero-content" style={{ textAlign: 'center' }}>
          <p className="section-title" style={{ 
            fontSize: '2.5rem', 
            marginBottom: '2rem', 
            color: '#ffffff', 
            fontWeight: 300, 
            lineHeight: '1.4',
            letterSpacing: '-0.02em',
            borderBottom: 'none',
            maxWidth: '900px',
            margin: '0 auto'
          }}>
            Esse conceito foi criado apenas para nos inspirar a trabalhar no projeto. Não há necessidade de utilizá-lo.
          </p>
          {/* Seta indicando que a navegação continua para baixo */}
          <button 
            className="scroll-down-indicator"
            onClick={() => {
              const nav = document.querySelector('.ia-nav')
              if (nav) {
                // Posiciona a navegação logo abaixo do header principal
                const header = document.querySelector('header')
                const headerHeight = header ? header.offsetHeight : 88
                const targetPosition = nav.getBoundingClientRect().top + window.scrollY - headerHeight
                window.scrollTo({
                  top: targetPosition,
                  behavior: 'smooth'
                })
              }
            }}
            style={{ 
              background: 'transparent', 
              border: 'none', 
              outline: 'none',
              cursor: 'pointer', 
              padding: 0,
              margin: '2rem auto 0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 'auto',
              height: 'auto',
              color: '#ffffff'
            }}
            aria-label="Continuar"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ display: 'block' }}>
              <path d="M12 5v14M19 12l-7 7-7-7"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="ia-nav">
        <div className="nav-content">
          <div className="nav-brand">DESAFIO GLOBO<br />IA PARA CONTEÚDO</div>
          <div className="nav-links-wrapper">
            <ul className="nav-links">
            <li><a href="#jornada" className="nav-link">Nosso Processo</a></li>
            <li><a href="#opcoes" className="nav-link">Formato do desafio</a></li>
            <li><a href="#proposta" className="nav-link">Proposta operacional</a></li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Section 1: Nosso Processo */}
      <section id="jornada" className="section">
        <div>
          <div className="section-header">
            <div className="section-number">01</div>
            <h2 className="section-title">Nosso Processo</h2>
          </div>

          <div className="journey-timeline">
            {/* Brainstorming sobre riscos */}
            <div className={`journey-step ${!expandedRiscos ? 'riscos-closed' : 'riscos-open'}`} style={{ position: 'relative' }}>
              <div style={{ position: 'relative' }}>
                <div 
                  className={expandedRiscos ? 'riscos-header-sticky' : ''}
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between', 
                    marginBottom: '1.25rem',
                    position: expandedRiscos ? 'sticky' : 'relative',
                    top: expandedRiscos ? `${navHeight}px` : 'auto',
                    background: expandedRiscos ? '#f5f5f5' : 'transparent',
                    padding: expandedRiscos ? '1rem 0' : '0',
                    zIndex: expandedRiscos ? 98 : 'auto',
                    borderBottom: expandedRiscos ? '1px solid #cccccc' : 'none',
                    marginTop: expandedRiscos ? '0' : '0'
                  }}
                >
                  <h3 className="journey-title" style={{ marginBottom: 0 }}>1. Fizemos um Brainstorming sobre riscos</h3>
                  <span 
                    className="mechanic-expand-icon"
                    onClick={() => setExpandedRiscos(!expandedRiscos)}
                    style={{ cursor: 'pointer', color: expandedRiscos ? '#000000' : '#ffffff' }}
                    aria-label={expandedRiscos ? 'Fechar Brainstorming sobre riscos' : 'Abrir Brainstorming sobre riscos'}
                  >
                    {expandedRiscos ? '−' : '+'}
                  </span>
                </div>
                <p className="journey-description">
                  IA aplicada a conteúdo é um território de tensões.<br />Reconhecemos essas complexidades como parte fundamental do desafio.
                </p>
                
                {/* Conteúdo expandido: Brainstorming sobre riscos */}
                {expandedRiscos && (
                  <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid #cccccc' }}>
                      <div className="cards-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                        <div className="card">
                          <h3 className="card-title">Tabu do Tema</h3>
                          <p className="card-description">
                            IA na produção de conteúdo envolve questões sensíveis: substituição de empregos, papel dos sindicatos, ética criativa.
                          </p>
                        </div>

                        <div className="card">
                          <h3 className="card-title">Proteção Estratégica</h3>
                          <p className="card-description">
                            A Globo não pode revelar roadmap interno ou gaps tecnológicos.<br />O desafio precisa ser específico sem expor estratégia.
                          </p>
                        </div>

                        <div className="card">
                          <h3 className="card-title">Risco Reputacional</h3>
                          <p className="card-description">
                            O mercado pode interpretar mal a iniciativa se não for comunicada com clareza sobre IA como ferramenta, não substituto.
                          </p>
                        </div>

                        <div className="card">
                          <h3 className="card-title">Lastro Técnico</h3>
                          <p className="card-description">
                            Evitar hipóteses superficiais.<br />Exigir propostas com fundamento técnico, prototipação e viabilidade demonstrável.
                          </p>
                        </div>

                        <div className="card">
                          <h3 className="card-title">Complexidade Operacional</h3>
                          <p className="card-description">
                            A mecânica precisa ser clara e executável, evitando overengineering que afaste participantes.
                          </p>
                        </div>

                        <div className="card">
                          <h3 className="card-title">Humano vs Artificial</h3>
                          <p className="card-description">
                            Diferenciar claramente talentos humanos de talentos artificiais.<br />IA expande formas, não substitui criatividade.
                          </p>
                        </div>

                        <div className="card">
                          <h3 className="card-title">Camadas Jurídicas</h3>
                          <p className="card-description">
                            Direitos autorais, consentimento de imagem de talentos, proteção de dados (LGPD), acordos sindicais.<br />A <span 
                            onClick={() => { 
                              setFullscreenContent('netflix');
                            }} 
                            style={{ textDecoration: 'underline', cursor: 'pointer', color: 'inherit' }}
                          >
                            Netflix desenvolveu um framework público
                          </span> para uso de IA na produção de conteúdo que identifica níveis de risco e aprovação necessária para cada caso, servindo como referência para análise jurídica e ética de propostas.
                          </p>
                        </div>
                      </div>
                    </div>
                )}
            </div>
            </div>

            <div className="journey-step">
              <h3 className="journey-title">2. Criamos o Conceito do Desafio: "Agentes se veem por aqui"</h3>
              <p className="journey-description">
                Em 2005, a Globo lançou uma campanha institucional marcante: "A gente se vê por aqui". Era a era da TV linear, uma forma, uma tela, um ponto de encontro.
              </p>
              <p className="journey-description">
                <strong>Relemos esse conceito para 2026: "Agentes se veem por aqui". Múltiplas formas, múltiplas telas, múltiplos agentes. A mensagem central: as formas de distribuir conteúdo evoluíram drasticamente, mas o conteúdo de qualidade continua sendo o DNA da Globo. IA expande as possibilidades de formato e alcance, não substitui a criação humana.</strong>
              </p>
              <div style={{ marginTop: '2rem' }}>
                <Link
                  to="/propostas/8"
                  className="cta-button"
                  onClick={() => {
                    // Remove o flag do localStorage
                    if (typeof window !== 'undefined') {
                      localStorage.removeItem('hasSeenConcept')
                    }
                  }}
                  style={{ textDecoration: 'none', display: 'inline-block' }}
                >
                  Ver conceito de trabalho →
                </Link>
              </div>
            </div>

            <div className="journey-step">
              <h3 className="journey-title">3. Discutimos hipóteses "mais sofisticadas" de desafio</h3>
              <p className="journey-description">
                Com o conceito do desafio definido, começamos a imaginar o desafio em si. Testamos ideias sofisticadas:
              </p>
              <ul className="journey-sublist">
                <li>E se a própria IA avaliasse as submissões automaticamente usando critérios da Globo?</li>
                <li>E se tokenizássemos as propostas para conectar participantes com ideias complementares, formando equipes através de algoritmos?</li>
                <li>E se os participantes experimentassem IA no próprio fluxo de submissão, vivenciando na prática o que estão propondo?</li>
              </ul>
              <p className="journey-description">
                A empolgação era alta: criar um processo "meta" onde IA seria usada para coletar ideias sobre IA.
              </p>
            </div>

            <div className="journey-step">
              <h3 className="journey-title">4. Reconhecemos os Riscos e Voltamos ao Básico</h3>
              <p className="journey-description">
                Ao detalhar essas mecânicas, percebemos problemas. A complexidade técnica (IA avaliadora, tokenização) poderia intimidar participantes ao invés de encorajá-los. Pior: corríamos o risco de desviar o foco. O objetivo central é coletar boas propostas de uso de IA, não impressionar com engenharia sofisticada.
              </p>
              <p className="journey-description">
                Overengineering é tentador, mas raramente agrega valor proporcional à complexidade que cria.
              </p>
              <p className="journey-description">
                Demos um passo atrás e fizemos perguntas fundamentais:
              </p>
              <ul className="journey-sublist">
                <li>O que a Globo realmente precisa deste desafio?</li>
                <li>Como garantir que propostas tenham lastro técnico (não apenas hipóteses vagas)?</li>
                <li>Como dar liberdade criativa sem perder controle estratégico?</li>
                <li>Como proteger a marca e evitar que o desafio seja mal interpretado publicamente?</li>
              </ul>
              <p className="journey-description">
                Durante essa reflexão, identificamos a necessidade de critérios claros para avaliar propostas, considerando aspectos técnicos, éticos e jurídicos.
              </p>
            </div>

            <div id="item-5" className="journey-step">
              <h3 className="journey-title">5. Simulamos o Território de Propostas (Contrainteligência)</h3>
              <p className="journey-description">
                Sabendo que participantes usarão IA para propor aplicações de IA, fizemos um exercício de contrainteligência: simulamos com IA que tipos de propostas virão.
              </p>
              <p className="journey-description">
                Resultado: mapeamos 50 casos de uso distribuídos em 5 categorias (Pré-Produção, Produção, Pós-Produção, Acervo, Distribuição). Cada caso foi pré-calibrado para:
              </p>
              <ul className="journey-sublist">
                <li>Não substituir talentos criativos</li>
                <li>Ser tecnicamente viável</li>
                <li>Não expor estratégia da Globo</li>
                <li>Respeitar questões éticas e jurídicas</li>
              </ul>
              <p className="journey-description">
                Essa simulação nos permitiu antecipar áreas sensíveis e criar guardrails antes de abrir o desafio.
              </p>
              <div style={{ marginTop: '2rem' }}>
                <Link 
                  to="/propostas/8/50-tons-ia#top"
                  state={{ from: '/propostas/8#item-5' }}
                  className="cta-button"
                >
                  Ver 50 tons de IA →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Layer de transição - estilo hero elegante */}
      <div id="transition-layer" className="hero-section" style={{ minHeight: 'auto', padding: '12rem 15.68rem', background: '#000000', borderBottom: '2px solid #000000' }}>
        <div className="hero-content" style={{ textAlign: 'center' }}>
          <p className="section-title" style={{ 
            fontSize: '2.5rem', 
            marginBottom: 0, 
            color: '#ffffff', 
            fontWeight: 300, 
            lineHeight: '1.4',
            letterSpacing: '-0.02em',
            borderBottom: 'none',
            maxWidth: '900px',
            margin: '0 auto'
          }}>
            Com base nesse processo de análise preliminar, construímos dois entregáveis.
          </p>
        </div>
      </div>

      {/* Section 2: As Opções */}
      <section id="opcoes" className="section">
        <div>
          <div className="section-header">
            <div className="section-number">02</div>
            <h2 className="section-title">Entregável #1: Formato do desafio</h2>
            <p className="section-description" style={{ marginBottom: '0.5rem' }}>
              Analisamos 5 abordagens diferentes, avaliando prós, contras e adequação aos objetivos.
            </p>
            <p className="section-description" style={{ marginTop: '0', marginBottom: '3rem', color: '#000000', fontWeight: 700 }}>
              Nossa recomendação é pela opção 5 <strong>da lista abaixo</strong>
            </p>
          </div>

          <div className="mechanics-cards">
            {/* Card: Totalmente Aberto */}
            <div className={`mechanic-card ${expandedMechanic === 1 ? 'expanded' : ''}`}>
              <div 
                className="mechanic-card-header"
                onClick={() => setExpandedMechanic(expandedMechanic === 1 ? 0 : 1)}
                style={{ cursor: 'pointer' }}
              >
                <div className="mechanic-number">01</div>
                <h3 className="mechanic-card-title">Totalmente Aberto: "O que você propõe que a Globo<br />faça com IA?"</h3>
                <span className="mechanic-expand-icon">{expandedMechanic === 1 ? '−' : '+'}</span>
              </div>
              <p className="mechanic-card-description">
                Chamada ampla sem categorias pré-definidas, máxima abertura criativa
              </p>

              <div className={`pros-cons ${expandedMechanic === 1 ? 'expanded' : 'collapsed'}`}>
                <div className="pros">
                  <h4 className="pros-title">Vantagens</h4>
                  <ul>
                    <li>Máxima criatividade - pode surgir ideias inovadoras</li>
                    <li>Baixa complexidade operacional</li>
                    <li>Inclusivo para todos os perfis</li>
                    <li>Marketing positivo (demonstra abertura da Globo)</li>
                    <li>Coleta massiva de propostas</li>
                  </ul>
                </div>
                <div className="cons">
                  <h4 className="cons-title">Desafios</h4>
                  <ul>
                    <li>Dispersão total de temas e abordagens</li>
                    <li>Qualidade baixa (muitas propostas hipotéticas)</li>
                    <li>Sobrecarga de curadoria</li>
                    <li>Risco reputacional ALTO (propostas polêmicas ganham visibilidade)</li>
                    <li>Expectativa frustrada dos participantes</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Card: Semi-Aberto */}
            <div className={`mechanic-card ${expandedMechanic === 2 ? 'expanded' : ''}`}>
              <div 
                className="mechanic-card-header"
                onClick={() => setExpandedMechanic(expandedMechanic === 2 ? 0 : 2)}
                style={{ cursor: 'pointer' }}
              >
                <div className="mechanic-number">02</div>
                <h3 className="mechanic-card-title">Semi-Aberto: Propostas dentro de Categorias</h3>
                <span className="mechanic-expand-icon">{expandedMechanic === 2 ? '−' : '+'}</span>
              </div>
              <p className="mechanic-card-description">
                5 categorias pré-definidas, participantes escolhem uma e propõem livremente dentro dela
              </p>

              <div className={`pros-cons ${expandedMechanic === 2 ? 'expanded' : 'collapsed'}`}>
                <div className="pros">
                  <h4 className="pros-title">Vantagens</h4>
                  <ul>
                    <li>Direcionamento sem engessamento</li>
                    <li>Facilita curadoria (bancas especializadas por categoria)</li>
                    <li>Comunicação clara do escopo</li>
                    <li>Protege áreas sensíveis</li>
                    <li>Permite modularidade (categorias em ondas)</li>
                  </ul>
                </div>
                <div className="cons">
                  <h4 className="cons-title">Desafios</h4>
                  <ul>
                    <li>Complexidade média de explicação</li>
                    <li>Risco de concentração em categorias "fáceis"</li>
                    <li>Ainda permite propostas polêmicas dentro das categorias</li>
                    <li>Requer framework de avaliação diferente por categoria</li>
                    <li>Possível frustração se ideia não se encaixa</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Card: Desafios Específicos */}
            <div className={`mechanic-card ${expandedMechanic === 3 ? 'expanded' : ''}`}>
              <div 
                className="mechanic-card-header"
                onClick={() => setExpandedMechanic(expandedMechanic === 3 ? 0 : 3)}
                style={{ cursor: 'pointer' }}
              >
                <div className="mechanic-number">03</div>
                <h3 className="mechanic-card-title">Desafios Específicos: Resolva 1 dos 3 Desafios</h3>
                <span className="mechanic-expand-icon">{expandedMechanic === 3 ? '−' : '+'}</span>
              </div>
              <p className="mechanic-card-description">
                Globo apresenta 3 desafios concretos, participantes escolhem um e desenvolvem solução
              </p>

              <div className={`pros-cons ${expandedMechanic === 3 ? 'expanded' : 'collapsed'}`}>
                <div className="pros">
                  <h4 className="pros-title">Vantagens</h4>
                  <ul>
                    <li>Máximo controle (Globo define exatamente o que quer)</li>
                    <li>Qualidade alta (propostas focadas e comparáveis)</li>
                    <li>Proteção estratégica (não expõe áreas sensíveis)</li>
                    <li>Curadoria eficiente (critérios claros)</li>
                    <li>Implementação viável (fit claro com necessidade)</li>
                    <li>Critérios de avaliação claros e validados</li>
                  </ul>
                </div>
                <div className="cons">
                  <h4 className="cons-title">Desafios</h4>
                  <ul>
                    <li>Criatividade limitada (não captura ideias fora dos desafios)</li>
                    <li>Complexidade de definição (Globo precisa escolher e detalhar)</li>
                    <li>Risco de vazamento (desafios podem revelar gaps)</li>
                    <li>Menos participantes (requer mais expertise técnica)</li>
                    <li>Rigidez (difícil ajustar após lançamento)</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Card: Hackathon */}
            <div className={`mechanic-card ${expandedMechanic === 4 ? 'expanded' : ''}`}>
              <div 
                className="mechanic-card-header"
                onClick={() => setExpandedMechanic(expandedMechanic === 4 ? 0 : 4)}
                style={{ cursor: 'pointer' }}
              >
                <div className="mechanic-number">04</div>
                <h3 className="mechanic-card-title">Hackathon com Imersão: 2 Semanas de Residência</h3>
                <span className="mechanic-expand-icon">{expandedMechanic === 4 ? '−' : '+'}</span>
              </div>
              <p className="mechanic-card-description">
                Seleção prévia + residência presencial com dados e mentoria
              </p>

              <div className={`pros-cons ${expandedMechanic === 4 ? 'expanded' : 'collapsed'}`}>
                <div className="pros">
                  <h4 className="pros-title">Vantagens</h4>
                  <ul>
                    <li>Máxima qualidade (soluções testadas com dados reais)</li>
                    <li>Networking valioso (Globo conhece talentos de perto)</li>
                    <li>Prototipação real (entregáveis funcionais)</li>
                    <li>Controle total (ambiente controlado)</li>
                    <li>Aprendizado mútuo (Globo aprende também)</li>
                    <li>Implementação rápida (soluções prontas para produção)</li>
                  </ul>
                </div>
                <div className="cons">
                  <h4 className="cons-title">Desafios</h4>
                  <ul>
                    <li>Complexidade ALTA (logística pesada)</li>
                    <li>Custo elevado (infraestrutura, alimentação, prêmios)</li>
                    <li>Alcance limitado (30-50 participantes presenciais)</li>
                    <li>Tempo de preparação (3-6 meses)</li>
                    <li>Risco de exposição (participantes veem operações internas)</li>
                    <li>NDAs e complexidade jurídica</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Card: Híbrido */}
            <div className={`mechanic-card featured ${expandedMechanic === 5 ? 'expanded' : ''}`}>
              <div 
                className="mechanic-card-header"
                onClick={() => setExpandedMechanic(expandedMechanic === 5 ? 0 : 5)}
                style={{ cursor: 'pointer' }}
              >
                <div className="mechanic-number">05</div>
                <h3 className="mechanic-card-title">Híbrido: Fase 1 Semi-Aberta + Fase 2 Fechada</h3>
                <span className="mechanic-badge">Recomendado</span>
                <span className="mechanic-expand-icon">{expandedMechanic === 5 ? '−' : '+'}</span>
              </div>
              <p className="mechanic-card-description">
                Fase 1 com categorias (coleta massiva) + Fase 2 com desafios específicos (qualidade técnica)
              </p>

              <div className={`pros-cons ${expandedMechanic === 5 ? 'expanded' : 'collapsed'}`}>
                <div className="pros">
                  <h4 className="pros-title">Vantagens</h4>
                  <ul>
                    <li>Balanceamento ótimo entre coleta massiva e qualidade final</li>
                    <li>Funil eficiente que filtra ideias em etapas</li>
                    <li>Flexibilidade para ajustar mecânica entre fases</li>
                    <li>Engajamento alto (Fase 1 inclusiva, Fase 2 seletiva)</li>
                    <li>Controle progressivo de risco</li>
                    <li>Narrativa positiva: "Escutamos todos, aprofundamos com melhores"</li>
                  </ul>
                </div>
                <div className="cons">
                  <h4 className="cons-title">Desafios</h4>
                  <ul>
                    <li>Complexidade de gestão (duas mecânicas diferentes)</li>
                    <li>Tempo estendido (processo pode levar 3-4 meses)</li>
                    <li>Comunicação desafiadora na transição entre fases</li>
                    <li>Possível frustração de quem não passa para Fase 2</li>
                    <li>Custo moderado (mais que aberto, menos que hackathon)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Tabela Resumo - 5 Abordagens */}
          <div className="proposal-summary-table" style={{ marginTop: '4rem' }}>
            <h3 className="summary-table-title">Resumo das 5 Abordagens de Desafio</h3>
            <table className="summary-table" style={{ tableLayout: 'fixed' }}>
              <thead>
                <tr>
                  <th style={{ width: '5%' }}>#</th>
                  <th style={{ width: '25%' }}>Abordagem</th>
                  <th style={{ width: '30%' }}>Descrição</th>
                  <th style={{ width: '40%' }}>Características</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>01</strong></td>
                  <td><strong>Totalmente Aberto</strong></td>
                  <td>"O que você propõe que a Globo faça com IA?"</td>
                  <td>Chamada ampla sem categorias pré-definidas, máxima abertura criativa</td>
                </tr>
                <tr>
                  <td><strong>02</strong></td>
                  <td><strong>Semi-Aberto</strong></td>
                  <td>Propostas dentro de Categorias</td>
                  <td>5 categorias pré-definidas, participantes escolhem uma e propõem livremente dentro dela</td>
                </tr>
                <tr>
                  <td><strong>03</strong></td>
                  <td><strong>Desafios Específicos</strong></td>
                  <td>Resolva 1 dos 3 Desafios</td>
                  <td>Globo apresenta 3 desafios concretos, participantes escolhem um e desenvolvem solução</td>
                </tr>
                <tr>
                  <td><strong>04</strong></td>
                  <td><strong>Hackathon com Imersão</strong></td>
                  <td>2 Semanas de Residência</td>
                  <td>Seleção prévia + residência presencial com dados e mentoria</td>
                </tr>
                <tr>
                  <td><strong>05</strong></td>
                  <td><strong>Híbrido (Recomendado)</strong></td>
                  <td>Fase 1 Semi-Aberta + Fase 2 Fechada</td>
                  <td>Fase 1 com categorias (coleta massiva) + Fase 2 com desafios específicos (qualidade técnica)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Section 3: A Proposta */}
      <section id="proposta" className="section">
        <div>
          <div className="section-header">
            <div className="section-number">03</div>
            <h2 className="section-title">Entregável #2: Proposta operacional do desafio</h2>
            <p className="section-description">
              Nossa recomendação fundamentada: começar pela Fase 0 de construção do conceito do desafio, seguida de mecânica híbrida em 2 fases.
            </p>
          </div>

          <div className="proposal-phases">
            <div className="phase">
              <div className="phase-header">
                <div>
                  <span className="phase-number">0</span>
                  <h3 className="phase-title">Construção do Conceito do Desafio</h3>
                </div>
                <div className="phase-duration">2 semanas</div>
              </div>
              <p className="phase-description">
                Trabalho colaborativo para definir conceito do desafio, recorte temático, mecânica detalhada e diretrizes de comunicação.<br />Esta fase é obrigatória e garante alinhamento estratégico antes da execução.
              </p>
              <div className="phase-deliverables">
                <h4>Entregas Principais:</h4>
                <ul>
                  <li>Definição de categorias ou desafios específicos</li>
                  <li>Framework de avaliação (matriz de riscos com critérios claros de aprovação) - será usado durante a análise das ideias recebidas</li>
                  <li>Diretrizes de comunicação e mitigação de riscos</li>
                  <li>Documento de Definição do Desafio (aprovado pela Globo)</li>
                </ul>
              </div>
            </div>

            <div className="phase">
              <div className="phase-header">
                <div>
                  <span className="phase-number">1</span>
                  <h3 className="phase-title">Lançamento (Processo Seletivo)</h3>
                </div>
                <div className="phase-duration">6 semanas</div>
              </div>
              <p className="phase-description">
                Participantes escolhem uma categoria e submetem proposta escrita + vídeo pitch.<br />A avaliação utiliza critérios claros para classificar riscos e viabilidade.<br />Top 30 selecionados (6 por categoria).
              </p>
              <div className="phase-deliverables">
                <h4>Entregas Principais:</h4>
                <ul>
                  <li>Plataforma de submissão funcional</li>
                  <li>Base de dados de propostas validadas</li>
                  <li>Relatório de distribuição por categoria</li>
                  <li>Lista de 30 finalistas</li>
                </ul>
              </div>
            </div>

            <div className="phase">
              <div className="phase-header">
                <div>
                  <span className="phase-number">2</span>
                  <h3 className="phase-title">Prototipação (Fechada)</h3>
                  <p style={{ fontSize: '1.125rem', fontWeight: 400, color: '#000000', marginTop: '0.5rem', marginBottom: 0 }}>
                    <span className="mentoria-underline">Com mentoria de profissionais Globo</span>
                  </p>
                </div>
                <div className="phase-duration">8 semanas</div>
              </div>
              <p className="phase-description">
                Globo revela desafio concreto para cada categoria.<br />Finalistas desenvolvem protótipo funcional com acesso a dados anonimizados, mentoria técnica e mentoria de profissionais Globo.<br />1 vencedor por categoria = 5 implementações piloto.
              </p>
              <div className="phase-deliverables">
                <h4>Entregas Principais:</h4>
                <ul>
                  <li>5 protótipos funcionais</li>
                  <li>Documentação técnica completa</li>
                  <li>Relatório de avaliação</li>
                  <li>5 vencedores selecionados para implementação</li>
                </ul>
              </div>
            </div>

            <div className="phase">
              <div className="phase-header">
                <div>
                  <span className="phase-number">3</span>
                  <h3 className="phase-title">Banca</h3>
                </div>
                <div className="phase-duration">2 semanas</div>
              </div>
              <p className="phase-description">
                Avaliação dos protótipos por banca técnica e executiva da Globo.<br />Seleção dos 5 vencedores (1 por categoria) para implementação piloto.
              </p>
              <div className="phase-deliverables">
                <h4>Entregas Principais:</h4>
                <ul>
                  <li>Relatório de avaliação dos protótipos</li>
                  <li>Seleção dos 5 vencedores</li>
                  <li>Feedback estruturado para participantes</li>
                </ul>
              </div>
            </div>

            <div className="phase">
              <div className="phase-header">
                <div>
                  <span className="phase-number">4</span>
                  <h3 className="phase-title">Implementação (Opcional)</h3>
                </div>
                <div className="phase-duration">12 semanas</div>
              </div>
              <p className="phase-description">
                Vencedores trabalham com equipes Globo para implementar soluções em produção.<br />Possibilidade de contratação, publicação de cases e reconhecimento público.
              </p>
              <div className="phase-deliverables">
                <h4>Entregas Principais:</h4>
                <ul>
                  <li>Soluções implementadas em produção</li>
                  <li>Cases publicados</li>
                  <li>Oportunidades de contratação para talentos</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="proposal-why">
            <h3 className="why-title">Por que preferimos essa versão:</h3>
            <ul className="why-list">
              <li>
                <span className="why-icon">✓</span>
                <span><strong>Controla risco progressivamente:</strong> Fase 0 alinha expectativas, Fase 1 testa território, Fase 2 valida qualidade</span>
              </li>
              <li>
                <span className="why-icon">✓</span>
                <span><strong>Mantém alcance e inclusão:</strong> Fase 1 aberta permite participação ampla</span>
              </li>
              <li>
                <span className="why-icon">✓</span>
                <span><strong>Garante qualidade final:</strong> Fase 2 exige protótipo funcional</span>
              </li>
              <li>
                <span className="why-icon">✓</span>
                <span><strong>Permite ajustes:</strong> Pode refinar categorias/desafios após Fase 1</span>
              </li>
              <li>
                <span className="why-icon">✓</span>
                <span><strong>Narrativa positiva:</strong> "Escuta ampla + rigor técnico"</span>
              </li>
              <li>
                <span className="why-icon">✓</span>
                <span><strong>Viabiliza implementação:</strong> Soluções reais para problemas reais</span>
              </li>
            </ul>
          </div>

          <div className="proposal-summary-table">
            <h3 className="summary-table-title">Resumo das Fases</h3>
            <table className="summary-table">
              <thead>
                <tr>
                  <th>Fase</th>
                  <th>Duração</th>
                  <th>Objetivo Principal</th>
                  <th>Entregas</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>0. Construção do Conceito do Desafio</strong></td>
                  <td>2 semanas</td>
                  <td>Definir conceito do desafio, recorte temático, mecânica e diretrizes</td>
                  <td>Framework de avaliação, diretrizes, documento aprovado</td>
                </tr>
                <tr>
                  <td><strong>1. Lançamento (Processo Seletivo)</strong></td>
                  <td>6 semanas</td>
                  <td>Coleta massiva de propostas por categorias</td>
                  <td>30 finalistas selecionados (6 por categoria)</td>
                </tr>
                <tr>
                  <td><strong>2. Prototipação (Fechada)</strong><br /><span style={{ fontSize: '0.75rem', fontWeight: 300, color: '#666666', fontStyle: 'italic' }}>Com mentoria de profissionais Globo</span></td>
                  <td>8 semanas</td>
                  <td>Desenvolvimento de protótipos funcionais</td>
                  <td>5 protótipos funcionais, documentação técnica</td>
                </tr>
                <tr>
                  <td><strong>3. Banca</strong></td>
                  <td>2 semanas</td>
                  <td>Avaliação técnica e executiva dos protótipos</td>
                  <td>5 vencedores selecionados (1 por categoria)</td>
                </tr>
                <tr>
                  <td><strong>4. Implementação (Opcional)</strong></td>
                  <td>12 semanas</td>
                  <td>Implementação das soluções em produção</td>
                  <td>Soluções em produção, cases publicados</td>
                </tr>
                <tr className="summary-table-total-row" style={{ background: '#000000', color: '#ffffff', fontWeight: 400 }}>
                  <td><strong>Duração Total Aproximada</strong></td>
                  <td><strong>30 semanas (~7 meses)</strong></td>
                  <td colSpan="2"></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Footer / CTA */}
      <section className="footer-section">
        <div>
          <div className="footer-content">
            <h2 className="footer-title">Próximos Passos</h2>
            <p className="footer-description">
              Após validar conceito e linha de trabalho, definiremos uma proposta comercial.
            </p>
            <Link to="/propostas" className="cta-button">
              ← Voltar para Propostas
            </Link>
          </div>
        </div>
      </section>

      {/* Fullscreen Modal */}
      {fullscreenContent && (
        <div 
          className="fullscreen-modal" 
          onClick={() => setFullscreenContent(null)}
        >
          <button 
            className="fullscreen-close"
            onClick={(e) => {
              e.stopPropagation()
              setFullscreenContent(null)
            }}
          >
            ✕
          </button>
          <div className="fullscreen-content" onClick={(e) => e.stopPropagation()}>
            {fullscreenContent === 'video' && (
              <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, width: '100%', maxWidth: '90vw' }}>
                <iframe 
                  src="https://www.youtube.com/embed/Js7npBSwvd8?rel=0&autoplay=1" 
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                  title="Campanha 2005 - A gente se vê por aqui"
                  frameBorder="0"
                />
              </div>
            )}
            {fullscreenContent === 'image' && (
              <img 
                src="/Globo2026.png" 
                alt="Conceito 2026 - Agentes se veem por aqui" 
                style={{ maxWidth: '90vw', maxHeight: '90vh', width: 'auto', height: 'auto' }}
              />
            )}
            {fullscreenContent === 'netflix' && (
              <div style={{ width: '100%', height: '90vh', maxWidth: '90vw', background: '#ffffff' }}>
                <iframe 
                  src="/netflix-ai-framework.pdf"
                  style={{ width: '100%', height: '100%', border: 'none' }}
                  title="Netflix Framework - AI in Content Production"
                  frameBorder="0"
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default PropostaIADetalhe
