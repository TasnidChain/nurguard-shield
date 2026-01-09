import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Lock, Heart, Play } from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";
import Navigation from "@/components/Navigation";

export default function Home() {
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navigation />

      {/* HERO SECTION */}
      <section className="py-24 px-4 bg-gradient-to-b from-gray-900 to-gray-950">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
            Your Phone Is Not Neutral.
            <br />
            <span className="text-emerald-500">NurGuard Is the Shield.</span>
          </h1>

          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            Block filth. Reduce fitnah. Protect your mind, your family, and your akhirah — without spying, shaming, or complexity.
          </p>

          <Link href="/subscribe">
            <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-6 text-lg mb-6">
              🛡️ Activate NurGuard — $7.77/month
            </Button>
          </Link>

          <p className="text-sm text-gray-400">
            Takes 60 seconds • Cancel anytime • Supports Masajid worldwide
          </p>
        </div>
      </section>

      {/* PROBLEM SECTION */}
      <section className="py-20 px-4 bg-gray-950 border-t border-gray-800">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">
            Your phone is quietly shaping who you become.
          </h2>

          <div className="space-y-6 mb-12">
            <div className="flex gap-4 items-start">
              <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-lg text-gray-300">Porn is pushed, not searched for</p>
            </div>
            <div className="flex gap-4 items-start">
              <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-lg text-gray-300">"Innocent scrolling" leads to filth in 2 taps</p>
            </div>
            <div className="flex gap-4 items-start">
              <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-lg text-gray-300">Kids discover haram before parents realize</p>
            </div>
            <div className="flex gap-4 items-start">
              <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-lg text-gray-300">Filters are either useless or invasive</p>
            </div>
            <div className="flex gap-4 items-start">
              <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-lg text-gray-300">Most "solutions" are built by people who don't care about your values</p>
            </div>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-lg p-8 text-center">
            <p className="text-2xl font-semibold text-emerald-400">
              The danger isn't your phone.
              <br />
              The danger is leaving it unguarded.
            </p>
          </div>
        </div>
      </section>

      {/* SOLUTION SECTION */}
      <section className="py-20 px-4 bg-gray-950 border-t border-gray-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-16 text-center">
            NurGuard installs a halal shield over your digital life.
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <Card className="bg-gray-900 border-gray-800 hover:border-emerald-500 transition">
              <CardContent className="pt-8">
                <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center mb-6">
                  <Shield className="w-6 h-6 text-emerald-500" />
                </div>
                <h3 className="text-xl font-bold mb-4">Smart Content Blocking</h3>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li>• Porn & explicit sites blocked automatically</li>
                  <li>• No manual setup hell</li>
                  <li>• No data selling</li>
                </ul>
              </CardContent>
            </Card>

            {/* Feature 2 */}
            <Card className="bg-gray-900 border-gray-800 hover:border-emerald-500 transition">
              <CardContent className="pt-8">
                <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center mb-6">
                  <Heart className="w-6 h-6 text-emerald-500" />
                </div>
                <h3 className="text-xl font-bold mb-4">Mindful Protection</h3>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li>• Reduces dopamine traps</li>
                  <li>• Encourages intentional use</li>
                  <li>• Built for self-discipline</li>
                </ul>
              </CardContent>
            </Card>

            {/* Feature 3 */}
            <Card className="bg-gray-900 border-gray-800 hover:border-emerald-500 transition">
              <CardContent className="pt-8">
                <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center mb-6">
                  <Lock className="w-6 h-6 text-emerald-500" />
                </div>
                <h3 className="text-xl font-bold mb-4">Values-First Design</h3>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li>• No spying on messages</li>
                  <li>• No shame tactics</li>
                  <li>• Built for Muslims</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* DEMO VIDEO SECTION */}
      <section className="py-20 px-4 bg-gray-950 border-t border-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">See how NurGuard works in under a minute.</h2>
          <p className="text-gray-400 mb-12">No hype. Just the shield.</p>

          <div className="relative bg-gray-900 rounded-lg overflow-hidden border border-gray-800 aspect-video flex items-center justify-center cursor-pointer hover:border-emerald-500 transition group">
            <button
              onClick={() => setVideoOpen(true)}
              className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/50 transition"
            >
              <Play className="w-16 h-16 text-emerald-500" />
            </button>
            <div className="text-gray-500">Video Placeholder (30-60 seconds)</div>
          </div>

          {videoOpen && (
            <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onClick={() => setVideoOpen(false)}>
              <div className="bg-gray-900 rounded-lg w-full max-w-2xl aspect-video flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
                <p className="text-gray-400">Demo video embed here</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 px-4 bg-gray-950 border-t border-gray-800">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-16 text-center">Protection in 3 steps</h2>

          <div className="space-y-8">
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-emerald-600 text-white font-bold">
                  1
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Subscribe</h3>
                <p className="text-gray-400">$7.77/month — cancel anytime</p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-emerald-600 text-white font-bold">
                  2
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Install Shield</h3>
                <p className="text-gray-400">Add NurGuard to your phone in seconds</p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-emerald-600 text-white font-bold">
                  3
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Live Guarded</h3>
                <p className="text-gray-400">Browse, work, and relax with peace of mind</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="py-20 px-4 bg-gray-950 border-t border-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-12">Built by people who actually care.</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <Link href="/affiliate-public" className="bg-gray-900 rounded-lg p-8 border border-gray-800 hover:border-emerald-500 transition cursor-pointer">
              <p className="text-lg font-semibold text-emerald-400 mb-2">Earn 30%</p>
              <p className="text-gray-400">Become an affiliate partner</p>
            </Link>

            <div className="bg-gray-900 rounded-lg p-8 border border-gray-800">
              <p className="text-lg font-semibold text-emerald-400 mb-2">20% to Masajid</p>
              <p className="text-gray-400">Every subscription supports the Ummah</p>
            </div>

            <Link href="/vision" className="bg-gray-900 rounded-lg p-8 border border-gray-800 hover:border-emerald-500 transition cursor-pointer">
              <p className="text-lg font-semibold text-emerald-400 mb-2">Our Vision</p>
              <p className="text-gray-400">From shield to civilization</p>
            </Link>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="py-20 px-4 bg-gray-950 border-t border-gray-800">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">One coffee a month.</h2>
          <p className="text-xl text-gray-400 mb-12">Lifetime protection mindset.</p>

          <Card className="bg-gray-900 border-emerald-600 border-2">
            <CardContent className="pt-12 pb-12">
              <p className="text-5xl font-bold text-emerald-500 mb-8">$7.77 / month</p>

              <ul className="space-y-4 mb-12 text-left">
                <li className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                  <span className="text-gray-300">Unlimited protection</span>
                </li>
                <li className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                  <span className="text-gray-300">All updates included</span>
                </li>
                <li className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                  <span className="text-gray-300">Supports Masajid Builder Foundation</span>
                </li>
                <li className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                  <span className="text-gray-300">Affiliate rewards included</span>
                </li>
              </ul>

              <Link href="/subscribe">
                <Button size="lg" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
                  🛡️ Activate NurGuard Now
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 px-4 bg-gradient-to-b from-gray-950 to-gray-900 border-t border-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-12 leading-tight">
            You can't control the internet.
            <br />
            <span className="text-emerald-500">You can control your shield.</span>
          </h2>

          <Link href="/subscribe">
            <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-6 text-lg">
              Activate NurGuard Today
            </Button>
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 border-t border-gray-800 py-12 px-4 text-center text-gray-500 text-sm">
        <div className="max-w-4xl mx-auto">
          <p className="mb-4">NurGuard. Guard your phone. Guard your heart.</p>
          <p>© 2024 NurGuard. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

import { Shield } from "lucide-react";
