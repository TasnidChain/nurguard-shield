import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { CheckCircle2, Copy, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";
import { toast } from "sonner";

export default function Setup() {
  const [copiedDNS, setCopiedDNS] = useState(false);
  const dnsServer = "dns.nurguard.app";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(dnsServer);
    setCopiedDNS(true);
    toast.success("DNS server copied!");
    setTimeout(() => setCopiedDNS(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <Navigation />

      {/* Hero Section */}
      <section className="container max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
          Setup Guide
        </h1>
        <p className="text-xl text-slate-300">
          Get NurGuard running on your devices in minutes
        </p>
      </section>

      {/* DNS Server Info */}
      <section className="container max-w-3xl mx-auto px-4 py-16">
        <Card className="bg-emerald-950 border-emerald-700 mb-12">
          <CardContent className="pt-8 space-y-4">
            <h2 className="text-2xl font-bold text-white">Your DNS Server</h2>
            <div className="flex items-center gap-3 bg-slate-900 p-4 rounded-lg">
              <code className="flex-1 text-emerald-400 font-mono text-lg">{dnsServer}</code>
              <Button
                size="sm"
                variant="outline"
                onClick={copyToClipboard}
                className="border-emerald-600 text-emerald-400 hover:bg-emerald-950"
              >
                <Copy className="h-4 w-4 mr-2" />
                {copiedDNS ? "Copied!" : "Copy"}
              </Button>
            </div>
            <p className="text-slate-300 text-sm">You'll need this for every device setup</p>
          </CardContent>
        </Card>
      </section>

      {/* Platform Tabs */}
      <section className="container max-w-4xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-white mb-12 text-center">Choose Your Device</h2>

        {/* iOS */}
        <div className="mb-16 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold">📱</div>
            <h3 className="text-2xl font-bold text-white">iPhone / iPad (iOS)</h3>
          </div>

          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="pt-8 space-y-6">
              <div className="space-y-3">
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold flex-shrink-0">1</div>
                  <div>
                    <h4 className="font-bold text-white mb-2">Open Settings</h4>
                    <p className="text-slate-300">Go to Settings → WiFi (or Cellular)</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold flex-shrink-0">2</div>
                  <div>
                    <h4 className="font-bold text-white mb-2">Tap Your Network</h4>
                    <p className="text-slate-300">Long-press your WiFi network and select "Modify"</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold flex-shrink-0">3</div>
                  <div>
                    <h4 className="font-bold text-white mb-2">Configure DNS</h4>
                    <p className="text-slate-300">Scroll to "DNS" → Select "Manual"</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold flex-shrink-0">4</div>
                  <div>
                    <h4 className="font-bold text-white mb-2">Enter DNS Server</h4>
                    <p className="text-slate-300">Tap "Add Server" and paste: <code className="bg-slate-900 px-2 py-1 rounded text-emerald-400 font-mono">{dnsServer}</code></p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold flex-shrink-0">5</div>
                  <div>
                    <h4 className="font-bold text-white mb-2">Save & Done</h4>
                    <p className="text-slate-300">Tap "Save" and you're protected!</p>
                  </div>
                </div>
              </div>

              <p className="text-slate-400 text-sm pt-4 border-t border-slate-700">
                For cellular data, repeat these steps in Settings → Cellular → Cellular Data Options → Cellular Network
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Android */}
        <div className="mb-16 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold">🤖</div>
            <h3 className="text-2xl font-bold text-white">Android Phone / Tablet</h3>
          </div>

          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="pt-8 space-y-6">
              <div className="space-y-3">
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold flex-shrink-0">1</div>
                  <div>
                    <h4 className="font-bold text-white mb-2">Open Settings</h4>
                    <p className="text-slate-300">Go to Settings → Network & Internet</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold flex-shrink-0">2</div>
                  <div>
                    <h4 className="font-bold text-white mb-2">Advanced Settings</h4>
                    <p className="text-slate-300">Tap "WiFi" → Long-press your network → "Modify network"</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold flex-shrink-0">3</div>
                  <div>
                    <h4 className="font-bold text-white mb-2">Show Advanced Options</h4>
                    <p className="text-slate-300">Check "Show advanced options"</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold flex-shrink-0">4</div>
                  <div>
                    <h4 className="font-bold text-white mb-2">Set DNS</h4>
                    <p className="text-slate-300">Change "DHCP" to "Static" → Enter DNS: <code className="bg-slate-900 px-2 py-1 rounded text-emerald-400 font-mono">{dnsServer}</code></p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold flex-shrink-0">5</div>
                  <div>
                    <h4 className="font-bold text-white mb-2">Save & Done</h4>
                    <p className="text-slate-300">Tap "Save" and you're protected!</p>
                  </div>
                </div>
              </div>

              <p className="text-slate-400 text-sm pt-4 border-t border-slate-700">
                For mobile data, go to Settings → Network & Internet → Mobile Network → Advanced → Access Point Names (APN) and set DNS there
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Windows */}
        <div className="mb-16 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold">🪟</div>
            <h3 className="text-2xl font-bold text-white">Windows PC</h3>
          </div>

          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="pt-8 space-y-6">
              <div className="space-y-3">
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold flex-shrink-0">1</div>
                  <div>
                    <h4 className="font-bold text-white mb-2">Open Settings</h4>
                    <p className="text-slate-300">Settings → Network & Internet → WiFi</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold flex-shrink-0">2</div>
                  <div>
                    <h4 className="font-bold text-white mb-2">Manage Known Networks</h4>
                    <p className="text-slate-300">Click your network → "Manage" → "DNS settings"</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold flex-shrink-0">3</div>
                  <div>
                    <h4 className="font-bold text-white mb-2">Edit DNS</h4>
                    <p className="text-slate-300">Click "Edit" → Set to "Manual"</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold flex-shrink-0">4</div>
                  <div>
                    <h4 className="font-bold text-white mb-2">Enter DNS Server</h4>
                    <p className="text-slate-300">IPv4: <code className="bg-slate-900 px-2 py-1 rounded text-emerald-400 font-mono">{dnsServer}</code></p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold flex-shrink-0">5</div>
                  <div>
                    <h4 className="font-bold text-white mb-2">Save & Done</h4>
                    <p className="text-slate-300">Click "Save" and you're protected!</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Mac */}
        <div className="mb-16 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold">🍎</div>
            <h3 className="text-2xl font-bold text-white">Mac</h3>
          </div>

          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="pt-8 space-y-6">
              <div className="space-y-3">
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold flex-shrink-0">1</div>
                  <div>
                    <h4 className="font-bold text-white mb-2">Open System Preferences</h4>
                    <p className="text-slate-300">Apple Menu → System Preferences → Network</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold flex-shrink-0">2</div>
                  <div>
                    <h4 className="font-bold text-white mb-2">Select Your Connection</h4>
                    <p className="text-slate-300">Click your WiFi network on the left</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold flex-shrink-0">3</div>
                  <div>
                    <h4 className="font-bold text-white mb-2">Click Advanced</h4>
                    <p className="text-slate-300">Click "Advanced..." button</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold flex-shrink-0">4</div>
                  <div>
                    <h4 className="font-bold text-white mb-2">Go to DNS Tab</h4>
                    <p className="text-slate-300">Click "DNS" tab → Click "+" button</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold flex-shrink-0">5</div>
                  <div>
                    <h4 className="font-bold text-white mb-2">Enter DNS Server</h4>
                    <p className="text-slate-300">Type: <code className="bg-slate-900 px-2 py-1 rounded text-emerald-400 font-mono">{dnsServer}</code></p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold flex-shrink-0">6</div>
                  <div>
                    <h4 className="font-bold text-white mb-2">Save & Done</h4>
                    <p className="text-slate-300">Click "OK" then "Apply" and you're protected!</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Troubleshooting */}
      <section className="container max-w-3xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-white mb-8">Troubleshooting</h2>

        <div className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-white">DNS not working?</h3>
            <p className="text-slate-300">Restart your device and try again. DNS changes sometimes take a few minutes to apply.</p>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-bold text-white">Still having issues?</h3>
            <p className="text-slate-300">
              Contact our support team at <Link href="/contact" className="text-emerald-400 hover:text-emerald-300 underline">support</Link> or check our <Link href="/support" className="text-emerald-400 hover:text-emerald-300 underline">FAQ</Link>.
            </p>
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <section className="container max-w-2xl mx-auto px-4 py-20 text-center space-y-8">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-white">Setup Complete?</h2>
          <p className="text-slate-300">Head to your dashboard to manage your protection settings.</p>
        </div>

        <Link href="/app">
          <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white text-lg px-8">
            Go to Dashboard <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </section>

      <Footer />
    </div>
  );
}
