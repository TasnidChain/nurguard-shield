import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Smartphone, Apple, Chrome, QrCode, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import Navigation from "@/components/Navigation";

type Platform = "ios" | "android" | "desktop" | "unknown";

export default function Download() {
  const [platform, setPlatform] = useState<Platform>("unknown");
  const [showInstructions, setShowInstructions] = useState(false);

  useEffect(() => {
    // Detect platform
    const ua = navigator.userAgent.toLowerCase();
    if (/iphone|ipad|ipod/.test(ua)) {
      setPlatform("ios");
    } else if (/android/.test(ua)) {
      setPlatform("android");
    } else {
      setPlatform("desktop");
    }
  }, []);

  const handleInstallClick = () => {
    const deferredPrompt = (window as any).deferredPrompt;
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the install prompt");
        }
        (window as any).deferredPrompt = null;
      });
    } else {
      setShowInstructions(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navigation />

      {/* HERO */}
      <section className="py-24 px-4 bg-gradient-to-b from-gray-900 to-gray-950">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-6 flex justify-center">
            <Shield className="w-16 h-16 text-emerald-500" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Your Shield Is Ready.
          </h1>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Install NurGuard on your phone and start protecting your digital life in seconds.
          </p>

          {/* PLATFORM-SPECIFIC CTA */}
          <div className="flex flex-col gap-4 justify-center max-w-sm mx-auto">
            {platform === "ios" && (
              <>
                <Button
                  size="lg"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-6 text-lg w-full"
                  onClick={handleInstallClick}
                >
                  <Apple className="w-5 h-5 mr-2" />
                  Install on iPhone
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full"
                  onClick={() => setShowInstructions(!showInstructions)}
                >
                  View Instructions
                </Button>
              </>
            )}

            {platform === "android" && (
              <>
                <Button
                  size="lg"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-6 text-lg w-full"
                  onClick={handleInstallClick}
                >
                  <Chrome className="w-5 h-5 mr-2" />
                  Install on Android
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full"
                  onClick={() => setShowInstructions(!showInstructions)}
                >
                  View Instructions
                </Button>
              </>
            )}

            {platform === "desktop" && (
              <>
                <div className="bg-gray-900 border border-gray-800 rounded-lg p-8 text-center mb-4">
                  <QrCode className="w-24 h-24 mx-auto mb-4 text-emerald-500" />
                  <p className="text-gray-300 mb-4">
                    Open this page on your phone to install
                  </p>
                  <p className="text-sm text-gray-400">
                    Or scan the QR code above with your phone camera
                  </p>
                </div>
                <Button
                  size="lg"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-6 text-lg w-full"
                  onClick={() => setShowInstructions(!showInstructions)}
                >
                  <Smartphone className="w-5 h-5 mr-2" />
                  View Instructions
                </Button>
              </>
            )}

            <Link href="/dashboard">
              <Button
                size="lg"
                variant="outline"
                className="w-full"
              >
                <ArrowRight className="w-5 h-5 mr-2" />
                Go to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* INSTRUCTIONS */}
      {showInstructions && (
        <section className="py-20 px-4 bg-gray-950 border-t border-gray-800">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">How to Install</h2>

            {platform === "ios" && (
              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="pt-8">
                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center font-bold text-sm">
                        1
                      </div>
                      <div>
                        <h3 className="font-bold mb-2">Open in Safari</h3>
                        <p className="text-gray-400">
                          Make sure you're viewing this page in Safari (not Chrome or another browser)
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center font-bold text-sm">
                        2
                      </div>
                      <div>
                        <h3 className="font-bold mb-2">Tap the Share Button</h3>
                        <p className="text-gray-400">
                          Look for the Share icon (arrow pointing up from a box) at the bottom of your screen
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center font-bold text-sm">
                        3
                      </div>
                      <div>
                        <h3 className="font-bold mb-2">Tap "Add to Home Screen"</h3>
                        <p className="text-gray-400">
                          Scroll down in the share menu and find "Add to Home Screen"
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center font-bold text-sm">
                        4
                      </div>
                      <div>
                        <h3 className="font-bold mb-2">Confirm and Done</h3>
                        <p className="text-gray-400">
                          Tap "Add" and NurGuard will appear on your home screen like a regular app
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {platform === "android" && (
              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="pt-8">
                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center font-bold text-sm">
                        1
                      </div>
                      <div>
                        <h3 className="font-bold mb-2">Open in Chrome</h3>
                        <p className="text-gray-400">
                          Make sure you're viewing this page in Chrome (other browsers may not support app installation)
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center font-bold text-sm">
                        2
                      </div>
                      <div>
                        <h3 className="font-bold mb-2">Tap the Menu Icon</h3>
                        <p className="text-gray-400">
                          Look for the three dots (⋮) in the top right corner of Chrome
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center font-bold text-sm">
                        3
                      </div>
                      <div>
                        <h3 className="font-bold mb-2">Tap "Install App"</h3>
                        <p className="text-gray-400">
                          You should see an option to "Install app" or "Add to Home Screen"
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center font-bold text-sm">
                        4
                      </div>
                      <div>
                        <h3 className="font-bold mb-2">Confirm Installation</h3>
                        <p className="text-gray-400">
                          Tap "Install" and NurGuard will be added to your app drawer
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {platform === "desktop" && (
              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="pt-8">
                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center font-bold text-sm">
                        1
                      </div>
                      <div>
                        <h3 className="font-bold mb-2">Open on Your Phone</h3>
                        <p className="text-gray-400">
                          Visit nurguard.app on your iPhone or Android phone
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center font-bold text-sm">
                        2
                      </div>
                      <div>
                        <h3 className="font-bold mb-2">Follow Platform Instructions</h3>
                        <p className="text-gray-400">
                          iOS: Tap Share → Add to Home Screen  
                          Android: Tap Menu (⋮) → Install App
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center font-bold text-sm">
                        3
                      </div>
                      <div>
                        <h3 className="font-bold mb-2">Open Like a Normal App</h3>
                        <p className="text-gray-400">
                          NurGuard will appear on your home screen and open just like any other app
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </section>
      )}

      {/* WHY INSTALL */}
      <section className="py-20 px-4 bg-gray-950 border-t border-gray-800">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Why Install the App?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="pt-8">
                <Shield className="w-8 h-8 text-emerald-500 mb-4" />
                <h3 className="font-bold mb-2">Always Protected</h3>
                <p className="text-gray-400 text-sm">
                  NurGuard runs in the background, protecting you even when you're not thinking about it
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="pt-8">
                <Smartphone className="w-8 h-8 text-emerald-500 mb-4" />
                <h3 className="font-bold mb-2">Native Experience</h3>
                <p className="text-gray-400 text-sm">
                  Installed apps feel faster and more responsive than web browsers
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="pt-8">
                <ArrowRight className="w-8 h-8 text-emerald-500 mb-4" />
                <h3 className="font-bold mb-2">Quick Access</h3>
                <p className="text-gray-400 text-sm">
                  Tap the icon on your home screen to instantly access your dashboard
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 border-t border-gray-800 py-12 px-4 text-center text-gray-500 text-sm">
        <div className="max-w-4xl mx-auto">
          <p className="mb-4">Questions? <Link href="/contact"><span className="text-emerald-500 hover:text-emerald-400">Contact us</span></Link></p>
          <p>© 2024 NurGuard. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
