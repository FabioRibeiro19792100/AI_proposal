// Conteúdo completo dos documentos markdown

export const premissasContent = `# Premissas do Desafio Globo IA
## Extraídas das notas e discussões

---

## 1. Contexto Geral

**Demandante:** Globo  
**Objetivo:** Montar proposta de desafio sobre IA para estudantes de ensino superior do Brasil  
**Foco:** Aplicação de IA para produção e distribuição de conteúdo  
**Missão:** Esquematizar desde a chamada, tema, gancho e conceito do desafio para conceber o desafio

---

## 2. Restrições e Desafios Identificados

### 2.1 Questões Sensíveis
- **O tema envolve tabu** - IA na produção de conteúdo é sensível (substituição de empregos, sindicatos)
- **A Globo não pode abrir estratégia** - Não pode revelar roadmap interno ou gaps tecnológicos
- **Mercado pode ler equivocadamente a iniciativa** - Risco reputacional se mal comunicado

### 2.2 Qualidade das Submissões
- **Devemos evitar hipóteses como ideias** - Precisa ter fundamento técnico, não apenas "achismos"
- **A ideia precisa de lastro técnico** - Soluções devem ser tecnicamente viáveis e demonstráveis
- **Pessoas podem não entender as dimensões do que envolve conteúdo na Globo** - Cadeia complexa (pré-produção → produção → pós → acervo → distribuição)

### 2.3 Guardrails Necessários
- **Devemos ter um guideline para evitar dispersão (tipo Netflix)** - Framework claro de avaliação
- **Há camadas jurídicas** - Direitos autorais, imagem, consentimento, sindicatos
- **Diferenciar talentos humanos de talentos artificiais** - IA como assistente, não substituto

### 2.4 Complexidade Operacional
- **Não podemos ter um processo com overengineering** - Mecânica precisa ser clara e executável
- **Deixar mais aberto pode ser interessante (...) risco de ataques** - Dilema entre abertura criativa vs controle de risco

---

## 3. Elementos de Solução Considerados

### 3.1 Referências
- **Trazer exemplo da Netflix** - Framework de avaliação de uso de IA já validado
- Material da Netflix sobre IA generativa foi analisado como referência

### 3.2 Mecânica
- **Independente do tema, modular e precificar a mecânica. Separar as duas coisas.**
  - TEMA: O quê coletar (casos de uso de IA)
  - MECÂNICA: Como coletar (processo de submissão/avaliação)

### 3.3 Prototipação
- **Insistir na ideia de "agentes se veem por aqui"... mockar o site**
  - Criar protótipo navegável da experiência do participante
  - Testar fluxo antes de comprometer recursos

### 3.4 Planejamento
- **O que se deseja obter de submissão... quadro de pros e contras**
  - Avaliar diferentes abordagens antes de decidir
- **Coletar exemplos de onde a Globo pode usar IA**
  - Mapear território de possibilidades
- **Fazer um prompt no Claude com 50 coisas que poderiam ser feitas por IA na Globo com estas restrições — pré-calibrar a proposta**
  - Gerar casos de uso respeitando todas as restrições identificadas

---

## 4. Ideias Iniciais (Abandonadas)

### 4.1 IA como Avaliadora
**Ideia:** Usar IA para avaliar submissões com critérios pré-definidos da Globo  
**Problema:** Complexidade técnica, risco de "caixa preta", pode frustrar participantes

### 4.2 Tokenização para Matching
**Ideia:** Tokenizar ideias para encontrar pessoas com ideias semelhantes e formar equipes  
**Problema:** Overengineering, difícil de explicar, ganho nebuloso

### 4.3 Conclusão
**"Acho que o desafio pode ser simplificado"** - Complexidades desnecessárias que desviam do objetivo principal (coletar boas propostas de uso de IA)

---

## 5. Direcionamento Final

### 5.1 O que a Globo Quer
**"Ela quer um desafio que coleta propostas de uso de IA na criação de conteúdos para seu ecossistema"**

### 5.2 Como Dar Fundamento
**"Como fugimos de coisas hipotéticas demais... tem que ter um fundamento maior"**

Opções discutidas:
- Globo apresenta desafios reais
- Exigir protótipo funcional (não apenas proposta escrita)
- Residência/imersão com acesso a dados reais
- **Consenso:** Híbrido entre definição de categorias + exigência de protótipo

### 5.3 Especificidade Necessária
**"Ou seja, ela precisa ser mais específica"**

Quanto mais específica a Globo for nos problemas/categorias, melhor o desafio funciona:
- Problemas concretos (não "use IA para conteúdo")
- Acesso a dados/recursos para prototipação
- Critérios claros de sucesso

---

## 6. Princípios Orientadores (Síntese)

1. **SIMPLICIDADE** - Mecânica clara, sem overengineering
2. **FUNDAMENTO** - Exigir lastro técnico (protótipo), não apenas ideias hipotéticas
3. **PROTEÇÃO** - Framework para evitar propostas polêmicas/inviáveis
4. **ESPECIFICIDADE** - Categorias/desafios claros, não totalmente aberto
5. **SEPARAÇÃO** - Modular tema vs mecânica para precificar e executar
6. **PROTOTIPAÇÃO** - Mockar experiência antes de lançar
7. **REFERÊNCIA** - Usar Netflix como benchmark validado
8. **ÉTICA** - Diferenciar claramente IA como ferramenta, não substituto de talentos

---

## 7. Próximas Decisões Necessárias

### 7.1 Pela Globo
- [ ] Definir 3-5 categorias ou desafios específicos
- [ ] Decidir nível de acesso a dados/recursos para Fase 2
- [ ] Definir critérios de avaliação adaptados ao contexto Globo
- [ ] Aprovar orçamento e timeline

### 7.2 Pela Equipe do Projeto
- [ ] Escolher mecânica (recomendado: híbrido em 2 fases)
- [ ] Mockar site/experiência do participante
- [ ] Adaptar framework Netflix para Globo
- [ ] Estruturar comunicação para mitigar riscos reputacionais

---

## 8. Entregáveis Produzidos

1. **50 Casos de Uso de IA para Globo** - Pré-calibrados com todas as restrições
2. **Quadro de Pros/Contras de Mecânicas** - 5 opções analisadas com recomendação
3. **Este Documento de Premissas** - Consolidação das notas e decisões

---

## Anexo: Checklist de Validação

Antes de finalizar a proposta, verificar se:

- [ ] A mecânica é simples de explicar em 2 minutos
- [ ] Há exigência de protótipo funcional (não apenas slides)
- [ ] Framework de avaliação protege áreas sensíveis
- [ ] Categorias/desafios são específicos o suficiente
- [ ] Globo não expõe estratégia ou gaps internos
- [ ] Comunicação externa deixa claro: IA como ferramenta, não substituto
- [ ] Há plano de contingência para propostas polêmicas
- [ ] Orçamento está modularizado e precificado
- [ ] Site/experiência foi mockado e testado
- [ ] Sindicatos e áreas jurídicas foram consultados`

