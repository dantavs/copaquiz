import Header from '../components/Header';
import Footer from '../components/Footer';

export default function FAQPage() {
  const faqSections = [
    {
      title: "🎮 Sobre o CopaQuiz",
      questions: [
        {
          q: "O que é o CopaQuiz?",
          a: "O CopaQuiz é uma plataforma de entretenimento para fãs de futebol. Nosso objetivo é testar seus conhecimentos através de diferentes modos de jogo, como o desafio de adivinhação de jogadores (estilo Wordle), quizzes de trivia e testes de personalidade."
        },
        {
          q: "Preciso criar uma conta para jogar?",
          a: "Não! O CopaQuiz foi projetado para ser rápido e acessível. Você pode jogar todos os modos imediatamente sem necessidade de cadastro ou login."
        },
        {
          q: "O site é gratuito?",
          a: "Sim, o CopaQuiz é 100% gratuito. Mantemos o projeto através de anúncios discretos para que todos possam se divertir sem pagar nada."
        }
      ]
    },
    {
      title: "🧩 Modo 'Adivinhe o Jogador' (DLE)",
      questions: [
        {
          q: "Como funciona este modo?",
          a: "Você tem 6 tentativas para descobrir o jogador secreto do dia (ou aleatório). A cada palpite, o jogo compara o jogador que você escolheu com o jogador secreto e fornece pistas baseadas em: País, Clube, Liga, Posição, Idade e Altura."
        },
        {
          q: "O que significam as cores e símbolos?",
          a: "🟩 Verde: Acerto exato na categoria.\n🟨 Amarelo: Proximidade (ex: mesmo continente, mesma categoria de posição, ou idade/altura muito próxima).\n⬜ Cinza: Informação incorreta.\n↑/↓ Setas: No campo de Idade e Altura, as setas indicam se o jogador secreto é mais velho/alto (↑) ou mais novo/baixo (↓) que o seu palpite."
        },
        {
          q: "Qual a diferença entre o Desafio Diário e o Modo Infinito?",
          a: "O Desafio Diário é o mesmo jogador para todos os usuários do mundo e muda à meia-noite. O Modo Infinito gera jogadores aleatórios da nossa base de dados para você jogar quantas vezes quiser."
        }
      ]
    },
    {
      title: "🧠 Quizzes e Trivia",
      questions: [
        {
          q: "Como funcionam os Quizzes de Trivia?",
          a: "São perguntas de múltipla escolha sobre a história das Copas e curiosidades do futebol. Você deve selecionar a alternativa correta entre as opções apresentadas."
        },
        {
          q: "O que são os Quizzes de Personalidade?",
          a: "São testes divertidos onde suas respostas determinam com qual craque do futebol você mais se parece baseado no seu estilo de jogo e preferências."
        }
      ]
    },
    {
      title: "⚙️ Funcionamento Técnico",
      questions: [
        {
          q: "Meu progresso é salvo?",
          a: "Sim, mas de forma local. O jogo utiliza o armazenamento do seu navegador (LocalStorage) para salvar suas sequências de vitórias e o status do desafio diário. Se você limpar os dados do navegador ou trocar de dispositivo, o progresso não será transferido."
        },
        {
          q: "O site não carrega ou está lento, o que fazer?",
          a: "Recomendamos atualizar a página (F5). Se o problema persistir, verifique sua conexão ou tente abrir o site em uma aba anônima para descartar conflitos com extensões do navegador."
        },
        {
          q: "Posso jogar no celular?",
          a: "Sim! O CopaQuiz é totalmente responsivo e foi otimizado para uma excelente experiência tanto em smartphones quanto em tablets e computadores."
        }
      ]
    },
    {
      title: "🏆 Simulador da Copa do Mundo 2026",
      questions: [
        {
          q: "O que é o simulador da Copa?",
          a: "O simulador permite criar sua própria versão da Copa do Mundo de 2026, escolhendo os resultados das partidas e acompanhando a evolução do torneio até a final."
        },
        {
          q: "Como funciona o simulador?",
          a: "Você escolhe os vencedores dos jogos, e o sistema atualiza automaticamente a classificação, os confrontos e as fases seguintes da competição."
        },
        {
          q: "O simulador usa os grupos reais da Copa?",
          a: "Sim. O simulador é baseado na estrutura oficial da Copa do Mundo de 2026, incluindo fase de grupos e mata-mata."
        },
        {
          q: "Posso simular diferentes campeões?",
          a: "Sim. Você pode refazer a simulação quantas vezes quiser e testar diferentes cenários."
        },
        {
          q: "Os confrontos do mata-mata são gerados automaticamente?",
          a: "Sim. Os confrontos das fases eliminatórias são gerados automaticamente com base na classificação dos grupos."
        },
        {
          q: "O simulador salva minhas escolhas?",
          a: "Dependendo do dispositivo ou navegador, algumas escolhas podem ser mantidas temporariamente durante a sessão."
        },
        {
          q: "Posso compartilhar minha simulação?",
          a: "Sim. O simulador pode permitir compartilhar os resultados e previsões com amigos."
        },
        {
          q: "O simulador representa resultados oficiais?",
          a: "Não. O simulador é apenas uma ferramenta de entretenimento para criar previsões e cenários fictícios da Copa do Mundo."
        },
        {
          q: "A Copa de 2026 terá novo formato?",
          a: "Sim. A edição de 2026 contará com mais seleções participantes e um formato diferente das edições anteriores."
        },
        {
          q: "Posso alterar resultados depois de começar?",
          a: "Sim. Você pode voltar e modificar resultados para criar novos cenários no simulador."
        }
      ]
    }
  ];


  return (
    <>
      <Header />
      <main className="container animate-pop">
        <section style={{ maxWidth: '800px', margin: '2rem auto', paddingBottom: '4rem' }}>
          <h1 style={{ fontSize: '3rem', fontWeight: 900, textAlign: 'center', marginBottom: '3rem' }}>
            Perguntas <span className="text-gradient">Frequentes</span>
          </h1>

          {faqSections.map((section, idx) => (
            <div key={idx} style={{ marginBottom: '3rem' }}>
              <h2 style={{ fontSize: '1.8rem', color: 'var(--primary)', marginBottom: '1.5rem', borderBottom: '2px solid rgba(16, 185, 129, 0.1)', paddingBottom: '0.5rem' }}>
                {section.title}
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {section.questions.map((item, qIdx) => (
                  <div key={qIdx} className="glass" style={{ padding: '1.5rem', borderRadius: '16px' }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.7rem', color: 'var(--secondary)' }}>
                      {item.q}
                    </h3>
                    <p style={{ opacity: 0.9, lineHeight: 1.6, whiteSpace: 'pre-line' }}>
                      {item.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="glass" style={{ textAlign: 'center', padding: '2rem', borderRadius: '24px', marginTop: '2rem', border: '1px solid var(--primary)' }}>
            <p style={{ marginBottom: '1rem' }}>Ainda tem dúvidas?</p>
            <a href="/contato" className="btn btn-primary" style={{ textDecoration: 'none', display: 'inline-block' }}>
              Entre em Contato 📩
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
