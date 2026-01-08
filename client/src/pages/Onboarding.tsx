import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { trpc } from "@/lib/trpc";
import { Shield, CheckCircle2, Loader2 } from "lucide-react";
import { useLocation } from "wouter";
import { toast } from "sonner";

type ProtectionIntent = "social_media" | "adult_content" | "gaming" | "news" | "custom";

export default function Onboarding() {
  const [, setLocation] = useLocation();
  const [screen, setScreen] = useState<"intent" | "presets" | "streak">("intent");
  const [selectedIntents, setSelectedIntents] = useState<ProtectionIntent[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const completeOnboarding = trpc.onboarding.complete.useMutation({
    onSuccess: () => {
      setScreen("presets");
    },
    onError: (error: any) => {
      toast.error("Failed to complete onboarding");
      console.error(error);
    },
  });

  const handleIntentSelect = (intent: ProtectionIntent) => {
    setSelectedIntents((prev) =>
      prev.includes(intent) ? prev.filter((i) => i !== intent) : [...prev, intent]
    );
  };

  const handleActivateProtection = async () => {
    if (selectedIntents.length === 0) {
      toast.error("Please select at least one protection type");
      return;
    }

    setIsLoading(true);
    try {
      await completeOnboarding.mutateAsync({
        protectionIntent: selectedIntents,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoToDashboard = () => {
    setLocation("/dashboard");
  };

  // Screen 1: Intent Selection
  if (screen === "intent") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-emerald-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Shield className="h-12 w-12 text-emerald-600" />
            </div>
            <CardTitle className="text-2xl">What do you want protection from?</CardTitle>
            <CardDescription>Select all that apply</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { id: "social_media" as const, label: "Social media distraction", icon: "📱" },
              { id: "adult_content" as const, label: "Explicit / adult content", icon: "🔞" },
              { id: "gaming" as const, label: "Gaming & time-wasters", icon: "🎮" },
              { id: "news" as const, label: "News & doomscrolling", icon: "📰" },
              { id: "custom" as const, label: "Custom (manual setup)", icon: "⚙️" },
            ].map((option) => (
              <div
                key={option.id}
                className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-emerald-50 transition"
                onClick={() => handleIntentSelect(option.id)}
              >
                <Checkbox
                  checked={selectedIntents.includes(option.id)}
                  onCheckedChange={() => handleIntentSelect(option.id)}
                />
                <span className="text-lg">{option.icon}</span>
                <label className="flex-1 cursor-pointer font-medium">{option.label}</label>
              </div>
            ))}

      <Button
        onClick={handleActivateProtection}
        disabled={completeOnboarding.isPending || selectedIntents.length === 0}
        className="w-full bg-emerald-600 hover:bg-emerald-700 mt-6"
        size="lg"
      >
        {completeOnboarding.isPending ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Activating...
          </>
        ) : (
          "Activate Protection"
        )}
      </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Screen 2: Auto-Apply Presets
  if (screen === "presets") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-emerald-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Setting up your protection</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { label: "Rules created", done: true },
              { label: "Schedules applied", done: true },
              { label: "Protection active", done: true },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center space-x-3 p-3 bg-emerald-50 rounded-lg">
                <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0" />
                <span className="font-medium">{item.label}</span>
              </div>
            ))}

            <Button
              onClick={() => setScreen("streak")}
              className="w-full bg-emerald-600 hover:bg-emerald-700 mt-6"
              size="lg"
            >
              Continue
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Screen 3: Streak Initialization
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-emerald-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Shield className="h-16 w-16 text-emerald-600" />
          </div>
          <CardTitle className="text-3xl font-bold">Your protection is active</CardTitle>
          <CardDescription className="text-lg mt-2">Your streak has begun</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 text-center">
          <div className="bg-emerald-50 p-6 rounded-lg">
            <p className="text-5xl font-bold text-emerald-600">1</p>
            <p className="text-muted-foreground mt-2">Day 1 started</p>
          </div>

          <p className="text-muted-foreground">
            Stay compliant with your rules and watch your streak grow. Breaking rules resets your progress.
          </p>

          <Button
            onClick={handleGoToDashboard}
            className="w-full bg-emerald-600 hover:bg-emerald-700"
            size="lg"
          >
            Go to Dashboard
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
