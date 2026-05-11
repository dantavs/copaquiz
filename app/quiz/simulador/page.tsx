"use client";

import React, { useState, useEffect } from 'react';
import { GroupSelection } from '../../components/GroupSelection';
import { BestThirdsSelection } from '../../components/BestThirdsSelection';
import { Bracket } from '../../components/Bracket';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useSimulationStore } from '../../lib/simulationStore';

type Step = 'groups' | 'thirds' | 'bracket';

const tabs: Array<{ id: Step; label: string }> = [
  { id: 'groups', label: 'Grupos' },
  { id: 'thirds', label: 'Melhores 3ºs' },
  { id: 'bracket', label: 'Mata-Mata' },
];

export default function SimulatorPage() {
  const [currentStep, setCurrentStep] = useState<Step>('groups');
  const { simulation, groups } = useSimulationStore();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep]);

  const isGroupsComplete = Object.entries(groups).every(([groupLetter]) => {
    const selections = simulation.groupSelections[groupLetter] || {};
    return selections['1'] && selections['2'] && selections['3'];
  });

  return (
    <>
      <Header />

      <main className="animate-pop" style={{ width: '100%', minHeight: 'calc(100vh - 160px)' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'center' }}>
          <section
            className="glass"
            style={{
              width: '100%',
              maxWidth: '860px',
              borderRadius: 'var(--border-radius)',
              padding: '1.25rem',
              marginBottom: '2rem'
            }}
          >
            <h1 style={{ textAlign: 'center', fontSize: 'clamp(1.8rem, 5vw, 2.6rem)', marginBottom: '1rem' }}>
              Simulador <span className="text-gradient">Copa 2026</span>
            </h1>

            <div
              className="glass"
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.5rem',
                justifyContent: 'center',
                borderRadius: '999px',
                padding: '0.5rem',
                marginBottom: '1.25rem'
              }}
            >
              {tabs.map((tab) => {
                const isDisabled = tab.id !== 'groups' && !isGroupsComplete;
                return (
                  <button
                    key={tab.id}
                    onClick={() => !isDisabled && setCurrentStep(tab.id)}
                    className="btn"
                    disabled={isDisabled}
                    style={{
                      background:
                        currentStep === tab.id
                          ? 'linear-gradient(135deg, var(--primary), var(--secondary))'
                          : isDisabled
                            ? 'rgba(255,255,255,0.02)'
                            : 'rgba(255,255,255,0.08)',
                      color: isDisabled ? 'rgba(255,255,255,0.3)' : 'white',
                      padding: '0.7rem 1rem',
                      borderRadius: '999px',
                      cursor: isDisabled ? 'not-allowed' : 'pointer',
                      opacity: isDisabled ? 0.6 : 1
                    }}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {currentStep === 'groups' && <GroupSelection />}
            {currentStep === 'thirds' && <BestThirdsSelection />}
            {currentStep === 'bracket' && <Bracket />}
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
