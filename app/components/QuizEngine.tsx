'use client';

import { useState } from 'react';
import { Quiz, QuizOutcome } from '../data/quizzes';
import Link from 'next/link';

export default function QuizEngine({ quiz }: { quiz: Quiz }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [triviaScore, setTriviaScore] = useState(0);
  const [personalityScores, setPersonalityScores] = useState<Record<string, number>>({});
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex) / quiz.questions.length) * 100;

  const handleOptionClick = (index: number) => {
    if (selectedOption !== null) return;

    const option = currentQuestion.options[index];
    setSelectedOption(index);

    if (quiz.type === 'trivia') {
      const correct = !!option.isCorrect;
      setIsCorrect(correct);
      if (correct) setTriviaScore(triviaScore + 1);
    } else if (quiz.type === 'personality' && option.scores) {
      const newScores = { ...personalityScores };
      Object.entries(option.scores).forEach(([outcomeId, value]) => {
        newScores[outcomeId] = (newScores[outcomeId] || 0) + value;
      });
      setPersonalityScores(newScores);
    }

    setTimeout(() => {
      if (currentQuestionIndex + 1 < quiz.questions.length) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedOption(null);
        setIsCorrect(null);
      } else {
        setShowResult(true);
      }
    }, quiz.type === 'trivia' ? 1500 : 600); // Mais rápido para personalidade
  };

  const getPersonalityResult = (): QuizOutcome | null => {
    if (!quiz.outcomes) return null;
    let maxScore = -1;
    let resultId = '';

    Object.entries(personalityScores).forEach(([id, score]) => {
      if (score > maxScore) {
        maxScore = score;
        resultId = id;
      }
    });

    return quiz.outcomes.find(o => o.id === resultId) || quiz.outcomes[0];
  };

  const shareResult = () => {
    let text = '';
    if (quiz.type === 'trivia') {
      const percentage = (triviaScore / quiz.questions.length) * 100;
      let medal = "🥉";
      if (percentage === 100) medal = "🥇";
      else if (percentage >= 70) medal = "🥈";
      text = `*MITEI NA COPA!* ${medal}⚽\n\nFiz *${triviaScore}/${quiz.questions.length}* pontos no quiz: _${quiz.title}_\n\n*Duvido você acertar mais que eu!* 👀🏆`;
    } else {
      const result = getPersonalityResult();
      text = `*DESCOBRI QUEM EU SOU NA COPA!* ⚽🏆\n\nMeu resultado foi: *${result?.title}*\n_${result?.description}_\n\nDescubra quem você seria também! 👀`;
    }

    const url = window.location.href;
    const fullText = `${text}\n\nJogue agora: ${url}`;
    
    if (navigator.share) {
      navigator.share({
        title: 'CopaQuiz 2026',
        text: text,
        url: url,
      });
    } else {
      window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(fullText)}`, '_blank');
    }
  };

  if (showResult) {
    if (quiz.type === 'trivia') {
      const percentage = (triviaScore / quiz.questions.length) * 100;
      let message = "Precisa treinar mais! 😅";
      if (percentage === 100) message = "Você é um craque! Nível Pelé! 👑";
      else if (percentage >= 70) message = "Ótimo desempenho! Titular absoluto! ⚽";
      else if (percentage >= 50) message = "Bom reserva! Dá pra melhorar. 🏃‍♂️";

      return (
        <div className="glass animate-pop" style={{ padding: '2.5rem', textAlign: 'center', borderRadius: 'var(--border-radius)' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Fim de Jogo!</h2>
          <div style={{ fontSize: '4.5rem', fontWeight: 900, color: 'var(--primary)', marginBottom: '1rem', lineHeight: 1 }}>
            {triviaScore} / {quiz.questions.length}
          </div>
          <p style={{ fontSize: '1.25rem', marginBottom: '2rem', fontWeight: 500 }}>{message}</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <button onClick={shareResult} className="btn btn-primary" style={{ width: '100%' }}>
              Compartilhar Resultado 🚀
            </button>
            <Link href="/" className="btn" style={{ background: 'rgba(255,255,255,0.1)', color: 'white' }}>
              Jogar outro Quiz
            </Link>
          </div>
        </div>
      );
    } else {
      const result = getPersonalityResult();
      return (
        <div className="glass animate-pop" style={{ padding: '2.5rem', textAlign: 'center', borderRadius: 'var(--border-radius)' }}>
          <span style={{ color: 'var(--primary)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.9rem' }}>
            Seu resultado é:
          </span>
          <h2 style={{ fontSize: '2.5rem', margin: '0.5rem 0 1.5rem 0', color: 'var(--primary)' }}>{result?.title}</h2>
          <p style={{ fontSize: '1.1rem', marginBottom: '2.5rem', opacity: 0.9, lineHeight: 1.6 }}>{result?.description}</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <button onClick={shareResult} className="btn btn-primary" style={{ width: '100%' }}>
              Compartilhar no WhatsApp 📱
            </button>
            <Link href="/" className="btn" style={{ background: 'rgba(255,255,255,0.1)', color: 'white' }}>
              Descobrir outro perfil
            </Link>
          </div>
        </div>
      );
    }
  }

  return (
    <div className="animate-pop">
      {/* Progress Bar */}
      <div style={{ 
        width: '100%', 
        height: '10px', 
        background: 'rgba(255,255,255,0.05)', 
        borderRadius: '10px', 
        marginBottom: '2.5rem',
        overflow: 'hidden',
        border: '1px solid rgba(255,255,255,0.1)'
      }}>
        <div style={{ 
          width: `${progress}%`, 
          height: '100%', 
          background: 'linear-gradient(90deg, var(--primary), var(--secondary))', 
          transition: 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1)' 
        }} />
      </div>

      <div className="glass" style={{ padding: '2.5rem', borderRadius: 'var(--border-radius)' }}>
        <p style={{ opacity: 0.5, marginBottom: '0.8rem', fontWeight: 800, textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '0.1em' }}>
          Pergunta {currentQuestionIndex + 1} de {quiz.questions.length}
        </p>
        <h2 style={{ marginBottom: '2.5rem', lineHeight: 1.2, fontSize: '1.8rem' }}>{currentQuestion.text}</h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          {currentQuestion.options.map((option, index) => {
            let bgColor = 'rgba(255,255,255,0.03)';
            let borderColor = 'rgba(255,255,255,0.1)';
            let color = 'white';

            if (quiz.type === 'trivia') {
              if (selectedOption === index) {
                bgColor = isCorrect ? 'rgba(0, 223, 94, 0.2)' : 'rgba(255, 69, 58, 0.2)';
                borderColor = isCorrect ? 'var(--primary)' : '#ff453a';
              } else if (selectedOption !== null && option.isCorrect) {
                bgColor = 'rgba(0, 223, 94, 0.1)';
                borderColor = 'var(--primary)';
              }
            } else if (selectedOption === index) {
              bgColor = 'rgba(255, 255, 255, 0.1)';
              borderColor = 'var(--primary)';
            }

            return (
              <button
                key={index}
                onClick={() => handleOptionClick(index)}
                disabled={selectedOption !== null}
                className="btn"
                style={{
                  padding: '1.2rem 1.5rem',
                  borderRadius: '16px',
                  border: `2px solid ${borderColor}`,
                  background: bgColor,
                  color: color,
                  textAlign: 'left',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  cursor: selectedOption === null ? 'pointer' : 'default',
                  transition: 'var(--transition)',
                  justifyContent: 'flex-start'
                }}
              >
                {option.text}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
