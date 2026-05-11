'use client';

import React from 'react';
import { useSimulationStore } from '../lib/simulationStore';
import { groups, teams } from '../data/worldCupData';

export const GroupSelection = () => {
  const { simulation, setGroupSelections } = useSimulationStore();

  const handleTeamClick = (groupLetter: string, teamId: string) => {
    const currentSelections = simulation.groupSelections[groupLetter] ?? {};
    const groupTeamIds = groups[groupLetter as keyof typeof groups] ?? [];

    const selectedTeams = ['1', '2', '3']
      .map((position) => currentSelections[position])
      .filter((id): id is string => Boolean(id));

    const alreadySelectedIndex = selectedTeams.indexOf(teamId);

    const nextOrdered =
      alreadySelectedIndex >= 0
        ? selectedTeams.filter((id) => id !== teamId)
        : selectedTeams.length < 3
          ? [...selectedTeams, teamId]
          : selectedTeams;

    const nextSelections: Record<string, string> = {};
    nextOrdered.forEach((id, index) => {
      nextSelections[String(index + 1)] = id;
    });

    if (nextOrdered.length === 3) {
      const fourthPlaced = groupTeamIds.find((id) => !nextOrdered.includes(id));
      if (fourthPlaced) {
        nextSelections['4'] = fourthPlaced;
      }
    }

    setGroupSelections(groupLetter, nextSelections);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <h2 style={{ fontSize: '1.9rem', textAlign: 'center' }}>Fase de Grupos</h2>

      {Object.entries(groups).map(([groupLetter, teamIds]) => {
        const selections = simulation.groupSelections[groupLetter] ?? {};

        return (
          <div
            key={groupLetter}
            className="glass"
            style={{ borderRadius: '16px', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}
          >
            <h3 style={{ fontSize: '1.2rem', color: 'var(--primary)', margin: 0 }}>Grupo {groupLetter}</h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {teamIds.map((teamId) => {
                const team = teams[teamId as keyof typeof teams];
                const position = Object.entries(selections).find(([, id]) => id === teamId)?.[0] ?? '';
                const isSelected = Boolean(position);

                return (
                  <div
                    key={teamId}
                    onClick={() => handleTeamClick(groupLetter, teamId)}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: '0.75rem',
                      padding: '0.75rem',
                      borderRadius: '12px',
                      background: isSelected ? 'rgba(0,223,94,0.12)' : 'rgba(255,255,255,0.04)',
                      border: isSelected ? '1px solid rgba(0,223,94,0.55)' : '1px solid rgba(255,255,255,0.08)',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <span style={{ color: 'white', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ fontSize: '1.2rem' }}>{team?.flag || '❓'}</span>
                      {team?.name || `Time ${teamId}`}
                    </span>

                    <span
                      style={{
                        minWidth: '52px',
                        textAlign: 'center',
                        background: isSelected
                          ? 'linear-gradient(135deg, var(--primary), var(--secondary))'
                          : 'rgba(255,255,255,0.08)',
                        color: 'white',
                        border: isSelected ? 'none' : '1px solid rgba(255,255,255,0.2)',
                        borderRadius: '10px',
                        padding: '0.45rem 0.6rem',
                        fontWeight: 800,
                        fontSize: '0.9rem'
                      }}
                    >
                      {position ? `${position}º` : '—'}
                    </span>
                  </div>
                );
              })}
            </div>

            <p style={{ opacity: 0.7, fontSize: '0.85rem', margin: 0 }}>
              Toque na ordem desejada: 1º, 2º e 3º. Toque novamente para remover.
            </p>
          </div>
        );
      })}
    </div>
  );
};
