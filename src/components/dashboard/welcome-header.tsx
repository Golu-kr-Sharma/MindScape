'use client';
import { useAuth } from "../auth/auth-provider";

export function WelcomeHeader() {
    const { user, isAuthenticated } = useAuth();

    return (
        <div>
            <h1 className="text-3xl font-bold font-headline tracking-tight">
                {isAuthenticated && user ? `Welcome back, ${user.name}` : 'Welcome to the Dashboard'}
            </h1>
            <p className="text-muted-foreground mt-1">
                Here&apos;s a snapshot of your mental wellness scape.
            </p>
        </div>
    )
}
