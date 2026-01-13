import Link from 'next/link';
import { cn } from '@/lib/utils';

const BrainCircuitIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={cn('h-6 w-6', className)}
  >
    <path d="M12 2a10 10 0 0 0-10 10c0 4.42 2.87 8.17 6.84 9.5.4.08.55-.17.55-.38 0-.19-.01-1.02-.01-1.9-2.58.5-3.13-1.08-3.13-1.08-.36-.92-.88-1.17-.88-1.17-.73-.5.06-.5.06-.5.8.06 1.23.83 1.23.83.72 1.22 1.88 1.02 2.34.78.07-.6.28-1.02.51-1.26-2.22-.25-4.55-1.11-4.55-4.94 0-1.1.39-1.99 1.03-2.69-.1-.25-.45-1.28.1-2.65 0 0 .84-.27 2.75 1.02.8-.22 1.65-.33 2.5-.33s1.7.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.4.1 2.65.64.7 1.03 1.6 1.03 2.69 0 3.84-2.34 4.68-4.57 4.93.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.19 0 .21.15.46.55.38A10 10 0 0 0 22 12c0-5.52-4.48-10-10-10z" />
  </svg>
);


export function Logo() {
  return (
    <Link href="/" className="flex items-center space-x-2 group">
      <div className="p-2 rounded-full bg-primary/20 group-hover:bg-primary/30 transition-colors">
        <BrainCircuitIcon className="text-primary group-hover:text-white transition-colors" />
      </div>
      <span className="font-headline text-xl font-bold tracking-tighter text-white group-hover:text-primary transition-colors">
        Mindscape
      </span>
    </Link>
  );
}
