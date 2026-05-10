# Proposta de Design: Gamificação do Infinite Mode

## Objetivo
Transformar o Infinite Mode em uma experiência gamificada, aumentando o engajamento através de feedback visual de vitórias e um sistema de progressão por sequência de vitórias (streak).

## Elementos de UI/UX

### 1. Feedback Visual de Vitórias
*   **Animação de Confetes:**
    *   Revisar a animação existente para torná-la mais festiva e menos intrusiva.
    *   Adicionar um leve efeito sonoro de celebração (opcional, para discussão com o PO).
*   **Exibição de Win Streak:**
    *   Posicionamento: Cabeçalho do jogo, ao lado do contador de pontuação.
    *   Estilo: Ícone de chama (fogo) + número da sequência em negrito e cor de destaque (ex: laranja/dourado).

### 2. Gamificação da Sequência (Streak)
*   **Barra de Progresso (Milestone):**
    *   Posicionamento: Logo abaixo do cabeçalho ou integrada ao painel de status do jogador.
    *   Design: Barra de progresso visual mostrando o caminho para o próximo nível/troféu.
*   **Sistema de Medalhas/Troféus:**
    *   Ícones baseados em vitórias consecutivas:
        *   **3 Vitórias:** Bronze 🥉
        *   **5 Vitórias:** Prata 🥈
        *   **10 Vitórias:** Ouro 🥇
    *   Estado: Medalhas conquistadas ficam brilhantes; medalhas futuras ficam acinzentadas (bloqueadas).

### 3. Persistência de Dados
*   A interface deve garantir que, ao recarregar a página, o estado visual da streak e da progressão da barra reflita os dados salvos no `localStorage`.

---
## Notas para @developer
*   A interface precisa ser responsiva.
*   Utilizar variáveis de CSS para as cores dos estados das medalhas para fácil manutenção.
*   Priorizar acessibilidade (contraste adequado para os ícones e barras).
