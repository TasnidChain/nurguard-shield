import { Check, ArrowRight } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

export default function Pricing() {
  const features = [
    "Block Instagram, TikTok, Twitter, YouTube, browsers",
    "Adult & gambling website filtering",
    "Niyyah Gate (intention prompt)",
    "Impulse Cooldown (7/15/33 seconds)",
    "Time Budgets (Social, Entertainment, Learning, Deen)",
    "Sacred Hours (prayer times, work hours, custom)",
    "Daily Accountability Mirror",
    "Multi-device support",
    "No ads. No tracking. No data selling.",
  ];

  const faqs = [
    {
      q: "Can I cancel anytime?",
      a: "Yes. Cancel anytime from your dashboard. Your protection ends at the end of your billing period.",
    },
    {
      q: "Is there a free trial?",
      a: "No free trial, but we offer a 30-day money-back guarantee. If it doesn't work for you, we'll refund it.",
    },
    {
      q: "Do you offer refunds?",
      a: "Yes. 30-day money-back guarantee, no questions asked. If NurGuard isn't right for you, we'll refund your payment.",
    },
    {
      q: "What devices does this work on?",
      a: "NurGuard works on Android and iOS. Full enforcement on Android, DNS filtering on iOS.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-white overflow-hidden">
      <Navigation />

      {/* Hero */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 to-gray-950">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl -z-10"></div>

        <div className="container max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <div className="inline-block px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full">
              <p className="text-sm text-emerald-400 font-semibold">SIMPLE PRICING</p>
            </div>
            <h1 className="text-6xl font-bold">One price. One choice.</h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              No tiers. No upsells. No tricks. Just protection.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Card */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container max-w-2xl mx-auto">
          <div className="relative group">
            {/* Glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>

            {/* Card */}
            <div className="relative bg-gray-950 border border-emerald-500/50 rounded-3xl p-12 space-y-8">
              {/* Price */}
              <div className="text-center space-y-4">
                <p className="text-emerald-400 font-semibold text-lg">Annual Subscription</p>
                <div className="flex items-baseline justify-center gap-2">
                  <span className="text-7xl font-bold">$33</span>
                  <span className="text-gray-400 text-xl">/year</span>
                </div>
                <p className="text-gray-400">
                  That's ~$2.75 per month. One payment per year.
                </p>
              </div>

              {/* CTA */}
              <div className="flex gap-4 justify-center">
                <a
                  href="https://nurguard.lemonsqueezy.com/checkout/buy/d1e8f7c3-7a9e-4e5c-8f9e-1a2b3c4d5e6f"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1"
                >
                  <Button size="lg" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-lg hover:shadow-emerald-500/50 transition-all hover:scale-105">
                    Get NurGuard Now
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </a>
              </div>

              {/* Features List */}
              <div className="space-y-4 pt-8 border-t border-gray-800">
                <p className="text-sm text-gray-400 font-semibold uppercase">What's Included</p>
                <div className="space-y-3">
                  {features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-emerald-600/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-emerald-400" />
                      </div>
                      <p className="text-gray-300">{feature}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Guarantee */}
              <div className="bg-emerald-900/20 border border-emerald-500/30 rounded-xl p-4 text-center">
                <p className="text-sm text-emerald-300">
                  <span className="font-semibold">30-day money-back guarantee.</span> If it doesn't work for you, we'll refund it. No questions asked.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/50">
        <div className="container max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Questions?</h2>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <details
                key={idx}
                className="group border border-gray-800 rounded-lg overflow-hidden hover:border-emerald-500/50 transition"
              >
                <summary className="px-6 py-4 cursor-pointer flex items-center justify-between hover:bg-gray-900/50 transition">
                  <span className="font-semibold text-lg">{faq.q}</span>
                  <span className="text-emerald-500 group-open:rotate-180 transition">▼</span>
                </summary>
                <div className="px-6 py-4 bg-gray-900/30 border-t border-gray-800">
                  <p className="text-gray-300">{faq.a}</p>
                </div>
              </details>
            ))}
          </div>

          {/* Contact CTA */}
          <div className="mt-12 p-8 bg-gradient-to-r from-emerald-900/20 to-emerald-800/20 border border-emerald-500/30 rounded-lg text-center">
            <p className="text-gray-300 mb-4">Still have questions?</p>
            <a href="/contact" className="text-emerald-400 hover:text-emerald-300 font-semibold transition">
              Contact us →
            </a>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-5xl font-bold">Ready?</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Join others who are choosing intention over impulse.
          </p>
          <a
            href="https://nurguard.lemonsqueezy.com/checkout/buy/d1e8f7c3-7a9e-4e5c-8f9e-1a2b3c4d5e6f"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-lg hover:shadow-emerald-500/50 transition-all hover:scale-105">
              Get NurGuard — $33/year
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
