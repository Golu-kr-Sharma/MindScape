import { Bot } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

export function ChatShortcut() {
  return (
    <Card className="glass-card flex flex-col items-center justify-center text-center p-6">
      <CardHeader className="p-0 mb-4">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
          <Bot className="h-6 w-6 text-primary" />
        </div>
        <CardTitle className="font-headline text-lg mt-4">Need to Talk?</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <p className="text-sm text-muted-foreground mb-4">
          Your AI companion is here to listen without judgment.
        </p>
        <Button asChild variant="glow" size="sm">
          <Link href="/chat">Start Chat</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
