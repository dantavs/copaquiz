'use client';

import React from 'react';
import { useSimulationStore } from '../lib/simulationStore';
import { teams } from '../data/worldCupData';

export const BestThirdsSelection = () => {
  const { simulation, setTopThird } = useSimulationStore();
  
  // Filtrar todos os times que ficaram em 3º lugar
  const thirdPlacedTeams = Object.entries(simulation.groupSelections)
    .filter(([, positions]) => positions['3'])
    .map(([group, positions]) => ({
      group,
      teamId: positions['3'],
    }));

  const selectedCount = simulation.topThirds.length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <h2 style={{ fontSize: '1.9rem', textAlign: 'center' }}>Melhores 3º Colocados</h2>
      
      <div className="glass" style={{ padding: '0.9rem', borderRadius: '12px', textAlign: 'center' }}>
        <span style={{ fontSize: '1rem', fontWeight: 700 }}>Selecionados: </span>
        <span style={{ fontSize: '1.4rem', fontWeight: 900, color: selectedCount === 8 ? '#2ECC71' : 'var(--accent)' }}>
          {selectedCount}/8
        </span>
      </div>
      
      {thirdPlacedTeams.length === 0 && (
        <p style={{ textAlign: 'center', opacity: 0.75 }}>Defina a classificação de 3º lugar nos grupos primeiro.</p>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.75rem' }}>
        {thirdPlacedTeams.map(({ group, teamId }) => {
          const team = teams[teamId as keyof typeof teams];
          const isSelected = simulation.topThirds.includes(teamId);
          
          return (
            <label
              key={teamId}
              className="glass"
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.85rem',
                borderRadius: '12px',
                cursor: 'pointer',
                border: isSelected ? '1px solid rgba(0,223,94,0.6)' : '1px solid rgba(255,255,255,0.1)',
                background: isSelected ? 'rgba(0,223,94,0.12)' : undefined
              }}
            >
              <div style={{ minWidth: 0, display: 'flex', alignItems: 'center', gap: '0.55rem', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '1.15rem' }}>{team?.flag || '❓'}</span>
                <span style={{ fontWeight: 800 }}>{team?.name || `Time ${teamId}`}</span>
                <span
                  style={{
                    fontSize: '0.72rem',
                    opacity: 0.85,
                    background: 'rgba(255,255,255,0.1)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    padding: '0.2rem 0.45rem',
                    borderRadius: '999px'
                  }}
                >
                  Grupo {group}
                </span>
              </div>

              <input
                type="checkbox"
                checked={isSelected}
                onChange={(e) => setTopThird(teamId, e.target.checked)}
                disabled={!isSelected && selectedCount >= 8}
                style={{ width: '18px', height: '18px', accentColor: 'var(--primary)', flexShrink: 0 }}
              />
            </label>
          );
        })}
      </div>
    </div>
  );
};
