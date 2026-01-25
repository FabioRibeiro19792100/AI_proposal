# Proposta Globo

Um projeto moderno desenvolvido com Vite + React para apresentar propostas de forma profissional e impactante.

## 🚀 Tecnologias

- **React 19** - Biblioteca JavaScript para construção de interfaces
- **Vite** - Build tool rápida e moderna
- **React Router DOM** - Roteamento para aplicações React
- **CSS Moderno** - Estilos responsivos e profissionais

## 📁 Estrutura do Projeto

```
proposta-showcase/
├── src/
│   ├── components/      # Componentes reutilizáveis
│   │   ├── Layout.jsx
│   │   ├── Header.jsx
│   │   └── Footer.jsx
│   ├── pages/           # Páginas da aplicação
│   │   ├── Home.jsx
│   │   ├── Propostas.jsx
│   │   ├── PropostaDetalhe.jsx
│   │   └── Sobre.jsx
│   ├── routes/          # Configuração de rotas
│   │   └── routes.jsx
│   ├── styles/          # Arquivos CSS
│   │   ├── Layout.css
│   │   ├── Header.css
│   │   ├── Footer.css
│   │   ├── Home.css
│   │   ├── Propostas.css
│   │   ├── PropostaDetalhe.css
│   │   └── Sobre.css
│   ├── main.jsx         # Ponto de entrada
│   └── index.css        # Estilos globais
├── public/              # Arquivos estáticos
└── package.json
```

## 🛠️ Instalação

1. Instale as dependências:
```bash
npm install
```

2. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

3. Abra o navegador em `http://localhost:5173`

## 📝 Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Cria a build de produção
- `npm run preview` - Visualiza a build de produção
- `npm run lint` - Executa o linter

## 🎨 Funcionalidades

- ✅ Página inicial com hero section
- ✅ Listagem de propostas em grid
- ✅ Páginas de detalhes de propostas
- ✅ Navegação com React Router
- ✅ Design responsivo
- ✅ Layout moderno e profissional

## 📄 Personalização

Para adicionar suas próprias propostas, edite o arquivo `src/pages/Propostas.jsx` e `src/pages/PropostaDetalhe.jsx` com seus dados.

## 📦 Build para Produção

```bash
npm run build
```

Os arquivos otimizados serão gerados na pasta `dist/`.

## 🔗 Referências

Este projeto foi criado como uma plataforma para apresentar propostas comerciais de forma profissional.
