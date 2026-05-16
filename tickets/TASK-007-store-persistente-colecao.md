# TASK-007: Store persistente da coleção de figurinhas

## Description
Criar uma store Zustand com middleware `persist` para gerenciar o estado da coleção de figurinhas do usuário, seguindo o mesmo padrão já usado em `simulationStore.ts`.

## Acceptance Criteria
- [ ] Store possui o estado `owned: Record<string, number>` (id da sticker → quantidade; 0 = não tenho)
- [ ] Store expõe as ações: `setQuantity(id, n)`, `increment(id)`, `decrement(id)`, `resetCollection()`
- [ ] Estado persiste após refresh da página (localStorage)
- [ ] Quantidade mínima é 0, não permite valores negativos
- [ ] Store é tipada com TypeScript

## Status
- Status: Review
- Priority: High
- Assignee: @developer

## Notes
- Fase A — Fundação
- Seguir o mesmo padrão de `app/lib/simulationStore.ts`
- Depende de TASK-006 (dados das figurinhas)
