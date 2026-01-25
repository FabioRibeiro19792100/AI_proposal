# PREMISSAS DO DESAFIO GLOBO IA
## Extraídas das notas e discussões

---

## 1. CONTEXTO GERAL

**Demandante:** Globo  
**Objetivo:** Montar proposta de desafio sobre IA para estudantes de ensino superior do Brasil  
**Foco:** Aplicação de IA para produção e distribuição de conteúdo  
**Missão:** Esquematizar desde a chamada, tema, gancho e mote para conceber o desafio

---

## 2. RESTRIÇÕES E DESAFIOS IDENTIFICADOS

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

## 3. ELEMENTOS DE SOLUÇÃO CONSIDERADOS

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

## 4. IDEIAS INICIAIS (ABANDONADAS)

### 4.1 IA como Avaliadora
**Ideia:** Usar IA para avaliar submissões com critérios pré-definidos da Globo  
**Problema:** Complexidade técnica, risco de "caixa preta", pode frustrar participantes

### 4.2 Tokenização para Matching
**Ideia:** Tokenizar ideias para encontrar pessoas com ideias semelhantes e formar equipes  
**Problema:** Overengineering, difícil de explicar, ganho nebuloso

### 4.3 Conclusão
**"Acho que o desafio pode ser simplificado"** - Complexidades desnecessárias que desviam do objetivo principal (coletar boas propostas de uso de IA)

---

## 5. DIRECIONAMENTO FINAL

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

## 6. PRINCÍPIOS ORIENTADORES (SÍNTESE)

1. **SIMPLICIDADE** - Mecânica clara, sem overengineering
2. **FUNDAMENTO** - Exigir lastro técnico (protótipo), não apenas ideias hipotéticas
3. **PROTEÇÃO** - Framework para evitar propostas polêmicas/inviáveis
4. **ESPECIFICIDADE** - Categorias/desafios claros, não totalmente aberto
5. **SEPARAÇÃO** - Modular tema vs mecânica para precificar e executar
6. **PROTOTIPAÇÃO** - Mockar experiência antes de lançar
7. **REFERÊNCIA** - Usar Netflix como benchmark validado
8. **ÉTICA** - Diferenciar claramente IA como ferramenta, não substituto de talentos

---

## 7. PRÓXIMAS DECISÕES NECESSÁRIAS

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

## 8. ENTREGÁVEIS PRODUZIDOS

1. **50 Casos de Uso de IA para Globo** - Pré-calibrados com todas as restrições
2. **Quadro de Pros/Contras de Mecânicas** - 5 opções analisadas com recomendação
3. **Este Documento de Premissas** - Consolidação das notas e decisões

---

## ANEXO: CHECKLIST DE VALIDAÇÃO

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
- [ ] Sindicatos e áreas jurídicas foram consultados