// Continuando com os outros documentos...
export const prosContrasContent = `# Quadro Comparativo: Mecânicas Possíveis para o Desafio
## Análise de Pros/Contras para diferentes níveis de abertura e complexidade

---

## Opção 1: Totalmente Aberto
### "O que você propõe que a Globo faça com IA?"

### ✅ Pros:
- **Máxima criatividade** - Pode surgir ideias fora da caixa que a Globo não considerou
- **Baixa complexidade operacional** - Mecânica simples de explicar e executar
- **Inclusivo** - Não requer conhecimento prévio da cadeia de conteúdo
- **Marketing positivo** - Demonstra abertura e escuta da Globo
- **Coleta massiva** - Pode receber centenas de submissões

### ❌ Contras:
- **Dispersão total** - Ideias em todas as direções, difícil de avaliar
- **Qualidade baixa** - Muitas propostas hipotéticas e rasas
- **Sobrecarga de curadoria** - Tempo enorme para filtrar propostas viáveis
- **Risco reputacional ALTO** - Propostas polêmicas (substituir atores, etc.) ganham visibilidade
- **Expectativa frustrada** - Participantes não entendem por que foram rejeitados
- **Sem entregável concreto** - Apenas "ideias" escritas, difícil validar viabilidade

### 📊 Risco Estratégico: ⚠️⚠️⚠️ ALTO
- Mercado pode interpretar como "Globo não sabe o que fazer com IA"
- Sindicatos podem se mobilizar contra propostas controversas
- Difícil controlar narrativa pública

---

## Opção 2: Semi-aberto com Categorias
### "Proponha soluções de IA para uma destas 5 categorias"

### ✅ Pros:
- **Direcionamento sem engessamento** - Ainda permite criatividade dentro de guardrails
- **Facilita curadoria** - Bancas especializadas por categoria
- **Comunicação clara** - Participantes entendem escopo
- **Protege áreas sensíveis** - Não abre todas as portas
- **Permite modularidade** - Pode lançar categorias em ondas

### ❌ Contras:
- **Complexidade média** - Requer explicar bem cada categoria
- **Risco de concentração** - Todos podem submeter para mesma categoria "fácil"
- **Ainda permite propostas polêmicas** - Dentro das categorias
- **Requer framework de avaliação** - Diferentes critérios por categoria
- **Possível frustração** - "Minha ideia não se encaixa em nenhuma categoria"

### 📊 Risco Estratégico: ⚠️ MÉDIO
- Melhor controle narrativo, mas ainda exposto
- Requer comunicação cuidadosa das categorias

**CATEGORIAS SUGERIDAS:**
1. Gestão de Acervo e Memória
2. Acessibilidade e Inclusão
3. Otimização de Operações
4. Personalização de Experiência
5. Análise e Insights de Audiência

---

## Opção 3: Desafios Específicos
### "Resolva 1 dos 3 desafios concretos que apresentamos"

### ✅ Pros:
- **Máximo controle** - Globo define exatamente o que quer
- **Qualidade alta** - Propostas focadas e comparáveis
- **Proteção estratégica** - Não expõe áreas sensíveis
- **Curadoria eficiente** - Critérios claros de avaliação
- **Implementação viável** - Soluções têm fit claro com necessidade real
- **Exemplo: Netflix** - Framework já validado por outra empresa

### ❌ Contras:
- **Criatividade limitada** - Não captura ideias fora dos desafios
- **Complexidade de definição** - Globo precisa escolher e detalhar desafios
- **Risco de vazamento** - Desafios podem revelar gaps estratégicos
- **Menos participantes** - Requer mais expertise técnica
- **Rigidez** - Difícil ajustar após lançamento

### 📊 Risco Estratégico: ✅ BAIXO
- Narrativa controlada: "Queremos resolver X, Y, Z"
- Dificulta leitura de "substituição de empregos"

**EXEMPLO DE DESAFIOS:**
1. "Como tornar 10.000h de acervo histórico buscável semanticamente?"
2. "Como gerar legendas em tempo real para eventos ao vivo mantendo 95% de precisão?"
3. "Como detectar automaticamente momentos-chave em transmissões esportivas de 3h?"

---

## Opção 4: Hackathon com Imersão
### "2 semanas de residência com dados e mentoria"

### ✅ Pros:
- **Máxima qualidade** - Soluções testadas com dados reais
- **Networking** - Globo conhece talentos de perto
- **Prototipação real** - Entregáveis funcionais, não slides
- **Controle total** - Acontece em ambiente controlado
- **Aprendizado mútuo** - Globo aprende com participantes também
- **Implementação rápida** - Soluções podem ir para produção

### ❌ Contras:
- **Complexidade ALTA** - Logística pesada (espaço, dados, mentores)
- **Custo elevado** - Infraestrutura, alimentação, prêmios
- **Alcance limitado** - Apenas 30-50 participantes presenciais
- **Tempo de preparação** - 3-6 meses de planejamento
- **Risco de exposição** - Participantes veem operações internas
- **NDAs necessários** - Complexidade jurídica

### 📊 Risco Estratégico: ✅ BAIXÍSSIMO
- Totalmente controlado
- Mas investimento alto e alcance baixo

---

## Opção 5: Híbrido (Recomendado)
### "Fase 1 aberta + Fase 2 fechada com finalistas"

### ✅ Pros:
- **Balanceamento ótimo** - Coleta massiva + qualidade final
- **Funil eficiente** - Filtra ideias em etapas
- **Flexibilidade** - Ajusta mecânica entre fases
- **Engajamento alto** - Primeira fase inclusiva, segunda seletiva
- **Controle progressivo** - Risco reduz a cada fase
- **Narrativa positiva** - "Escutamos todos, aprofundamos com melhores"

### ❌ Contras:
- **Complexidade de gestão** - Duas mecânicas diferentes
- **Tempo estendido** - Processo pode levar 3-4 meses
- **Comunicação desafiadora** - Explicar transição entre fases
- **Risco de frustração** - Quem não passa para Fase 2 pode reclamar
- **Custo moderado** - Mais que aberto, menos que hackathon

### 📊 Risco Estratégico: ⚠️ BAIXO-MÉDIO
- Fase 1 tem risco de propostas polêmicas
- Fase 2 permite controlar narrativa final

### Mecânica Sugerida:

**FASE 1 (ABERTA): "Submissão de Propostas"**
- Duração: 4 semanas
- Formato: Formulário online
- Entregável: Proposta escrita (máx 2 páginas) + vídeo pitch (3min)
- Avaliação: Framework tipo Netflix (auto-classificação de risco)
- Seleção: Top 30 propostas

**FASE 2 (FECHADA): "Prototipação"**
- Duração: 3 semanas
- Formato: Online com mentorias síncronas
- Entregável: Protótipo funcional + documentação técnica
- Acesso: Dados anonimizados/sintéticos da Globo
- Avaliação: Banca técnica + executiva
- Seleção: Top 5 para implementação piloto

**FASE 3 (OPCIONAL): "Implementação"**
- Duração: 3 meses
- Formato: Parceria remunerada
- Entregável: Solução em produção
- Resultado: Case publicado + possível contratação

---

## Matriz de Decisão

| Critério | Aberto | Semi-Aberto | Específico | Hackathon | Híbrido |
|----------|--------|-------------|------------|-----------|---------|
| **Controle de risco** | 2/10 | 5/10 | 9/10 | 10/10 | 7/10 |
| **Qualidade das propostas** | 3/10 | 6/10 | 9/10 | 10/10 | 8/10 |
| **Alcance/Participação** | 10/10 | 8/10 | 5/10 | 3/10 | 9/10 |
| **Complexidade operacional** | 2/10 | 5/10 | 7/10 | 10/10 | 7/10 |
| **Custo** | 2/10 | 4/10 | 5/10 | 10/10 | 6/10 |
| **Tempo de preparação** | 2/10 | 4/10 | 7/10 | 9/10 | 6/10 |
| **Proteção estratégica** | 2/10 | 5/10 | 9/10 | 10/10 | 7/10 |
| **Potencial de implementação** | 3/10 | 5/10 | 9/10 | 10/10 | 8/10 |
| **Marketing/Reputação** | 8/10 | 7/10 | 6/10 | 5/10 | 9/10 |

---

## Recomendação Final

### 🎯 **OPÇÃO HÍBRIDO** (Fase 1 Semi-Aberta + Fase 2 Específica)

**Por quê:**
1. ✅ Controla risco progressivamente
2. ✅ Mantém alcance e inclusão inicial
3. ✅ Garante qualidade final com prototipação
4. ✅ Permite ajustar categorias/desafios após Fase 1
5. ✅ Narrativa positiva: "escuta ampla + rigor técnico"
6. ✅ Viabiliza implementação real das melhores soluções

**Variação sugerida:**

**FASE 1:** Semi-aberta com 5 categorias (baseadas nos 50 casos de uso)
- Participante escolhe categoria e propõe livremente dentro dela
- Framework de auto-avaliação tipo Netflix
- Top 30 selecionados (6 por categoria)

**FASE 2:** Desafios específicos para cada categoria
- Globo revela desafio concreto para cada categoria
- Finalistas prototipam solução para o desafio
- 1 vencedor por categoria = 5 implementações piloto

**Isso resolve:**
- ✅ Tabu: Categorias evitam áreas sensíveis
- ✅ Sigilo: Desafios específicos só revelados na Fase 2
- ✅ Lastro técnico: Fase 2 exige protótipo
- ✅ Guideline: Framework Netflix adaptado
- ✅ Overengineering: Mecânica clara em 2 fases
- ✅ Dispersão: Categorias direcionam

---

## Elementos Complementares

### 🎨 MOCKAR O SITE (sua ideia)
**Criar protótipo navegável mostrando:**
1. Landing page com categorias
2. Fluxo de submissão Fase 1
3. Framework de auto-avaliação
4. Dashboard de acompanhamento Fase 2
5. Galeria de cases vencedores (fictícios)

**Benefício:** Testar experiência do participante antes de comprometer recursos

### 📋 FRAMEWORK DE AVALIAÇÃO
**Adaptar Netflix para contexto Globo:**

**Auto-avaliação do participante (Fase 1):**
- [ ] Minha solução processa dados pessoais?
- [ ] Minha solução substitui trabalho criativo humano?
- [ ] Minha solução replica ou imita talentos reais?
- [ ] Minha solução usa conteúdo protegido por direitos autorais?
- [ ] Minha solução está tecnicamente pronta para implementar?

**Avaliação da Banca (Fase 2):**
- Viabilidade técnica (30%)
- Impacto no negócio (25%)
- Ética e conformidade (25%)
- Inovação (10%)
- Escalabilidade (10%)

### 💰 PRECIFICAÇÃO MODULAR

**Elementos fixos:**
- Plataforma de submissão: R$ 30-50k
- Curadoria Fase 1: R$ 40-60k (equipe + ferramentas)
- Comunicação e lançamento: R$ 80-120k

**Elementos variáveis por fase:**
- Mentoria Fase 2: R$ 20-30k (depende de quantos finalistas)
- Infraestrutura de dados: R$ 40-80k (depende de acesso fornecido)
- Prêmios: R$ 50-200k (depende de estrutura de premiação)

**Total estimado:** R$ 260-540k (dependendo da complexidade escolhida)`

