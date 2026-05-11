'use client';

import React from 'react';
import { useSimulationStore } from '../lib/simulationStore';
import { teams } from '../data/worldCupData';
import { bracketRounds, FINAL_MATCH_ID, resolveTeamId, type BracketMatch, type TeamReference } from '../lib/bracketConfig';
import { buildShareText } from '../lib/share-utils';
import { assignThirdPlacements } from '../lib/thirdPlaceAllocator';

export const Bracket = () => {
  const { simulation, setMatchWinner } = useSimulationStore();
  const championId = simulation.bracket[FINAL_MATCH_ID]?.winner;
  const canShare = Boolean(championId);
  const [toastMessage, setToastMessage] = React.useState<string | null>(null);
  const thirdAssignments = React.useMemo(() => assignThirdPlacements(simulation), [simulation]);

  React.useEffect(() => {
    if (!toastMessage) return;
    const timeout = window.setTimeout(() => setToastMessage(null), 2400);
    return () => window.clearTimeout(timeout);
  }, [toastMessage]);

  const handleShare = async () => {
    const sharePayload = buildShareText(simulation, {
      url: window.location.href,
      thirdAssignments,
    });
    if (!sharePayload) {
      return;
    }

    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Simulador Copa 2026',
          text: sharePayload,
          url: window.location.href,
        });
        setToastMessage('Compartilhamento enviado!');
      } else {
        await navigator.clipboard.writeText(sharePayload);
        setToastMessage('Resultado copiado!');
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        return;
      }
      console.error('Erro ao compartilhar resultado', error);
      setToastMessage('Não foi possível compartilhar.');
    }
  };

  const renderTeam = (ref: TeamReference, matchId: string) => {
    const teamId = resolveTeamId(ref, simulation, thirdAssignments);
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <h2 style={{ fontSize: '2rem', textAlign: 'center' }}>Simulador Mata-Mata</h2>
      
      {bracketRounds.map((round) => (
        <React.Fragment key={round.title}>{renderRound(round.title, round.matches)}</React.Fragment>
      ))}

      <div className="glass" style={{ marginTop: '0.5rem', padding: '1.25rem', borderRadius: '16px', textAlign: 'center' }}>
        <h3 style={{ fontSize: '1.5rem', color: 'var(--accent)' }}>🏆 Campeão</h3>
        {championId ? (
          <div style={{ fontSize: '1.8rem', fontWeight: 900, marginTop: '0.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <img src={`https://flagcdn.com/${teams[championId as keyof typeof teams]?.flag}.svg`} width="40" alt="campeão" />
            {teams[championId as keyof typeof teams]?.name}
          </div>
        ) : (
          <p style={{ opacity: 0.75, marginTop: '0.75rem' }}>Defina o vencedor da Final para liberar o compartilhamento.</p>
        )}

        <button
          onClick={handleShare}
          className="btn"
          disabled={!canShare}
          style={{
            background: '#FFD700',
            color: '#001F3F',
            padding: '0.85rem 1.75rem',
            borderRadius: '999px',
            fontWeight: 800,
            cursor: canShare ? 'pointer' : 'not-allowed',
            border: 'none',
            opacity: canShare ? 1 : 0.5,
            transition: 'transform 0.2s ease'
          }}
        >
          Compartilhar Resultado 📲
        </button>
      </div>

      {toastMessage && (
        <div
          style={{
            position: 'fixed',
            bottom: '1.5rem',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(0, 0, 0, 0.85)',
            color: '#fff',
            padding: '0.75rem 1.5rem',
            borderRadius: '999px',
            boxShadow: '0 12px 32px rgba(0,0,0,0.4)',
            zIndex: 50,
            fontWeight: 600
          }}
        >
          {toastMessage}
        </div>
      )}
    </div>
  );
};
