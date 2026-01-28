import { diferenciaisPPA } from '../data/diferenciaisPPA'

// Ícones SVG (mesmos da resumida)
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

const iconos = [IconExperiencia, IconTecnica, IconResultados]

export function DiferenciaisSection({ showTitle = true }) {
  const items = diferenciaisPPA.map((d, i) => ({
    ...d,
    Icon: iconos[i]
  }))

  return (
    <section className="diferenciais-section">
      {showTitle && <h2 className="section-title">Diferenciais da Mastertech</h2>}
      <div className="diferenciais-grid">
        {items.map((diferencial, index) => (
          <div key={index} className="diferencial-card">
            <div className="diferencial-icone-wrapper">
              <diferencial.Icon />
            </div>
            <h3>{diferencial.titulo}</h3>
            <ul className="diferencial-lista">
              {diferencial.items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
