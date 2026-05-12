/**
 * Utilitário para limpeza de dados diários do jogo "Adivinhe o Jogador".
 *
 * Mantém uma chave de controle (`daily_quiz_last_date`) em localStorage para
 * rastrear a última data de acesso. Se houver mudança de dia, remove apenas
 * os palpites do dia anterior, preservando estatísticas globais.
 *
 * IMPORTANTE: Usa UTC (mesmo padrão do jogo: `new Date().toISOString().split('T')[0]`)
 * para evitar mismatch de timezone com as chaves salvas pelo DleGame.
 */

const LAST_DATE_KEY = 'daily_quiz_last_date';

/** Prefixo usado pelo jogo diário para salvar o estado (ex: copa-dle-daily-2026-05-12) */
const DAILY_GUESS_PREFIX = 'copa-dle-daily-';

/** Chave legada que porventura ainda exista de versões anteriores */
const LEGACY_DAILY_GUESSES_KEY = 'daily_guesses';

/**
 * Retorna a data atual no formato YYYY-MM-DD usando UTC.
 * Mesmo padrão usado pelo jogo: `new Date().toISOString().split('T')[0]`
 */
function getTodayString(): string {
  return new Date().toISOString().split('T')[0];
}

/**
 * Verifica se a função de limpeza está disponível (ambiente client-side).
 */
function isClient(): boolean {
  return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
}

/**
 * Executa a limpeza de dados diários se o dia tiver mudado desde o último acesso.
 *
 * Deve ser chamada uma vez no carregamento do jogo (client-side).
 * Retorna um objeto com informações do que foi feito (útil para debug).
 */
export function checkAndCleanDailyGuesses(): { cleaned: boolean; removedKeys: string[]; lastDate: string | null; today: string } | null {
  if (!isClient()) return null;

  const today = getTodayString();
  const lastDate = localStorage.getItem(LAST_DATE_KEY);

  const result = {
    cleaned: false,
    removedKeys: [] as string[],
    lastDate,
    today,
  };

  console.log('[daily-cleanup] Verificando:', { lastDate, today });

  // Mesmo dia → nada a fazer
  if (lastDate === today) {
    console.log('[daily-cleanup] Mesmo dia, sem limpeza necessária.');
    return result;
  }

  // Primeiro acesso OU mudou de dia
  console.log('[daily-cleanup] Data diferente ou primeiro acesso. Executando limpeza...');

  // 1. Remove TODAS as chaves de palpites diários (inclusive a de hoje)
  //    Quando a data muda (seja pra frente ou pra trás), queremos um estado
  //    completamente novo — não faz sentido preservar dados de uma data que
  //    o usuário pode ter visitado anteriormente.
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (!key) continue;

    // Preserva chaves do modo infinito e estatísticas globais
    if (key === 'copa-dle-endless-v1') continue;
    if (/^(total_wins|global_stats|best_streak)/.test(key)) continue;

    if (key.startsWith(DAILY_GUESS_PREFIX)) {
      result.removedKeys.push(key);
    }
  }

  // 2. Se existir a chave legada `daily_guesses`, também a remove
  if (localStorage.getItem(LEGACY_DAILY_GUESSES_KEY) !== null) {
    result.removedKeys.push(LEGACY_DAILY_GUESSES_KEY);
  }

  // 3. Executa a remoção
  result.removedKeys.forEach((key) => {
    localStorage.removeItem(key);
    console.log('[daily-cleanup] Removida chave:', key);
  });

  if (result.removedKeys.length === 0) {
    console.log('[daily-cleanup] Nenhuma chave antiga para remover.');
  }

  // 4. Atualiza a data do último acesso
  localStorage.setItem(LAST_DATE_KEY, today);
  result.cleaned = true;
  console.log('[daily-cleanup] daily_quiz_last_date atualizado para:', today);

  return result;
}
