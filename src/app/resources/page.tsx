import { ArrowRight, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const helplineCards = [
  {
    name: 'Tele Mental Health',
    numbers: ['14416', '1-800-891-4416'],
    description: 'A national tele-mental health service providing free, confidential support from trained professionals. Available 24/7.',
  },
  {
    name: 'AASRA',
    numbers: ['9152987821'],
    description: 'A dedicated service for suicide prevention and emotional support, offering a listening ear and a non-judgmental space.',
  },
  {
    name: 'General Emergency',
    numbers: ['112'],
    description: 'The pan-India single emergency number for immediate assistance from police, fire, or medical services.',
  }
];

export default function ResourcesPage() {
  return (
    <div className="container mx-auto max-w-4xl py-16 px-4">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold">Find Support</h1>
        <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
          You are not alone. These resources are available to provide immediate, confidential help. Please don&apos;t hesitate to reach out.
        </p>
      </div>

      <div className="space-y-8">
        {helplineCards.map((card) => (
          <Card key={card.name} className="glass-card hover:border-primary/80 transition-colors duration-300 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-primary flex items-center gap-3">
                <Phone />
                {card.name}
              </CardTitle>
              <CardDescription>{card.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 mb-4">
                {card.numbers.map((number) => (
                  <a key={number} href={`tel:${number}`} className="block text-2xl font-headline font-semibold tracking-wider text-accent hover:underline">
                    {number}
                  </a>
                ))}
              </div>
              <Button asChild variant="link" className="px-0">
                <a href={`tel:${card.numbers[0]}`}>Call Now <ArrowRight className="ml-2 h-4 w-4"/></a>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
       <div className="text-center mt-16 p-6 glass-card">
          <h3 className="font-headline text-xl font-semibold">Important Disclaimer</h3>
          <p className="text-muted-foreground mt-2">
            Mindscape is a tool for wellness and support, not a replacement for professional medical advice, diagnosis, or treatment. In case of a mental health crisis, please contact a qualified professional or use the emergency numbers listed above.
          </p>
        </div>
    </div>
  );
}
