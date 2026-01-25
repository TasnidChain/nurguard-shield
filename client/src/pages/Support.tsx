import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Mail, ArrowRight } from "lucide-react";
import { Link } from "wouter";

export default function Support() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <Navigation />

      {/* Hero Section */}
      <section className="container max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
          Support & FAQ
        </h1>
        <p className="text-xl text-slate-300">
          Find answers to common questions or contact us for help
        </p>
      </section>

      {/* FAQ Section */}
      <section className="container max-w-3xl mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-white mb-12">Frequently Asked Questions</h2>

        <div className="space-y-6">
          {/* Setup */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">Getting Started</h3>
            
            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="pt-6 space-y-2">
                <h4 className="font-bold text-white">How do I install NurGuard?</h4>
                <p className="text-slate-300">NurGuard is a PWA (Progressive Web App). Visit nurguard.app from your device, click "Install," and follow the prompts. It works on phones, tablets, and computers.</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="pt-6 space-y-2">
                <h4 className="font-bold text-white">What's the DNS server address?</h4>
                <p className="text-slate-300">
                  The DNS server is <code className="bg-slate-900 px-2 py-1 rounded text-emerald-400 font-mono">dns.nurguard.app</code>. 
                  See our <Link href="/setup" className="text-emerald-400 hover:text-emerald-300 underline">Setup Guide</Link> for platform-specific instructions.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="pt-6 space-y-2">
                <h4 className="font-bold text-white">How long does setup take?</h4>
                <p className="text-slate-300">Usually 5-10 minutes per device. Just configure the DNS server in your network settings and you're done.</p>
              </CardContent>
            </Card>
          </div>

          {/* Billing */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">Billing & Pricing</h3>

            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="pt-6 space-y-2">
                <h4 className="font-bold text-white">How much does NurGuard cost?</h4>
                <p className="text-slate-300">$33 per year. That's it. No monthly billing, no hidden fees, no upsells.</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="pt-6 space-y-2">
                <h4 className="font-bold text-white">Can I cancel anytime?</h4>
                <p className="text-slate-300">Yes. Cancel anytime, no questions asked. You'll keep access through the end of your billing period.</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="pt-6 space-y-2">
                <h4 className="font-bold text-white">What if I'm not satisfied?</h4>
                <p className="text-slate-300">30-day money-back guarantee. If NurGuard doesn't work for you, we'll refund your payment in full. No questions asked.</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="pt-6 space-y-2">
                <h4 className="font-bold text-white">Does one subscription cover all my devices?</h4>
                <p className="text-slate-300">Yes. One subscription covers your phones, tablets, laptops, and computers.</p>
              </CardContent>
            </Card>
          </div>

          {/* Protection */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">Protection & Features</h3>

            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="pt-6 space-y-2">
                <h4 className="font-bold text-white">What does NurGuard block?</h4>
                <p className="text-slate-300">NurGuard blocks pornography, gambling, scams, malware, trackers, and ad networks. You can customize categories from your dashboard.</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="pt-6 space-y-2">
                <h4 className="font-bold text-white">Does NurGuard work on WiFi and mobile data?</h4>
                <p className="text-slate-300">Yes. DNS protection works everywhere—WiFi, cellular, and even when you're on other networks.</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="pt-6 space-y-2">
                <h4 className="font-bold text-white">Can apps bypass NurGuard?</h4>
                <p className="text-slate-300">Most can't. DNS filtering works at the network level, so it blocks harmful domains before apps can access them. Some advanced VPNs might bypass it, but we're working on Phase 2 solutions.</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="pt-6 space-y-2">
                <h4 className="font-bold text-white">Does NurGuard slow down my internet?</h4>
                <p className="text-slate-300">No. DNS filtering is fast and doesn't impact your connection speed.</p>
              </CardContent>
            </Card>
          </div>

          {/* Privacy */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">Privacy & Data</h3>

            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="pt-6 space-y-2">
                <h4 className="font-bold text-white">Do you track my browsing?</h4>
                <p className="text-slate-300">No. We don't track what you visit, who you talk to, or what you do online. NurGuard blocks harmful content, but doesn't spy on you.</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="pt-6 space-y-2">
                <h4 className="font-bold text-white">Do you sell my data?</h4>
                <p className="text-slate-300">Never. Your data is not a product. We don't have ads, trackers, or analytics tied to your identity.</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="pt-6 space-y-2">
                <h4 className="font-bold text-white">Is my data encrypted?</h4>
                <p className="text-slate-300">Yes. DNS requests are encrypted, and all connections are secure.</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="pt-6 space-y-2">
                <h4 className="font-bold text-white">Can I see your privacy policy?</h4>
                <p className="text-slate-300">
                  Yes. Check our <Link href="/privacy" className="text-emerald-400 hover:text-emerald-300 underline">Privacy Policy</Link> for full details.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Affiliate */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">Affiliate Program</h3>

            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="pt-6 space-y-2">
                <h4 className="font-bold text-white">How do I earn commission?</h4>
                <p className="text-slate-300">Share your referral link with friends and family. When they subscribe, you earn 30% recurring commission for every year they stay subscribed.</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="pt-6 space-y-2">
                <h4 className="font-bold text-white">How much can I earn?</h4>
                <p className="text-slate-300">Each subscription is $33/year. Your commission: 30% = $9.90/year per referral. 10 referrals = $99/year. 100 referrals = $990/year.</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="pt-6 space-y-2">
                <h4 className="font-bold text-white">When do I get paid?</h4>
                <p className="text-slate-300">You can request payouts anytime. We process them manually to keep things simple and transparent.</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="pt-6 space-y-2">
                <h4 className="font-bold text-white">Learn more about the affiliate program</h4>
                <p className="text-slate-300">
                  Visit our <Link href="/earn" className="text-emerald-400 hover:text-emerald-300 underline">Earn page</Link> for full details.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="container max-w-3xl mx-auto px-4 py-20 text-center space-y-8">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-white">Didn't find your answer?</h2>
          <p className="text-slate-300">We're here to help. Contact us directly.</p>
        </div>

        <Link href="/contact">
          <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white text-lg px-8">
            <Mail className="mr-2 h-5 w-5" />
            Contact Support
          </Button>
        </Link>

        <p className="text-slate-400 text-sm">We typically respond within 24 hours</p>
      </section>

      <Footer />
    </div>
  );
}