export const regulamentoLEDContent = `# REGULAMENTO DESAFIO LED - ME DÁ UMA LUZ AÍ! 2026

## Principais Tópicos e Estrutura

---

## 1. Objetivo

O "Desafio LED - Me dá uma luz aí!" é uma iniciativa para estudantes de todo o Brasil proporem ideias para solucionar desafios reais da educação, partindo da experiência individual de cada participante.

**Pergunta central:** Que solução você desenvolveria para prevenir a evasão escolar?

**Objetivos:**
- Desenvolver soluções educacionais com ponto de partida na identificação de problemas
- Promover integração do ensino formal com experiências reais
- Estimular atuações colaborativas
- Viabilizar saberes através de oficinas de inovação (Design Thinking)

---

## 2. Parceiro Técnico

**Mastertech** conduz todo o processo pedagógico:
- Fase de inscrição
- Jornada de desenvolvimento das soluções
- Até a defesa final no Festival LED

---

## 3. Critérios de Elegibilidade

- Maiores de 18 anos, residentes no Brasil
- Matrícula ativa no primeiro semestre de 2026
- Grade curricular mínima de 100 horas-aula
- Cursos livres, técnicos, graduação ou extensão
- Instituições: fundações, associações, ONGs ou educacionais (públicas ou privadas)
- Apenas 1 (uma) submissão por candidato(a)
- Formato: formulário oficial com texto de até 2 mil caracteres

---

## 4. Cronograma e Etapas

### Etapa 1: Inscrição no Desafio
- **Lançamento:** 12/01/2026
- **Encerramento:** 01/03/2026, até 23h59 (horário de Brasília)

### Etapa 2: Seleção de ideias
- **Seleção das 80 melhores:** 09/03/2026
- **Primeira oficina online:** 14/03/2026 (9h às 12h)
- **Envio de modelagem:** 22/03/2026
- **Seleção dos 40 melhores projetos**

### Etapa 3: Seleção de projetos
- **Seleção das 40 melhores:** 25/03/2026
- **Segunda oficina online:** 28/03/2026 (9h às 12h)
- **Envio de protótipos:** 12/04/2026
- **Seleção dos 20 melhores protótipos**

### Etapa 4: Seleção de protótipos
- **Seleção dos 20 protótipos:** 15/04/2026
- **Terceira oficina online:** 18/04/2026
- **Envio dos protótipos modelados:** 26/04/2026
- **Seleção dos 10 melhores**

### Etapa 5: Fase final
- **Seleção dos 10 protótipos:** 27/04/2026
- **Mentoria individual:** 28 a 30/04/2026 (horário comercial)
- **Banca de avaliação online:** 02/05/2026 (09h)
- **Divulgação dos 5 finalistas:** 04/05/2026
- **Festival LED:** Maio de 2026 (Rio de Janeiro)

---

## 5. Notas sobre as Oficinas

- **Participação integral obrigatória** nas três oficinas online
- Plataforma: Zoom
- Horário: 9h às 12h (horário de Brasília)
- Lista de presença e acompanhamento de tempo conectado
- Certificado de participação para todos(as) os(as) participantes das oficinas

---

## 6. Critérios de Avaliação

**Critérios principais:**
- Solução inovadora, de baixo custo, aplicável em outros contextos
- Potencial de melhoria no acesso às soluções educacionais
- Baseada em experiências reais, considerando contexto brasileiro
- Alinhada aos objetivos do ODS 4 (ONU)

**Princípios e valores:**
- Transparência
- Diversidade
- Equidade
- Criatividade
- Autonomia
- Atuação em rede
- Transformação

**Exclusões:**
- Propostas já vinculadas a outras instituições
- Projetos e/ou negócios em andamento

---

## 7. Comunicação e Divulgação

- Divulgação no site www.movimentoled.com.br
- Comunicação por e-mail informado na inscrição
- Validação mediante confirmação do(a) inscrito(a)
- Finalistas divulgados em 04/05/2026

---

## 8. Premiação

**Distribuição de R$ 300.000,00 (total bruto):**
- 1º e 2º lugares: R$ 85.000,00 cada
- 3º lugar: R$ 60.000,00
- 4º lugar: R$ 40.000,00
- 5º lugar: R$ 30.000,00

**Benefícios adicionais:**
- Integração à Comunidade LED
- Mentorias individuais e workshops no 2º semestre de 2026
- Oportunidade de troca com outros membros da Comunidade

**Observações:**
- Valores brutos, sujeitos a descontos de impostos e taxas
- Deslocamento e hospedagem no Rio de Janeiro cobertos pelo Desafio
- Caráter cultural, educacional, científico e tecnológico (não é programa de empreendedorismo)

---

## 9. Políticas de Privacidade e Proteção de Dados

**Controladora:** Globo Comunicação e Participações S.A.

**Categorias de dados coletados:**
- Informações de contato (nome, CPF, e-mail, cidade, estado, RG)
- Dados sensíveis (origem racial, étnica ou política)
- Vídeo, voz e imagem

**Finalidades:**
- Processos internos de seleção
- Avaliação das submissões
- Pagamento do prêmio
- Comunicação proativa e reativa
- Monitoramento tecnológico
- Produção de conteúdo
- Cumprimento de obrigações legais

**Compartilhamento:**
- Empresas relacionadas
- Fundação Roberto Marinho
- Mastertech (parceiro técnico)
- Consultores e auditores externos
- Pareceristas e jurados
- Entidades de segurança
- Autoridades competentes

**Direitos dos titulares (LGPD):**
- Confirmação da existência de tratamento
- Acesso aos dados
- Correção de dados
- Anonimização, bloqueio ou eliminação
- Informação sobre compartilhamento
- Revogação de consentimento

**Contato:** movimentoled@g.globo

---

## 10. Disposições Finais

**Compromissos dos finalistas:**
- Participar de encontros e mentorias
- Compartilhar aprendizados
- Contribuir para sistematização e disseminação
- Participar da Comunidade LED

**Autorizações:**
- Uso de nome, imagem e projetos (com atribuições autorais)
- Licença não exclusiva, irrevogável e isenta de royalties
- Integração ao acervo do Movimento LED
- Uso em mídias sociais, estudos e pesquisas

**Responsabilidades:**
- Fidelidade e legitimidade das informações
- Direitos de propriedade intelectual
- Indenização por violações de licenças
- Isenção da Comissão Organizadora

**Exclusões:**
- Cargos eletivos ou executivos na gestão pública
- Empregados, sócios ou acionistas da Globo e afiliadas
- Empregados da Fundação Roberto Marinho
- Colaboradores de patrocinadores, parceiros e apoiadores
- Pareceristas, avaliadores e jurados do processo

**Contato para dúvidas:** oi@mastertech.com.br

---

## Anexo 1 - Termos da Política de Proteção de Dados

Regulamentação completa do tratamento de dados pessoais conforme LGPD, incluindo:
- Definições (Dados Pessoais, Participantes)
- Controladora dos dados
- Categorias de dados coletados
- Finalidades do tratamento
- Compartilhamento com terceiros
- Direitos dos titulares
- Exclusões e restrições

**Alterações:** A Globo poderá alterar estes termos, mediante publicação em www.movimentoled.com.br

---

**Caráter do Desafio:** Exclusivamente cultural, educacional, científico e tecnológico, sem sorteio ou operação assemelhada, respaldado pelo artigo 30 do Decreto Lei 70.951/72 e art 3º da Lei nº 5.768/71.`

