export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'Fácil' | 'Médio' | 'Difícil';
  image: string;
  questions: Question[];
}

export const quizzes: Quiz[] = [
  {
    id: 'historia-copas',
    title: 'História das Copas',
    description: 'Teste seus conhecimentos sobre as edições passadas do maior espetáculo da terra.',
    category: 'História',
    difficulty: 'Médio',
    image: '/images/historia.jpg',
    questions: [
      {
        id: 'q1',
        text: 'Qual país venceu a primeira Copa do Mundo em 1930?',
        options: ['Brasil', 'Argentina', 'Uruguai', 'Itália'],
        correctAnswer: 2,
      },
      {
        id: 'q2',
        text: 'Quem é o maior artilheiro da história das Copas?',
        options: ['Pelé', 'Miroslav Klose', 'Ronaldo Fenômeno', 'Lionel Messi'],
        correctAnswer: 1,
      },
      {
        id: 'q3',
        text: 'Em qual ano o Brasil conquistou o seu primeiro título mundial?',
        options: ['1950', '1954', '1958', '1962'],
        correctAnswer: 2,
      },
    ],
  },
  {
    id: 'copa-2026',
    title: 'Copa do Mundo 2026',
    description: 'O que você já sabe sobre a próxima Copa que será realizada na América do Norte?',
    category: 'Atualidades',
    difficulty: 'Fácil',
    image: '/images/copa2026.jpg',
    questions: [
      {
        id: 'q1',
        text: 'Quais são os três países que sediarão a Copa de 2026?',
        options: ['EUA, México e Canadá', 'Brasil, Argentina e Chile', 'França, Alemanha e Espanha', 'Japão, Coreia e China'],
        correctAnswer: 0,
      },
      {
        id: 'q2',
        text: 'Quantas seleções participarão da Copa do Mundo de 2026?',
        options: ['32', '40', '48', '64'],
        correctAnswer: 2,
      },
    ],
  },
];
