# FEAT-004: Configurar Google Analytics

## Description
Implementar a tag de rastreamento do Google Analytics (G-HMF9LNHGX7) no layout global da aplicação para monitoramento de acessos e comportamento do usuário.

## Acceptance Criteria
- [x] Adicionar script externo do Google Tag Manager no `RootLayout`.
- [x] Configurar o `gtag` com o ID `G-HMF9LNHGX7`.
- [x] Utilizar o componente `next/script` para otimização de carregamento.

## Status
- Status: Review
- Priority: Medium
- Assignee: @manager (Review)

## Notes
- Implementado via `next/script` com a estratégia `afterInteractive`.
