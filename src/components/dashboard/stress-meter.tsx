'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function StressMeter() {
  const [stressLevel, setStressLevel] = useState(0);

  useEffect(() => {
    // This will only run on the client, after initial hydration
    const randomStress = Math.floor(Math.random() * 101);
    setStressLevel(randomStress);
  }, []);

  const circumference = 2 * Math.PI * 45; // 2 * pi * radius
  const offset = circumference - (stressLevel / 100) * circumference;

  const getStressColor = (level: number) => {
    if (level > 75) return 'hsl(var(--destructive))';
    if (level > 40) return 'hsl(var(--chart-4))';
    return 'hsl(var(--accent))';
  };

  return (
    <Card className="glass-card flex flex-col">
      <CardHeader>
        <CardTitle className="font-headline text-lg">Stress Meter</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col items-center justify-center">
        <div className="relative w-40 h-40">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <circle
              className="text-secondary"
              strokeWidth="8"
              stroke="currentColor"
              fill="transparent"
              r="45"
              cx="50"
              cy="50"
            />
            <circle
              strokeWidth="8"
              strokeLinecap="round"
              stroke={getStressColor(stressLevel)}
              fill="transparent"
              r="45"
              cx="50"
              cy="50"
              style={{
                strokeDasharray: circumference,
                strokeDashoffset: offset,
                transform: 'rotate(-90deg)',
                transformOrigin: '50% 50%',
                transition: 'stroke-dashoffset 1s ease-out',
              }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
             {stressLevel > 0 ? (
              <>
                <span className="text-4xl font-bold font-headline" style={{ color: getStressColor(stressLevel) }}>
                  {stressLevel}
                </span>
                <span className="text-xs text-muted-foreground">/ 100</span>
              </>
            ) : (
                <div className="h-8 bg-white/20 rounded w-12 animate-pulse"></div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
