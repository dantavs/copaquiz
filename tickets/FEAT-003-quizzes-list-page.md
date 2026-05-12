# FEAT-003: Página de Lista de Quizzes

## Description
Implementar uma página centralizadora de quizzes para recuperar o acesso ao conteúdo removido do redesign da Home. Esta página servirá como o hub de todos os quizzes do site.

## User Story
Como usuário, quero ter acesso a todos os quizzes disponíveis em um único lugar, para que eu possa escolher qual desafio quero enfrentar sem depender de links específicos na home.

## Acceptance Criteria
- [x] **Nova Rota**: Criar a página em `/quizzes`.
- [x] **Integração Home**: Alterar o CTA "Quiz da Copa" na Home Page para redirecionar para `/quizzes`.
- [x] **Listagem de Quizzes**: Renderizar a lista de quizzes utilizando os dados de `app/data/quizzes.ts`.
    - Exibir: **História das Copas**, **Quem é você na Copa?** e **Minha Seleção**.
    - **Importante**: NÃO listar "Simulador da Copa" nem "Adivinhe o Jogador".
- [x] **UI/UX da Listagem**:
    - Utilizar o componente `QuizCard.tsx` para manter a consistência visual.
    - Exibir Título, Descrição, Categoria e Dificuldade de cada quiz.
    - Cada card deve levar para a rota do quiz correspondente: `/quiz/[id]`.
- [x] **Navegação**: Implementar um botão "Voltar para Home" no topo da página, redirecionando para `/`.
- [x] **Responsividade**: A lista deve ser exibida em grid responsivo (1 coluna mobile, 2 ou 3 colunas desktop).

## Status
- Status: Done
- Priority: High
- Assignee: @developer

## Notes
- O desenvolvedor deve importar a constante `quizzes` de `app/data/quizzes.ts` e filtrar apenas os que não sejam simuladores/adivinhação (embora a lista de `quizzes.ts` já contenha apenas os quizzes).
