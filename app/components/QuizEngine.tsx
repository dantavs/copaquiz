'use client';

import { useState } from 'react';
import { Quiz } from '../data/quizzes';
import Link from 'next/link';

export default function QuizEngine({ quiz }: { quiz: Quiz }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex) / quiz.questions.length) * 100;

  const handleOptionClick = (index: number) => {
    if (selectedOption !== null) return;

    setSelectedOption(index);
    const correct = index === currentQuestion.correctAnswer;
    setIsCorrect(correct);
    if (correct) setScore(score + 1);

    setTimeout(() => {
      if (currentQuestionIndex + 1 < quiz.questions.length) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedOption(null);
        setIsCorrect(null);
      } else {
        setShowResult(true);
      }
    }, 1500);
  };

  const shareResult = () => {
    const percentage = (score / quiz.questions.length) * 100;
    let medal = "🥉";
    if (percentage === 100) medal = "🥇";
    else if (percentage >= 70) medal = "🥈";

    const text = `*MITEI NA COPA!* ${medal}⚽\n\nFiz *${score}/${quiz.questions.length}* pontos no quiz: _${quiz.title}_\n\n*Duvido você acertar mais que eu!* 👀🏆\n\nJogue agora e me desafie:`;
    const url = window.location.href;
    
    if (navigator.share) {
      navigator.share({
        title: 'CopaQuiz 2026',
        text: text,
        url: url,
      });
    } else {
      // Fallback for WhatsApp
      window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text + ' ' + url)}`, '_blank');
    }
  };

  if (showResult) {
    const percentage = (score / quiz.questions.length) * 100;
    let message = "Precisa treinar mais! 😅";
    if (percentage === 100) message = "Você é um craque! Nível Pelé! 👑";
    else if (percentage >= 70) message = "Ótimo desempenho! Titular absoluto! ⚽";
    else if (percentage >= 50) message = "Bom reserva! Dá pra melhorar. 🏃‍♂️";

    return (
      <div className="glass animate-fade-in" style={{ padding: '2rem', textAlign: 'center', borderRadius: 'var(--border-radius)' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Fim de Jogo!</h2>
        <div style={{ fontSize: '4rem', fontWeight: 900, color: 'var(--primary)', marginBottom: '1rem' }}>
          {score} / {quiz.questions.length}
        </div>
        <p style={{ fontSize: '1.25rem', marginBottom: '2rem' }}>{message}</p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <button onClick={shareResult} className="btn btn-primary" style={{ width: '100%', fontSize: '1.1rem' }}>
            Compartilhar Resultado 🚀
          </button>
          <Link href="/" className="btn" style={{ border: '1px solid var(--primary)', color: 'var(--primary)' }}>
            Voltar para Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      {/* Progress Bar */}
      <div style={{ 
        width: '100%', 
        height: '8px', 
        background: 'rgba(0,0,0,0.1)', 
        borderRadius: '4px', 
        marginBottom: '2rem',
        overflow: 'hidden'
      }}>
        <div style={{ 
          width: `${progress}%`, 
          height: '100%', 
          background: 'var(--primary)', 
          transition: 'width 0.5s ease' 
        }} />
      </div>

      <div className="glass" style={{ padding: '2rem', borderRadius: 'var(--border-radius)' }}>
        <p style={{ opacity: 0.6, marginBottom: '0.5rem', fontWeight: 600 }}>
          Pergunta {currentQuestionIndex + 1} de {quiz.questions.length}
        </p>
        <h2 style={{ marginBottom: '2rem', lineHeight: 1.3 }}>{currentQuestion.text}</h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {currentQuestion.options.map((option, index) => {
            let bgColor = 'var(--card-bg)';
            let borderColor = 'var(--glass-border)';
            let color = 'inherit';

            if (selectedOption === index) {
              bgColor = isCorrect ? '#dcfce7' : '#fee2e2';
              borderColor = isCorrect ? '#22c55e' : '#ef4444';
              color = isCorrect ? '#166534' : '#991b1b';
            } else if (selectedOption !== null && index === currentQuestion.correctAnswer) {
              bgColor = '#dcfce7';
              borderColor = '#22c55e';
            }

            return (
              <button
                key={index}
                onClick={() => handleOptionClick(index)}
                disabled={selectedOption !== null}
                style={{
                  padding: '1rem 1.5rem',
                  borderRadius: '12px',
                  border: `2px solid ${borderColor}`,
                  background: bgColor,
                  color: color,
                  textAlign: 'left',
                  fontSize: '1rem',
                  fontWeight: 600,
                  cursor: selectedOption === null ? 'pointer' : 'default',
                  transition: 'all 0.2s ease',
                  boxShadow: selectedOption === index ? 'none' : '0 2px 4px rgba(0,0,0,0.05)'
                }}
              >
                {option}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
