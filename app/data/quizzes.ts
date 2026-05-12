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
