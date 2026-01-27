import { createBrowserRouter } from 'react-router-dom'
import { Component } from 'react'
import Layout from '../components/Layout'
import Home from '../pages/Home'
import Propostas from '../pages/Propostas'
import PropostaDetalhe from '../pages/PropostaDetalhe'
import PropostaIADetalhe from '../pages/PropostaIADetalhe'
import PropostaPPAResumo from '../pages/PropostaPPAResumo'
import PropostaPPAModo from '../pages/PropostaPPAModo'
import PropostaIAModo from '../pages/PropostaIAModo'
import CinquentaTonsIA from '../pages/CinquentaTonsIA'
import Biblioteca from '../pages/Biblioteca'
import DocumentoDetalhe from '../pages/DocumentoDetalhe'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Erro capturado:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <h2>Erro ao carregar a página</h2>
          <p>{this.state.error?.message}</p>
          <button onClick={() => window.location.reload()}>Recarregar página</button>
        </div>
      )
    }

    return this.props.children
  }
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <div>Erro ao carregar página</div>,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'propostas',
        element: <Propostas />
      },
      {
        path: 'propostas/8/modo',
        element: <PropostaIAModo />
      },
      {
        path: 'propostas/8',
        element: (
          <ErrorBoundary>
            <PropostaIADetalhe />
          </ErrorBoundary>
        )
      },
      {
        path: 'propostas/7/modo',
        element: <PropostaPPAModo />
      },
      {
        path: 'propostas/:id',
        element: <PropostaDetalhe />
      },
      {
        path: 'propostas/:id/resumo',
        element: <PropostaPPAResumo />
      },
      {
        path: 'propostas/8/50-tons-ia',
        element: <CinquentaTonsIA />
      },
      {
        path: 'briefings',
        element: <Biblioteca />
      },
      {
        path: 'briefings/:id',
        element: <DocumentoDetalhe />
      }
    ]
  }
])

export default router
