'use client';
import { cn } from '@/lib/utils';
import { Message } from '@/app/chat/page';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { useAuth } from '../auth/auth-provider';
import { Bot, User } from 'lucide-react';

interface ChatMessagesProps {
  messages: Message[];
}

export function ChatMessages({ messages }: ChatMessagesProps) {
  const { user } = useAuth();
  
  return (
    <div className="space-y-6">
      {messages.map((message) => (
        <div
          key={message.id}
          className={cn(
            'flex items-end gap-3',
            message.sender === 'user' ? 'justify-end' : 'justify-start'
          )}
        >
          {message.sender === 'ai' && (
            <Avatar className="h-8 w-8">
              <AvatarFallback><Bot className="h-5 w-5 text-primary"/></AvatarFallback>
            </Avatar>
          )}

          <div
            className={cn(
              'max-w-xs md:max-w-md lg:max-w-lg rounded-xl px-4 py-3 text-sm shadow-md',
              message.sender === 'user'
                ? 'bg-primary text-primary-foreground rounded-br-none'
                : 'bg-secondary text-secondary-foreground rounded-bl-none'
            )}
          >
            {message.isTyping ? (
              <div className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse" style={{animationDelay: '0.1s'}}></span>
                <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse" style={{animationDelay: '0.2s'}}></span>
                <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse" style={{animationDelay: '0.3s'}}></span>
              </div>
            ) : (
              <p className="whitespace-pre-wrap">{message.text}</p>
            )}
          </div>
          
          {message.sender === 'user' && (
             <Avatar className="h-8 w-8">
              <AvatarImage src={user?.avatar} alt={user?.name} />
              <AvatarFallback><User className="h-5 w-5" /></AvatarFallback>
            </Avatar>
          )}
        </div>
      ))}
    </div>
  );
}
