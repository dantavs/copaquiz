# TASK-008: Controles de quantidade (+/-) na grade de figurinhas

## Description
Adicionar botões de incremento/decremento em cada card da grade de figurinhas, permitindo que o usuário controle quantas unidades de cada figurinha possui. O badge numérico deve refletir o estado da store.

## Acceptance Criteria
- [ ] Cada card da grid exibe badge numérico com a quantidade atual (some quando quantity = 0)
- [ ] Botão "+" incrementa a quantidade na store e o badge atualiza imediatamente
- [ ] Botão "-" decrementa a quantidade (mínimo 0) e o badge some quando chega em 0
- [ ] Raridade da figurinha é refletida visualmente (cor/moldura diferente para NORMAL, HOLOGRAPHIC, GOLDEN, SPECIAL)

## Status
- Status: Review
- Priority: High
- Assignee: @developer

## Notes
- Fase B — Grid Interativo
- Depende de TASK-007 (store persistente)
- UX: cliques devem ser responsivos e feedback visual imediato
