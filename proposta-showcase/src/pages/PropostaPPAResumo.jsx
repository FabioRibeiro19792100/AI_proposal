import { Link } from 'react-router-dom'
import '../styles/PropostaPPAResumo.css'

const fases = [
  {
    numero: '01',
    titulo: 'Ampla Convocatória',
    duracao: '6 semanas',
    periodo: 'Abril 2026',
    descricao: 'Lançar edital nacional e coletar inscrições de equipes de publicidade',
    atividades: [
      'Plataforma de inscrições',
      'Gestão de comunicação',
      'Suporte às equipes',
      'Validação de elegibilidade'
    ],
    entregavel: 'Plataforma funcional, base de dados completa de inscrições validadas e relatório com perfil das equipes e distribuição geográfica'
  },
  {
    numero: '02',
    titulo: 'Seleção Inicial',
    duracao: '3 semanas',
    periodo: 'Maio 2026',
    descricao: 'Avaliar todas as inscrições e selecionar as 10 melhores equipes',
    atividades: [
      'Organização da banca',
      'Processo de avaliação',
      'Consolidação de resultados',
      'Comunicação transparente'
    ],
    entregavel: 'Processo de avaliação documentado, lista das 10 equipes selecionadas e relatório executivo da seleção inicial'
  },
  {
    numero: '03',
    titulo: 'Mentoria Master Globo',
    duracao: '4 semanas',
    periodo: 'Maio-Junho 2026',
    descricao: 'Aprimorar as ideias das 10 equipes selecionadas',
    atividades: [
      'Sessões coletivas semanais',
      'Mentorias individuais',
      'Aprofundamento de campanhas',
      'Preparação para pitch'
    ],
    entregavel: '10 campanhas aprimoradas e documentadas, roteiros revisados e otimizados, equipes preparadas para o pitch'
  },
  {
    numero: '04',
    titulo: 'Pitch',
    duracao: '2 semanas',
    periodo: 'Junho 2026',
    descricao: 'Selecionar as 3 equipes que avançam para a imersão',
    atividades: [
      'Estruturação do formato',
      'Coordenação da banca',
      'Apresentações de 10min',
      'Q&A e avaliação'
    ],
    entregavel: '3 equipes selecionadas para imersão, relatório de avaliação do pitch e documentação completa das campanhas finalistas'
  },
  {
    numero: '05',
    titulo: 'Encontros + Imersão',
    duracao: '6 semanas',
    periodo: 'Julho-Setembro 2026',
    descricao: 'Preparar e executar a imersão presencial na Globo SP',
    atividades: [
      '4 encontros online prévios',
      'Imersão presencial 2 semanas',
      'Desenvolvimento de videocases',
      'Finalização e entrega'
    ],
    entregavel: '3 videocases finalizados prontos para avaliação do júri PPA, documentação completa do processo de imersão e relatório final com métricas e aprendizados'
  }
]

const investimento = {
  detalhamento: [
    {
      titulo: 'Fases 1, 2 e 4',
      valor: 'R$ 43.500,00',
      entregaveis: [
        'Plataforma de inscrições funcional e responsiva',
        'Base de dados completa de inscrições validadas',
        'Processo de avaliação documentado',
        'Seleção das 10 equipes',
        'Pitch e seleção das 3 finalistas'
      ]
    },
    {
      titulo: 'Fase 3 - Mentoria',
      valor: 'R$ 21.000,00',
      entregaveis: [
        '10 campanhas aprimoradas e documentadas',
        'Roteiros revisados e otimizados',
        'Equipes preparadas para o pitch'
      ]
    },
    {
      titulo: 'Fase 5 - Imersão',
      valor: 'R$ 65.000,00',
      entregaveis: [
        '3 videocases finalizados',
        'Documentação completa do processo',
        'Relatório final com métricas'
      ]
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
  total: 'R$ 129.500,00'
}

// Ícones SVG minimalistas e elegantes
const IconExperiencia = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2L2 7l10 5 10-5-10-5z"/>
    <path d="M2 17l10 5 10-5M2 12l10 5 10-5"/>
  </svg>
)

const IconTecnica = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
  </svg>
)

const IconResultados = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
  </svg>
)

const diferenciais = [
  {
    icone: <IconExperiencia />,
    titulo: 'Experiência Comprovada',
    descricao: 'Histórico em gestão de processos seletivos de grande escala (Desafio LED, Academia LED)'
  },
  {
    icone: <IconTecnica />,
    titulo: 'Capacidade Técnica',
    descricao: 'Equipe multidisciplinar, infraestrutura própria e metodologias ágeis'
  },
  {
    icone: <IconResultados />,
    titulo: 'Foco em Resultados',
    descricao: 'Compromisso com transparência, justiça e valorização da educação'
  }
]

