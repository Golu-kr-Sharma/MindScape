import { WelcomeHeader } from "@/components/dashboard/welcome-header";
import { MoodTracker } from "@/components/dashboard/mood-tracker";
import { StressMeter } from "@/components/dashboard/stress-meter";
import { BreathingExercise } from "@/components/dashboard/breathing-exercise";
import { MindfulnessTips } from "@/components/dashboard/mindfulness-tips";
import { ChatShortcut } from "@/components/dashboard/chat-shortcut";
import { EmergencyHelp } from "@/components/dashboard/emergency-help";

export default function DashboardPage() {
  return (
    <div className="p-4 md:p-8">
      <WelcomeHeader />
      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <MoodTracker className="md:col-span-2 lg:col-span-2" />
        <StressMeter />
        <BreathingExercise />
        <MindfulnessTips className="md:col-span-2" />
        <ChatShortcut className="lg:col-span-1" />
        <EmergencyHelp className="lg:col-span-1" />
      </div>
    </div>
  );
}
