# TASK-022: Ajustes finais no CopaCollector

## Description
Seis ajustes finais de UX e correções no CopaCollector 2026.

## Acceptance Criteria

### 1. Contagem de repetidas no cabeçalho do accordion
- [ ] No filtro "Repetidas", o cabeçalho exibe "X repetidas" (quantidade de figurinhas com quantity > 1)
- [ ] O cálculo considera apenas os stickers repetidos, não o total da coleção

### 2. Contagem total no cabeçalho do accordion
- [ ] No filtro "Repetidas", mostrar APENAS a quantidade de repetidas (não "colecionadas/total")

### 3. Exportar repetidas — quantidade correta
- [ ] No texto exportado, exibir `(xN)` onde N = quantity - 1 (quantidade repetida), não a quantidade total

### 4. Accordion fechado por padrão
- [ ] Ao abrir a página, todos os accordions de seleção iniciam fechados

### 5. Visual do badge de quantidade
- [ ] Badge da quantidade: borda verde, número verde, fundo transparente (sem preenchimento)
- [ ] Diferenciar visualmente do botão +

### 6. Feedback visual ao clicar em +/-
- [ ] Nos filtros "Repetidas" e "Todas", ao clicar em + ou -, o card dá um "flash" (brilho rápido)
- [ ] Feedback sutil, sem atrapalhar a usabilidade

## Status
- Status: Done
- Priority: Medium
- Assignee: @developer

## Notes
- Ajustes finais antes de considerar o CopaCollector completo
- Testar todos os cenários: Todas, Repetidas, Faltantes
