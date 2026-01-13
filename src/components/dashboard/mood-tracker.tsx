'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts';
import { ChartContainer, ChartTooltipContent, type ChartConfig } from '../ui/chart';

const moodData = [
  { date: 'Mon', mood: 4 },
  { date: 'Tue', mood: 3 },
  { date: 'Wed', mood: 5 },
  { date: 'Thu', mood: 4 },
  { date: 'Fri', mood: 2 },
  { date: 'Sat', mood: 5 },
  { date: 'Sun', mood: 4 },
];

const moods = [
  { emoji: '😞', level: 1, label: 'Awful' },
  { emoji: '😕', level: 2, label: 'Bad' },
  { emoji: '😐', level: 3, label: 'Okay' },
  { emoji: '🙂', level: 4, label: 'Good' },
  { emoji: '😄', level: 5, label: 'Great' },
];

const chartConfig = {
  mood: {
    label: 'Mood',
    color: 'hsl(var(--primary))',
  },
} satisfies ChartConfig;


export function MoodTracker({ className }: { className?: string }) {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);

  const handleMoodSelect = (level: number) => {
    setSelectedMood(level);
    // Here you would typically save the mood to a database
    console.log(`Mood logged: ${level}`);
  };

  return (
    <Card className={`glass-card ${className}`}>
      <CardHeader>
        <CardTitle className="font-headline text-lg">How are you feeling today?</CardTitle>
        <CardDescription>Log your mood to track your wellness journey.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-around items-center p-4 bg-background/30 rounded-lg">
          {moods.map((mood) => (
            <Button
              key={mood.level}
              variant="ghost"
              size="icon"
              className={`h-14 w-14 rounded-full transition-all duration-300 ${selectedMood === mood.level ? 'bg-primary/30 scale-125' : 'hover:bg-primary/20'}`}
              onClick={() => handleMoodSelect(mood.level)}
            >
              <span className="text-3xl">{mood.emoji}</span>
            </Button>
          ))}
        </div>
        <div className="mt-6">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Your week in moods</h3>
          <div className="h-[150px]">
            <ChartContainer config={chartConfig} className="w-full h-full">
              <BarChart accessibilityLayer data={moodData} margin={{ top: 5, right: 20, left: -20, bottom: -10 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border) / 0.5)" />
                <XAxis dataKey="date" tickLine={false} axisLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
                <YAxis domain={[0, 5]} hide={true} />
                <Tooltip
                  cursor={{ fill: 'hsl(var(--primary) / 0.1)' }}
                  content={<ChartTooltipContent
                    formatter={(value) => {
                      const mood = moods.find(m => m.level === Number(value));
                      if (!mood) return null;
                      return (
                        <div className="flex flex-col">
                          <span className="text-xs text-muted-foreground">{mood.label}</span>
                          <span className="font-bold text-lg">{mood.emoji}</span>
                        </div>
                      );
                    }}
                    labelFormatter={() => ''}
                  />}
                />
                <Bar dataKey="mood" fill="var(--color-mood)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
