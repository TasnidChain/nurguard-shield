import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ArrowRight, Pause, Shield, Clock, BarChart3 } from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <Navigation />

      {/* Hero Section */}
      <section className="container max-w-4xl mx-auto px-4 py-24 text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-6xl md:text-7xl font-bold text-white leading-tight">
            A pause between impulse and action
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 max-w-2xl mx-auto">
            NurGuard gently interrupts distractions — so you can choose on purpose.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Link href="/pricing">
            <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold">
              Get NurGuard — $33/year
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
          <Link href="/how-it-works">
            <Button size="lg" variant="outline" className="border-slate-600 text-slate-200 hover:bg-slate-800">
              Learn How It Works
            </Button>
          </Link>
        </div>

        <div className="pt-4 space-y-2 text-slate-400">
          <p className="text-sm font-medium">Built for Muslims. Useful for everyone.</p>
          <p className="text-sm">No ads. No data selling. No distractions disguised as "features."</p>
        </div>
      </section>

      {/* What Actually Happens */}
      <section className="container max-w-4xl mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-center text-white mb-16">What actually happens</h2>
        
        <div className="space-y-8">
          <div className="flex gap-6 items-start">
            <div className="w-12 h-12 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold flex-shrink-0">
              1
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">You open Instagram.</h3>
              <p className="text-slate-300 text-lg">Just like always.</p>
            </div>
          </div>

          <div className="flex gap-6 items-start">
            <div className="w-12 h-12 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold flex-shrink-0">
              2
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">NurGuard pauses you for a moment.</h3>
              <p className="text-slate-300 text-lg">Before the scroll begins.</p>
            </div>
          </div>

          <div className="flex gap-6 items-start">
            <div className="w-12 h-12 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold flex-shrink-0">
              3
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">A simple question appears.</h3>
              <p className="text-slate-300 text-lg">"What's your intention right now?"</p>
            </div>
          </div>

          <div className="flex gap-6 items-start">
            <div className="w-12 h-12 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold flex-shrink-0">
              4
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">You choose — or you walk away.</h3>
              <p className="text-slate-300 text-lg">That pause changes everything.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Message */}
      <section className="container max-w-4xl mx-auto px-4 py-20 text-center">
        <Card className="bg-emerald-950/30 border-emerald-700/30 p-12">
          <p className="text-2xl font-semibold text-emerald-300">
            NurGuard doesn't fight you.<br />
            It gives you a moment to choose.
          </p>
        </Card>
      </section>

      {/* Features - Concrete */}
      <section className="container max-w-5xl mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-center text-white mb-16">How it works</h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="pt-8 space-y-4">
              <div className="flex items-start gap-4">
                <Pause className="h-8 w-8 text-emerald-500 flex-shrink-0 mt-1" />
                <div className="text-left">
                  <h3 className="text-xl font-bold text-white mb-2">Pause distractions before they open</h3>
                  <p className="text-slate-300">Not after. Not with guilt. Just a moment to choose.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="pt-8 space-y-4">
              <div className="flex items-start gap-4">
                <Shield className="h-8 w-8 text-emerald-500 flex-shrink-0 mt-1" />
                <div className="text-left">
                  <h3 className="text-xl font-bold text-white mb-2">Block adult & gambling websites</h3>
                  <p className="text-slate-300">Quietly, in the background. Across all your devices.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="pt-8 space-y-4">
              <div className="flex items-start gap-4">
                <Clock className="h-8 w-8 text-emerald-500 flex-shrink-0 mt-1" />
                <div className="text-left">
                  <h3 className="text-xl font-bold text-white mb-2">Set focus hours & time limits</h3>
                  <p className="text-slate-300">So your phone works with your life — not against it.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="pt-8 space-y-4">
              <div className="flex items-start gap-4">
                <BarChart3 className="h-8 w-8 text-emerald-500 flex-shrink-0 mt-1" />
                <div className="text-left">
                  <h3 className="text-xl font-bold text-white mb-2">Daily accountability</h3>
                  <p className="text-slate-300">No streaks. No shame. Just awareness of what you're choosing.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="container max-w-2xl mx-auto px-4 py-20 text-center space-y-8">
        <div className="space-y-4">
          <p className="text-slate-400 text-sm font-medium">PRICING</p>
          <h2 className="text-5xl font-bold text-white">$33 / year</h2>
          <p className="text-slate-300 text-lg">
            One price. No upsells. No tracking. No tricks.
          </p>
        </div>

        <Link href="/pricing">
          <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold">
            See what's included
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </Link>
      </section>

      {/* CTA Section */}
      <section className="container max-w-4xl mx-auto px-4 py-20 text-center space-y-8">
        <Card className="bg-gradient-to-r from-emerald-950 to-slate-800 border-emerald-700 p-12">
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-white">Ready to reclaim your focus?</h2>
            <p className="text-xl text-slate-300">
              Join others who are choosing intention over impulse.
            </p>
            <Link href="/pricing">
              <Button size="lg" className="bg-white hover:bg-slate-100 text-emerald-950 font-semibold">
                Get Started — $33/year
              </Button>
            </Link>
          </div>
        </Card>
      </section>

      <Footer />
    </div>
  );
}
