# TASK-009: Seções "Minhas Repetidas" e "Faltantes"

## Description
Implementar abas/seletor na página do colecionador para filtrar a grade entre "Todas", "Repetidas" (quantity > 1) e "Faltantes" (quantity === 0), com badge de contagem em cada aba.

## Acceptance Criteria
- [ ] Aba "Todas" exibe todas as figurinhas (comportamento padrão)
- [ ] Aba "Repetidas" exibe apenas stickers com quantity > 1
- [ ] Aba "Faltantes" exibe apenas stickers com quantity === 0
- [ ] Cada aba exibe um badge com a contagem (ex: "Repetidas (12)")
- [ ] Ao trocar de aba, a grade atualiza instantaneamente sem recarregar a página

## Status
- Status: To Do
- Priority: High
- Assignee: @developer

## Notes
- Fase B — Grid Interativo
- Depende de TASK-008 (controles de quantidade)
- Estado do filtro pode ser local (useState) ou na store
