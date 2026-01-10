import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Shield, Users, Zap } from "lucide-react";
import { Link } from "wouter";
import Navigation from "@/components/Navigation";

type Profile = "halal" | "kids" | "focus" | null;

export default function ProfileSelect() {
  const [selectedProfile, setSelectedProfile] = useState<Profile>(null);

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navigation />

      {/* Hero */}
      <section className="py-16 px-4 bg-gradient-to-b from-gray-900 to-gray-950 border-b border-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Choose Your Protection Profile
          </h1>
          <p className="text-xl text-gray-300">
            Select a pre-configured profile that matches your needs. You can change this anytime from your dashboard.
          </p>
        </div>
      </section>

      {/* Profile Selection */}
      <section className="py-16 px-4 bg-gray-950">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Halal Mode */}
            <button
              onClick={() => setSelectedProfile("halal")}
              className={`text-left transition ${
                selectedProfile === "halal" ? "" : "opacity-75 hover:opacity-100"
              }`}
            >
              <Card
                className={`h-full border-2 transition ${
                  selectedProfile === "halal"
                    ? "border-emerald-500 bg-emerald-500/10"
                    : "border-gray-700 bg-gray-900 hover:border-gray-600"
                }`}
              >
                <CardContent className="pt-8">
                  <div className="flex items-start justify-between mb-4">
                    <Shield className="w-8 h-8 text-emerald-400" />
                    {selectedProfile === "halal" && (
                      <Check className="w-6 h-6 text-emerald-400" />
                    )}
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Halal Mode</h3>
                  <p className="text-gray-400 text-sm mb-6">
                    Our recommended default protection
                  </p>
                  <ul className="space-y-3 text-sm text-gray-300">
                    <li className="flex gap-2">
                      <span className="text-emerald-400">✓</span>
                      <span>Blocks adult content & pornography</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-emerald-400">✓</span>
                      <span>Blocks gambling & betting sites</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-emerald-400">✓</span>
                      <span>Blocks dating apps & sites</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-emerald-400">✓</span>
                      <span>Blocks explicit media & keywords</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-emerald-400">✓</span>
                      <span>Allows productive sites</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </button>

            {/* Kids Mode */}
            <button
              onClick={() => setSelectedProfile("kids")}
              className={`text-left transition ${
                selectedProfile === "kids" ? "" : "opacity-75 hover:opacity-100"
              }`}
            >
              <Card
                className={`h-full border-2 transition ${
                  selectedProfile === "kids"
                    ? "border-emerald-500 bg-emerald-500/10"
                    : "border-gray-700 bg-gray-900 hover:border-gray-600"
                }`}
              >
                <CardContent className="pt-8">
                  <div className="flex items-start justify-between mb-4">
                    <Users className="w-8 h-8 text-emerald-400" />
                    {selectedProfile === "kids" && (
                      <Check className="w-6 h-6 text-emerald-400" />
                    )}
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Kids Mode</h3>
                  <p className="text-gray-400 text-sm mb-6">
                    Stricter protection for children
                  </p>
                  <ul className="space-y-3 text-sm text-gray-300">
                    <li className="flex gap-2">
                      <span className="text-emerald-400">✓</span>
                      <span>Everything in Halal Mode, plus:</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-emerald-400">✓</span>
                      <span>Blocks violence & gore</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-emerald-400">✓</span>
                      <span>Blocks social media apps</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-emerald-400">✓</span>
                      <span>Enforces SafeSearch on all platforms</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-emerald-400">✓</span>
                      <span>Blocks gaming & streaming sites</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </button>

            {/* Focus Mode */}
            <button
              onClick={() => setSelectedProfile("focus")}
              className={`text-left transition ${
                selectedProfile === "focus" ? "" : "opacity-75 hover:opacity-100"
              }`}
            >
              <Card
                className={`h-full border-2 transition ${
                  selectedProfile === "focus"
                    ? "border-emerald-500 bg-emerald-500/10"
                    : "border-gray-700 bg-gray-900 hover:border-gray-600"
                }`}
              >
                <CardContent className="pt-8">
                  <div className="flex items-start justify-between mb-4">
                    <Zap className="w-8 h-8 text-emerald-400" />
                    {selectedProfile === "focus" && (
                      <Check className="w-6 h-6 text-emerald-400" />
                    )}
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Focus Mode</h3>
                  <p className="text-gray-400 text-sm mb-6">
                    Productivity-focused protection
                  </p>
                  <ul className="space-y-3 text-sm text-gray-300">
                    <li className="flex gap-2">
                      <span className="text-emerald-400">✓</span>
                      <span>Everything in Halal Mode, plus:</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-emerald-400">✓</span>
                      <span>Blocks social media (Facebook, TikTok, etc.)</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-emerald-400">✓</span>
                      <span>Blocks streaming & entertainment</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-emerald-400">✓</span>
                      <span>Blocks news & distraction sites</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-emerald-400">✓</span>
                      <span>Allows work & learning sites</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </button>
          </div>

          {/* Profile Details */}
          {selectedProfile && (
            <Card className="bg-gray-900 border-emerald-500/30 mb-8">
              <CardContent className="pt-8">
                <h3 className="text-xl font-bold mb-4 text-emerald-400">
                  {selectedProfile === "halal" && "Halal Mode Details"}
                  {selectedProfile === "kids" && "Kids Mode Details"}
                  {selectedProfile === "focus" && "Focus Mode Details"}
                </h3>
                <p className="text-gray-300 mb-4">
                  {selectedProfile === "halal" &&
                    "Halal Mode is our recommended default. It blocks explicit content, gambling, dating apps, and other haram material while allowing productive work and learning. Perfect for individuals and families seeking balanced protection."}
                  {selectedProfile === "kids" &&
                    "Kids Mode provides stricter protection with additional blocks on violence, social media, and gaming. It enforces SafeSearch across all platforms and is designed for parents who want comprehensive safety for their children."}
                  {selectedProfile === "focus" &&
                    "Focus Mode helps professionals and students eliminate digital distractions. It blocks social media, entertainment, and news sites while allowing work and learning tools. Perfect for deep work and productivity."}
                </p>
                <p className="text-gray-400 text-sm">
                  You can change your profile anytime from your dashboard. All profiles include DNS-level protection against malware, phishing, and trackers.
                </p>
              </CardContent>
            </Card>
          )}

          {/* CTA */}
          <div className="flex gap-4 justify-center">
            {selectedProfile ? (
              <>
                <Link href="/dashboard">
                  <Button className="bg-emerald-600 hover:bg-emerald-700 px-8 py-6">
                    Activate {selectedProfile === "halal" && "Halal Mode"}
                    {selectedProfile === "kids" && "Kids Mode"}
                    {selectedProfile === "focus" && "Focus Mode"}
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  onClick={() => setSelectedProfile(null)}
                  className="px-8 py-6"
                >
                  Choose Different Profile
                </Button>
              </>
            ) : (
              <p className="text-gray-400">Select a profile above to continue</p>
            )}
          </div>
        </div>
      </section>

      {/* Info Banner */}
      <section className="py-12 px-4 bg-gray-900 border-t border-gray-800">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-emerald-950/20 border-emerald-500/30">
            <CardContent className="pt-8">
              <h3 className="font-bold mb-2 text-emerald-400">ℹ️ About Profiles</h3>
              <p className="text-gray-300 text-sm">
                These pre-configured profiles help guides you to configure protection based on your needs. Protection effectiveness depends on correct device configuration and supported platforms. You can customize individual rules from your dashboard after activation.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
