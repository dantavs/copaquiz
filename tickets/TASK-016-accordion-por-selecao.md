# TASK-016: Accordion por seleção na grade de figurinhas

## Description
Agrupar as figurinhas por seleção/equipe na grade do CopaCollector, utilizando seções expansíveis/colapsáveis (accordion). Cada seção agrupa as 20 figurinhas de uma seleção, mais as seções especiais FWC (História) e CC (Coca-Cola) ao final.

## Acceptance Criteria
- [ ] Grade agrupada por prefixo do ID (ex: BRA, MEX, ARG...) com cabeçalho da seleção
- [ ] Cada seção é expansível/colapsável ao clicar no cabeçalho
- [ ] Cabeçalho exibe o nome da seleção e progresso (ex: "Brasil — 15/20")
- [ ] Filtros "Todas/Repetidas/Faltantes" continuam funcionando dentro das seções
- [ ] Seções especiais FWC (FIFA World Cup History) e CC (Coca-Cola) ao final
- [ ] Accordion deve funcionar bem em mobile
- [ ] Estado expandido/colapsado persiste visualmente (não precisa persistir em store)

## Status
- Status: Done
- Priority: High
- Assignee: @developer

## Notes
- Fase B — Grid Interativo (melhoria na visualização)
- Depende de TASK-009 (filtros) e TASK-008 (controles)
- O prefixo do ID da sticker já identifica a seleção (ex: "BRA-01" → Brasil)
