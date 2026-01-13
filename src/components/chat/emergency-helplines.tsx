'use client';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Phone, ShieldAlert } from 'lucide-react';

const helplines = [
    { name: 'Tele Mental Health', number: '14416' },
    { name: 'AASRA', number: '9152987821' },
];

export function EmergencyHelplines() {
    return (
        <Alert variant="destructive" className="mb-6 animate-fade-in">
            <ShieldAlert className="h-4 w-4" />
            <AlertTitle>Immediate Help is Available</AlertTitle>
            <AlertDescription>
                <p className="mb-3">It sounds like you are in distress. Please reach out to one of these 24/7 helplines.</p>
                <div className="space-y-2">
                    {helplines.map(line => (
                         <a key={line.name} href={`tel:${line.number}`} className="flex items-center gap-2 font-semibold text-lg hover:underline">
                            <Phone className="h-4 w-4" />
                            <span>{line.name}: {line.number}</span>
                         </a>
                    ))}
                </div>
            </AlertDescription>
        </Alert>
    )
}