export const propostaLEDContent = `# Proposta Mastertech – LED 2026–2027

## Objetivo

Esta proposta reúne o conjunto de atividades que a Mastertech vem conduzindo em parceria com a Globo desde 2021 e introduz um novo componente, o Pós-LED.

O foco é estruturar um ciclo integrado que abrange o Desafio LED "Me Dá Uma Luz Aí", a Academia LED de Jornalismo e, a partir de 2026, o acompanhamento dos vencedores do Desafio.

---

## #1 – Desafio LED "Me Dá Uma Luz Aí"

O concurso nacional com temática educacional reúne pessoas em ciclo formativo profissionalizante a partir de nível técnico com 18 anos ou mais. O objetivo é selecionar narrativas potentes e diversas e ideias viáveis e inovadoras que possam trazer impacto educacional pelo Brasil.

### Atuação da Mastertech

- Gestão de inscrições e análise de pré-requisitos
- Leitura de todas as submissões (2 a 3 mil em média)
- Seleção das 80 propostas que avançam para a fase competitiva
- Condução de 4 workshops remotos de 3 horas cada:
  - Modelagem de negócios
  - Prototipação I
  - Prototipação II
  - Storytelling e pitch

**Processo de seleção:**
- A cada workshop, o grupo é reduzido pela metade: dos 80 selecionados, 40 avançam para o segundo workshop, depois 20 para o terceiro, 10 para o quarto
- Após o ciclo de workshops, os 10 semifinalistas recebem mentorias individuais de preparação para a banca
- Esses 10 apresentam suas soluções a uma banca avaliadora, que escolhe os 5 finalistas
- A etapa final é presencial, no Rio de Janeiro, onde os 5 finalistas apresentam o pitch de seus protótipos e são classificados em ordem do primeiro ao quinto lugar

---

## #2 – Pós-LED – Acompanhamento dos Finalistas

O Pós-LED é uma nova frente que amplia o impacto do Desafio LED. A proposta é apoiar os 5 vencedores na organização do lançamento de seus produtos, transformando o prêmio em uma oportunidade real de aplicação.

### 2.1 Estrutura

O programa é dividido em 2 ciclos, cada um dedicado aos temas centrais do desenvolvimento de startups.

Cada ciclo começa com um workshop coletivo de 2 horas, onde o tema é trabalhado em grupo. A partir desse workshop, cada finalista aprofunda o mesmo tema em sua realidade específica, por meio de mentorias individuais:

- São 2 sessões de 1 hora por pessoa em cada ciclo
- Isso significa 2 horas por pessoa por ciclo, totalizando 4 horas de mentoria para cada finalista.

### 2.2 Modelo esquemático (na perspectiva do mentorado)

**Ciclo A:**
- **Temas:** Fortalecimento do Modelo de Negócio (base estrutural) | Recursos e Organização da Equipe (funções, vínculos e acordos)
- **Workshop coletivo:** 2 horas
- **Sessões individuais por finalista:** 2 horas (2 sessões de 1 hora)
- **Carga horária do ciclo por finalista:** 4h

**Ciclo B:**
- **Temas:** Medição de Impacto (validação de resultados) | Parcerias e Escalas (expansão) | Captação de Recursos (sustentação e crescimento)
- **Workshop coletivo:** 2 horas
- **Sessões individuais por finalista:** 2 horas (2 sessões de 1 hora)
- **Carga horária do ciclo por finalista:** 4h

### 2.3 Carga de trabalho total (na perspectiva da Mastertech)

| Atividade | Cálculo | Total |
|-----------|--------|-------|
| Workshops coletivos | 2 encontros × 2h | 4h |
| Mentorias individuais | 4h por pessoa × 5 finalistas | 20h |
| **Total consolidado** | — | **24h** |

**Notas:**

1. O período de aproximadamente 6 meses foi definido para que as mentorias tenham tempo de repercutir no andamento real dos projetos, permitindo que os finalistas testem, recebam retornos, façam ajustes e tragam novas questões para os ciclos seguintes. Somados aos cerca de 4 meses do Desafio LED, forma-se um ciclo de quase um 1 ano completo. Ao concentrar a mentoria em menos tempo, corre-se o risco de restringir a assimilação e a aplicação prática dos temas.

2. Todo esse processo, da definição das agendas ao registro das mentorias, passando pela organização dos feedbacks e das entregas, será acompanhado em um sistema da Mastertech que garante transparência e gestão clara tanto para os finalistas quanto para a Globo.

---

## #3 – Academia LED de Jornalismo

A Academia LED ocorre em duas edições anuais, uma em São Paulo–Rio e outra no Nordeste.

### Atuação da Mastertech

1. **Gestão operacional do processo de seleção de projetos**, incluindo o acompanhamento das inscrições, a triagem documental, o suporte ao processo avaliativo junto a pareceristas externos convidados da Globo e a consolidação dos resultados por meio de um sistema próprio de avaliação.

2. **Preparação de mentores**, oferecendo suporte metodológico e ferramentas práticas aos jornalistas que acompanharão os projetos selecionados durante sua fase de desenvolvimento.

---

## Investimento para o Pacote

| Programa / Item | Frequência Anual | Valor | Observações |
|-----------------|------------------|------|-------------|
| **Desafio LED** | 1 edição | R$ 348.000 | Mesmo valor da base contratual atual, apenas acrescido de inflação (estimada em 4,5%) |
| **Pós-LED** | 1 edição | R$ 28.000 | Segunda versão de orçamento (antes era R$ 78.000) |
| **Academia LED de Jornalismo** | 2 edições | R$ 87.500 | Valor para duas edições anuais, conforme bases já negociadas em 2025 e acrescida de inflação (estimada em 4,5%) |
| **Total 2026** | — | **R$ 463.500** | — |

**Para 2027**, este total anual seria atualizado pelo IPCA vigente no período.

---

## Forma de Pagamento

Os pagamentos seguirão os fluxos já praticados pela Globo em contratações anteriores com a Mastertech, respeitando os trâmites administrativos da empresa.

---

## Próximos Passos

- Validação do escopo do Pós-LED, para confirmar se atende plenamente ao objetivo de apoiar os vencedores na organização do lançamento de seus produtos
- Definição conjunta do cronograma de execução para 2026 e 2027
- Ajustes finais da proposta a partir das contribuições da Globo

---

*Documento confidencial - Uso exclusivo da Globo*`

// Briefing Globo - Resumo executivo baseado em reunião
export const briefingContent = `# Briefing Globo
## Resumo Executivo - Ações e Responsabilidades Mastertech
### Baseado em transcrição de reunião

---

## 1. Novo Edital: Tecnologia e Inteligência Artificial (Prioridade Alta)

Este é o projeto onde a Mastertech terá **maior protagonismo no desenho e execução**. O objetivo é encontrar talentos universitários que estejam estudando ou pensando em aplicações de IA para produção de conteúdo.

### Responsabilidade da Mastertech
- **Desenhar 100% da mecânica e do conceito**

### Público-Alvo
- Estudantes de **graduação** (exclui-se mestrado/doutorado)
- De qualquer curso, desde que proponham soluções de conteúdo usando IA
- A ideia é formar base para contratação futura (estágio/júnior)

### Mecânica Proposta (Framework)
- **Convocatória e Seleção:** Definir como selecionar os jovens (protótipo, ideia, etc.)
- **Imersão:** Formato War Room ou laboratório nos Estúdios Globo (Rio de Janeiro)
- **Metodologia:** Utilizar Design Sprint ou Hackathon durante cerca de uma semana, onde os alunos criarão protótipos
- **Cronograma:** A imersão deve ocorrer por volta de **agosto/setembro** (período eleitoral)

### Entregável Imediato
- Criar um **framework visual** (não precisa estar finalizado) com a linha do tempo e momentos chaves para apresentar na reunião do dia 28

---

## 2. Edital PPA (Prêmio Profissionais do Ano) - Publicidade

Neste projeto, a mecânica será mais **"padrão"**, adaptada ao modelo do prêmio já existente, focada na criação de peças publicitárias.

### Responsabilidade da Mastertech
- Gerenciar a **"convocatória aberta"** (chamada nacional)
- Realizar a **"primeira peneira"** (seleção inicial) dos estudantes
- Apoiar na concepção da **narrativa do edital** (provável tema social/valorização do professor)

### Fluxo
- Os alunos selecionados pela Mastertech farão uma imersão para produzir peças que serão avaliadas pelo júri oficial do PPA

### Planejamento
- É necessário criar um **"calendário reverso"** baseado na data do júri oficial (novembro é a final, mas há etapas anteriores)

---

## 3. Jornalismo

- **Status:** A imersão ocorrerá no segundo semestre e as disciplinas eletivas (PUC e USP) estão encaminhadas
- **Não haverá edital aberto neste ano** devido ao ano eleitoral
- **Ação:** Nenhuma ação imediata de planejamento requerida para este pilar no momento

---

## 4. Agenda e Próximos Passos (Curto Prazo)

A equipe precisa se organizar para validar as ideias antes da reunião oficial com o cliente.

### Reunião Interna (Mastertech)
- Agendar para **segunda-feira (tarde) ou terça-feira (manhã)** – provável dia 26
- Objetivo: Desenhar o rascunho/framework

### Validação com Viri
- Reunião marcada para o dia **27 (terça-feira)**, preferencialmente pela manhã (9h ou 10h)
- Objetivo: Alinhar a proposta preliminar

### Reunião com Parceiros/Tecnologia
- Dia **28 (quarta-feira)**
- Objetivo: Apresentar o framework visual e a linha do tempo

---

*Documento confidencial - Uso exclusivo da Globo*
`

