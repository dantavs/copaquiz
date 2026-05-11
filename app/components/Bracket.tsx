'use client';

import React, { useRef } from 'react';
import { useSimulationStore } from '../lib/simulationStore';
import { teams } from '../data/worldCupData';
import bracketMapping from '../data/bracketMapping.json';
import html2canvas from 'html2canvas';

type TeamReference = {
  group?: string;
  pos?: string;
  isThird?: boolean;
  slot?: number;
  match?: string;
};

type BracketMatch = {
  id: string;
  home: TeamReference;
  away: TeamReference;
};

type BracketMapping = {
  R32?: BracketMatch[];
  R16?: BracketMatch[];
  QF?: BracketMatch[];
  SF?: BracketMatch[];
  Final?: BracketMatch[];
};

export const Bracket = () => {
  const { simulation, setMatchWinner } = useSimulationStore();
  const mapping = bracketMapping as BracketMapping;
  const bracketRef = useRef<HTMLDivElement>(null);

  const handleShare = async () => {
    if (!bracketRef.current) return;
    
    // Simplificando o compartilhamento apenas como imagem
    const canvas = await html2canvas(bracketRef.current, { backgroundColor: '#1a1a1a' });
    canvas.toBlob(async (blob) => {
        if (!blob) return;
        const file = new File([blob], 'meus-palpites.png', { type: 'image/png' });
        if (navigator.share) {
          try {
            await navigator.share({
              files: [file],
              title: 'Simulador Copa 2026',
            });
          } catch (err) {
            console.error('Error sharing:', err);
          }
        } else {
            alert('Compartilhamento não suportado.');
        }
    });
  };

  const resolveTeamId = (ref: TeamReference): string | undefined => {
    if (ref.match) return simulation.bracket[ref.match]?.winner;
    if (ref.isThird && typeof ref.slot === 'number') return simulation.topThirds[ref.slot];
    if (ref.group && ref.pos) return simulation.groupSelections[ref.group]?.[ref.pos];
    return undefined;
  };

  const renderTeam = (ref: TeamReference, matchId: string) => {
    const teamId = resolveTeamId(ref);
    const team = teamId ? teams[teamId as keyof typeof teams] : null;
    const isWinner = simulation.bracket[matchId]?.winner === teamId;

    return (
      <div 
        onClick={() => teamId && setMatchWinner(matchId, teamId)} 
        style={{
          cursor: teamId ? 'pointer' : 'not-allowed',
          padding: '0.55rem 0.65rem',
          borderRadius: '10px',
          display: 'flex',
          alignItems: 'center',
          gap: '0.45rem',
          background: isWinner ? 'linear-gradient(135deg, var(--primary), var(--secondary))' : 'rgba(255,255,255,0.06)',
          color: 'white',
          border: isWinner ? '1px solid rgba(0,223,94,0.6)' : '1px solid rgba(255,255,255,0.1)',
          fontWeight: isWinner ? 800 : 600,
          opacity: teamId ? 1 : 0.75
        }}
      >
        {team ? (
            <>
                <img src={`https://flagcdn.com/${team.flag}.svg`} width="20" alt={team.name} style={{ borderRadius: '2px' }} />
                {team.name}
            </>
        ) : 'A definir'}
      </div>
    );
  };

  const renderRound = (title: string, matches: BracketMatch[] = []) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <h3 style={{ fontSize: '1.25rem', textAlign: 'center', color: 'var(--primary)' }}>{title}</h3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.75rem' }}>
        {matches.map((match) => (
          <div
            key={match.id}
            className="glass"
            style={{ borderRadius: '12px', padding: '0.8rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
          >
            <div style={{ fontSize: '0.75rem', opacity: 0.7, textAlign: 'center' }}>{match.id}</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.6rem' }}>
              <div style={{ flex: 1 }}>{renderTeam(match.home, match.id)}</div>
              <div style={{ fontSize: '0.7rem', fontWeight: 800, opacity: 0.6 }}>VS</div>
              <div style={{ flex: 1 }}>{renderTeam(match.away, match.id)}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div ref={bracketRef} style={{ display: 'flex', flexDirection: 'column', gap: '2rem', padding: '1rem', background: '#1a1a1a' }}>
      <h2 style={{ fontSize: '2rem', textAlign: 'center', color: 'white' }}>Simulador Mata-Mata</h2>
      
      {renderRound('Round of 32', mapping.R32)}
      {renderRound('Round of 16', mapping.R16)}
      {renderRound('Quartas de Final', mapping.QF)}
      {renderRound('Semifinais', mapping.SF)}
      {renderRound('Grande Final', mapping.Final)}

       {simulation.bracket['M31']?.winner && (
         <div className="glass" style={{ marginTop: '0.5rem', padding: '1.25rem', borderRadius: '16px', textAlign: 'center' }}>
           <h3 style={{ fontSize: '1.5rem', color: 'var(--accent)' }}>🏆 Campeão</h3>
           <div style={{ fontSize: '1.8rem', fontWeight: 900, marginTop: '0.5rem', marginBottom: '1.5rem' }}>
             <img src={`https://flagcdn.com/${teams[simulation.bracket['M31'].winner as keyof typeof teams]?.flag}.svg`} width="40" alt="campeão" />
           </div>
           <button
             onClick={handleShare}
             className="btn"
             style={{
               background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
               color: 'white',
               padding: '0.8rem 1.5rem',
               borderRadius: '999px',
               fontWeight: 700,
               cursor: 'pointer',
               border: 'none'
             }}
           >
             Compartilhar Imagem
           </button>
         </div>
       )}
    </div>
  );
};
