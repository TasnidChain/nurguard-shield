import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronDown } from "lucide-react";
import Navigation from "@/components/Navigation";
import { Link } from "wouter";

export default function FAQ() {
  const [expandedCategory, setExpandedCategory] = useState<string | null>("affiliate");

  const categories = {
    affiliate: {
      title: "Affiliate Program",
      icon: "💰",
      questions: [
        {
          q: "How do I become an affiliate?",
          a: "Subscribe to NurGuard ($33/year), then go to your Affiliate Dashboard. Your referral code is generated automatically."
        },
        {
          q: "When can I start earning?",
          a: "Immediately after subscribing. You can start sharing your referral link right away."
        },
        {
          q: "How do I get my referral link?",
          a: "Go to your Affiliate Dashboard and copy your referral code or full link. Share it anywhere—email, social media, messaging apps, etc."
        },
        {
          q: "How much do I earn per referral?",
          a: "30% of every active referral's subscription, every year. At the current $33/year price, that's ~$9.90/year per referral."
        },
        {
          q: "Do I keep earning if my referral cancels?",
          a: "No. You only earn while they maintain an active subscription. If they cancel, earnings stop."
        },
        {
          q: "When do I get paid?",
          a: "Affiliate earnings are paid manually while we scale. Request a payout from your dashboard when you reach $10 minimum."
        },
        {
          q: "What payment methods do you accept?",
          a: "Bank transfer (ACH). We process payouts manually to keep things simple and transparent."
        },
        {
          q: "Is there a minimum payout amount?",
          a: "Yes, $10 minimum. Request a payout when you reach the threshold, and we'll process it within 5-7 business days."
        },
        {
          q: "Can I use my referral link on social media?",
          a: "Yes! Share on Instagram, TikTok, Twitter, email lists, Discord, Telegram—anywhere. We encourage it."
        },
        {
          q: "Are there any restrictions on who I can refer?",
          a: "No restrictions. Refer anyone you want. We only require that they use the referral link to subscribe."
        }
      ]
    },

    earnings: {
      title: "Earnings & Payouts",
      icon: "💳",
      questions: [
        {
          q: "Is the 30% commission guaranteed?",
          a: "Yes, 30% is guaranteed for all active referrals. We honor this for the lifetime of their subscription."
        },
        {
          q: "What if a customer refunds?",
          a: "If they request a refund within 30 days, the referral is cancelled and you don't earn commission for that month."
        },
        {
          q: "How often do you pay affiliates?",
          a: "Monthly. Payouts are processed on the 1st of each month for earnings from the previous month."
        },
        {
          q: "Are there any fees for payouts?",
          a: "No fees. We cover all payout costs. You get 100% of your available balance."
        },
        {
          q: "Can I see a breakdown of my earnings?",
          a: "Yes. Your dashboard shows total earned, available balance, conversion rate, and a list of all your referrals with their status."
        },
        {
          q: "What if I have a low conversion rate?",
          a: "That's normal. Share your link with people who are interested in digital protection. Quality over quantity."
        },
        {
          q: "Can I lose my earnings?",
          a: "No. Once a referral is marked as 'converted,' your earnings are locked in. You only lose earnings if they cancel."
        }
      ]
    },
    general: {
      title: "General",
      icon: "❓",
      questions: [
        {
          q: "How do I contact support?",
          a: "Email support@nurguard.app or use the contact form at /contact. We respond within 24 hours."
        },
        {
          q: "What if I have a question not answered here?",
          a: "Email support@nurguard.app with your question. We're happy to help!"
        },
        {
          q: "Can I change my payout method?",
          a: "Yes. Go to your dashboard and update your payout settings anytime."
        },
        {
          q: "How do I cancel my subscription?",
          a: "Go to your dashboard and click 'Cancel Subscription'. Your protection will end at the end of your billing period."
        }
      ]
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-lg text-muted-foreground">Find answers to common questions about NurGuard</p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {Object.entries(categories).map(([key, category]) => (
            <div key={key}>
              <button
                onClick={() => setExpandedCategory(expandedCategory === key ? null : key)}
                className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 rounded-lg transition"
              >
                <div className="flex items-center gap-3 text-left">
                  <span className="text-2xl">{category.icon}</span>
                  <h2 className="text-xl font-bold">{category.title}</h2>
                </div>
                <ChevronDown
                  className={`h-5 w-5 transition-transform ${expandedCategory === key ? "rotate-180" : ""}`}
                />
              </button>

              {expandedCategory === key && (
                <div className="space-y-3 mt-3">
                  {category.questions.map((item, idx) => (
                    <Card key={idx} className="p-4">
                      <p className="font-semibold mb-2">{item.q}</p>
                      <p className="text-muted-foreground">{item.a}</p>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="max-w-3xl mx-auto mt-12 p-6 bg-emerald-50 border border-emerald-200 rounded-lg text-center">
          <p className="mb-4">Still have questions?</p>
          <Link href="/contact">
            <Button className="bg-emerald-600 hover:bg-emerald-700">Contact Support</Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