// Briefing PPA - Edital Universitário Academia LED PPA
export const briefingPPAContent = `# Edital Universitário para reconhecer estudantes de publicidade e propaganda

**Academia LED**  
**PPA – Prêmio Profissionais do Ano**  
**Master Globo**

---

## Por que um edital?

### 1. Identificação de Talentos
Revela jovens criativos com alto potencial e aproxima futuros profissionais da companhia.

### 2. Amplia a percepção do PPA
Cria um ciclo que aproxima jovens da principal premiação da publicidade e impulsiona novos talentos, diversidade de ideias e conexões no mercado.

### 3. Fortalecimento da Academia LED
Reforça o compromisso da marca com educação e amplia a presença da Academia LED nas universidades.

### 4. Fomentar o mercado através da Master Globo
Promove a Master Globo como plataforma de formação em soluções multiplataforma, preparando profissionais para o ecossistema de negócios da Globo.

---

## Sugestões de Temas

### Valorização do Professor
Campanha para o Dia do Professor, reforçando o papel central da educação e de quem a transforma.

### Jovens que Transformam o Brasil
Campanha que destaca o protagonismo da juventude em iniciativas sociais, criativas e educacionais pelo país.

### Transformação Verde
Campanha sobre sustentabilidade, inovação ambiental e o papel da educação na construção de um futuro mais responsável.

### Tema Globo
Campanha sobre posicionamento GLOBO em alguma frente de negócio – a definir.

---

## Proposta de Mecânica

### 1. Ampla Convocatória
Edital nacional para equipes de até 03 estudantes de publicidade + professor mentor apresentarem solução para o desafio proposto.

### 2. O que esperamos?
Enviar uma proposta criativa para uma campanha no tema do edital. A Globo irá desenvolver a campanha.  
A inscrição deve conter:

- Material criativo de defesa  
- Roteiro criativo de uma peça de 30 segundos  
- Roteiro de uma ação integrada  
- indicar um professor  

### 3. Seleção Inicial
Banca com acadêmicos, profissionais do mercado e Globo avalia as inscrições e seleciona 10 projetos.

### 4. Mentoria Master Globo
As 10 equipes participam de uma mentoria online e exclusiva com a Master para aprimorar a ideia da campanha integrada.

### 5. Pitch
As equipes defendem suas propostas de campanha para uma banca Globo. Ao final, serão escolhidas 03 equipes para aprimorar o planejamento + imersão.

### 6. Encontros + Imersão
As equipes selecionadas participam de uma 04 encontros prévios e online para detalhar todo o processo e seguem para imersão na Globo SP para finalizar a proposta criativa.

### 7. Avaliação do Júri
As 03 propostas criativas produzidas durante a imersão são encaminhadas e avaliadas pelo júri do PPA. A ideia escolhida é desenvolvida pela Globo.

### 8. Desenvolvimento
A proposta criativa vencedora será anunciada no PPA. A campanha proposta nela será desenvolvida pela Globo e veiculada.

---

## Evento de Lançamento

**Evento de Lançamento**  
Um programa ao vivo no estúdio do Altas Horas com plateia de público produzida com estudantes de Publicidade.  
A proposta é transmitir o evento online com divulgação prévia para que os estudantes acompanhem.

---

## Tempos & Movimentos

**Status:** EM REVISÃO  

### 2026

**Janeiro**  
Desenvolvimento da Naming da premiação

**Fevereiro**  
Desenvolvimento do Edital

**Março**

**Abril**  
Aula Inaugural + Lançamento da Convocatória  
Fim das inscrições

**Maio**  
Início da avaliação pelos pareceristas  
Seleção das 10 duplas

**Junho**  
Imersão Master Globo SP + Pitch Final

**Julho a Setembro**  
Desenvolvimento da Campanha pela dupla  
Mentorias Master Globo

**Outubro**  
Validação da Campanha

**Novembro**  
Exibição no PPA

**Dezembro**  
Veiculação

---

## Próximos Passos

- Validar a iniciativa e a mecânica com os stackholders  
  **NOV/25 – JAN/26**

- Definir o nome da premiação  
  **JAN/26**

- Definir o tema do edital  
  **JAN/26**

- Definir um conselho Acadêmico para desenvolvimento de todas as etapas da mecânica e construção do edital  
  **JAN/26**

- Definir a divisão de Orçamento  
  **JAN/26**

- Validar o Tempos e Movimentos do edital  
  **JAN/26**

- Fazer a Ementa e Definição da Imersão  
  **FEV/26**

---

_v.1.2_`

