import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { CheckCircle2, ArrowRight, Copy } from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";
import { toast } from "sonner";

export default function Earn() {
  const [copiedLink, setCopiedLink] = useState(false);
  const exampleLink = "nurguard.app?ref=yourname";

  const copyReferralLink = () => {
    navigator.clipboard.writeText(exampleLink);
    setCopiedLink(true);
    toast.success("Referral link copied!");
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <Navigation />

      {/* Hero Section */}
      <section className="container max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
          Protect Others. Earn Halal Income.
        </h1>
        <p className="text-xl text-slate-300 max-w-2xl mx-auto">
          Share NurGuard with family and friends. Earn 30% recurring commission for every active referral.
        </p>
      </section>

      {/* How It Works */}
      <section className="container max-w-4xl mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-white mb-12 text-center">How It Works</h2>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold mx-auto">1</div>
            <h3 className="text-lg font-bold text-white text-center">Get Your Link</h3>
            <p className="text-slate-300 text-center">Share your unique referral link with family and friends</p>
          </div>

          <div className="space-y-4">
            <div className="w-12 h-12 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold mx-auto">2</div>
            <h3 className="text-lg font-bold text-white text-center">They Subscribe</h3>
            <p className="text-slate-300 text-center">They click your link and activate NurGuard ($33/year)</p>
          </div>

          <div className="space-y-4">
            <div className="w-12 h-12 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold mx-auto">3</div>
            <h3 className="text-lg font-bold text-white text-center">You Earn</h3>
            <p className="text-slate-300 text-center">Earn 30% recurring every year they stay subscribed</p>
          </div>
        </div>
      </section>

      {/* Commission Example */}
      <section className="container max-w-3xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Commission Math</h2>

        <Card className="bg-emerald-950 border-emerald-700">
          <CardContent className="pt-8 space-y-6">
            <div className="space-y-3">
              <p className="text-slate-300">Each subscription is <span className="text-emerald-400 font-bold">$33/year</span></p>
              <p className="text-slate-300">Your commission: <span className="text-emerald-400 font-bold">30% = $9.90/year</span></p>
            </div>

            <div className="border-t border-emerald-700 pt-6 space-y-3">
              <p className="text-slate-300 font-semibold">Example: 10 active referrals</p>
              <p className="text-emerald-400 text-2xl font-bold">$99/year</p>
              <p className="text-slate-300 text-sm">That's $8.25/month, recurring as long as they stay subscribed</p>
            </div>

            <div className="border-t border-emerald-700 pt-6 space-y-3">
              <p className="text-slate-300 font-semibold">Example: 100 active referrals</p>
              <p className="text-emerald-400 text-2xl font-bold">$990/year</p>
              <p className="text-slate-300 text-sm">That's $82.50/month, recurring</p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Key Features */}
      <section className="container max-w-4xl mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-white mb-12 text-center">Why Join?</h2>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="pt-8 space-y-4">
              <h3 className="text-xl font-bold text-white">Recurring Income</h3>
              <ul className="space-y-3 text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                  Earn every year they stay subscribed
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                  No monthly billing hassles
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                  Predictable, passive income
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="pt-8 space-y-4">
              <h3 className="text-xl font-bold text-white">Easy Sharing</h3>
              <ul className="space-y-3 text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                  Share with family & friends
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                  No sales pressure
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                  People want this product
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="pt-8 space-y-4">
              <h3 className="text-xl font-bold text-white">Halal & Ethical</h3>
              <ul className="space-y-3 text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                  No ads or dark patterns
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                  Helping people protect their deen
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                  20% supports masjid funding
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="pt-8 space-y-4">
              <h3 className="text-xl font-bold text-white">Simple Payouts</h3>
              <ul className="space-y-3 text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                  Manual payouts (no auto-deductions)
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                  Request when you want
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                  Multiple payment methods
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Who Should Join */}
      <section className="container max-w-3xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Who Should Join?</h2>

        <ul className="space-y-4 text-slate-300">
          <li className="flex items-center gap-3">
            <CheckCircle2 className="h-6 w-6 text-emerald-500 flex-shrink-0" />
            <span className="text-lg">Parents who want to help other families protect their kids</span>
          </li>
          <li className="flex items-center gap-3">
            <CheckCircle2 className="h-6 w-6 text-emerald-500 flex-shrink-0" />
            <span className="text-lg">Imams and community leaders</span>
          </li>
          <li className="flex items-center gap-3">
            <CheckCircle2 className="h-6 w-6 text-emerald-500 flex-shrink-0" />
            <span className="text-lg">Content creators and influencers</span>
          </li>
          <li className="flex items-center gap-3">
            <CheckCircle2 className="h-6 w-6 text-emerald-500 flex-shrink-0" />
            <span className="text-lg">Anyone who believes in digital wellness</span>
          </li>
        </ul>
      </section>

      {/* FAQ */}
      <section className="container max-w-3xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Questions?</h2>

        <div className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-white">How do I get my referral link?</h3>
            <p className="text-slate-300">Sign up for an affiliate account in your dashboard. You'll get a unique link to share.</p>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-bold text-white">When do I get paid?</h3>
            <p className="text-slate-300">You can request payouts anytime. We process them manually to keep things simple and transparent.</p>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-bold text-white">What if someone cancels?</h3>
            <p className="text-slate-300">You only earn commission while they're subscribed. If they cancel, the commission stops.</p>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-bold text-white">Can I share on social media?</h3>
            <p className="text-slate-300">Yes! Share your link anywhere. We just ask that you're honest about what NurGuard does.</p>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-bold text-white">Is there a minimum payout?</h3>
            <p className="text-slate-300">No minimum. Request a payout whenever you want.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container max-w-2xl mx-auto px-4 py-20 text-center space-y-8">
        <div className="space-y-4">
          <h2 className="text-4xl font-bold text-white">Ready to Start Earning?</h2>
          <p className="text-slate-300 text-lg">Join our affiliate program and help protect your community.</p>
        </div>

        <Link href="/app">
          <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white text-lg px-8">
            Get Your Referral Link <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>

        <p className="text-slate-400 text-sm">No signup fees • No approval process • Start earning today</p>
      </section>

      <Footer />
    </div>
  );
}
