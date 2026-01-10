import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, CheckCircle, AlertCircle, Smartphone, Apple, Chrome } from "lucide-react";
import { Link } from "wouter";
import Navigation from "@/components/Navigation";
import { toast } from "sonner";

export default function SetupDNS() {
  const [platform, setPlatform] = useState<"ios" | "android" | "desktop" | "unknown">("unknown");
  const [dnsActive, setDnsActive] = useState<boolean | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);

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

  const verifyDNS = async () => {
    setIsVerifying(true);
    try {
      // In production, this would call your verification API
      // For now, we'll show a placeholder
      const response = await fetch("/api/verify-dns", {
        method: "POST",
      }).catch(() => null);

      if (response?.ok) {
        setDnsActive(true);
        toast.success("✅ NurGuard DNS is active!");
      } else {
        setDnsActive(false);
        toast.error("❌ NurGuard DNS not detected. Check your settings.");
      }
    } catch (error) {
      setDnsActive(false);
      toast.error("Could not verify DNS. Try again in a moment.");
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navigation />

      {/* HERO */}
      <section className="py-20 px-4 bg-gradient-to-b from-gray-900 to-gray-950">
        <div className="max-w-3xl mx-auto text-center">
          <div className="mb-6 flex justify-center">
            <Shield className="w-16 h-16 text-emerald-500" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Activate NurGuard Protection
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            NurGuard uses secure DNS-based protection to block harmful content across all apps and browsers.
          </p>
          <p className="text-gray-400">Takes about 2 minutes</p>
        </div>
      </section>

      {/* INSTRUCTIONS */}
      <section className="py-20 px-4 bg-gray-950">
        <div className="max-w-3xl mx-auto">
          {/* STEP 1: CHOOSE DEVICE */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Step 1: Choose Your Device</h2>

            {platform === "ios" && (
              <Card className="bg-gray-900 border-emerald-500/30">
                <CardContent className="pt-8">
                  <div className="flex gap-3 mb-6">
                    <Apple className="w-6 h-6 text-emerald-500 flex-shrink-0" />
                    <h3 className="text-2xl font-bold">iPhone / iPad</h3>
                  </div>

                  <ol className="space-y-4 text-gray-300">
                    <li className="flex gap-4">
                      <span className="font-bold text-emerald-500 flex-shrink-0">1.</span>
                      <span>Open <strong>Settings</strong></span>
                    </li>
                    <li className="flex gap-4">
                      <span className="font-bold text-emerald-500 flex-shrink-0">2.</span>
                      <span>Go to <strong>Wi-Fi</strong></span>
                    </li>
                    <li className="flex gap-4">
                      <span className="font-bold text-emerald-500 flex-shrink-0">3.</span>
                      <span>Tap the <strong>ⓘ</strong> next to your connected network</span>
                    </li>
                    <li className="flex gap-4">
                      <span className="font-bold text-emerald-500 flex-shrink-0">4.</span>
                      <span>Tap <strong>Configure DNS</strong></span>
                    </li>
                    <li className="flex gap-4">
                      <span className="font-bold text-emerald-500 flex-shrink-0">5.</span>
                      <span>Select <strong>Automatic</strong></span>
                    </li>
                    <li className="flex gap-4">
                      <span className="font-bold text-emerald-500 flex-shrink-0">6.</span>
                      <span>Add DNS Server:</span>
                    </li>
                  </ol>

                  <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 my-6 text-center">
                    <code className="text-emerald-400 font-mono text-lg">dns.nurguard.app</code>
                  </div>

                  <ol className="space-y-4 text-gray-300">
                    <li className="flex gap-4">
                      <span className="font-bold text-emerald-500 flex-shrink-0">7.</span>
                      <span>Tap <strong>Save</strong></span>
                    </li>
                  </ol>
                </CardContent>
              </Card>
            )}

            {platform === "android" && (
              <Card className="bg-gray-900 border-emerald-500/30">
                <CardContent className="pt-8">
                  <div className="flex gap-3 mb-6">
                    <Chrome className="w-6 h-6 text-emerald-500 flex-shrink-0" />
                    <h3 className="text-2xl font-bold">Android</h3>
                  </div>

                  <ol className="space-y-4 text-gray-300">
                    <li className="flex gap-4">
                      <span className="font-bold text-emerald-500 flex-shrink-0">1.</span>
                      <span>Open <strong>Settings</strong></span>
                    </li>
                    <li className="flex gap-4">
                      <span className="font-bold text-emerald-500 flex-shrink-0">2.</span>
                      <span>Go to <strong>Network & Internet</strong></span>
                    </li>
                    <li className="flex gap-4">
                      <span className="font-bold text-emerald-500 flex-shrink-0">3.</span>
                      <span>Tap <strong>Private DNS</strong></span>
                    </li>
                    <li className="flex gap-4">
                      <span className="font-bold text-emerald-500 flex-shrink-0">4.</span>
                      <span>Select <strong>Private DNS provider hostname</strong></span>
                    </li>
                    <li className="flex gap-4">
                      <span className="font-bold text-emerald-500 flex-shrink-0">5.</span>
                      <span>Enter:</span>
                    </li>
                  </ol>

                  <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 my-6 text-center">
                    <code className="text-emerald-400 font-mono text-lg">dns.nurguard.app</code>
                  </div>

                  <ol className="space-y-4 text-gray-300">
                    <li className="flex gap-4">
                      <span className="font-bold text-emerald-500 flex-shrink-0">6.</span>
                      <span>Tap <strong>Save</strong></span>
                    </li>
                  </ol>
                </CardContent>
              </Card>
            )}

            {platform === "desktop" && (
              <Card className="bg-gray-900 border-emerald-500/30">
                <CardContent className="pt-8">
                  <p className="text-gray-300 mb-6">
                    DNS setup works best on your phone. Open this page on your iPhone or Android device to get started.
                  </p>
                  <p className="text-gray-400 text-sm">
                    Or, if you want to configure DNS on your computer, contact support for detailed instructions.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* STEP 2: VERIFY */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Step 2: Verify Protection</h2>

            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="pt-8">
                <p className="text-gray-300 mb-6">
                  Click the button below to confirm NurGuard is active.
                </p>

                <Button
                  onClick={verifyDNS}
                  disabled={isVerifying}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-6 text-lg mb-6"
                >
                  {isVerifying ? "Verifying..." : "Verify Protection"}
                </Button>

                {dnsActive === true && (
                  <div className="bg-emerald-950/30 border border-emerald-500/30 rounded-lg p-4 flex gap-3">
                    <CheckCircle className="w-6 h-6 text-emerald-500 flex-shrink-0" />
                    <div>
                      <p className="font-bold text-emerald-400">✅ NurGuard Active</p>
                      <p className="text-emerald-300 text-sm">Your device is protected</p>
                    </div>
                  </div>
                )}

                {dnsActive === false && (
                  <div className="bg-red-950/30 border border-red-500/30 rounded-lg p-4 flex gap-3">
                    <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0" />
                    <div>
                      <p className="font-bold text-red-400">❌ NurGuard Not Detected</p>
                      <p className="text-red-300 text-sm">Double-check your DNS settings above</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* STEP 3: UNDERSTAND */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Step 3: Understand the Protection</h2>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="pt-8">
                  <h3 className="font-bold mb-4 text-emerald-400">What DNS Blocking Does</h3>
                  <ul className="space-y-3 text-gray-300 text-sm">
                    <li>✓ Blocks harmful sites before they load</li>
                    <li>✓ Works across all apps and browsers</li>
                    <li>✓ No app running required</li>
                    <li>✓ Low battery usage</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="pt-8">
                  <h3 className="font-bold mb-4 text-yellow-500">Current Limitations</h3>
                  <ul className="space-y-3 text-gray-300 text-sm">
                    <li>⚠ DNS can be bypassed by changing settings</li>
                    <li>⚠ Keyword-level filtering coming soon</li>
                    <li>⚠ Requires manual setup</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-emerald-950/20 border-emerald-500/30">
              <CardContent className="pt-8">
                <div className="flex gap-4">
                  <Shield className="w-6 h-6 text-emerald-500 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold mb-2 text-emerald-400">🔒 Stronger Protection Coming</h3>
                    <p className="text-gray-300 mb-4">
                      Native VPN protection is in development and will provide:
                    </p>
                    <ul className="space-y-2 text-gray-300 text-sm">
                      <li>• Prevent bypassing</li>
                      <li>• Enable keyword filtering</li>
                      <li>• Lock settings with accountability</li>
                    </ul>
                    <p className="text-emerald-400 text-sm mt-4 font-bold">
                      Founding Members get access automatically.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* CTA */}
          <div className="text-center">
            <Link href="/dashboard">
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-6 text-lg">
                Go to Dashboard
              </Button>
            </Link>
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
