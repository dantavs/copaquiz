'use client';
import { useMemo } from 'react';
import { useCollectorStore } from '@/lib/collectorStore';
import { stickers } from '@/data/collector2026';
import StickerGroup from './StickerGroup';

export type FilterMode = 'all' | 'repeated' | 'missing';

const countryMap: Record<string, string> = {
  MEX: 'México', RSA: 'África do Sul', KOR: 'Coreia do Sul', CZE: 'República Tcheca',
  CAN: 'Canadá', BIH: 'Bósnia e Herzegovina', QAT: 'Catar', SUI: 'Suíça',
  BRA: 'Brasil', MAR: 'Marrocos', HAI: 'Haiti', SCO: 'Escócia',
  USA: 'Estados Unidos', PAR: 'Paraguai', AUS: 'Austrália', TUR: 'Turquia',
  GER: 'Alemanha', CUW: 'Curaçao', CIV: 'Costa do Marfim', ECU: 'Equador',
  NED: 'Holanda', JPN: 'Japão', SWE: 'Suécia', TUN: 'Tunísia',
  BEL: 'Bélgica', EGY: 'Egito', IRN: 'Irã', NZL: 'Nova Zelândia',
  ESP: 'Espanha', CPV: 'Cabo Verde', KSA: 'Arábia Saudita', URU: 'Uruguai',
  FRA: 'França', SEN: 'Senegal', IRQ: 'Iraque', NOR: 'Noruega',
  ARG: 'Argentina', ALG: 'Argélia', AUT: 'Áustria', JOR: 'Jordânia',
  POR: 'Portugal', COD: 'Congo', UZB: 'Uzbequistão', COL: 'Colômbia',
  ENG: 'Inglaterra', CRO: 'Croácia', GHA: 'Gana', PAN: 'Panamá',
  FWC: 'FIFA World Cup History', CC: 'Coca-Cola',
};

function getPrefix(id: string): string {
  const match = id.match(/^[A-Z]+/);
  return match ? match[0] : id;
}

export default function StickerGrid({ filter }: { filter: FilterMode }) {
  const owned = useCollectorStore((s) => s.owned);
  const increment = useCollectorStore((s) => s.increment);
  const decrement = useCollectorStore((s) => s.decrement);

  const groups = useMemo(() => {
    const filtered = stickers.filter((s) => {
      const q = owned[s.id] ?? 0;
      if (filter === 'repeated') return q > 1;
      if (filter === 'missing') return q === 0;
      return true;
    });

    const map = new Map<string, typeof filtered>();
    for (const s of filtered) {
      const prefix = getPrefix(s.id);
      const group = map.get(prefix);
      if (group) {
        group.push(s);
      } else {
        map.set(prefix, [s]);
      }
    }

    const groupList = Array.from(map.entries()).map(([prefix, items]) => ({
      prefix,
      groupName: countryMap[prefix] ?? prefix,
      items,
    }));

    const specials = ['FWC', 'CC'];
    const regular = groupList.filter((g) => !specials.includes(g.prefix));
    const specialGroups = groupList.filter((g) => specials.includes(g.prefix));
    return [...regular, ...specialGroups];
  }, [filter, owned]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {groups.map((group) => (
        <StickerGroup
          key={group.prefix}
          groupName={group.groupName}
          stickers={group.items}
          owned={owned}
          onIncrement={increment}
          onDecrement={decrement}
        />
      ))}
    </div>
  );
}
