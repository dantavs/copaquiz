# TASK-020: Exibir contagem de repetidas no cabeçalho das seleções

## Description

No filtro "Repetidas", o cabeçalho de cada seleção mostra "X/20" (colecionadas/total). Deve mostrar a quantidade de figurinhas repetidas daquela seleção em vez disso.

## Acceptance Criteria

- [ ] No filtro "Repetidas", o cabeçalho exibe quantidade de repetidas em vez de "colecionadas/total"
- [ ] O valor mostrado é a soma de (quantity - 1) para cada sticker com quantity > 1
- [ ] Nos filtros "Todas" e "Faltantes", mantém o comportamento atual (colecionadas/total)
- [ ] Build passa sem erros

## Status

- Status: Done
- Priority: Medium
- Assignee: @developer
