import { createBrowserRouter } from 'react-router-dom'
import Layout from '../components/Layout'
import Home from '../pages/Home'
import Propostas from '../pages/Propostas'
import PropostaDetalhe from '../pages/PropostaDetalhe'
import Sobre from '../pages/Sobre'
import Biblioteca from '../pages/Biblioteca'
import DocumentoDetalhe from '../pages/DocumentoDetalhe'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'outcomes',
        element: <Propostas />
      },
      {
        path: 'outcomes/:id',
        element: <PropostaDetalhe />
      },
      {
        path: 'sobre',
        element: <Sobre />
      },
      {
        path: 'biblioteca',
        element: <Biblioteca />
      },
      {
        path: 'biblioteca/:id',
        element: <DocumentoDetalhe />
      }
    ]
  }
])

export default router
