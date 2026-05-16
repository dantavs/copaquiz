# TASK-014: Exportar lista de figurinhas faltantes

## Description
Adicionar botão "Exportar Faltantes" na página do álbum que gera uma lista das figurinhas que o usuário ainda não possui, em formato de texto copiável e CSV para download.

## Acceptance Criteria
- [ ] Botão "Exportar Faltantes" presente na página do álbum
- [ ] Ao clicar, texto é copiado para área de transferência no formato: "Faltam N figurinhas:\nBRA-01 Brasil - Escudo\n..."
- [ ] Também oferece download de arquivo CSV com colunas: id, nome, raridade, categoria
- [ ] Apenas figurinhas com quantity === 0 aparecem na lista
- [ ] Feedback visual (toast) confirmando a cópia/download

## Status
- Status: Done
- Priority: Medium
- Assignee: @developer

## Notes
- Fase E — Exportação
- Depende de TASK-010 (álbuns funcionais)
- Formato CSV deve usar separador `;` e encoding UTF-8 com BOM
