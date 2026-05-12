# TICKET-003: World Cup 2026 Simulator

## Description
Develop a simulator for the 2026 World Cup, allowing users to simulate match results and see the classification of teams according to official FIFA rules.

### References
- **Benchmark (Selection-based):** [2026 Bracket](https://2026bracket.vercel.app/)
- **Benchmark (Scores-based - for logic comparison):** [ge.globo.com World Cup Simulator](https://interativos.ge.globo.com/futebol/copa-do-mundo/especial/simulador-da-copa-do-mundo-2026)
- **Official Rules:** [FIFA Classification and Tie-breakers](https://www.fifa.com/pt/tournaments/mens/worldcup/canadamexicousa2026/articles/copa-mundo-grupos-regulamento-classificacao-desempate)

### New Approach
Instead of inputting individual match scores, the user will directly select the 1st, 2nd, and 3rd place teams for each group. This streamlines the simulation process and focuses on the outcome of the group stage.

### Constraints
- **Mobile First Approach:** The interface must be optimized for mobile devices.

## Acceptance Criteria
- [x] Detailed functional specification by @product_owner (including match simulation logic and tie-breaker rules).
- [x] Mobile-first UX/UI proposal by @designer.
- [x] Technical feasibility analysis.
- [x] Roadmap for implementation broken down into smaller tasks.

## Proposta Funcional

### 1. Regras de Classificação (Simplificada)
O simulador seguirá o formato de 48 seleções divididas em 12 grupos de 4 times.
- **Classificação Direta:** O usuário define manualmente a posição final de cada equipe no grupo (1º, 2º, 3º e 4º).
- **Critérios de Avanço:**
  - Os 1º e 2º colocados de cada grupo avançam automaticamente para o Round of 32.
  - Dos 12 terceiros colocados, o usuário seleciona os 8 que avançam para completar a chave.

### 2. Jornada do Usuário
1. **Fase de Grupos:** O usuário seleciona, para cada grupo, qual equipe ficou em 1º, 2º e 3º lugar.
2. **Seleção de Melhores 3ºs:** O usuário escolhe 8 das 12 equipes que ficaram em 3º lugar para avançarem ao mata-mata.
3. **Simulação do Mata-Mata:** O sistema gera automaticamente a chave do Round of 32. O usuário seleciona o vencedor de cada confronto até a final.
4. **Finalização:** O usuário visualiza o campeão e pode reiniciar ou compartilhar o resultado.

### 3. Funcionalidades Detalhadas
- **Seleção de Posições:** Interface de seleção (dropdown ou drag-and-drop) para definir a ordem de classificação de cada grupo.
- **Validação de Escolhas:**
  - Impedir a seleção da mesma equipe para posições diferentes no mesmo grupo.
  - Garantir que as posições de 1º, 2º e 3º sejam preenchidas antes de liberar a fase seguinte.
- **Gestão de 3º Colocados:** Tela dedicada para selecionar exatamente 8 equipes entre os terceiros colocados de todos os grupos.
- **Mapeamento de Chave Automático:** Distribuição dos classificados na chave do mata-mata conforme o regulamento oficial, baseando-se nas posições selecionadas.
- **Persistência:** Salvamento do estado da simulação no `localStorage` do navegador.
- **Reset:** Botão para limpar todas as seleções de classificação e mata-mata.

### 4. Proposta de Design/UX (Mobile First)

#### A. Fluxo de Navegação Otimizado
- **Navegação Principal:** Sistema de abas fixas no topo: `[ Grupos ] [ Melhores 3ºs ] [ Mata-Mata ]`.
- **Visualização de Grupos:**
  - **Cards Colapsáveis:** Cada grupo (A-L) é um card expansível.
  - **Seleção Rápida:** Lista de equipes do grupo com seletores numéricos (1, 2, 3, 4) ao lado, facilitando a definição da classificação sem abrir teclados.
- **Visualização de Melhores 3ºs:**
  - **Lista de Seleção:** Lista com os 12 terceiros colocados e um checkbox/toggle para marcar os 8 que avançam. Contador visual (`0/8`) para guiar o usuário.
- **Visualização do Mata-Mata:**
  - **Bracket Interativo:** Interface de "árvore" com suporte a zoom e pan (arrastar).
  - **Seleção Rápida:** Clique direto no nome da seleção para defini-la como vencedora do confronto; a seleção avança automaticamente para a próxima fase.

#### B. Elementos Visuais e Paleta de Cores
- **Paleta de Cores:**
  - **Primária:** Azul Marinho Profundo (`#001F3F`) - Fundo e cabeçalhos.
  - **Secundária:** Ouro Vibrante (`#FFD700`) - Destaques, campeão e botões de ação principal.
  - **Acentos:** Verde Esmeralda (`#2ECC71`) para classificados e Vermelho Coral (`#E74C3C`) para eliminados.
  - **Neutros:** Branco e Cinza Claro para textos e divisórias.
- **Tipografia:** Fonte Sans-serif moderna (ex: Inter ou Roboto).
- **Componentes:** Uso de bandeiras circulares pequenas ao lado de cada seleção para identificação rápida.

#### C. Hierarquia de Informações (Mobile)
1. **Contexto:** Letra do Grupo $\rightarrow$ Equipe $\rightarrow$ Posição.
2. **Resultado:** Status de Classificação (Avança/Eliminado).
3. **Progresso:** Fase do Mata-Mata $\rightarrow$ Confronto $\rightarrow$ Vencedor.



## Definição Técnica

### 1. Modelo de Dados
Para representar o estado da simulação, será utilizada a seguinte estrutura JSON:

```json
{
  "teams": {
    "ID_TEAM": { "name": "Nome da Seleção", "flag": "url_bandeira" }
  },
  "groups": {
    "A": ["ID_T1", "ID_T2", "ID_T3", "ID_T4"],
    "B": [...] 
  },
  "simulation": {
    "groupSelections": {
      "A": { "1": "ID_T1", "2": "ID_T2", "3": "ID_T3", "4": "ID_T4" },
      "B": { ... }
    },
    "topThirds": ["ID_T_3rd_1", "ID_T_3rd_2", ...], // Lista de 8 IDs
    "bracket": {
      "R32_MATCH_1": { "winner": "ID_T1" },
      "R16_MATCH_1": { "winner": "ID_T2" },
      ...
      "FINAL": { "winner": "ID_CHAMPION" }
    }
  }
}
```

### 2. Matriz de Mapeamento
Para evitar hardcoding e garantir flexibilidade, o preenchimento do bracket será baseado em um arquivo de configuração `bracketMapping.json`.

**Lógica de Slot:**
Cada confronto do Round of 32 terá um mapeamento de origem:
- `Home`: Referência a `(Grupo, Posição)`. Ex: `{ group: 'A', pos: 1 }`.
- `Away`: Referência a `(Grupo, Posição)` ou a um slot de `Best Third`. Ex: `{ group: 'C', pos: 3, isThird: true }`.

O sistema resolverá o ID da equipe consultando `simulation.groupSelections[group][pos]`. Para os 3º colocados, validará se o ID está presente na lista `topThirds`.

### 3. Estratégia de Estado
Recomenda-se o uso de **Zustand** para a gestão do estado global:
- **Performance:** Atualizações atômicas e rápidas, essenciais para a responsividade da interface mobile.
- **Simplicidade:** Evita o *prop-drilling* e a complexidade de *providers* aninhados da Context API.
- **Persistência:** Integração nativa com o middleware `persist` para salvar o progresso automaticamente no `localStorage`.

### 4. Escalabilidade e Manutenção


## Base de Dados de Equipes

Abaixo está a distribuição simulada das 48 seleções nos 12 grupos (A-L):

- **Grupo A:** EUA, Argentina, Coreia do Sul, Noruega
- **Grupo B:** México, França, Marrocos, Canadá
- **Grupo C:** Brasil, Japão, Gana, Egito
- **Grupo D:** Inglaterra, Espanha, Uruguai, Austrália
- **Grupo E:** Portugal, Bélgica, Senegal, Irã
- **Grupo F:** Hungria, Holanda, Costa do Marfim, Arábia Saudita
- **Grupo G:** Alemanha, Croácia, Nigéria, Equador
- **Grupo H:** Colômbia, Suíça, Tunísia, Mali
- **Grupo I:** Dinamarca, Sérvia, Camarões, Uzbequistão
- **Grupo J:** Áustria, Peru, Argélia, Omã
- **Grupo K:** Polônia, Ucrânia, Zâmbia, Panamá
- **Grupo L:** Suécia, Costa Rica, África do Sul, Iraque

## Status
- Status: Done
- Priority: Medium
- Assignee: @developer (Implementation)

## New Requirements: Sharing System
- **Share Button:** Add a "Share Results" button at the end of the simulation.
- **Enable Logic:** The button must be disabled until the FINAL match is decided and a champion is crowned.
- **Content to Share:** The shared message/image must include a summary of all knockout stage results (Round of 32 $\rightarrow$ Final).
- **Format:** Define a clean, readable text format or an image generation logic for social media.

### Proposta de Compartilhamento (@product_owner & @designer)

#### 1. Formato do Texto (PO)
O texto deve ser conciso para evitar truncamento em redes sociais, focando na progressão do campeão e nos resultados gerais:

"🏆 Meu Simulador Copa 2026!

R32: [T1]>[T2], [T3]>[T4]...
R16: [T1]>[T3], [T5]>[T6]...
QF: [T1]>[T5], [T7]>[T8]...
SF: [T1]>[T7], [T9]>[T10]...
Final: [Campeão] > [Vice]

🥇 CAMPEÃO: [Campeão]!

Simule você também: [URL]"

#### 2. Design e UX (Designer)
- **Botão de Compartilhamento:**
  - **Posição:** Abaixo do destaque do campeão na aba "Mata-Mata".
  - **Estilo:** Botão Ouro (`#FFD700`) com texto Azul Marinho (`#001F3F`).
  - **Texto:** "Compartilhar Resultado 📲"
  - **Estado:** Desabilitado (opacidade 50%) até que o vencedor da Final seja definido.
- **Fluxo de Interação:**
  - **Primário:** Uso da **Web Share API** (`navigator.share`) para abrir a folha de compartilhamento nativa do dispositivo (Mobile First).
  - **Fallback:** Caso a API não esteja disponível, copiar o texto para o clipboard e exibir um Toast de confirmação ("Link copiado!").
  - **Modal:** Não haverá modal de prévia para reduzir a fricção; o conteúdo será enviado diretamente ao app de destino.



## New Refinements (Requested by User)
- **Interaction Model Change:** Replace the listbox/dropdown for positions. The rank should be determined by the order of selection:
  - First team clicked in a group $\rightarrow$ 1st Place.
  - Second team clicked $\rightarrow$ 2nd Place.
  - Third team clicked $\rightarrow$ 3rd Place.
- **Navigation Guard:**
  - Block navigation to "Best Thirds" and "Bracket" phases if any group is missing its 1st, 2nd, or 3rd place selection.
- **Flexibility:** Ensure the user can return to the "Groups" phase at any time to modify selections, which should automatically update the subsequent phases.


### Implementation Notes
- Populated `worldCupData.ts` with 48 teams across 12 groups.
- Created `bracketMapping.json` defining the path from R32 to Final.
- Implemented `GroupSelection` with a numeric position selector.
- Implemented `BestThirdsSelection` with a limit of 8 selected teams.
- Implemented `Bracket` with automatic winner propagation and champion highlight.
- Integrated all components in `SimulatorPage` with a tabbed mobile-first navigation.


