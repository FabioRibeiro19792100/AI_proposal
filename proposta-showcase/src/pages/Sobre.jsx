import '../styles/Sobre.css'

function Sobre() {
  return (
    <div className="sobre">
      <div className="sobre-container">
        <h1>Sobre o Projeto</h1>
        <div className="sobre-content">
          <p>
            Este é um projeto desenvolvido com Vite + React para apresentar
            propostas de forma profissional e impactante.
          </p>
          <p>
            O projeto foi criado como uma plataforma moderna para exibir e
            gerenciar apresentações de propostas comerciais.
          </p>
          <h2>Tecnologias Utilizadas</h2>
          <ul className="tech-list">
            <li>React 19</li>
            <li>Vite</li>
            <li>React Router DOM</li>
            <li>CSS Moderno</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Sobre
