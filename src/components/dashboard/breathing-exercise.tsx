'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const breathingCycle = [
  { text: 'Inhale', duration: 4000 },
  { text: 'Hold', duration: 4000 },
  { text: 'Exhale', duration: 6000 },
];

export function BreathingExercise() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPhase((prevPhase) => (prevPhase + 1) % breathingCycle.length);
    }, breathingCycle[phase].duration);

    return () => clearInterval(interval);
  }, [phase]);

  return (
    <Card className="glass-card flex flex-col">
      <CardHeader>
        <CardTitle className="font-headline text-lg">Breathing Exercise</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col items-center justify-center">
        <div className="relative w-40 h-40 flex items-center justify-center">
          <div className="absolute inset-0 bg-primary/20 rounded-full animate-breathe blur-xl"></div>
          <div className="absolute inset-2 bg-primary/30 rounded-full animate-breathe" style={{ animationDelay: '0.2s' }}></div>
          <div className="relative z-10 text-center">
            <p className="text-3xl font-bold font-headline">{breathingCycle[phase].text}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
