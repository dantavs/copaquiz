# TASK-015: Exportar lista de figurinhas repetidas

## Description
Adicionar botão "Exportar Repetidas" na página do álbum que gera uma lista das figurinhas que o usuário possui em excesso (quantity > 1), em formato de texto copiável e CSV para download.

## Acceptance Criteria
- [ ] Botão "Exportar Repetidas" presente na página do álbum
- [ ] Ao clicar, texto é copiado para área de transferência no formato: "Repetidas:\nBRA-01 Brasil - Escudo (x3)\n..."
- [ ] Também oferece download de arquivo CSV com colunas: id, nome, quantidade, raridade, categoria
- [ ] Apenas figurinhas com quantity > 1 aparecem na lista
- [ ] Feedback visual (toast) confirmando a cópia/download

## Status
- Status: Review
- Priority: Medium
- Assignee: @developer

## Notes
- Fase E — Exportação
- Depende de TASK-010 (álbuns funcionais)
- Quantidade exibida no texto é a quantidade repetida (quantity - 1) com "(xN)"
