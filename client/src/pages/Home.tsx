import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Shield, Lock, Users, CheckCircle2, ArrowRight } from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <Navigation />

      {/* Hero Section */}
      <section className="container max-w-4xl mx-auto px-4 py-20 text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
            Guard Your Nūr Online
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 max-w-2xl mx-auto">
            A digital guardian that blocks harmful content, protects your privacy, and helps you use technology with discipline and intention.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Link href="/pricing">
            <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white">
              👉 Activate Protection — $33 / Year
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

      {/* What NurGuard Does */}
      <section className="container max-w-5xl mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-center text-white mb-16">A Digital Shield for Modern Life</h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="pt-8 space-y-4">
              <div className="flex items-start gap-4">
                <Shield className="h-8 w-8 text-emerald-500 flex-shrink-0 mt-1" />
                <div className="text-left">
                  <h3 className="text-xl font-bold text-white mb-2">Block Harmful Content</h3>
                  <p className="text-slate-300">Pornography, gambling, scams, trackers, and malicious sites—blocked at the network level.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="pt-8 space-y-4">
              <div className="flex items-start gap-4">
                <Users className="h-8 w-8 text-emerald-500 flex-shrink-0 mt-1" />
                <div className="text-left">
                  <h3 className="text-xl font-bold text-white mb-2">Reclaim Your Focus</h3>
                  <p className="text-slate-300">Reduce addictive scrolling and dopamine traps before they take over your time.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="pt-8 space-y-4">
              <div className="flex items-start gap-4">
                <Lock className="h-8 w-8 text-emerald-500 flex-shrink-0 mt-1" />
                <div className="text-left">
                  <h3 className="text-xl font-bold text-white mb-2">Protect Your Privacy</h3>
                  <p className="text-slate-300">Encrypted DNS. No tracking. Your data stays yours.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="pt-8 space-y-4">
              <div className="flex items-start gap-4">
                <CheckCircle2 className="h-8 w-8 text-emerald-500 flex-shrink-0 mt-1" />
                <div className="text-left">
                  <h3 className="text-xl font-bold text-white mb-2">Family Safe by Default</h3>
                  <p className="text-slate-300">Protect children's devices with safe search and content controls.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* How It Works Summary */}
      <section className="container max-w-4xl mx-auto px-4 py-20 text-center space-y-12">
        <div>
          <h2 className="text-4xl font-bold text-white mb-4">Simple. Silent. Always On.</h2>
          <p className="text-xl text-slate-300 mb-8">No apps spying on you. No filters chasing clicks. Just quiet protection in the background.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold mx-auto">1</div>
            <h3 className="text-lg font-bold text-white">Install NurGuard</h3>
            <p className="text-slate-300 text-sm">Install on your device in minutes</p>
          </div>
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold mx-auto">2</div>
            <h3 className="text-lg font-bold text-white">Enable Protection</h3>
            <p className="text-slate-300 text-sm">Turn on DNS protection</p>
          </div>
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold mx-auto">3</div>
            <h3 className="text-lg font-bold text-white">Stay Protected</h3>
            <p className="text-slate-300 text-sm">Harmful content is blocked automatically</p>
          </div>
        </div>

        <Link href="/how-it-works">
          <Button size="lg" variant="outline" className="border-emerald-600 text-emerald-400 hover:bg-emerald-950">
            See How It Works <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </section>

      {/* Pricing Section */}
      <section className="container max-w-2xl mx-auto px-4 py-20 text-center space-y-8">
        <div>
          <h2 className="text-4xl font-bold text-white mb-2">One Price. One Mission.</h2>
          <p className="text-slate-300">$33 per year</p>
        </div>

        <Card className="bg-emerald-950 border-emerald-700">
          <CardContent className="pt-8 space-y-6">
            <ul className="space-y-3 text-left">
              <li className="flex items-center gap-3 text-slate-200">
                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                Covers all your devices
              </li>
              <li className="flex items-center gap-3 text-slate-200">
                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                No monthly billing
              </li>
              <li className="flex items-center gap-3 text-slate-200">
                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                Cancel anytime
              </li>
            </ul>
            
            <Link href="/pricing" className="block">
              <Button size="lg" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
                👉 Get Protected Now
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>

      {/* Affiliate Section */}
      <section className="container max-w-2xl mx-auto px-4 py-20 text-center space-y-8 bg-slate-800 rounded-lg p-8">
        <div>
          <h2 className="text-3xl font-bold text-white mb-4">Protect Others. Earn Halal Income.</h2>
          <ul className="space-y-2 text-slate-300 mb-6">
            <li>• Earn 30% recurring for every active referral</li>
            <li>• Share NurGuard with family and friends</li>
            <li>• Get paid while helping others guard their digital life</li>
          </ul>
          <p className="text-slate-400 text-sm mb-6">No ads. Just people helping people.</p>
        </div>

        <Link href="/earn">
          <Button size="lg" variant="outline" className="border-emerald-600 text-emerald-400 hover:bg-emerald-950">
            Learn How to Earn <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </section>

      {/* Trust Section */}
      <section className="container max-w-2xl mx-auto px-4 py-20 text-center space-y-8">
        <div>
          <h2 className="text-3xl font-bold text-white mb-4">Built With Niyyah</h2>
          <ul className="space-y-3 text-slate-300">
            <li>• 20% of revenue supports masjid construction & maintenance</li>
            <li>• No venture capital pressure</li>
            <li>• No selling user data—ever</li>
          </ul>
          <p className="text-slate-400 text-sm mt-6">NurGuard is built as a community protection system, not a surveillance business.</p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="container max-w-2xl mx-auto px-4 py-20 text-center space-y-8">
        <div className="space-y-4">
          <h2 className="text-4xl font-bold text-white">Your Devices Don't Need More Apps</h2>
          <p className="text-2xl text-emerald-400">They Need a Guardian.</p>
        </div>

        <Link href="/pricing">
          <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white text-lg px-8">
            👉 Activate NurGuard — $33 / Year
          </Button>
        </Link>

        <p className="text-slate-400 text-sm">Instant access • Secure checkout • Support within 24 hours</p>
      </section>

      <Footer />
    </div>
  );
}
