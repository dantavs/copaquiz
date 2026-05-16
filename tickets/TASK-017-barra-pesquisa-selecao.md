# TASK-017: Barra de pesquisa/filtro por seleção na grade de figurinhas

## Description
Adicionar uma barra de pesquisa abaixo dos filtros (Faltantes/Repetidas/Todas) que permite ao usuário digitar o nome de uma seleção e filtrar a grade para mostrar apenas as figurinhas daquela seleção. O comportamento deve ser similar ao campo de busca do "Adivinhe o Jogador" — sugestões aparecem conforme a digitação, e quando vazio, mostra todas as opções.

## Acceptance Criteria
- [ ] Barra de pesquisa visível abaixo dos filtros Faltantes/Repetidas/Todas
- [ ] Ao digitar, mostra sugestões de seleções (nomes dos países, FWC, CC) em um dropdown
- [ ] Ao selecionar uma sugestão, a grade filtra para mostrar apenas aquela seleção
- [ ] Quando o campo está vazio, mostra todas as seleções (comportamento padrão)
- [ ] O filtro de pesquisa funciona em conjunto com os filtros Faltantes/Repetidas/Todas
- [ ] Estilo consistente com o resto da página (glassmorphism)

## Status
- Status: Done
- Priority: Medium
- Assignee: @developer

## Notes
- Melhoria na experiência de navegação do CopaCollector
- O dropdown de sugestões deve ter altura máxima com scroll
- Fechar sugestões ao clicar fora
