'use client';
import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/auth/auth-provider';
import { ChatInput } from '@/components/chat/chat-input';
import { ChatMessages } from '@/components/chat/chat-messages';
import { EmergencyHelplines } from '@/components/chat/emergency-helplines';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';
import { detectEmergency, EmergencyDetectionOutput } from '@/ai/flows/emergency-detection';
import { Skeleton } from '@/components/ui/skeleton';

export type Message = {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  isTyping?: boolean;
};

export default function ChatPage() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isEmergency, setIsEmergency] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Protect the route
    if (!isAuthenticated) {
      router.push('/login');
    } else {
        setMessages([
            { id: '1', text: `Hi ${user?.name}, I'm your empathetic AI assistant. How can I help you today?`, sender: 'ai' }
        ]);
        setIsLoading(false);
    }
  }, [isAuthenticated, router, user]);

  const handleSendMessage = async (text: string) => {
    const userMessage: Message = { id: Date.now().toString(), text, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);

    const typingIndicator: Message = { id: 'typing', text: '', sender: 'ai', isTyping: true };
    setMessages(prev => [...prev, typingIndicator]);

    try {
      const emergencyResult: EmergencyDetectionOutput = await detectEmergency({ userInput: text });

      setMessages(prev => prev.filter(m => m.id !== 'typing'));

      if (emergencyResult.emergencyDetected) {
        setIsEmergency(true);
        const aiMessage: Message = { id: Date.now().toString(), text: "It sounds like you're going through a difficult time. Please know that help is available.", sender: 'ai' };
        setMessages(prev => [...prev, aiMessage]);
      } else {
        setIsEmergency(false);
        // Mock Gemini response
        const aiMessage: Message = { id: Date.now().toString(), text: "Thank you for sharing that. Can you tell me more about what's on your mind?", sender: 'ai' };
        setMessages(prev => [...prev, aiMessage]);
      }
    } catch (error) {
      console.error("Error processing message:", error);
      setMessages(prev => prev.filter(m => m.id !== 'typing'));
      const errorMessage: Message = { id: Date.now().toString(), text: "I'm having trouble connecting right now. Please try again in a moment.", sender: 'ai' };
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  if (isLoading) {
    return (
        <div className="flex h-[calc(100vh-4rem)] flex-col">
            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
                <Skeleton className="h-16 w-3/4 rounded-lg" />
                <Skeleton className="h-16 w-3/4 ml-auto rounded-lg" />
                <Skeleton className="h-16 w-1/2 rounded-lg" />
            </div>
            <div className="border-t p-4">
                <Skeleton className="h-10 w-full rounded-lg" />
            </div>
        </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col bg-background">
      <div className="flex-1 overflow-y-auto p-4 md:p-6">
        <div className="mx-auto max-w-3xl">
          {isEmergency && <EmergencyHelplines />}
          <Alert className="mb-4 glass-card">
            <Terminal className="h-4 w-4" />
            <AlertTitle>Disclaimer</AlertTitle>
            <AlertDescription>
              I am an AI assistant and not a healthcare professional. For emergencies, please contact a real-world helpline.
            </AlertDescription>
          </Alert>
          <ChatMessages messages={messages} />
        </div>
      </div>
      <div className="border-t bg-background/80 backdrop-blur p-4">
        <div className="mx-auto max-w-3xl">
          <ChatInput onSendMessage={handleSendMessage} />
        </div>
      </div>
    </div>
  );
}
