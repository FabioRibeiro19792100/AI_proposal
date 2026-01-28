import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { DiferenciaisSection } from '../components/DiferenciaisSection'
import '../styles/PropostaPPAResumo.css'

const fases = [
  {
    numero: '01',
    titulo: 'Ampla Convocatória',
    duracao: '6 semanas',
    periodo: 'Abril 2026',
    descricao: 'Lançar edital nacional e coletar inscrições de equipes de publicidade',
    atividades: [
      'Customização (design) do formulário de inscrições',
      'Ajustes no edital e no regulamento',
      'Suporte às equipes durante o período de inscrições',
      'Validação de elegibilidade'
    ],
    entregavel: 'Relatório de inscrições (quantidade, distribuição geográfica, perfil das equipes)'
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
    entregavel: 'Processo de avaliação documentado e executado, seleção e divulgação das 10 equipes semifinalistas e relatório executivo da seleção inicial'
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
    entregavel: '10 campanhas aprimoradas e documentadas, roteiros revisados e otimizados, equipes preparadas para o pitch',
    duvida: true
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
    descricao: 'Preparar e executar a imersão presencial na Globo RJ',
    atividades: [
      'Encontros online prévios',
      'Imersão presencial (duração a confirmar)',
      'Desenvolvimento de propostas criativas',
      'Finalização e entrega'
    ],
    entregavel: 'Documentação completa do processo de imersão e relatório final com métricas e aprendizados'
  }
]

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
  total: 'R$ 104.500,00'
}

function PropostaPPAResumo() {
  // Ancorar no topo quando a página carrega
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'auto'
    })
  }, [])

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
            desde a convocatória nacional até a imersão presencial na Globo RJ
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
              <h3 className="fase-titulo">
                {fase.titulo}
                {fase.duvida && (
                  <span className="duvida-tag" title="Responsabilidade a confirmar (Mastertech ou Globo)">
                    Dúvida
                  </span>
                )}
              </h3>
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
              O investimento garante a entrega completa do desafio, incluindo a operacionalização do processo, com criação do regulamento, customização dos formulários de inscrição, avaliação das submissões, condução das mentorias, organização e condução do pitch com banca avaliadora e mediação da imersão presencial.
            </p>
          </div>
          <div className="investimento-total">
            <span>Total</span>
            <strong>{investimento.total}</strong>
            <span className="investimento-sem-mentorias">sem considerar as mentorias: R$ 108.500,00</span>
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

      <DiferenciaisSection />

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
