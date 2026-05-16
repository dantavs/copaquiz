# TASK-010: CRUD de álbuns (criar, listar, selecionar, deletar)

## Description
Implementar um seletor de álbuns na página do colecionador, permitindo que o usuário crie múltiplos álbuns independentes, alterne entre eles e os delete. Cada álbum possui seu próprio estado de coleção isolado.

## Acceptance Criteria
- [ ] Botão "Criar Álbum" abre modal com campo de nome; ao confirmar, o álbum aparece no seletor
- [ ] Estado da coleção é isolado por álbum (trocar de álbum mostra stickers diferentes)
- [ ] Deletar álbum exibe confirmação ("Tem certeza?") e remove o álbum da lista
- [ ] É possível alternar entre álbuns sem perder o progresso de cada um
- [ ] Ao menos um álbum padrão ("Meu Álbum") existe ao acessar a página pela primeira vez

## Status
- Status: Review
- Priority: High
- Assignee: @developer

## Notes
- Fase C — Álbuns
- Depende de TASK-007 (store adaptada para multi-álbum)
- A store precisa ser refatorada para suportar `albums: Record<string, Record<string, number>>`
