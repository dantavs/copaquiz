# TASK-001: Limpeza de Palpites Diários (Adivinhe o Jogador)

## Description
Implementar a limpeza automática de palpites do "Desafio Diário" do jogo Adivinhe o Jogador quando houver mudança de dia, preservando estatísticas globais.

## Acceptance Criteria
- [x] **Lógica de Verificação**: Implementar a checagem de data no carregamento do jogo via `checkAndCleanDailyGuesses()` em `app/lib/daily-cleanup.ts`.
- [x] **Persistência de Data**: Salva a data do último acesso no localStorage na chave `daily_quiz_last_date` (formato `YYYY-MM-DD`).
- [x] **Limpeza Seletiva**: Se `last_date` != `current_date`, remove chaves `copa-dle-daily-*` de dias anteriores e a chave legada `daily_guesses`.
- [x] **Preservação de Dados**: Chaves protegidas: `copa-dle-endless-v1` (modo infinito) e qualquer chave que corresponda a `total_wins`, `global_stats` ou `best_streak`.
- [x] **Atualização**: Atualiza `daily_quiz_last_date` para a data atual após a limpeza.

## Status
- Status: Done
- Priority: High
- Assignee: @developer

## Notes
- **BUG FIXED (2026-05-12) — duas rodadas de correção**:

  **Rodada 1 (3 problemas corrigidos):**

  1. **Timezone mismatch (crítico)** — `getTodayString()` usava data **local** (`new Date().getDate()`), mas o jogo salva as chaves no formato **UTC** (`new Date().toISOString().split('T')[0]`). Para usuários em fusos negativos (ex: Brasil UTC-3), após as 21h o jogo já salva com a data UTC do dia seguinte, mas a limpeza comparava com a data local atual — causando um falso "mesmo dia" e impedindo a limpeza.  
     *Correção: `getTodayString()` agora usa `new Date().toISOString().split('T')[0]` (mesmo padrão do jogo).*

  2. **Cleanup rodava no useEffect com `[gameMode]`** — A limpeza estava dentro do mesmo `useEffect` que carregava o estado do jogo e dependia de `gameMode`. Isso fazia a limpeza rodar novamente ao trocar de aba (diário ↔ infinito), além de poder causar race conditions com o carregamento do estado.  
     *Correção: extraído para um `useEffect` próprio com dependência `[]` (roda uma vez na montagem).*

  3. **Falta de logs de debug** — Não havia visibilidade sobre a execução da limpeza.  
     *Correção: adicionados `console.log` em cada etapa: data atual, última data, chaves removidas e confirmação de atualização do `daily_quiz_last_date`.*

  **Rodada 2 (1 problema corrigido):**

  4. **Preservava a chave do dia "atual" ao mudar a data para trás** — A lógica original removia apenas chaves `copa-dle-daily-*` que NÃO correspondiam ao `today`. Quando o usuário alterava o relógio para um dia anterior em que já havia jogado, a chave daquele dia era PRESERVADA (porque "batia" com o novo `today`), e o jogo carregava os palpites antigos.  
     *Correção: agora quando `lastDate !== today`, TODAS as chaves `copa-dle-daily-*` são removidas (inclusive a de hoje), garantindo estado completamente novo.*