function PropostaPPAResumo() {
  return (
    <div className="proposta-ppa-resumo">
      <div className="proposta-header-sticky">
        <Link to="/propostas" className="back-link">
          ← Voltar para Propostas
        </Link>
        <div className="view-mode-switcher">
          <Link to="/propostas/7" className="view-mode-switch">
            Detalhe
          </Link>
          <button className="view-mode-switch active">
            Resumo
          </button>
        </div>
      </div>
      <div className="resumo-header">
        <div className="header-content">
          <h1>Desafio PPA</h1>
          <p className="subtitulo">
            Operacionalização dos 6 primeiros pontos da mecânica do Desafio PPA, 
            desde a convocatória nacional até a imersão presencial na Globo SP
          </p>
        </div>
      </div>

      <section className="objetivo-section">
        <div className="objetivo-card">
          <h2>Objetivo</h2>
          <p>
            A Mastertech será responsável por conduzir todo o processo formativo e seletivo, 
            entregando <strong>3 equipes finalistas</strong> prontas para a avaliação do júri do PPA 
            (pontos 7 e 8, de responsabilidade da Globo).
          </p>
        </div>
      </section>

      <section className="fases-section">
        <h2 className="section-title">Processo em 5 Fases</h2>
        <div className="fases-grid">
          {fases.map((fase, index) => (
            <div key={index} className="fase-card">
              <div className="fase-header">
                <span className="fase-numero">{fase.numero}</span>
                <div className="fase-meta">
                  <span className="fase-duracao">{fase.duracao}</span>
                  <span className="fase-periodo">{fase.periodo}</span>
                </div>
              </div>
              <h3 className="fase-titulo">{fase.titulo}</h3>
              <p className="fase-descricao">{fase.descricao}</p>
              <div className="fase-atividades">
                <h4>Atividades:</h4>
                <ul>
                  {fase.atividades.map((atividade, i) => (
                    <li key={i}>{atividade}</li>
                  ))}
                </ul>
              </div>
              <div className="fase-entregavel">
                <strong>Entregável:</strong> {fase.entregavel}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="cronograma-section">
        <h2 className="section-title">Cronograma</h2>
        <div className="cronograma-card">
          <div className="cronograma-timeline">
            <div className="timeline-item">
              <div className="timeline-mes">Abril</div>
              <div className="timeline-fase">Fase 1: Convocatória</div>
            </div>
            <div className="timeline-item">
              <div className="timeline-mes">Maio</div>
              <div className="timeline-fase">Fase 2: Seleção + Fase 3: Mentoria</div>
            </div>
            <div className="timeline-item">
              <div className="timeline-mes">Junho</div>
              <div className="timeline-fase">Fase 4: Pitch</div>
            </div>
            <div className="timeline-item">
              <div className="timeline-mes">Jul-Set</div>
              <div className="timeline-fase">Fase 5: Encontros + Imersão</div>
            </div>
            <div className="timeline-item">
              <div className="timeline-mes">Out-Nov</div>
              <div className="timeline-fase">Avaliação Júri PPA (Globo)</div>
            </div>
          </div>
          <div className="cronograma-total">
            <strong>Duração Total:</strong> 21 semanas (Abril a Setembro 2026)
          </div>
        </div>
      </section>

      <section className="investimento-section">
        <h2 className="section-title">Investimento</h2>
        <div className="investimento-resumo">
          <div className="investimento-descricao">
            <p>
              O investimento garante a entrega completa do desafio: desde a descoberta e seleção 
              de talentos em todo o Brasil, passando por um processo formativo exclusivo que 
              aprimora as campanhas das equipes, até a produção final de 3 videocases prontos 
              para o júri PPA.
            </p>
            <p>
              Inclui toda a operacionalização (plataforma, mentoria, 
              pitch e imersão presencial), garantindo um processo transparente e de excelência 
              que conecta a Globo aos melhores talentos de publicidade do país.
            </p>
          </div>
          <div className="investimento-total">
            <span>Total</span>
            <strong>{investimento.total}</strong>
          </div>
        </div>

        <div className="investimento-detalhamento">
          <h3 className="detalhamento-title">DETALHAMENTO DAS ENTREGAS:</h3>
          {investimento.detalhamento.map((item, index) => (
            <div key={index} className="detalhamento-item">
              <div className="detalhamento-header">
                <div>
                  <h4 className="detalhamento-titulo">{item.titulo}</h4>
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
            </div>
          ))}
        </div>

        <div className="investimento-pagamento">
          <h4>Forma de Pagamento</h4>
          <div className="pagamento-steps">
            <div className="pagamento-step">
              <span className="step-percent">30%</span>
              <span className="step-desc">Assinatura do contrato</span>
            </div>
            <div className="pagamento-step">
              <span className="step-percent">30%</span>
              <span className="step-desc">Início Fase 3 (Mentoria)</span>
            </div>
            <div className="pagamento-step">
              <span className="step-percent">25%</span>
              <span className="step-desc">Início Fase 5 (Imersão)</span>
            </div>
            <div className="pagamento-step">
              <span className="step-percent">15%</span>
              <span className="step-desc">Entrega final</span>
            </div>
          </div>
        </div>
      </section>

      <section className="diferenciais-section">
        <h2 className="section-title">Diferenciais da Mastertech</h2>
        <div className="diferenciais-grid">
          {diferenciais.map((diferencial, index) => (
            <div key={index} className="diferencial-card">
              <div className="diferencial-icone-wrapper">
                {diferencial.icone}
              </div>
              <h3>{diferencial.titulo}</h3>
              <p>{diferencial.descricao}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="proximos-passos-section">
        <div className="proximos-passos-card">
          <h2>Próximos Passos</h2>
          <div className="passos-lista">
            <div className="passo-item">
              <span className="passo-numero">1</span>
              <div>
                <h4>Aprovação da Proposta</h4>
                <p>Revisão e aprovação pela Globo, ajustes finais conforme feedback</p>
              </div>
            </div>
            <div className="passo-item">
              <span className="passo-numero">2</span>
              <div>
                <h4>Kick-off</h4>
                <p>Reunião de alinhamento inicial, definição de equipes e responsabilidades</p>
              </div>
            </div>
            <div className="passo-item">
              <span className="passo-numero">3</span>
              <div>
                <h4>Início Fase 1</h4>
                <p>Planejamento detalhado e lançamento da convocatória</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default PropostaPPAResumo
