import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Brain, Lock, Heart, Users, Zap } from "lucide-react";
import { Link } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navigation />

      {/* HERO SECTION */}
      <section className="py-24 px-4 bg-gradient-to-b from-gray-900 to-gray-950">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            The Digital Guardian for the Modern Believer.
          </h1>

          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            NurGuard protects your iman, mind, time, wealth, and devices from the harms of the modern internet. It blocks explicit content, addictive apps, trackers, scams, and spiritual distractions — on all devices, on all networks.
          </p>

          <p className="text-lg text-emerald-400 mb-8 font-semibold">
            Built for Muslims. Useful for everyone.
          </p>

          <Link href="/subscribe">
            <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-6 text-lg mb-6">
              👉 Activate Protection
            </Button>
          </Link>

          <p className="text-sm text-gray-400">
            No app overwhelm. No tech headaches. Set it once. Stay guarded.
          </p>
        </div>
      </section>

      {/* PROTECTION SECTION */}
      <section className="py-20 px-4 bg-gray-950 border-t border-gray-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-4 text-center">
            🛡️ PROTECTION
          </h2>
          <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
            Defend your digital life from threats seen and unseen.
          </p>

          <div className="grid md:grid-cols-2 gap-12 mb-12">
            {/* What NurGuard Shields From */}
            <div>
              <h3 className="text-2xl font-bold mb-6 text-emerald-400">NurGuard shields you from:</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex gap-3">
                  <span className="text-emerald-500 flex-shrink-0">✓</span>
                  <span>Explicit content</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-emerald-500 flex-shrink-0">✓</span>
                  <span>Pornography & sexualized media</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-emerald-500 flex-shrink-0">✓</span>
                  <span>Gambling & addictive platforms</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-emerald-500 flex-shrink-0">✓</span>
                  <span>Malware, phishing, and scams</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-emerald-500 flex-shrink-0">✓</span>
                  <span>Trackers, data harvesters, and dark patterns</span>
                </li>
              </ul>
            </div>

            {/* Protection Layers */}
            <div>
              <h3 className="text-2xl font-bold mb-6 text-emerald-400">Protection layers include:</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex gap-3">
                  <span className="text-emerald-500 flex-shrink-0">⚙</span>
                  <span>DNS-level filtering (system-wide, app-wide)</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-emerald-500 flex-shrink-0">⚙</span>
                  <span>Real-time domain intelligence</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-emerald-500 flex-shrink-0">⚙</span>
                  <span>Newly registered & malicious domain detection</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-emerald-500 flex-shrink-0">⚙</span>
                  <span>Encrypted DNS routing</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-emerald-500 flex-shrink-0">⚙</span>
                  <span>App & category-level blocking</span>
                </li>
              </ul>
            </div>
          </div>

          <Card className="bg-emerald-950/20 border-emerald-500/30">
            <CardContent className="pt-8">
              <p className="text-gray-300 text-center">
                Unlike basic filters, NurGuard analyzes network behavior in real time to stop harmful content before it reaches your screen. <strong>Protection that works even when apps try to bypass it.</strong>
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* DISCIPLINE SECTION */}
      <section className="py-20 px-4 bg-gray-950 border-t border-gray-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-4 text-center">
            🧠 DISCIPLINE
          </h2>
          <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
            Technology should serve your mission — not enslave your attention.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="pt-8">
                <h3 className="text-xl font-bold mb-4 text-emerald-400">NurGuard helps you reclaim focus by:</h3>
                <ul className="space-y-3 text-gray-300">
                  <li>✓ Blocking addictive apps & sites</li>
                  <li>✓ Enforcing usage schedules</li>
                  <li>✓ Limiting late-night scrolling</li>
                  <li>✓ Cutting dopamine traps at the network level</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="pt-8">
                <p className="text-gray-300 mb-4">
                  Set digital boundaries aligned with your values — not Silicon Valley's incentives.
                </p>
                <p className="text-emerald-400 font-semibold">
                  Your focus. Your rules. Your future.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* PRIVACY SECTION */}
      <section className="py-20 px-4 bg-gray-950 border-t border-gray-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-4 text-center">
            🔐 PRIVACY
          </h2>
          <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
            Your data is not a product.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="pt-8">
                <h3 className="text-xl font-bold mb-4 text-emerald-400">NurGuard:</h3>
                <ul className="space-y-3 text-gray-300">
                  <li>✓ Blocks ads & trackers in apps and browsers</li>
                  <li>✓ Stops OS-level tracking</li>
                  <li>✓ Prevents fingerprinting & disguised trackers</li>
                  <li>✓ Encrypts DNS requests</li>
                  <li>✓ Does not sell or monetize user data</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="pt-8">
                <div className="space-y-4">
                  <p className="text-gray-300">
                    <strong className="text-emerald-400">Minimal logs.</strong><br />
                    No surveillance capitalism.<br />
                    No compromise.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAMILY SECTION */}
      <section className="py-20 px-4 bg-gray-950 border-t border-gray-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-4 text-center">
            🧒 FAMILY & FUTURE
          </h2>
          <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
            Protect what Allah entrusted to you.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="pt-8">
                <h3 className="text-xl font-bold mb-4 text-emerald-400">NurGuard gives parents real control:</h3>
                <ul className="space-y-3 text-gray-300 text-sm">
                  <li>✓ Block pornography, violence, drugs, gambling, and more</li>
                  <li>✓ Enforce SafeSearch across Google, Bing, YouTube, images & video</li>
                  <li>✓ Restrict mature content automatically</li>
                  <li>✓ Control access times with scheduled allowances</li>
                  <li>✓ Block specific apps, games, and platforms</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="pt-8">
                <h3 className="text-lg font-bold mb-4 text-emerald-400">Commonly Blocked Platforms</h3>
                <div className="grid grid-cols-2 gap-3 text-gray-300 text-sm">
                  <span>Facebook</span>
                  <span>TikTok</span>
                  <span>Instagram</span>
                  <span>Snapchat</span>
                  <span>Tinder</span>
                  <span>Fortnite</span>
                  <span>Twitch</span>
                  <span>YouTube</span>
                </div>
                <p className="text-emerald-400 font-semibold mt-6">One dashboard. All devices. Peace of mind.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* NIYYAH SECTION */}
      <section className="py-20 px-4 bg-gray-950 border-t border-gray-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-4 text-center">
            🌙 BUILT WITH NIYYAH
          </h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            NurGuard is not just software.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="pt-8">
                <h3 className="text-xl font-bold mb-4 text-emerald-400">It is:</h3>
                <ul className="space-y-3 text-gray-300">
                  <li>✓ A discipline system</li>
                  <li>✓ A digital hijab</li>
                  <li>✓ A shield for the heart</li>
                  <li>✓ A tool for barakah</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="pt-8">
                <h3 className="text-xl font-bold mb-4 text-emerald-400">Designed for:</h3>
                <ul className="space-y-3 text-gray-300">
                  <li>✓ Practicing Muslims</li>
                  <li>✓ Converts</li>
                  <li>✓ Parents</li>
                  <li>✓ Students</li>
                  <li>✓ Professionals</li>
                  <li>✓ Anyone seeking control over their digital life</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 px-4 bg-gray-950 border-t border-gray-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">
            ⚙️ HOW IT WORKS
          </h2>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="pt-8">
                <ul className="space-y-3 text-gray-300">
                  <li>✓ Works on phones, tablets, laptops, and routers</li>
                  <li>✓ Works on WiFi and mobile data</li>
                  <li>✓ No VPN slowdown</li>
                  <li>✓ No battery drain</li>
                  <li>✓ No technical knowledge required</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-emerald-950/20 border-emerald-500/30">
              <CardContent className="pt-8">
                <p className="text-gray-300 text-center">
                  <strong className="text-emerald-400">Set it once.</strong><br />
                  <strong className="text-emerald-400">Stay protected everywhere.</strong>
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-24 px-4 bg-gradient-to-b from-gray-950 to-gray-900 border-t border-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            🚀 ACTIVATE NURGUARD
          </h2>
          <p className="text-xl text-gray-300 mb-12">
            Digital protection with purpose.
          </p>

          <Link href="/subscribe">
            <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-6 text-lg mb-6">
              👉 Start Your Shield
            </Button>
          </Link>

          <p className="text-sm text-gray-400">
            Guard your Nur • Cancel anytime • Instant activation
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
