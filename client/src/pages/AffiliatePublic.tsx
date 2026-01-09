import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { TrendingUp, Users, DollarSign, Shield } from "lucide-react";
import Navigation from "@/components/Navigation";

export default function AffiliatePublic() {
  const { user, isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white">
      <Navigation />

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl font-bold mb-6 leading-tight">
          Earn by Protecting Others
        </h1>
        <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
          Every person you refer earns you <span className="text-emerald-400 font-bold">$2.33/month</span> — recurring, forever.
        </p>
        <p className="text-slate-400 mb-12">
          That's 30% of every $7.77 subscription. No caps. No tricks.
        </p>
      </section>

      {/* Why Affiliate */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-12 text-center">Why Become an Affiliate?</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="bg-slate-800 border-emerald-500/30 p-8">
            <DollarSign className="w-12 h-12 text-emerald-400 mb-4" />
            <h3 className="text-xl font-bold mb-3">Recurring Income</h3>
            <p className="text-slate-300">
              Every referral pays you every month. Help someone once, earn forever.
            </p>
          </Card>

          <Card className="bg-slate-800 border-emerald-500/30 p-8">
            <Users className="w-12 h-12 text-emerald-400 mb-4" />
            <h3 className="text-xl font-bold mb-3">Unlimited Referrals</h3>
            <p className="text-slate-300">
              No cap on how many people you can refer. No limits on earnings.
            </p>
          </Card>

          <Card className="bg-slate-800 border-emerald-500/30 p-8">
            <Shield className="w-12 h-12 text-emerald-400 mb-4" />
            <h3 className="text-xl font-bold mb-3">Ethical Incentives</h3>
            <p className="text-slate-300">
              You're helping people protect themselves, not selling them hype.
            </p>
          </Card>

          <Card className="bg-slate-800 border-emerald-500/30 p-8">
            <TrendingUp className="w-12 h-12 text-emerald-400 mb-4" />
            <h3 className="text-xl font-bold mb-3">Easy Sharing</h3>
            <p className="text-slate-300">
              Get your unique referral link. Share it anywhere. Track earnings in real-time.
            </p>
          </Card>
        </div>
      </section>

      {/* Math Example */}
      <section className="max-w-6xl mx-auto px-4 py-16 bg-emerald-500/5 rounded-lg border border-emerald-500/20 my-12">
        <h2 className="text-3xl font-bold mb-12 text-center">Simple Math</h2>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold text-emerald-400 mb-2">10 referrals</div>
            <div className="text-slate-300">$23.30/month</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-emerald-400 mb-2">100 referrals</div>
            <div className="text-slate-300">$233/month</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-emerald-400 mb-2">1,000 referrals</div>
            <div className="text-slate-300">$2,330/month</div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-12 text-center">How It Works</h2>
        <div className="space-y-8">
          <div className="flex gap-6">
            <div className="text-emerald-400 text-2xl font-bold flex-shrink-0">1</div>
            <div>
              <h3 className="text-xl font-bold mb-2">Get Your Link</h3>
              <p className="text-slate-300">Sign up for NurGuard. Get your unique referral code instantly.</p>
            </div>
          </div>
          <div className="flex gap-6">
            <div className="text-emerald-400 text-2xl font-bold flex-shrink-0">2</div>
            <div>
              <h3 className="text-xl font-bold mb-2">Share It</h3>
              <p className="text-slate-300">Text it, email it, post it. Tell people about NurGuard.</p>
            </div>
          </div>
          <div className="flex gap-6">
            <div className="text-emerald-400 text-2xl font-bold flex-shrink-0">3</div>
            <div>
              <h3 className="text-xl font-bold mb-2">They Subscribe</h3>
              <p className="text-slate-300">They use your link, pay $7.77/month, and you earn $2.33/month.</p>
            </div>
          </div>
          <div className="flex gap-6">
            <div className="text-emerald-400 text-2xl font-bold flex-shrink-0">4</div>
            <div>
              <h3 className="text-xl font-bold mb-2">Earn Forever</h3>
              <p className="text-slate-300">As long as they stay subscribed, you keep earning. Every month.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Who Should Affiliate */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Who Should Become an Affiliate?</h2>
        <div className="bg-slate-800 border border-emerald-500/30 rounded-lg p-8">
          <ul className="space-y-4 text-slate-300">
            <li className="flex gap-3">
              <span className="text-emerald-400 font-bold">✓</span>
              <span>Anyone who believes in digital protection</span>
            </li>
            <li className="flex gap-3">
              <span className="text-emerald-400 font-bold">✓</span>
              <span>Parents, teachers, community leaders</span>
            </li>
            <li className="flex gap-3">
              <span className="text-emerald-400 font-bold">✓</span>
              <span>People with an audience (social media, email list, community)</span>
            </li>
            <li className="flex gap-3">
              <span className="text-emerald-400 font-bold">✓</span>
              <span>Anyone who wants ethical, recurring income</span>
            </li>
            <li className="flex gap-3">
              <span className="text-emerald-400 font-bold">✓</span>
              <span>People building a movement, not a quick buck</span>
            </li>
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to Earn?</h2>
        <p className="text-slate-300 mb-8">Join the affiliate program. Start protecting people. Start earning.</p>
        {isAuthenticated ? (
          <Button className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-6 text-lg">
            Go to Affiliate Dashboard
          </Button>
        ) : (
          <Button className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-6 text-lg">
            Sign Up & Start Earning
          </Button>
        )}
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-700 py-8 text-center text-slate-400">
        <p>Questions? Email us at support@nurguard.app</p>
      </footer>
    </div>
  );
}
