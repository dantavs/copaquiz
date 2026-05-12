'use client';

import { useEffect, useState } from 'react';

const getTimeUntilMidnight = () => {
  const now = new Date();
  const midnight = new Date(now);
  midnight.setHours(24, 0, 0, 0);

  const diff = Math.max(0, midnight.getTime() - now.getTime());

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  const pad = (n: number) => n.toString().padStart(2, '0');
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
};

export default function DailyCountdown() {
  const [time, setTime] = useState(getTimeUntilMidnight());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(getTimeUntilMidnight());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return <strong style={{ color: 'var(--primary)' }}>{time}</strong>;
}
