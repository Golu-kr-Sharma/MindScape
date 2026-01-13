import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Bot, HeartPulse, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const features = [
  {
    icon: <Bot className="h-8 w-8 text-accent" />,
    title: 'AI Companion',
    description: 'Chat with an empathetic AI, trained to listen and support you, anytime you need.',
  },
  {
    icon: <HeartPulse className="h-8 w-8 text-accent" />,
    title: 'Track Your Mood',
    description: 'Log your feelings and visualize your mental wellness journey over time.',
  },
  {
    icon: <ShieldCheck className="h-8 w-8 text-accent" />,
    title: 'Safe & Secure',
    description: 'Your conversations are private. We prioritize your privacy and data security.',
  },
];

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

const heroImage = PlaceHolderImages.find(p => p.id === "hero-background");

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <section className="relative w-full h-[60vh] md:h-[80vh] flex items-center justify-center text-center overflow-hidden">
        {heroImage && (
            <Image
                src={heroImage.imageUrl}
                alt={heroImage.description}
                fill
                className="object-cover"
                priority
                data-ai-hint={heroImage.imageHint}
            />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
        <div className="relative z-10 flex flex-col items-center px-4">
          <h1 className="font-headline text-4xl md:text-7xl font-bold tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-primary/80 animate-fade-in">
            Welcome to Mindscape
          </h1>
          <p className="max-w-2xl text-lg md:text-xl text-muted-foreground mb-8 animate-fade-in-delay">
            Your safe space for mental wellness. Explore, understand, and nurture your mind with futuristic tools.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="glow-sm hover:glow-md transition-shadow">
              <Link href="/dashboard">
                Explore Dashboard <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-transparent hover:bg-accent hover:text-accent-foreground">
              <Link href="/chat">
                Talk to AI <Bot className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      <section id="features" className="w-full max-w-6xl mx-auto py-16 md:py-24 px-4">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl md:text-4xl font-bold">A New Frontier in Mental Wellness</h2>
          <p className="text-muted-foreground mt-2">Tools designed for clarity and peace of mind.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div key={feature.title} className="glass-card p-6 flex flex-col items-center text-center animate-float">
              {feature.icon}
              <h3 className="text-xl font-bold mt-4 mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="helplines" className="w-full bg-background py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">Immediate Help is Available</h2>
            <p className="text-muted-foreground mt-2">If you are in distress, please reach out to these government-supported helplines.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {helplineCards.map((card) => (
              <Card key={card.name} className="glass-card hover:border-primary/80 transition-colors duration-300">
                <CardHeader>
                  <CardTitle className="text-2xl text-primary">{card.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{card.description}</p>
                  <div className="space-y-2">
                    {card.numbers.map((number) => (
                      <a key={number} href={`tel:${number}`} className="block text-2xl font-headline font-semibold tracking-wider text-accent hover:underline">
                        {number}
                      </a>
                    ))}
                  </div>
                  <Button asChild variant="link" className="px-0 mt-4">
                    <a href={`tel:${card.numbers[0]}`}>Call Now <ArrowRight className="ml-2 h-4 w-4"/></a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
