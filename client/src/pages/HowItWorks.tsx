import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "wouter";

export default function HowItWorks() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <Navigation />

      {/* Hero Section */}
      <section className="container max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
          How NurGuard Works
        </h1>
        <p className="text-xl text-slate-300 max-w-2xl mx-auto">
          Simple protection. Always on. No spying.
        </p>
        <p className="text-slate-400">
          NurGuard protects your devices by blocking harmful content before it reaches you — quietly, securely, and without tracking your behavior.
        </p>
      </section>

      {/* Core Idea */}
      <section className="container max-w-3xl mx-auto px-4 py-16 space-y-8">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-white">The Core Idea</h2>
          <p className="text-slate-300 text-lg">
            Most filters react after content loads.
          </p>
          <p className="text-emerald-400 text-lg font-semibold">
            NurGuard blocks it at the network level.
          </p>
          <p className="text-slate-300">
            That means harmful sites, trackers, and scams are stopped upstream, before they ever touch your screen.
          </p>
        </div>
      </section>

      {/* 4 Steps */}
      <section className="container max-w-4xl mx-auto px-4 py-20">
        <div className="space-y-12">
          {/* Step 1 */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold flex-shrink-0">1</div>
              <h3 className="text-2xl font-bold text-white">Install NurGuard</h3>
            </div>
            <div className="ml-16 space-y-3 text-slate-300">
              <p>You install NurGuard once on your device using our web app.</p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                  Works on phones, tablets, and computers
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                  Installs like a normal app (PWA)
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                  Takes just a few minutes
                </li>
              </ul>
              <p className="text-slate-400 pt-2">Once installed, NurGuard runs quietly in the background.</p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold flex-shrink-0">2</div>
              <h3 className="text-2xl font-bold text-white">Enable DNS Protection</h3>
            </div>
            <div className="ml-16 space-y-3 text-slate-300">
              <p>NurGuard uses secure DNS filtering to protect your connection.</p>
              <p className="font-semibold text-white">When your device tries to reach a website:</p>
              <ol className="space-y-2 list-decimal list-inside">
                <li>The request passes through NurGuard's secure filter</li>
                <li>Harmful domains are blocked instantly</li>
                <li>Safe content loads normally</li>
              </ol>
              <p className="text-slate-400 pt-2">You don't need to babysit it. Protection stays on even when apps change or browsers switch.</p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold flex-shrink-0">3</div>
              <h3 className="text-2xl font-bold text-white">What Gets Blocked</h3>
            </div>
            <div className="ml-16 space-y-3 text-slate-300">
              <p>NurGuard blocks entire categories by default, including:</p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                  Pornography & explicit content
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                  Gambling & betting sites
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                  Scams, phishing & malware
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                  Tracking & ad networks
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                  Known harmful and malicious domains
                </li>
              </ul>
              <p className="text-slate-400 pt-2">You can toggle categories on or off anytime from your dashboard.</p>
            </div>
          </div>

          {/* Step 4 */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold flex-shrink-0">4</div>
              <h3 className="text-2xl font-bold text-white">Discipline Without Surveillance</h3>
            </div>
            <div className="ml-16 space-y-3 text-slate-300">
              <p>NurGuard is built for discipline, not dopamine.</p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                  No usage spying
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                  No selling browsing data
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                  No behavior profiling
                </li>
              </ul>
              <p className="text-slate-400 pt-2">We don't need to watch you to protect you. NurGuard simply removes harmful options so focus becomes easier.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Family Protection */}
      <section className="container max-w-3xl mx-auto px-4 py-16 space-y-6">
        <h2 className="text-3xl font-bold text-white">Family Protection (Optional)</h2>
        <p className="text-slate-300">If children use your devices, NurGuard helps keep them safe by default:</p>
        <ul className="space-y-3 text-slate-300">
          <li className="flex items-center gap-3">
            <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0" />
            Enforced SafeSearch
          </li>
          <li className="flex items-center gap-3">
            <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0" />
            Blocked mature platforms
          </li>
          <li className="flex items-center gap-3">
            <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0" />
            Cleaner internet without constant monitoring
          </li>
        </ul>
        <p className="text-slate-400">It's protection without micromanagement.</p>
      </section>

      {/* Privacy by Design */}
      <section className="container max-w-3xl mx-auto px-4 py-16 space-y-6">
        <h2 className="text-3xl font-bold text-white">Privacy by Design</h2>
        <p className="text-slate-300 text-lg">NurGuard is built with a single rule:</p>
        <Card className="bg-emerald-950 border-emerald-700">
          <CardContent className="pt-6">
            <p className="text-emerald-400 text-lg font-semibold">Your data is not the product.</p>
          </CardContent>
        </Card>
        <ul className="space-y-3 text-slate-300">
          <li className="flex items-center gap-3">
            <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0" />
            No ads
          </li>
          <li className="flex items-center gap-3">
            <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0" />
            No trackers
          </li>
          <li className="flex items-center gap-3">
            <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0" />
            No analytics tied to identity
          </li>
          <li className="flex items-center gap-3">
            <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0" />
            No selling or sharing user data
          </li>
        </ul>
        <p className="text-slate-400">Your browsing stays private. Always.</p>
      </section>

      {/* Why Different */}
      <section className="container max-w-4xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-white mb-8">Why NurGuard Is Different</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="pt-6 space-y-3">
              <h3 className="font-semibold text-slate-300">Most "safety" apps:</h3>
              <ul className="space-y-2 text-slate-300 text-sm">
                <li className="flex items-center gap-2">
                  <span className="text-red-500">✗</span> Spy on behavior
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-red-500">✗</span> Sell data
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-red-500">✗</span> Use ads
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-red-500">✗</span> Optimize for engagement
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-emerald-950 border-emerald-700">
            <CardContent className="pt-6 space-y-3">
              <h3 className="font-semibold text-emerald-400">NurGuard:</h3>
              <ul className="space-y-2 text-emerald-300 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                  Blocks harm quietly
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                  Protects privacy
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                  Supports masājid
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                  Aligns technology with intention
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Pricing */}
      <section className="container max-w-2xl mx-auto px-4 py-16 text-center space-y-6">
        <h2 className="text-3xl font-bold text-white">One Price. One Mission.</h2>
        <p className="text-slate-300 text-lg">$33 per year</p>
        <ul className="space-y-2 text-slate-300">
          <li>No tiers.</li>
          <li>No upsells.</li>
          <li>No dark patterns.</li>
        </ul>
        <p className="text-emerald-400 font-semibold">Just protection that works.</p>
      </section>

      {/* Final CTA */}
      <section className="container max-w-2xl mx-auto px-4 py-20 text-center space-y-8">
        <div className="space-y-4">
          <h2 className="text-4xl font-bold text-white">Your Devices Don't Need More Apps</h2>
          <p className="text-2xl text-emerald-400">They Need a Guardian.</p>
        </div>

        <Link href="/pricing">
          <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white text-lg px-8">
            Activate NurGuard — $33/year
          </Button>
        </Link>

        <p className="text-slate-400 text-sm">Secure checkout • Instant access • Support within 24 hours</p>
      </section>

      <Footer />
    </div>
  );
}
