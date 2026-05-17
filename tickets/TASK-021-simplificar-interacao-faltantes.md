# TASK-021: Simplificar interação na visualização de faltantes

## Description
Na aba "Faltantes", remover os botões de + e - de cada card de figurinha. Ao clicar na figurinha, ela deve ser adicionada à coleção (increment) e removida automaticamente da visualização, já que não é mais uma figurinha faltante.

## Acceptance Criteria
- [ ] Botões + e - não aparecem na visualização de faltantes
- [ ] Clicar no card da figurinha adiciona 1 à quantidade na store (increment)
- [ ] Após clicar, a figurinha some da grade (pois não é mais faltante)
- [ ] Nas visualizações "Todas" e "Repetidas", os botões + e - permanecem
- [ ] Build passa sem erros

## Status
- Status: Done
- Priority: Medium
- Assignee: @developer

## Notes
- UX: um clique adiciona, sem necessidade de confirmação
- O comportamento deve ser instantâneo (otimista)
