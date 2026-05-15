export type QuizType = 'trivia' | 'personality';

export interface QuizOption {
  text: string;
  // Para Trivia
  isCorrect?: boolean;
  // Para Personalidade (ex: { 'pele': 2, 'zidane': 1 })
  scores?: Record<string, number>;
}

export interface Question {
  id: string;
  text: string;
  options: QuizOption[];
}

export interface QuizOutcome {
  id: string;
  title: string;
  description: string;
  image?: string;
}

export interface Quiz {
  id: string;
  type: QuizType;
  title: string;
  description: string;
  category: string;
  difficulty: 'Fácil' | 'Médio' | 'Difícil';
  image: string;
  emoji?: string;
  questions: Question[];
  // Apenas para Personalidade
  outcomes?: QuizOutcome[];
}

export const quizzes: Quiz[] = [
  {
    id: 'economia',
    type: 'trivia',
    title: 'Economia e Esporte',
    description: 'Desafie-se com questões sobre o impacto econômico dos grandes eventos esportivos.',
    category: 'Curiosidades',
    difficulty: 'Médio',
    image: '/images/economia.jpg',
    emoji: '💰',
    questions: [
      { id: 'q1', text: 'Qual evento teve o maior custo de organização da história até 2022?', options: [{ text: 'Copa 2014', isCorrect: false }, { text: 'Copa 2022', isCorrect: true }, { text: 'Olimpíadas 2016', isCorrect: false }, { text: 'Copa 2018', isCorrect: false }] },
      { id: 'q2', text: 'Qual o principal objetivo do investimento em estádios?', options: [{ text: 'Lucro imediato', isCorrect: false }, { text: 'Legado de infraestrutura', isCorrect: true }, { text: 'Apenas estética', isCorrect: false }, { text: 'Geração de impostos', isCorrect: false }] },
      { id: 'q3', text: 'O que é o conceito de "Elefante Branco" em estádios?', options: [{ text: 'Estádio caro', isCorrect: false }, { text: 'Estádio sem uso pós-evento', isCorrect: true }, { text: 'Estádio moderno', isCorrect: false }, { text: 'Estádio pequeno', isCorrect: false }] },
      { id: 'q4', text: 'Qual Copa foi considerada a mais cara da história até 2014?', options: [{ text: 'Brasil 2014', isCorrect: true }, { text: 'África do Sul 2010', isCorrect: false }, { text: 'Alemanha 2006', isCorrect: false }, { text: 'França 1998', isCorrect: false }] },
      { id: 'q5', text: 'Qual o principal impacto positivo do turismo na Copa?', options: [{ text: 'Injeção de capital', isCorrect: true }, { text: 'Redução de impostos', isCorrect: false }, { text: 'Aumento da inflação', isCorrect: false }, { text: 'Diminuição de empregos', isCorrect: false }] },
      { id: 'q6', text: 'O que o Qatar investiu massivamente para a Copa 2022?', options: [{ text: 'Apenas estádios', isCorrect: false }, { text: 'Cidades inteiras', isCorrect: true }, { text: 'Apenas aeroportos', isCorrect: false }, { text: 'Apenas segurança', isCorrect: false }] },
      { id: 'q7', text: 'Como o custo de segurança impacta o orçamento?', options: [{ text: 'Reduz o gasto', isCorrect: false }, { text: 'É irrelevante', isCorrect: false }, { text: 'Aumenta significativamente', isCorrect: true }, { text: 'Não tem impacto', isCorrect: false }] },
      { id: 'q8', text: 'O que é necessário para uma candidatura ser sustentável?', options: [{ text: 'Gasto máximo', isCorrect: false }, { text: 'Planejamento pós-torneio', isCorrect: true }, { text: 'Construir o máximo de estádios', isCorrect: false }, { text: 'Focar apenas no lucro', isCorrect: false }] },
    ],
  },
  {
    id: 'lendas',
    type: 'trivia',
    title: 'Quiz de Lendas',
    description: 'Você conhece a fundo a carreira dos maiores jogadores de todos os tempos?',
    category: 'História',
    difficulty: 'Difícil',
    image: '/images/lendas.jpg',
    emoji: '⚽',
    questions: [
      { id: 'q1', text: 'Quantas Copas o Pelé venceu?', options: [{ text: '2', isCorrect: false }, { text: '3', isCorrect: true }, { text: '4', isCorrect: false }, { text: '1', isCorrect: false }] },
      { id: 'q2', text: 'Quem é o maior artilheiro da história das Copas?', options: [{ text: 'Miroslav Klose', isCorrect: true }, { text: 'Pelé', isCorrect: false }, { text: 'Ronaldo', isCorrect: false }, { text: 'Messi', isCorrect: false }] },
      { id: 'q3', text: 'Qual jogador marcou gols em todas as Copas que disputou?', options: [{ text: 'Ronaldo Fenômeno', isCorrect: true }, { text: 'Pelé', isCorrect: false }, { text: 'Maradona', isCorrect: false }, { text: 'Zidane', isCorrect: false }] },
      { id: 'q4', text: 'Quem é conhecido como "El Pibe de Oro"?', options: [{ text: 'Maradona', isCorrect: true }, { text: 'Messi', isCorrect: false }, { text: 'Pelé', isCorrect: false }, { text: 'Ronaldo', isCorrect: false }] },
      { id: 'q5', text: 'Qual jogador foi o capitão do tri do Brasil em 1970?', options: [{ text: 'Carlos Alberto Torres', isCorrect: true }, { text: 'Pelé', isCorrect: false }, { text: 'Garrincha', isCorrect: false }, { text: 'Didi', isCorrect: false }] },
      { id: 'q6', text: 'Quem marcou os dois gols do Brasil na final de 2002?', options: [{ text: 'Ronaldo', isCorrect: true }, { text: 'Ronaldinho', isCorrect: false }, { text: 'Rivaldo', isCorrect: false }, { text: 'Cafu', isCorrect: false }] },
      { id: 'q7', text: 'Qual seleção Zidane defendeu em 1998?', options: [{ text: 'França', isCorrect: true }, { text: 'Brasil', isCorrect: false }, { text: 'Itália', isCorrect: false }, { text: 'Argentina', isCorrect: false }] },
      { id: 'q8', text: 'Quem foi o técnico do Brasil no tetra em 1994?', options: [{ text: 'Carlos Alberto Parreira', isCorrect: true }, { text: 'Zagallo', isCorrect: false }, { text: 'Telê Santana', isCorrect: false }, { text: 'Felipão', isCorrect: false }] },
    ],
  },
  {
    id: 'momentos',
    type: 'trivia',
    title: 'Momentos Históricos',
    description: 'Reviva os lances e fatos que pararam o mundo.',
    category: 'História',
    difficulty: 'Médio',
    image: '/images/momentos.jpg',
    emoji: '📸',
    questions: [
      { id: 'q1', text: 'Em qual copa ocorreu o "Gol do Século" de Maradona?', options: [{ text: '1982', isCorrect: false }, { text: '1986', isCorrect: true }, { text: '1990', isCorrect: false }, { text: '1994', isCorrect: false }] },
      { id: 'q2', text: 'Qual seleção perdeu a final de 1950 para o Uruguai?', options: [{ text: 'Brasil', isCorrect: true }, { text: 'Argentina', isCorrect: false }, { text: 'Itália', isCorrect: false }, { text: 'Espanha', isCorrect: false }] },
      { id: 'q3', text: 'Quem perdeu o pênalti decisivo em 1994?', options: [{ text: 'Roberto Baggio', isCorrect: true }, { text: 'Baresi', isCorrect: false }, { text: 'Romário', isCorrect: false }, { text: 'Dunga', isCorrect: false }] },
      { id: 'q4', text: 'O que foi o "Milagre de Berna"?', options: [{ text: 'Alemanha 3x2 Hungria', isCorrect: true }, { text: 'Brasil 7x1 Alemanha', isCorrect: false }, { text: 'França 3x0 Brasil', isCorrect: false }, { text: 'Itália 1x0 Brasil', isCorrect: false }] },
      { id: 'q5', text: 'Quem marcou o gol da vitória da Espanha em 2010?', options: [{ text: 'Andrés Iniesta', isCorrect: true }, { text: 'Fernando Torres', isCorrect: false }, { text: 'David Villa', isCorrect: false }, { text: 'Xavi', isCorrect: false }] },
      { id: 'q6', text: 'Qual foi o primeiro país africano a chegar numa semifinal?', options: [{ text: 'Marrocos', isCorrect: true }, { text: 'Camarões', isCorrect: false }, { text: 'Gana', isCorrect: false }, { text: 'Senegal', isCorrect: false }] },
      { id: 'q7', text: 'Em que ano a França ganhou sua primeira Copa?', options: [{ text: '1998', isCorrect: true }, { text: '1994', isCorrect: false }, { text: '2002', isCorrect: false }, { text: '2006', isCorrect: false }] },
      { id: 'q8', text: 'Quem é o maior campeão da história das Copas?', options: [{ text: 'Brasil', isCorrect: true }, { text: 'Alemanha', isCorrect: false }, { text: 'Itália', isCorrect: false }, { text: 'Argentina', isCorrect: false }] },
    ],
  },
  {
    id: 'probabilidades',
    type: 'trivia',
    title: 'Probabilidades e Palpites',
    description: 'Teste seu poder de previsão baseado em estatísticas.',
    category: 'Estatística',
    difficulty: 'Médio',
    image: '/images/probabilidades.jpg',
    emoji: '📊',
    questions: [
      { id: 'q1', text: 'Qual seleção teve o maior índice de favoritismo pré-copa em 2022?', options: [{ text: 'Brasil', isCorrect: true }, { text: 'França', isCorrect: false }, { text: 'Argentina', isCorrect: false }, { text: 'Inglaterra', isCorrect: false }] },
      { id: 'q2', text: 'O que é o "Elo Rating" no futebol?', options: [{ text: 'Sistema de classificação', isCorrect: true }, { text: 'Tipo de chute', isCorrect: false }, { text: 'Tática defensiva', isCorrect: false }, { text: 'Nova regra da FIFA', isCorrect: false }] },
      { id: 'q3', text: 'O que modelos estatísticos não conseguem prever bem?', options: [{ text: 'Fatores psicológicos', isCorrect: true }, { text: 'Quantidade de gols', isCorrect: false }, { text: 'Vitórias', isCorrect: false }, { text: 'Posse de bola', isCorrect: false }] },
      { id: 'q4', text: 'Qual fator é crucial para o desempenho em Copas?', options: [{ text: 'Profundidade do elenco', isCorrect: true }, { text: 'Cor da camisa', isCorrect: false }, { text: 'Horário do jogo', isCorrect: false }, { text: 'Nome do estádio', isCorrect: false }] },
      { id: 'q5', text: 'Como a "vantagem de jogar em casa" afeta as odds?', options: [{ text: 'Aumenta as chances', isCorrect: true }, { text: 'Diminui as chances', isCorrect: false }, { text: 'Não afeta', isCorrect: false }, { text: 'Zera as chances', isCorrect: false }] },
      { id: 'q6', text: 'Por que times tradicionais têm vantagem estatística?', options: [{ text: 'Histórico de desempenho', isCorrect: true }, { text: 'Sorte', isCorrect: false }, { text: 'Uniforme', isCorrect: false }, { text: 'Torcida adversária', isCorrect: false }] },
      { id: 'q7', text: 'O que a "Distribuição de Poisson" ajuda a calcular?', options: [{ text: 'Probabilidade de gols', isCorrect: true }, { text: 'Número de cartões', isCorrect: false }, { text: 'Tempo de jogo', isCorrect: false }, { text: 'Distância percorrida', isCorrect: false }] },
      { id: 'q8', text: 'Qual a maior dificuldade de prever mata-matas?', options: [{ text: 'Volatilidade do jogo único', isCorrect: true }, { text: 'Quantidade de times', isCorrect: false }, { text: 'Regras da FIFA', isCorrect: false }, { text: 'Tamanho da bola', isCorrect: false }] },
    ],
  },
  {
    id: 'historia-copas',
    type: 'trivia',
    title: 'História das Copas',
    description: 'Teste seus conhecimentos sobre as edições passadas do maior espetáculo da terra.',
    category: 'História',
    difficulty: 'Médio',
    image: '/images/historia.jpg',
    emoji: '🏆',
    questions: [
      {
        id: 'q1',
        text: 'Qual país venceu a primeira Copa do Mundo em 1930?',
        options: [
          { text: 'Brasil', isCorrect: false },
          { text: 'Argentina', isCorrect: false },
          { text: 'Uruguai', isCorrect: true },
          { text: 'Itália', isCorrect: false },
        ],
      },
      {
        id: 'q2',
        text: 'Qual seleção venceu a Copa do Mundo de 2002?',
        options: [
          { text: 'Alemanha', isCorrect: false },
          { text: 'Brasil', isCorrect: true },
          { text: 'França', isCorrect: false },
          { text: 'Argentina', isCorrect: false },
        ],
      },
      {
        id: 'q3',
        text: 'Quem foi o artilheiro da Copa do Mundo de 2014?',
        options: [
          { text: 'Neymar', isCorrect: false },
          { text: 'Lionel Messi', isCorrect: false },
          { text: 'James Rodríguez', isCorrect: true },
          { text: 'Thomas Müller', isCorrect: false },
        ],
      },
      {
        id: 'q4',
        text: 'Qual seleção tem mais títulos de Copa do Mundo?',
        options: [
          { text: 'Alemanha', isCorrect: false },
          { text: 'Itália', isCorrect: false },
          { text: 'Brasil', isCorrect: true },
          { text: 'Argentina', isCorrect: false },
        ],
      },
      {
        id: 'q5',
        text: 'Qual país sediou a Copa do Mundo de 2010?',
        options: [
          { text: 'Brasil', isCorrect: false },
          { text: 'Alemanha', isCorrect: false },
          { text: 'África do Sul', isCorrect: true },
          { text: 'França', isCorrect: false },
        ],
      },
      {
        id: 'q6',
        text: 'Quem marcou o gol do título da Alemanha na final de 2014?',
        options: [
          { text: 'Miroslav Klose', isCorrect: false },
          { text: 'Thomas Müller', isCorrect: false },
          { text: 'Mario Götze', isCorrect: true },
          { text: 'Mesut Özil', isCorrect: false },
        ],
      },
      {
        id: 'q7',
        text: 'Qual seleção foi campeã da Copa de 1998?',
        options: [
          { text: 'Brasil', isCorrect: false },
          { text: 'França', isCorrect: true },
          { text: 'Itália', isCorrect: false },
          { text: 'Holanda', isCorrect: false },
        ],
      },
      {
        id: 'q8',
        text: 'Quantos títulos de Copa do Mundo possui a Itália?',
        options: [
          { text: '2', isCorrect: false },
          { text: '3', isCorrect: false },
          { text: '4', isCorrect: true },
          { text: '5', isCorrect: false },
        ],
      },
      {
        id: 'q9',
        text: 'Quem foi eleito o melhor jogador da Copa de 2018?',
        options: [
          { text: 'Kylian Mbappé', isCorrect: false },
          { text: 'Luka Modrić', isCorrect: true },
          { text: 'Antoine Griezmann', isCorrect: false },
          { text: 'Harry Kane', isCorrect: false },
        ],
      },
      {
        id: 'q10',
        text: 'Qual seleção venceu a Copa do Mundo de 2022?',
        options: [
          { text: 'França', isCorrect: false },
          { text: 'Brasil', isCorrect: false },
          { text: 'Argentina', isCorrect: true },
          { text: 'Croácia', isCorrect: false },
        ],
      }
    ],
  },
  {
    id: 'perfil-jogador',
    type: 'personality',
    title: 'Quem é você na Copa?',
    description: 'Descubra qual craque mundial mais combina com seu estilo de jogo e personalidade!',
    category: 'Perfil',
    difficulty: 'Fácil',
    image: '/images/perfil.jpg',
    emoji: '🎭',
    outcomes: [
      {
        id: 'atacante',
        title: '⚡ATACANTE - Estilo Kylian Mbappé',
        description: '🔥 Você é o protagonista que decide jogos! Você nasceu para os grandes momentos. Velocidade, confiança e instinto assassino definem quem você é. Quando a pressão aumenta, você não foge — você resolve. Você não espera oportunidades, você cria. E quando elas aparecem… é gol. 👉 Você não joga o jogo — você decide o jogo.',
      },
      {
        id: 'criador',
        title: '🎯 CRIADOR — Estilo Lionel Messi',
        description: '🧠 Você é a mente genial do jogo! Você enxerga o que ninguém mais vê. Cada movimento seu tem intenção, cada decisão tem precisão. Técnica, inteligência e visão fazem de você o cérebro por trás de tudo. Enquanto outros correm, você pensa — e muda o jogo com um único toque. 👉 O jogo acontece… mas você entende o jogo.',
      },
      {
        id: 'driblador',
        title: '🔥 DRIBLADOR — Estilo Vinícius Júnior',
        description: '⚡ Você é pura ousadia e espetáculo! Você joga com alegria, confiança e criatividade. O imprevisível é a sua zona de conforto. Quando todos esperam o óbvio, você faz o impossível. Seu estilo não é só eficiente — é inesquecível. 👉 Enquanto tentam te parar, você já passou.',
      },
      {
        id: 'lider',
        title: '🧠 LÍDER — Estilo Jude Bellingham',
        description: '👑 Você é o jogador completo e dominante! Você é equilíbrio, força e inteligência em forma de jogador. Lidera pelo exemplo, aparece nos momentos decisivos e eleva o nível de todos ao seu redor. Você não é apenas parte do time — você é o time. 👉 Você não segue o jogo… você dita o ritmo.',
      },
    ],
    questions: [
      {
        id: 'p1',
        text: 'Como você gosta de jogar?',
        options: [
          { text: 'Rápido e direto', scores: { atacante: 2 } },
          { text: 'Pensando cada jogada', scores: { criador: 2 } },
          { text: 'Indo pra cima sem medo', scores: { driblador: 2 } },
          { text: 'Fazendo de tudo um pouco', scores: { lider: 2 } },
        ],
      },
      {
        id: 'p2',
        text: 'Em um jogo decisivo você:',
        options: [
          { text: 'Resolve sozinho', scores: { atacante: 2 } },
          { text: 'Organiza o time', scores: { criador: 2 } },
          { text: 'Parte pra cima da defesa', scores: { driblador: 2 } },
          { text: 'Assume responsabilidade total', scores: { lider: 2 } },
        ],
      },
      {
        id: 'p3',
        text: 'Seu maior diferencial:',
        options: [
          { text: 'Velocidade', scores: { atacante: 2 } },
          { text: 'Inteligência', scores: { criador: 2 } },
          { text: 'Habilidade', scores: { driblador: 2 } },
          { text: 'Consistência', scores: { lider: 2 } },
        ],
      },
      {
        id: 'p4',
        text: 'Você prefere:',
        options: [
          { text: 'Fazer gols', scores: { atacante: 2 } },
          { text: 'Dar assistências', scores: { criador: 2 } },
          { text: 'Driblar adversários', scores: { driblador: 2 } },
          { text: 'Controlar o jogo', scores: { lider: 2 } },
        ],
      },
      {
        id: 'p5',
        text: 'Como lida com pressão?',
        options: [
          { text: 'Cresce e decide', scores: { atacante: 2 } },
          { text: 'Mantém calma', scores: { criador: 2 } },
          { text: 'Arrisca mais ainda', scores: { driblador: 2 } },
          { text: 'Motiva o time', scores: { lider: 2 } },
        ],
      },
      {
        id: 'p6',
        text: 'Seu estilo fora de campo:',
        options: [
          { text: 'Confiante', scores: { atacante: 1, driblador: 1 } },
          { text: 'Reservado', scores: { criador: 2 } },
          { text: 'Estiloso', scores: { driblador: 2 } },
          { text: 'Focado', scores: { lider: 2 } },
        ],
      },
      {
        id: 'p7',
        text: 'Seu papel no time:',
        options: [
          { text: 'Finalizador', scores: { atacante: 2 } },
          { text: 'Maestro', scores: { criador: 2 } },
          { text: 'Desequilibrador', scores: { driblador: 2 } },
          { text: 'Capitão', scores: { lider: 2 } },
        ],
      },
      {
        id: 'p8',
        text: 'Em uma final você:',
        options: [
          { text: 'Marca o gol decisivo', scores: { atacante: 2 } },
          { text: 'Cria a jogada do título', scores: { criador: 2 } },
          { text: 'Faz uma jogada inesquecível', scores: { driblador: 2 } },
          { text: 'Lidera o time até a vitória', scores: { lider: 2 } },
        ],
      },
    ],
  },
  {
    id: 'minha-selecao',
    type: 'personality',
    title: 'Minha Seleção',
    description: 'Qual seleção combina com sua personalidade?',
    category: 'Seleções',
    difficulty: 'Fácil',
    image: '/images/copa2026.jpg',
    emoji: '🌍',
    outcomes: [
      {
        id: 'brasil',
        title: '🇧🇷 BRASIL — Estilo jogo bonito',
        description: '✨ Você é criatividade pura! Seu talento é natural, sua confiança é leve e seu estilo é único. Você resolve as coisas com improviso, brilho e personalidade. Onde você chega, tudo ganha mais cor e energia. 👉 Você não segue regras… você cria o seu próprio jogo.',
      },
      {
        id: 'argentina',
        title: '🇦🇷 ARGENTINA — Estilo raça e coração',
        description: '🔥 Você é intensidade em estado puro! Determinado, competitivo e apaixonado, você nunca desiste. Quando a pressão aumenta, você cresce. Você joga com alma, com garra e com uma vontade absurda de vencer. 👉 Para você, perder nunca é uma opção.',
      },
      {
        id: 'franca',
        title: '🇫🇷 FRANÇA — Estilo talento e equilíbrio',
        description: '🎯 Você é a combinação perfeita entre técnica e inteligência. Versátil, moderno e eficiente, você sabe se adaptar a qualquer situação e sempre entrega alto nível. Você não precisa forçar — você simplesmente funciona. 👉 Você faz parecer fácil aquilo que é difícil.',
      },
      {
        id: 'alemanha',
        title: '🇩🇪 ALEMANHA — Estilo precisão e consistência',
        description: '🧠 Você é disciplina e performance no mais alto nível. Organizado, focado e extremamente confiável, você constrói resultados com consistência e excelência. Você não depende de sorte — você executa melhor que todos. 👉 Enquanto outros tentam, você já entregou.',
      },
    ],
    questions: [
      {
        id: 'p1',
        text: 'Como você gosta de resolver problemas?',
        options: [
          { text: 'Com criatividade e improviso', scores: { brasil: 2 } },
          { text: 'Com intensidade e determinação', scores: { argentina: 2 } },
          { text: 'Com equilíbrio e inteligência', scores: { franca: 2 } },
          { text: 'Com lógica e organização', scores: { alemanha: 2 } },
        ],
      },
      {
        id: 'p2',
        text: 'Como você reage sob pressão?',
        options: [
          { text: 'Se solta e confia no talento', scores: { brasil: 2 } },
          { text: 'Vai com tudo e não desiste nunca', scores: { argentina: 2 } },
          { text: 'Mantém controle e decide bem', scores: { franca: 2 } },
          { text: 'Segue o plano e mantém disciplina', scores: { alemanha: 2 } },
        ],
      },
      {
        id: 'p3',
        text: 'Qual dessas qualidades mais te define?',
        options: [
          { text: 'Criatividade', scores: { brasil: 2 } },
          { text: 'Paixão', scores: { argentina: 2 } },
          { text: 'Versatilidade', scores: { franca: 2 } },
          { text: 'Consistência', scores: { alemanha: 2 } },
        ],
      },
      {
        id: 'p4',
        text: 'Como você prefere trabalhar em equipe?',
        options: [
          { text: 'Com liberdade para criar', scores: { brasil: 2 } },
          { text: 'Com energia e intensidade', scores: { argentina: 2 } },
          { text: 'Com equilíbrio entre todos', scores: { franca: 2 } },
          { text: 'Com funções bem definidas', scores: { alemanha: 2 } },
        ],
      },
      {
        id: 'p5',
        text: 'O que mais te motiva?',
        options: [
          { text: 'Se expressar e fazer algo único', scores: { brasil: 2 } },
          { text: 'Vencer a qualquer custo', scores: { argentina: 2 } },
          { text: 'Ser o melhor de forma consistente', scores: { franca: 2 } },
          { text: 'Executar tudo perfeitamente', scores: { alemanha: 2 } },
        ],
      },
      {
        id: 'p6',
        text: 'Seu estilo no dia a dia é mais:',
        options: [
          { text: 'Leve e espontâneo', scores: { brasil: 2 } },
          { text: 'Intenso e competitivo', scores: { argentina: 2 } },
          { text: 'Moderno e equilibrado', scores: { franca: 2 } },
          { text: 'Organizado e disciplinado', scores: { alemanha: 2 } },
        ],
      },
      {
        id: 'p7',
        text: 'Como você toma decisões importantes?',
        options: [
          { text: 'Sigo minha intuição', scores: { brasil: 2 } },
          { text: 'Vou com emoção e convicção', scores: { argentina: 2 } },
          { text: 'Analiso e equilibro opções', scores: { franca: 2 } },
          { text: 'Baseio em lógica e dados', scores: { alemanha: 2 } },
        ],
      },
      {
        id: 'p8',
        text: 'Como você quer ser lembrado?',
        options: [
          { text: 'Pelo talento e estilo único', scores: { brasil: 2 } },
          { text: 'Pela garra e determinação', scores: { argentina: 2 } },
          { text: 'Pela excelência e impacto', scores: { franca: 2 } },
          { text: 'Pela consistência e resultados', scores: { alemanha: 2 } },
        ],
      }
    ],
  },
];