// Proposta PPA - Focada nos 6 primeiros pontos da mecânica
export const propostaPPAContent = `
---

## Objetivo

Esta proposta apresenta a atuação da Mastertech na operacionalização dos **6 primeiros pontos da mecânica do Desafio PPA**, desde a convocatória nacional até a imersão presencial na Globo SP.

A Mastertech será responsável por conduzir todo o processo formativo e seletivo, entregando 3 equipes finalistas prontas para a avaliação do júri do PPA (pontos 7 e 8, de responsabilidade da Globo).

---

## Atuação da Mastertech

### Escopo de Trabalho

A Mastertech operacionaliza os seguintes pontos da mecânica:

| Ponto | Atividade | Responsabilidade Mastertech |
|-------|-----------|----------------------------|
| **1** | Ampla Convocatória | Gestão completa do edital nacional, plataforma de inscrições e comunicação |
| **2** | O que esperamos? | Definição e validação de entregáveis, suporte às equipes na submissão |
| **3** | Seleção Inicial | Organização da banca, consolidação de avaliações, seleção das 10 equipes |
| **4** | Mentoria Master Globo | Condução de mentoria online exclusiva para as 10 equipes selecionadas |
| **5** | Pitch | Estruturação e coordenação do pitch, seleção das 3 equipes finalistas |
| **6** | Encontros + Imersão | Coordenação de 4 encontros online + organização da imersão presencial na Globo SP |

**Pontos 7 e 8** (Avaliação do Júri e Desenvolvimento) são de responsabilidade da Globo.

---

## Processo Detalhado

### Fase 1: Ampla Convocatória

**Duração:** 6 semanas  
**Objetivo:** Lançar edital nacional e coletar inscrições de equipes de publicidade

**Atividades da Mastertech:**

- Desenvolvimento e lançamento da plataforma de inscrições
- Gestão de comunicação e divulgação do edital
- Suporte às equipes durante o período de inscrições
- Validação de elegibilidade (equipes de até 3 estudantes + professor mentor)
- Consolidação de todas as submissões recebidas

**Entregáveis:**
- Plataforma de inscrições funcional e responsiva
- Base de dados completa de inscrições validadas
- Relatório de inscrições (quantidade, distribuição geográfica, perfil das equipes)

---

### Fase 2: Seleção Inicial

**Duração:** 3 semanas  
**Objetivo:** Avaliar todas as inscrições e selecionar as 10 melhores equipes

**Atividades da Mastertech:**

- Organização da banca avaliadora (acadêmicos, profissionais do mercado e Globo)
- Estruturação do processo de avaliação
- Consolidação de todas as avaliações
- Comunicação transparente com todas as equipes
- Seleção e divulgação das 10 equipes finalistas

**Critérios de Avaliação:**
- Qualidade criativa da proposta
- Relevância e viabilidade dos roteiros
- Potencial de impacto da campanha proposta
- Alinhamento com o tema do edital

**Entregáveis:**
- Processo de avaliação documentado e executado
- Lista das 10 equipes selecionadas
- Relatório executivo da seleção inicial

---

### Fase 3: Mentoria Master Globo

**Duração:** 4 semanas  
**Objetivo:** Aprimorar as ideias das 10 equipes selecionadas

**Atividades da Mastertech:**

- Condução de mentoria online exclusiva para as 10 equipes
- Sessões coletivas e individuais de desenvolvimento
- Aprofundamento da campanha integrada proposta
- Refinamento dos roteiros criativos
- Preparação para o pitch final

**Estrutura da Mentoria:**

| Tipo | Frequência | Duração | Participantes |
|------|------------|---------|---------------|
| Sessão coletiva | 1x por semana | 2 horas | Todas as 10 equipes |
| Sessão individual | 1x por equipe | 1 hora | Equipe + mentor |
| Acompanhamento | Contínuo | — | Via plataforma |

**Entregáveis:**
- 10 campanhas aprimoradas e documentadas
- Roteiros revisados e otimizados
- Equipes preparadas para o pitch

---

### Fase 4: Pitch

**Duração:** 2 semanas  
**Objetivo:** Selecionar as 3 equipes que avançam para a imersão

**Atividades da Mastertech:**

- Estruturação do formato de pitch
- Coordenação da banca Globo
- Organização logística da apresentação (presencial ou online)
- Consolidação de avaliações
- Seleção e comunicação das 3 equipes finalistas

**Formato do Pitch:**
- Apresentação de 10 minutos por equipe
- Defesa da campanha integrada proposta
- Q&A com a banca Globo
- Avaliação em tempo real

**Entregáveis:**
- 3 equipes selecionadas para imersão
- Relatório de avaliação do pitch
- Documentação completa das 3 campanhas finalistas

---

### Fase 5: Encontros Prévios + Imersão

**Duração:** 6 semanas (4 semanas de encontros + 2 semanas de imersão)  
**Objetivo:** Preparar e executar a imersão presencial na Globo SP

**Atividades da Mastertech:**

**Encontros Prévios (4 semanas):**
- 4 encontros online para detalhar todo o processo
- Alinhamento de expectativas e cronograma
- Preparação técnica e criativa para a imersão
- Definição de entregáveis e prazos

**Imersão Presencial (2 semanas):**
- Coordenação logística da imersão na Globo SP
- Facilitação dos encontros presenciais
- Acompanhamento do desenvolvimento das propostas criativas
- Suporte técnico e criativo às equipes
- Finalização das 3 propostas criativas para avaliação do júri PPA

**Estrutura da Imersão:**

| Atividade | Duração |
|-----------|---------|
| Acolhimento e briefing | 1 dia |
| Desenvolvimento criativo | 5 dias |
| Produção das propostas criativas | 5 dias |
| Finalização e entrega | 2 dias |

**Entregáveis:**
- 3 propostas criativas finalizadas e prontas para avaliação do júri PPA
- Documentação completa do processo de imersão
- Relatório final com métricas e aprendizados

---

## Cronograma e Timeline

| Fase | Duração | Período | Entregável Principal |
|------|---------|---------|----------------------|
| **Fase 1: Convocatória** | 6 semanas | Abril 2026 | Inscrições validadas |
| **Fase 2: Seleção Inicial** | 3 semanas | Maio 2026 | 10 equipes selecionadas |
| **Fase 3: Mentoria** | 4 semanas | Maio-Junho 2026 | Campanhas aprimoradas |
| **Fase 4: Pitch** | 2 semanas | Junho 2026 | 3 equipes finalistas |
| **Fase 5: Encontros + Imersão** | 6 semanas | Julho-Setembro 2026 | 3 propostas criativas finalizadas |
| **Total** | **21 semanas** | **Abril a Setembro 2026** | — |

**Observação:** O cronograma está alinhado ao "Tempos & Movimentos" do briefing PPA, considerando que a avaliação do júri (ponto 7) ocorre em outubro e a exibição no PPA (ponto 8) em novembro.

---

## Infraestrutura e Tecnologia

### Plataforma de Inscrições

- Sistema web responsivo e acessível
- Formulário de inscrição com upload de arquivos (material criativo, roteiros)
- Área do participante para acompanhamento do processo
- Painel administrativo para gestão completa
- Sistema de notificações automáticas

### Sistema de Gestão

- Base de dados centralizada de todas as equipes
- Workflow de avaliação configurável
- Dashboard de acompanhamento em tempo real
- Geração de relatórios automatizados
- Integração com ferramentas de comunicação

### Ambiente de Mentoria

- Plataforma de videoconferência (Zoom/Teams)
- Espaço colaborativo online para desenvolvimento
- Biblioteca de recursos e materiais de apoio
- Sistema de acompanhamento de entregas

### Segurança e Conformidade

- Proteção de dados pessoais (LGPD)
- Backup e recuperação de dados
- Controle de acesso e permissões
- Auditoria de ações no sistema
- Conformidade com diretrizes de segurança da Globo

---

## Investimento e Precificação

### DETALHAMENTO DAS ENTREGAS:

**Fases 1, 2 e 4 (R$ 43.500,00):**
- Plataforma de inscrições funcional e responsiva
- Base de dados completa de inscrições validadas
- Processo de avaliação documentado
- Seleção das 10 equipes
- Pitch e seleção das 3 finalistas

**Fase 3 - Mentoria (R$ 21.000,00):**
- 10 campanhas aprimoradas e documentadas
- Roteiros revisados e otimizados
- Equipes preparadas para o pitch

**Fase 5 - Imersão (R$ 65.000,00):**
- Mediação e condução técnica durante a imersão
- 3 propostas criativas finalizadas
- Documentação completa do processo
- Relatório final com métricas

**Infraestrutura:**
- Microsoft Forms ou Typeform
- Sistemas de análise de submissões
- Plataforma de gestão

**Total: R$ 129.500,00**

### Forma de Pagamento

- **30%** na assinatura do contrato (início Fase 1)
- **30%** no início da Fase 3 (Mentoria)
- **25%** no início da Fase 5 (Encontros + Imersão)
- **15%** na entrega final (3 propostas criativas finalizadas)

### Observações

- Valores incluem impostos e taxas
- Custos de deslocamento e hospedagem para a imersão presencial serão tratados separadamente conforme necessidade
- Valores podem ser ajustados conforme escopo final definido com a Globo

---

## Diferenciais da Mastertech

### Experiência Comprovada

- Histórico em gestão de processos seletivos de grande escala (Desafio LED, Academia LED)
- Expertise em desenvolvimento de plataformas de submissão
- Conhecimento em facilitação de processos criativos e formativos

### Capacidade Técnica

- Equipe multidisciplinar (desenvolvimento, design, comunicação, gestão)
- Infraestrutura tecnológica própria
- Metodologias ágeis e iterativas
- Experiência em mentoria e desenvolvimento de talentos

### Alinhamento com Valores

- Compromisso com transparência e justiça
- Respeito à diversidade e inclusão
- Foco em resultados de qualidade
- Valorização da educação e formação

---

## Próximos Passos

### Aprovação da Proposta

- Revisão e aprovação pela Globo
- Ajustes finais conforme feedback
- Definição de escopo e cronograma finais
- Assinatura do contrato

### Kick-off

- Reunião de alinhamento inicial
- Definição de equipes e responsabilidades
- Estabelecimento de canais de comunicação
- Início do planejamento detalhado da Fase 1

---

*Documento confidencial - Uso exclusivo da Globo*`
export const propostaIAContent = `# Proposta Comercial
## Desafio de Inteligência Artificial
### Mastertech para Globo

---

## 1. Contexto e Objetivo

A Globo busca desenvolver um desafio sobre Inteligência Artificial para estudantes de ensino superior do Brasil, com foco na aplicação de IA para produção e distribuição de conteúdo. Esta proposta reconhece que o conceito do desafio, tema e gancho ainda não estão definidos, e que sua construção é parte fundamental do trabalho proposto.

### 1.1 Objetivo do Trabalho
Desenvolver e executar um desafio de IA que:
- Coleta propostas de uso de IA na criação de conteúdos para o ecossistema Globo
- Garante qualidade técnica e viabilidade das soluções propostas
- Protege a marca e estratégia da Globo
- Respeita questões éticas e regulatórias
- Descobre e conecta talentos reais

### 1.2 Premissas Fundamentais
- **O conceito do desafio ainda não está definido** - sua construção é parte do escopo
- Existe cuidado estratégico com exposição de marca e abordagens superficiais
- O desafio deve diferenciar claramente talentos humanos de talentos artificiais
- A IA deve ser posicionada como assistente, não substituto
- O processo deve evitar overengineering e manter simplicidade operacional

### 1.3 Desafios Reconhecidos
- **Tabu do tema:** IA na produção de conteúdo é sensível (substituição de empregos, sindicatos)
- **Proteção estratégica:** Globo não pode revelar roadmap interno ou gaps tecnológicos
- **Risco reputacional:** Mercado pode ler equivocadamente a iniciativa se mal comunicada
- **Qualidade das submissões:** Evitar hipóteses como ideias, exigir lastro técnico
- **Complexidade operacional:** Mecânica precisa ser clara e executável

---

## 2. Fase 0: Construção do Conceito do Desafio e Desenho do Desafio

Esta fase é **obrigatória e parte do escopo**, dedicada à construção colaborativa do conceito do desafio, definição de recorte temático, desenho da mecânica e alinhamento editorial e de marca.

### 2.1 Objetivo da Fase 0
Construir, em conjunto com a Globo, os fundamentos do desafio através de um processo estruturado de reflexão orientada, não como uma definição fechada prévia.

### 2.2 Processo de Trabalho

#### 2.2.1 Mapeamento e Análise (2 semanas)
- Análise de 50 casos de uso de IA pré-calibrados
- Mapeamento de territórios de possibilidade respeitando restrições
- Identificação de áreas sensíveis e guardrails necessários
- Análise de referências (framework Netflix, casos internacionais)

#### 2.2.2 Construção de Hipóteses (2 semanas)
- Desenvolvimento de múltiplas hipóteses de conceito do desafio e tema
- Exploração de diferentes níveis de abertura
- Análise de prós e contras de cada abordagem
- Workshop colaborativo com equipe Globo

#### 2.2.3 Definição de Recorte Temático (2 semanas)
- Definição de categorias ou desafios específicos
- Recorte temático que evita áreas sensíveis
- Definição de guardrails e critérios de elegibilidade
- Alinhamento com objetivos estratégicos da Globo

#### 2.2.4 Desenho da Mecânica (2 semanas)
- Desenho detalhado da mecânica do desafio
- Definição de fases, entregas e critérios de transição
- Desenvolvimento de framework de avaliação (adaptado do Netflix)
- Prototipação da experiência do participante (mock do site)

#### 2.2.5 Alinhamento Editorial e de Marca (1 semana)
- Desenvolvimento de diretrizes de comunicação
- Alinhamento de tom e linguagem
- Definição de mensagens-chave
- Estratégia de mitigação de riscos reputacionais

### 2.3 Entregável Final da Fase 0
**Documento de Definição do Desafio**, contendo:
- Conceito do desafio e tema definidos
- Recorte temático aprovado
- Mecânica detalhada e validada
- Framework de avaliação
- Diretrizes de comunicação
- Cronograma de execução
- Orçamento detalhado

**Aprovação necessária:** Este documento deve ser aprovado pela Globo antes do início da Fase 1.

---

## 3. Espaço de Especulação e Amadurecimento

Esta seção apresenta as **perguntas estratégicas, hipóteses de abordagem, tensões relevantes e critérios de decisão** que devem ser explorados durante a Fase 0.

### 3.1 Perguntas Estratégicas Fundamentais

#### Sobre o Nível de Abertura
- Quão aberto deve ser o desafio?
- Qual o equilíbrio entre criatividade e controle?

#### Sobre a Mecânica
- Qual a estrutura ideal?
- Como garantir qualidade técnica?

#### Sobre Categorias e Recorte
- Quais categorias fazer sentido?
- Como evitar áreas sensíveis?

#### Sobre Proteção Estratégica
- O que a Globo pode revelar sem expor estratégia?
- Como comunicar sem criar expectativas erradas?

### 3.2 Hipóteses de Abordagem

#### Hipótese A: Híbrido em 2 Fases (RECOMENDADO)
**Fase 1 - Semi-aberta com categorias:**
- Participante escolhe uma de 5 categorias
- Submete proposta escrita (máx 2 páginas) + vídeo pitch (3min)
- Framework de auto-avaliação tipo Netflix
- Top 30 selecionados (6 por categoria)

**Fase 2 - Desafios específicos:**
- Globo revela desafio concreto para cada categoria
- Finalistas prototipam solução para o desafio
- Acesso a dados anonimizados/sintéticos
- 1 vencedor por categoria = 5 implementações piloto

**Vantagens:**
- Balanceamento entre alcance e qualidade
- Controle progressivo de risco
- Narrativa positiva: "escuta ampla + rigor técnico"

### 3.3 Tensões Relevantes

#### Tensão 1: Abertura vs Controle
- **Abertura:** Permite ideias inovadoras, mas aumenta risco de propostas polêmicas
- **Controle:** Protege marca, mas pode limitar criatividade
- **Equilíbrio:** Categorias semi-abertas com guardrails claros

#### Tensão 2: Qualidade vs Alcance
- **Qualidade:** Exigir protótipo desde o início garante lastro técnico, mas reduz participação
- **Alcance:** Processo aberto aumenta participação, mas pode gerar muitas propostas rasas
- **Equilíbrio:** Fase 1 inclusiva (proposta escrita) + Fase 2 seletiva (protótipo)

### 3.4 Critérios de Decisão
- Proteção de Marca
- Qualidade Técnica
- Viabilidade de Implementação
- Descoberta de Talentos
- Simplicidade Operacional

---

## 4. Mecânica Proposta (Hipótese de Trabalho)

### 4.1 Estrutura Geral: Híbrido em 2 Fases

#### FASE 1: Submissão de Propostas (Semi-aberta)
**Duração:** 6 semanas  
**Objetivo:** Coletar propostas de uso de IA em categorias pré-definidas

**Mecânica:**
- Abertura pública através de plataforma dedicada
- Participante escolhe uma de 5 categorias
- Submissão de proposta escrita (máx 2 páginas) + vídeo pitch (3min)
- Framework de auto-avaliação tipo Netflix
- Período de 4 semanas para submissões
- Período de 2 semanas para avaliação

**Critérios de Avaliação (Fase 1):**
- Relevância para a categoria (30%)
- Viabilidade técnica (25%)
- Ética e conformidade (25%)
- Inovação (10%)
- Clareza da proposta (10%)

#### FASE 2: Prototipação (Fechada)
**Duração:** 8 semanas  
**Objetivo:** Desenvolver protótipos funcionais para desafios específicos

**Mecânica:**
- Globo revela desafio concreto para cada categoria
- Finalistas recebem acesso a dados anonimizados/sintéticos
- Mentoria técnica síncrona (sessões semanais)
- Desenvolvimento de protótipo funcional
- Documentação técnica da solução
- Apresentação para banca técnica + executiva

**Critérios de Avaliação (Fase 2):**
- Viabilidade técnica (30%)
- Impacto no negócio (25%)
- Ética e conformidade (25%)
- Inovação (10%)
- Escalabilidade (10%)

**Resultado:** 5 vencedores (1 por categoria) para implementação piloto

---

## 5. RESPONSABILIDADES E PAPÉIS

### 5.1 Mastertech

**Fase 0 - Construção do Conceito do Desafio:**
- Facilitação do processo de construção colaborativa
- Análise e síntese de informações
- Desenvolvimento de hipóteses e recomendações
- Prototipação de diferentes abordagens
- Documentação do processo e decisões

**Fase 1 - Submissão:**
- Desenvolvimento e manutenção da plataforma
- Gestão do processo de submissão
- Aplicação do framework de auto-avaliação
- Coordenação da avaliação inicial
- Comunicação com participantes

**Fase 2 - Prototipação:**
- Coordenação de mentoria técnica
- Gestão de acesso a dados (em conjunto com Globo)
- Facilitação de sessões de mentoria
- Coordenação da banca avaliadora
- Produção de relatórios

### 5.2 Globo

**Fase 0:**
- Participação ativa nos workshops
- Definição de objetivos estratégicos
- Validação de hipóteses e recomendações
- Aprovação do conceito do desafio, recorte e mecânica

**Fase 1:**
- Definição de categorias (se aplicável)
- Validação de critérios de avaliação
- Participação na avaliação inicial (se desejado)

**Fase 2:**
- Definição de desafios específicos por categoria
- Fornecimento de dados anonimizados/sintéticos
- Indicação de mentores técnicos (se necessário)
- Participação na banca avaliadora
- Aprovação de vencedores

---

## 6. PREMISSAS REGULATÓRIAS

### 6.1 Regulamento Formal
O regulamento formal será desenvolvido na Fase 0, mas esta proposta já considera:

**Elegibilidade:**
- Estudantes de ensino superior (graduação ou pós-graduação)
- Indivíduos ou equipes (máx 4 pessoas)
- Residência no Brasil
- Idade mínima: 18 anos

**Proteção de Dados:**
- Conformidade com LGPD
- Política de privacidade clara
- Consentimento para uso de dados
- Direitos de participantes protegidos

### 6.2 Guardrails Éticos

**Explicitamente fora do escopo:**
- Soluções que substituem talentos criativos humanos
- Deepfakes ou réplicas digitais de pessoas reais
- Uso não autorizado de conteúdo protegido
- Soluções que violam direitos de imagem
- Processamento de dados pessoais sem consentimento

**Posicionamento obrigatório:**
- IA como ferramenta de assistência, não substituição
- Valorização de talentos humanos
- Transparência sobre uso de IA
- Ética e responsabilidade social

---

## 7. CRONOGRAMA E ENTREGAS

### 7.1 Timeline Geral
**Duração total:** 20 semanas (Fase 0) + 14 semanas (Fases 1 e 2) = 34 semanas (aproximadamente 8 meses)

| Fase | Duração | Início | Término |
|------|---------|--------|---------|
| **Fase 0: Construção do Conceito do Desafio** | 9 semanas | T+0 | T+9 |
| **Fase 1: Submissão** | 6 semanas | T+9 | T+15 |
| **Fase 2: Prototipação** | 8 semanas | T+15 | T+23 |
| **Fase 3: Implementação (Opcional)** | 12 semanas | T+23 | T+35 |

### 7.2 Entregas Principais

**Fase 0:**
- Documento de mapeamento de territórios
- Análise de hipóteses de abordagem
- Documento de recorte temático aprovado
- Mecânica detalhada e validada
- Framework de avaliação
- Diretrizes de comunicação
- **Documento de Definição do Desafio (aprovado)**

**Fase 1:**
- Plataforma de submissão funcional
- Base de dados de propostas validadas
- Relatório de distribuição por categoria
- Lista de 30 finalistas

**Fase 2:**
- 5 protótipos funcionais
- Documentação técnica completa
- Relatório de avaliação
- 5 vencedores selecionados

---

## 8. INFRAESTRUTURA E TECNOLOGIA

### 8.1 Plataforma de Submissão
- Sistema web responsivo
- Formulários dinâmicos por categoria
- Upload de documentos e vídeos
- Framework de auto-avaliação integrado
- Área do participante para acompanhamento
- Painel administrativo para gestão

### 8.2 Ambiente de Prototipação (Fase 2)
- Acesso a dados anonimizados/sintéticos
- APIs e ferramentas de desenvolvimento
- Ambiente de testes isolado
- Suporte técnico para finalistas
- Documentação e tutoriais

### 8.3 Segurança e Conformidade
- Proteção de dados pessoais (LGPD)
- Backup e recuperação de dados
- Controle de acesso e permissões
- Auditoria de ações no sistema
- Conformidade com diretrizes de segurança da Globo

---

## 9. COMUNICAÇÃO E ENGAGEMENT

### 9.1 Estratégia de Comunicação

**Mensagens-chave:**
- IA como ferramenta de assistência, não substituição
- Descoberta e valorização de talentos humanos
- Inovação responsável e ética
- Oportunidade de impacto real no ecossistema Globo

**Canais:**
- Site dedicado do desafio
- Redes sociais da Globo
- Parcerias com universidades
- Comunicação direta com estudantes

### 9.2 Mitigação de Riscos Reputacionais

**Estratégias:**
- Comunicação proativa sobre posicionamento
- Framework de guardrails claro e público
- Transparência sobre processo e critérios
- Respostas rápidas a questionamentos
- Parceria com especialistas em ética de IA

---

## 10. MÉTRICAS E INDICADORES DE SUCESSO

### 10.1 Métricas Operacionais
- Número de submissões recebidas (Fase 1)
- Taxa de elegibilidade
- Distribuição por categoria
- Taxa de conclusão de protótipos (Fase 2)
- Qualidade técnica dos protótipos

### 10.2 Indicadores de Qualidade
- Satisfação dos participantes
- Qualidade técnica das soluções
- Viabilidade de implementação
- Alinhamento com objetivos da Globo

### 10.3 Métricas de Impacto
- Alcance da comunicação
- Engajamento nas redes sociais
- Cobertura midiática
- Reconhecimento do setor
- Potencial de implementação das soluções

---

## 11. INVESTIMENTO E PRECIFICAÇÃO

### 11.1 Estrutura de Custos

**Fase 0 - Construção do Conceito do Desafio:**
- Facilitação e workshops: R$ 60.000 - R$ 80.000
- Análise e pesquisa: R$ 40.000 - R$ 60.000
- Prototipação de abordagens: R$ 30.000 - R$ 40.000
- Documentação: R$ 20.000 - R$ 30.000

**Desenvolvimento e Infraestrutura:**
- Plataforma de submissão: R$ 50.000 - R$ 70.000
- Sistema de gestão e avaliação: R$ 40.000 - R$ 60.000
- Ambiente de prototipação: R$ 30.000 - R$ 50.000
- Infraestrutura e hospedagem: R$ 15.000 - R$ 25.000

**Operação:**
- Gestão Fase 1: R$ 60.000 - R$ 80.000
- Coordenação Fase 2: R$ 80.000 - R$ 100.000
- Mentoria técnica: R$ 40.000 - R$ 60.000

**Total estimado:** R$ 395.000 - R$ 615.000

*Valores podem variar conforme escopo final definido na Fase 0*

### 11.2 Forma de Pagamento
- 20% na assinatura do contrato (início Fase 0)
- 30% na aprovação do Documento de Definição (fim Fase 0)
- 30% no início da Fase 2
- 20% na entrega final

---

## 12. RISCOS E MITIGAÇÕES

### 12.1 Riscos Identificados

**Baixa adesão:**
- *Risco:* Poucas submissões recebidas
- *Mitigação:* Estratégia de comunicação robusta, parcerias com universidades, extensão de prazo se necessário

**Qualidade das submissões:**
- *Risco:* Propostas sem lastro técnico
- *Mitigação:* Framework de auto-avaliação, comunicação educativa, exigência de protótipo na Fase 2

**Propostas polêmicas:**
- *Risco:* Propostas que violam guardrails éticos
- *Mitigação:* Framework de auto-avaliação, filtragem na Fase 1, comunicação clara sobre limites

**Exposição estratégica:**
- *Risco:* Desafios revelam gaps ou estratégia interna
- *Mitigação:* Desafios genéricos, dados anonimizados, validação na Fase 0

**Atrasos no processo:**
- *Risco:* Atrasos em etapas críticas
- *Mitigação:* Cronograma com margem de segurança, gestão proativa, comunicação transparente

### 12.2 Plano de Contingência
- Flexibilidade no cronograma quando necessário
- Ajustes no escopo mediante aprovação da Globo
- Comunicação proativa de riscos e alternativas
- Processo iterativo que permite ajustes

---

## 13. Diferenciais da Mastertech

### 13.1 Experiência em Desafios e Processos Seletivos
- Histórico comprovado em gestão de desafios de grande escala
- Expertise em desenvolvimento de plataformas
- Conhecimento em facilitação de processos colaborativos

### 13.2 Conhecimento em IA
- Equipe com expertise técnica em IA
- Conhecimento de frameworks éticos (Netflix, outros)
- Experiência em prototipação de soluções de IA

### 13.3 Capacidade Técnica
- Equipe multidisciplinar
- Infraestrutura tecnológica própria
- Metodologias ágeis e iterativas

### 13.4 Alinhamento com Valores
- Compromisso com ética e responsabilidade
- Transparência e comunicação clara
- Foco em resultados de qualidade

---

## 14. Próximos Passos

### 14.1 Aprovação da Proposta
- Revisão e aprovação pela Globo
- Ajustes finais conforme feedback
- Definição de equipe e responsabilidades

### 14.2 Kick-off Fase 0
- Reunião de alinhamento inicial
- Apresentação do processo de construção do conceito do desafio
- Definição de cronograma detalhado
- Início dos workshops colaborativos

---

*Documento confidencial - Uso exclusivo da Globo*`
