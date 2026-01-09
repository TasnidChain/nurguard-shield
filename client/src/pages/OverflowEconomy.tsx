import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";

export default function OverflowEconomy() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Navigation */}
      <nav className="border-b border-emerald-500/20 sticky top-0 z-50 bg-slate-900/80 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-emerald-400">NurGuard</div>
          <Button className="bg-emerald-500 hover:bg-emerald-600">Back Home</Button>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <h1 className="text-5xl font-bold mb-6">NurGuard Is Not Static Pricing</h1>
        <p className="text-2xl text-emerald-400 mb-6">It's a Living Protection System</p>
        <p className="text-xl text-slate-300 max-w-3xl">
          NurGuard grows in phases. As more people are protected, the system expands, prices adjust, and impact increases — for users, affiliates, and masajid.
        </p>
      </section>

      {/* Why Overflow */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8">Why Overflow Exists</h2>
        <div className="space-y-6 text-slate-300">
          <p>
            <span className="text-emerald-400 font-bold">Cheap forever is not sustainable.</span> Extractive tech is not halal.
          </p>
          <p>
            Most apps do one of two things:
          </p>
          <ul className="space-y-3 ml-6">
            <li>❌ Stay cheap and die</li>
            <li>❌ Get expensive and extract value</li>
          </ul>
          <p>
            <span className="text-emerald-400 font-bold">NurGuard does neither.</span>
          </p>
          <p className="text-lg mt-8">
            Instead, it runs on an <span className="text-emerald-400 font-bold">overflow model</span>:
          </p>
          <p className="text-lg italic">
            As protection spreads, value overflows outward — to users, affiliates, and masajid.
          </p>
          <p className="mt-8">
            Price increases are not punishment. <span className="text-emerald-400 font-bold">They are proof of growth.</span>
          </p>
        </div>
      </section>

      {/* The Mission */}
      <section className="max-w-6xl mx-auto px-4 py-16 bg-emerald-500/5 rounded-lg border border-emerald-500/20 my-12 p-8">
        <h2 className="text-3xl font-bold mb-8">The Masajid Builder Goal (Non-Negotiable)</h2>
        <div className="space-y-6 text-slate-300">
          <p className="text-2xl font-bold text-emerald-400">
            A masjid within 15 minutes of every Muslim worldwide.
          </p>
          <p>Not someday. Not symbolically. Physically.</p>
          <p>That means:</p>
          <ul className="space-y-2 ml-6">
            <li>• Land acquisition</li>
            <li>• Construction</li>
            <li>• Utilities & maintenance</li>
            <li>• Community building</li>
          </ul>
          <p className="mt-8">
            This requires consistent, scalable funding — not donations that spike and disappear.
          </p>
          <p className="text-lg font-bold text-emerald-400">
            NurGuard is designed to be a perpetual engine for that goal.
          </p>
        </div>
      </section>

      {/* Pricing Phases */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8">Pricing Phases</h2>
        <p className="text-slate-300 mb-12">
          NurGuard pricing increases as adoption grows. Everyone pays the current phase price. What changes is your earning capacity, not your status.
        </p>

        <div className="space-y-6">
          {/* Phase 1 */}
          <Card className="bg-slate-800 border-emerald-500/30 p-8">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-2xl font-bold text-emerald-400">Phase 1: Founding Phase</h3>
                <p className="text-slate-300 mt-2">Current Phase</p>
              </div>
              <div className="text-right">
                <div className="text-4xl font-bold">$7.77</div>
                <div className="text-slate-400">/month</div>
              </div>
            </div>
            <p className="text-slate-300 mb-4">User Cap: 333 total users</p>
            <p className="text-slate-300">
              This phase exists to seed the system, reward first movers, and prove demand. Once 333 users join, Phase 1 closes permanently.
            </p>
          </Card>

          {/* Phase 2 */}
          <Card className="bg-slate-800 border-slate-600/30 p-8 opacity-75">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-2xl font-bold text-slate-300">Phase 2: Growth Phase</h3>
                <p className="text-slate-400 mt-2">Activates at 33,333 users</p>
              </div>
              <div className="text-right">
                <div className="text-4xl font-bold text-slate-300">$11.11</div>
                <div className="text-slate-400">/month</div>
              </div>
            </div>
            <p className="text-slate-400 mb-4">⚠️ All users — including those at $7.77 — now pay $11.11/month.</p>
            <p className="text-slate-400">
              This is a shared system, not a speculative asset.
            </p>
          </Card>

          {/* Phase 3 */}
          <Card className="bg-slate-800 border-slate-600/30 p-8 opacity-75">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-2xl font-bold text-slate-300">Phase 3: Scale Phase</h3>
                <p className="text-slate-400 mt-2">Activates at 333,333 users</p>
              </div>
              <div className="text-right">
                <div className="text-4xl font-bold text-slate-300">$33.33</div>
                <div className="text-slate-400">/month</div>
              </div>
            </div>
          </Card>

          {/* Phase 4 */}
          <Card className="bg-slate-800 border-slate-600/30 p-8 opacity-75">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-2xl font-bold text-slate-300">Phase 4: Global Phase</h3>
                <p className="text-slate-400 mt-2">Activates at 3.3 million users</p>
              </div>
              <div className="text-right">
                <div className="text-4xl font-bold text-slate-300">$44.44</div>
                <div className="text-slate-400">/month</div>
              </div>
            </div>
          </Card>
        </div>

        <div className="mt-12 p-8 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
          <p className="text-lg text-emerald-400 font-bold">
            Your price is locked when you join.
          </p>
          <p className="text-slate-300 mt-4">
            But as the system grows, your affiliate earning capacity expands. Early believers gain greater leverage.
          </p>
        </div>
      </section>

      {/* Affiliate Expansion */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8">Affiliate Expansion by Phase</h2>
        <p className="text-slate-300 mb-8">
          Your earning capacity increases as the system grows. Early builders gain greater reach.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-emerald-500/30">
                <th className="py-4 px-4 text-emerald-400 font-bold">Phase</th>
                <th className="py-4 px-4 text-emerald-400 font-bold">Monthly Price</th>
                <th className="py-4 px-4 text-emerald-400 font-bold">Affiliate Circle Cap</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-700">
                <td className="py-4 px-4">Phase 1</td>
                <td className="py-4 px-4">$7.77</td>
                <td className="py-4 px-4">333 people</td>
              </tr>
              <tr className="border-b border-slate-700">
                <td className="py-4 px-4">Phase 2</td>
                <td className="py-4 px-4">$11.11</td>
                <td className="py-4 px-4">777 people</td>
              </tr>
              <tr className="border-b border-slate-700">
                <td className="py-4 px-4">Phase 3</td>
                <td className="py-4 px-4">$33.33</td>
                <td className="py-4 px-4">1,111 people</td>
              </tr>
              <tr>
                <td className="py-4 px-4">Phase 4</td>
                <td className="py-4 px-4">$44.44</td>
                <td className="py-4 px-4">2,222 people</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-slate-300 mt-8">
          As the system grows, your ability to protect and benefit others grows with it.
        </p>
      </section>

      {/* Where Money Goes */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8">Where the Money Goes</h2>
        <p className="text-slate-300 mb-12">
          Every subscription supports four flows:
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="bg-slate-800 border-emerald-500/30 p-8">
            <h3 className="text-xl font-bold text-emerald-400 mb-4">Protection Infrastructure</h3>
            <ul className="space-y-2 text-slate-300">
              <li>• Servers & security</li>
              <li>• Blocking systems</li>
              <li>• App development</li>
              <li>• Security updates</li>
            </ul>
          </Card>

          <Card className="bg-slate-800 border-emerald-500/30 p-8">
            <h3 className="text-xl font-bold text-emerald-400 mb-4">Affiliate Distribution</h3>
            <ul className="space-y-2 text-slate-300">
              <li>• 30% recurring commissions</li>
              <li>• Ethical incentives</li>
              <li>• No hype funnels</li>
            </ul>
          </Card>

          <Card className="bg-slate-800 border-emerald-500/30 p-8">
            <h3 className="text-xl font-bold text-emerald-400 mb-4">Masajid Builder Foundation</h3>
            <ul className="space-y-2 text-slate-300">
              <li>• Land acquisition</li>
              <li>• Masjid construction</li>
              <li>• Community hubs</li>
            </ul>
          </Card>

          <Card className="bg-slate-800 border-emerald-500/30 p-8">
            <h3 className="text-xl font-bold text-emerald-400 mb-4">System Expansion</h3>
            <ul className="space-y-2 text-slate-300">
              <li>• Scaling capacity</li>
              <li>• Regional deployment</li>
              <li>• Long-term sustainability</li>
            </ul>
          </Card>
        </div>

        <div className="mt-12 p-8 bg-slate-800 border border-slate-600 rounded-lg">
          <p className="text-slate-300">
            No VC extraction. No ad-selling. No data harvesting.
          </p>
        </div>
      </section>

      {/* What This Is */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8">What This Is (And Is Not)</h2>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-bold text-emerald-400 mb-6">This IS:</h3>
            <ul className="space-y-3 text-slate-300">
              <li className="flex gap-3">
                <span className="text-emerald-400">✓</span>
                <span>A protection system</span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-400">✓</span>
                <span>A distribution engine</span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-400">✓</span>
                <span>A masjid funding loop</span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-400">✓</span>
                <span>A long-term mission</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold text-red-400 mb-6">This is NOT:</h3>
            <ul className="space-y-3 text-slate-300">
              <li className="flex gap-3">
                <span className="text-red-400">✗</span>
                <span>A get-rich-quick scheme</span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-400">✗</span>
                <span>A price-lock promise</span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-400">✗</span>
                <span>A speculative token</span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-400">✗</span>
                <span>A donation pitch disguised as SaaS</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="max-w-6xl mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl font-bold mb-6">Join the System</h2>
        <p className="text-xl text-slate-300 mb-8">
          You're not just paying for an app. You're funding digital protection, ethical income, physical masajid, and global access to worship.
        </p>
        <Button className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-6 text-lg">
          Activate NurGuard
        </Button>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-700 py-8 text-center text-slate-400">
        <p>Questions? Email us at support@nurguard.app</p>
      </footer>
    </div>
  );
}
