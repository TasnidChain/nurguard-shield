import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { CheckCircle2 } from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";

export default function Pricing() {
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = async () => {
    setIsLoading(true);
    // TODO: Integrate with Lemon Squeezy checkout
    // For now, redirect to a placeholder
    setTimeout(() => {
      window.location.href = "https://nurguard.lemonsqueezy.com/checkout";
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <Navigation />

      {/* Hero Section */}
      <section className="container max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
          One Price. One Mission.
        </h1>
        <p className="text-2xl text-emerald-400 font-semibold">$33 / Year</p>
        <p className="text-slate-300 text-lg">
          That's it. No tiers. No upsells. No dark patterns.
        </p>
      </section>

      {/* Main Pricing Card */}
      <section className="container max-w-2xl mx-auto px-4 py-16">
        <Card className="bg-emerald-950 border-emerald-700 overflow-hidden">
          <CardContent className="pt-12 pb-8 space-y-8">
            {/* Price */}
            <div className="text-center space-y-2">
              <p className="text-slate-300 text-sm font-medium">Annual Subscription</p>
              <p className="text-6xl font-bold text-white">$33</p>
              <p className="text-slate-300 text-sm">per year</p>
            </div>

            {/* Features */}
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-slate-200">
                <CheckCircle2 className="h-6 w-6 text-emerald-400 flex-shrink-0" />
                <span className="text-lg">Covers all your devices</span>
              </li>
              <li className="flex items-center gap-3 text-slate-200">
                <CheckCircle2 className="h-6 w-6 text-emerald-400 flex-shrink-0" />
                <span className="text-lg">Block harmful content 24/7</span>
              </li>
              <li className="flex items-center gap-3 text-slate-200">
                <CheckCircle2 className="h-6 w-6 text-emerald-400 flex-shrink-0" />
                <span className="text-lg">Encrypted DNS protection</span>
              </li>
              <li className="flex items-center gap-3 text-slate-200">
                <CheckCircle2 className="h-6 w-6 text-emerald-400 flex-shrink-0" />
                <span className="text-lg">No monthly billing</span>
              </li>
              <li className="flex items-center gap-3 text-slate-200">
                <CheckCircle2 className="h-6 w-6 text-emerald-400 flex-shrink-0" />
                <span className="text-lg">Cancel anytime</span>
              </li>
              <li className="flex items-center gap-3 text-slate-200">
                <CheckCircle2 className="h-6 w-6 text-emerald-400 flex-shrink-0" />
                <span className="text-lg">30-day money-back guarantee</span>
              </li>
            </ul>

            {/* CTA Button */}
            <Button 
              size="lg" 
              className="w-full bg-white hover:bg-slate-100 text-emerald-950 font-semibold text-lg py-6"
              onClick={handleCheckout}
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "👉 Activate NurGuard Now"}
            </Button>

            {/* Trust Message */}
            <p className="text-center text-slate-300 text-sm">
              Secure checkout • Instant access • Support within 24 hours
            </p>
          </CardContent>
        </Card>
      </section>

      {/* What's Included */}
      <section className="container max-w-4xl mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-white mb-12 text-center">What's Included</h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="pt-8 space-y-4">
              <h3 className="text-xl font-bold text-white">Protection</h3>
              <ul className="space-y-3 text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                  Block pornography & explicit content
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                  Block gambling & betting sites
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                  Block scams & malware
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                  Block trackers & ads
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="pt-8 space-y-4">
              <h3 className="text-xl font-bold text-white">Privacy & Control</h3>
              <ul className="space-y-3 text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                  Encrypted DNS
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                  No usage tracking
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                  No data selling
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                  Dashboard control
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ */}
      <section className="container max-w-3xl mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-white mb-12 text-center">Questions?</h2>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-white">Can I cancel anytime?</h3>
            <p className="text-slate-300">Yes. Cancel anytime, no questions asked. You'll keep access through the end of your billing period.</p>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-bold text-white">What if I'm not satisfied?</h3>
            <p className="text-slate-300">30-day money-back guarantee. If NurGuard doesn't work for you, we'll refund your payment in full.</p>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-bold text-white">How many devices can I protect?</h3>
            <p className="text-slate-300">All of them. One subscription covers your phones, tablets, laptops, and computers.</p>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-bold text-white">Do you sell my data?</h3>
            <p className="text-slate-300">No. Ever. Your browsing stays private. We don't have ads, trackers, or analytics tied to your identity.</p>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-bold text-white">Need more help?</h3>
            <p className="text-slate-300">
              Check out our <Link href="/support" className="text-emerald-400 hover:text-emerald-300 underline">Support page</Link> or <Link href="/contact" className="text-emerald-400 hover:text-emerald-300 underline">contact us</Link>.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="container max-w-2xl mx-auto px-4 py-20 text-center space-y-8">
        <div className="space-y-4">
          <h2 className="text-4xl font-bold text-white">Ready to Guard Your Nūr?</h2>
          <p className="text-slate-300 text-lg">Join thousands protecting their digital life.</p>
        </div>

        <Button 
          size="lg" 
          className="bg-emerald-600 hover:bg-emerald-700 text-white text-lg px-8"
          onClick={handleCheckout}
          disabled={isLoading}
        >
          {isLoading ? "Processing..." : "👉 Activate NurGuard — $33 / Year"}
        </Button>

        <p className="text-slate-400 text-sm">Secure checkout • Instant access • Support within 24 hours</p>
      </section>

      <Footer />
    </div>
  );
}
