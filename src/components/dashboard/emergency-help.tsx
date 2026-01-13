'use client';

import { Phone, ShieldAlert } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';

const helplineCards = [
  {
    name: 'Tele Mental Health',
    numbers: ['14416', '1-800-891-4416'],
    description: 'National tele-mental health service for immediate support.',
  },
  {
    name: 'AASRA',
    numbers: ['9152987821'],
    description: 'A dedicated service for suicide prevention and emotional support.',
  },
];


export function EmergencyHelp() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="glass-card flex flex-col items-center justify-center text-center p-6 bg-destructive/20 border-destructive hover:bg-destructive/30 cursor-pointer transition-colors">
          <CardHeader className="p-0 mb-4">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-destructive/80">
              <ShieldAlert className="h-6 w-6 text-destructive-foreground" />
            </div>
            <CardTitle className="font-headline text-lg mt-4 text-destructive-foreground">Emergency Help</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <p className="text-sm text-destructive-foreground/80 mb-4">
              If you&apos;re in crisis, click here for immediate support.
            </p>
             <Button variant="destructive" size="sm">Get Help Now</Button>
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent className="glass-card">
        <DialogHeader>
          <DialogTitle className="font-headline text-2xl text-destructive">Emergency Helplines</DialogTitle>
          <DialogDescription>
            If you or someone you know is in immediate danger, please use these resources. You are not alone.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 space-y-4">
          {helplineCards.map((card) => (
            <div key={card.name} className="p-4 rounded-lg border border-white/10 bg-black/20">
                <h3 className="font-semibold text-primary">{card.name}</h3>
                <p className="text-sm text-muted-foreground mt-1 mb-3">{card.description}</p>
                {card.numbers.map(number => (
                    <a key={number} href={`tel:${number}`} className="flex items-center gap-2 text-lg font-mono hover:underline">
                        <Phone className="h-4 w-4"/>
                        {number}
                    </a>
                ))}
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
