import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { CheckCircle2, Smartphone, Lock } from "lucide-react";
import { useState } from "react";

export default function Setup() {
  const [activeTab, setActiveTab] = useState<"android" | "ios">("android");

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <Navigation />

      {/* Hero */}
      <section className="container max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
          Setup Guide
        </h1>
        <p className="text-xl text-slate-300">
          Get NurGuard running on your devices in minutes
        </p>
      </section>

      {/* Platform Selection */}
      <section className="container max-w-3xl mx-auto px-4 py-16">
        <div className="flex gap-4 mb-12">
          <Button
            onClick={() => setActiveTab("android")}
            size="lg"
            className={activeTab === "android" 
              ? "bg-emerald-600 hover:bg-emerald-700 text-white" 
              : "bg-slate-800 hover:bg-slate-700 text-slate-300"}
          >
            <Smartphone className="h-5 w-5 mr-2" />
            Android
          </Button>
          <Button
            onClick={() => setActiveTab("ios")}
            size="lg"
            className={activeTab === "ios" 
              ? "bg-emerald-600 hover:bg-emerald-700 text-white" 
              : "bg-slate-800 hover:bg-slate-700 text-slate-300"}
          >
            <Smartphone className="h-5 w-5 mr-2" />
            iPhone / iPad
          </Button>
        </div>

        {/* Android Setup */}
        {activeTab === "android" && (
          <div className="space-y-8">
            {/* Context */}
            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="pt-8 space-y-4">
                <h2 className="text-2xl font-bold text-white">This is how NurGuard protects you</h2>
                <p className="text-slate-300">
                  NurGuard works by gently stepping in before distractions take over.
                </p>
                <p className="text-slate-300">
                  To do that, your phone will ask for a few permissions. This is normal — it's how focus apps work.
                </p>
                <p className="text-emerald-300 font-semibold">
                  We never read your messages, photos, or personal data.
                </p>
              </CardContent>
            </Card>

            {/* Step 1: Download */}
            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="pt-8 space-y-4">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold flex-shrink-0">
                    1
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2">Download the app</h3>
                    <p className="text-slate-300">
                      You'll get a download link after checkout. Just tap it and the APK will download.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Step 2: Install */}
            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="pt-8 space-y-4">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold flex-shrink-0">
                    2
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2">Install it</h3>
                    <p className="text-slate-300 mb-3">
                      Open the file and tap "Install". You may see a warning about unknown sources — that's normal.
                    </p>
                    <p className="text-sm text-slate-400">
                      If you don't see the install option, go to Settings → Apps → Special app access → Install unknown apps, and enable NurGuard.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Step 3: Permissions */}
            <Card className="bg-emerald-950/30 border-emerald-700/30">
              <CardContent className="pt-8 space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold flex-shrink-0">
                    3
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-4">Grant permissions</h3>
                    
                    <div className="space-y-6">
                      {/* Permission 1 */}
                      <div className="space-y-2">
                        <h4 className="font-semibold text-emerald-300">Allow app protection</h4>
                        <p className="text-slate-300 text-sm">
                          This lets NurGuard pause distracting apps before they open.
                        </p>
                        <p className="text-slate-400 text-sm">
                          Nothing is read or recorded. NurGuard only knows which app is opening — not what you do inside it.
                        </p>
                      </div>

                      {/* Permission 2 */}
                      <div className="space-y-2">
                        <h4 className="font-semibold text-emerald-300">Allow screen protection</h4>
                        <p className="text-slate-300 text-sm">
                          This allows NurGuard to show a pause screen when you open a distracting app.
                        </p>
                        <p className="text-slate-400 text-sm">
                          That pause is the whole point.
                        </p>
                      </div>

                      {/* Permission 3 */}
                      <div className="space-y-2">
                        <h4 className="font-semibold text-emerald-300">Allow time awareness</h4>
                        <p className="text-slate-300 text-sm">
                          This helps NurGuard track how long apps are used so time limits work.
                        </p>
                        <p className="text-slate-400 text-sm">
                          No content is tracked. Only time totals.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Step 4: Onboarding */}
            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="pt-8 space-y-4">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold flex-shrink-0">
                    4
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2">Complete setup</h3>
                    <p className="text-slate-300">
                      NurGuard will guide you through setting your sacred hours and time budgets. This takes about 2 minutes.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Step 5: DNS Setup */}
            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="pt-8 space-y-4">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold flex-shrink-0">
                    5
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2">Enable DNS protection (optional)</h3>
                    <p className="text-slate-300 mb-4">
                      For extra web filtering, add these DNS servers to your phone settings:
                    </p>
                    <div className="bg-slate-900 rounded-lg p-4 space-y-2 font-mono text-sm">
                      <p className="text-emerald-400">Primary: 45.90.28.0#383b61</p>
                      <p className="text-emerald-400">Secondary: 45.90.30.0#383b61</p>
                    </div>
                    <p className="text-slate-400 text-sm mt-3">
                      Go to Settings → Network & Internet → Private DNS → Enter hostname
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Done */}
            <Card className="bg-emerald-950/50 border-emerald-700/50">
              <CardContent className="pt-8 space-y-4">
                <div className="flex gap-4">
                  <CheckCircle2 className="h-8 w-8 text-emerald-400 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">You're protected</h3>
                    <p className="text-slate-300">
                      NurGuard is active. You don't need to do anything else. Just use your phone as usual.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* iOS Setup */}
        {activeTab === "ios" && (
          <div className="space-y-8">
            {/* Context */}
            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="pt-8 space-y-4">
                <h2 className="text-2xl font-bold text-white">This is how NurGuard protects you on iOS</h2>
                <p className="text-slate-300">
                  NurGuard on iPhone uses web filtering to block harmful content and help you stay focused.
                </p>
                <p className="text-emerald-300 font-semibold">
                  We never read your messages, photos, or personal data.
                </p>
              </CardContent>
            </Card>

            {/* Step 1: Download */}
            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="pt-8 space-y-4">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold flex-shrink-0">
                    1
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2">Download from App Store</h3>
                    <p className="text-slate-300">
                      Search for "NurGuard Shield" and tap Install.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Step 2: Enable Filtering */}
            <Card className="bg-emerald-950/30 border-emerald-700/30">
              <CardContent className="pt-8 space-y-4">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold flex-shrink-0">
                    2
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-4">Turn on web protection</h3>
                    <p className="text-slate-300 mb-3">
                      This blocks adult and gambling websites across your phone.
                    </p>
                    <p className="text-slate-300 mb-3">
                      It runs quietly in the background. You can turn it off anytime.
                    </p>
                    <p className="text-slate-400 text-sm">
                      You'll be asked to allow NurGuard to manage network settings. This is normal and required for filtering to work.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Step 3: DNS Setup */}
            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="pt-8 space-y-4">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold flex-shrink-0">
                    3
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2">Add DNS protection</h3>
                    <p className="text-slate-300 mb-4">
                      Go to Settings → General → VPN & Device Management → DNS and add:
                    </p>
                    <div className="bg-slate-900 rounded-lg p-4 space-y-2 font-mono text-sm">
                      <p className="text-emerald-400">383b61.dns.nextdns.io</p>
                    </div>
                    <p className="text-slate-400 text-sm mt-3">
                      This blocks harmful websites across all apps and browsers.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Step 4: Setup */}
            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="pt-8 space-y-4">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold flex-shrink-0">
                    4
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2">Complete setup</h3>
                    <p className="text-slate-300">
                      Set your sacred hours and time budgets. This takes about 2 minutes.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Done */}
            <Card className="bg-emerald-950/50 border-emerald-700/50">
              <CardContent className="pt-8 space-y-4">
                <div className="flex gap-4">
                  <CheckCircle2 className="h-8 w-8 text-emerald-400 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">You're protected</h3>
                    <p className="text-slate-300">
                      NurGuard is active. Just use your phone as usual.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}
