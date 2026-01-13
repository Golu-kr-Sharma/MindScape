'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Lightbulb } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const tips = [
  "Focus on your breath for one minute. Notice the rise and fall of your chest.",
  "Take a short walk and pay attention to the sights and sounds around you.",
  "Practice gratitude. Name three things you are thankful for today.",
  "Engage your senses. What are five things you can see, four you can feel, three you can hear, two you can smell, and one you can taste?",
  "Listen to a piece of music without any distractions. Let it be your only focus."
];

export function MindfulnessTips({ className }: { className?: string }) {
  const [currentTip, setCurrentTip] = useState("");

  useEffect(() => {
    // This will only run on the client, after initial hydration
    setCurrentTip(tips[Math.floor(Math.random() * tips.length)]);

    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * tips.length);
      setCurrentTip(tips[randomIndex]);
    }, 10000); // Change tip every 10 seconds
    return () => clearInterval(interval);
  }, []);

  const tipImage = PlaceHolderImages.find(p => p.id === 'mindfulness-tip-1');

  return (
    <Card className={`glass-card relative overflow-hidden group ${className}`}>
      {tipImage && (
        <Image
          src={tipImage.imageUrl}
          alt={tipImage.description}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          data-ai-hint={tipImage.imageHint}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
      <div className="relative flex flex-col h-full p-6">
        <CardHeader className="p-0">
          <CardTitle className="font-headline text-lg flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-accent" />
            Mindfulness Tip
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0 mt-4 flex-1 flex items-center">
          {currentTip ? (
             <p className="text-lg font-medium text-white/90">{currentTip}</p>
          ): (
            <div className="space-y-2 w-full">
                <div className="h-4 bg-white/20 rounded w-full animate-pulse"></div>
                <div className="h-4 bg-white/20 rounded w-5/6 animate-pulse"></div>
                <div className="h-4 bg-white/20 rounded w-3/4 animate-pulse"></div>
            </div>
          )}
        </CardContent>
      </div>
    </Card>
  );
}
