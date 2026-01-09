import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Shield, Zap, Users, Lock, Globe } from "lucide-react";

export default function VisionPage() {
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
        <h1 className="text-5xl font-bold mb-6">NurGuard: From Shield to Civilization</h1>
        <p className="text-2xl text-emerald-400 mb-8">The Architecture of Protection</p>
        <div className="space-y-6 text-lg text-slate-300">
          <p>
            <span className="text-emerald-400 font-bold">NurGuard is not an app.</span> It is a protection system.
          </p>
          <p>
            Built for believers navigating a world that is loud, addictive, invasive, and spiritually corrosive.
          </p>
          <p>
            NurGuard exists to guard what matters before it is damaged.
          </p>
          <p className="text-xl italic text-emerald-300">
            If Islam had a default operating system for the modern world, NurGuard would be the firewall.
          </p>
        </div>
      </section>

      {/* Core Identity */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8">What NurGuard Actually Is</h2>
        <p className="text-slate-300 mb-8">
          NurGuard is the first layer of the Rizq Labs ecosystem — the shield you put on before entering the rest of the civilization.
        </p>
        <p className="text-slate-300 mb-8">
          It is designed to guard:
        </p>
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="flex gap-3">
            <span className="text-emerald-400 text-2xl">•</span>
            <span className="text-slate-300">Habits</span>
          </div>
          <div className="flex gap-3">
            <span className="text-emerald-400 text-2xl">•</span>
            <span className="text-slate-300">Eyes & mind</span>
          </div>
          <div className="flex gap-3">
            <span className="text-emerald-400 text-2xl">•</span>
            <span className="text-slate-300">Time</span>
          </div>
          <div className="flex gap-3">
            <span className="text-emerald-400 text-2xl">•</span>
            <span className="text-slate-300">Wealth</span>
          </div>
          <div className="flex gap-3">
            <span className="text-emerald-400 text-2xl">•</span>
            <span className="text-slate-300">Data</span>
          </div>
          <div className="flex gap-3">
            <span className="text-emerald-400 text-2xl">•</span>
            <span className="text-slate-300">Identity</span>
          </div>
          <div className="flex gap-3">
            <span className="text-emerald-400 text-2xl">•</span>
            <span className="text-slate-300">Mission</span>
          </div>
        </div>

        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-8">
          <p className="text-xl text-emerald-400 font-bold">
            NurGuard = Digital Iman + Discipline + Security Infrastructure
          </p>
          <p className="text-slate-300 mt-4">
            Not motivation. Not guilt. Not surveillance. Protection.
          </p>
        </div>
      </section>

      {/* The Phases */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8">The Phased System</h2>
        <p className="text-slate-300 mb-12">
          NurGuard is intentionally built in phases. Each phase solves a real problem, creates real value, and unlocks the next layer — without overwhelming users or betraying trust.
        </p>

        {/* Phase 1 */}
        <Card className="bg-slate-800 border-emerald-500/30 p-8 mb-6">
          <div className="flex gap-4 mb-4">
            <Shield className="w-8 h-8 text-emerald-400 flex-shrink-0" />
            <h3 className="text-2xl font-bold">Phase 1: NurGuard Shield</h3>
          </div>
          <p className="text-slate-400 mb-4">Launch Phase</p>
          <p className="text-slate-300 mb-6">
            Simple. Powerful. Viral.
          </p>
          <div className="space-y-3 text-slate-300 mb-6">
            <p className="font-bold text-emerald-400">What It Does:</p>
            <ul className="space-y-2 ml-6">
              <li>🚫 Blocks haram & explicit content</li>
              <li>📵 Controls apps, sites, and time sinks</li>
              <li>🧠 Interrupts destructive habits</li>
              <li>🕰️ Protects time and attention</li>
              <li>🔒 Adds an accountability layer</li>
            </ul>
          </div>
          <p className="text-slate-300">
            <span className="text-emerald-400 font-bold">Outcome:</span> Immediate value. Easy onboarding. Subscription-based. Mass Ummah adoption.
          </p>
        </Card>

        {/* Phase 2 */}
        <Card className="bg-slate-800 border-slate-600/30 p-8 mb-6 opacity-75">
          <div className="flex gap-4 mb-4">
            <Zap className="w-8 h-8 text-slate-400 flex-shrink-0" />
            <h3 className="text-2xl font-bold text-slate-300">Phase 2: Habits & Systems</h3>
          </div>
          <p className="text-slate-400 mb-4">Building Good, Not Just Blocking Evil</p>
          <p className="text-slate-300 mb-6">
            Once protection is established, NurGuard evolves. From blocking → building.
          </p>
          <div className="space-y-3 text-slate-300 mb-6">
            <p className="font-bold text-slate-300">What Unlocks:</p>
            <ul className="space-y-2 ml-6">
              <li>📿 Salah tracking (without shame)</li>
              <li>📖 Qur'an & dhikr routines</li>
              <li>🧱 Streaks, discipline, structure</li>
              <li>🎯 Personal improvement systems</li>
              <li>🧭 Direction — not guilt</li>
            </ul>
          </div>
        </Card>

        {/* Phase 3 */}
        <Card className="bg-slate-800 border-slate-600/30 p-8 mb-6 opacity-75">
          <div className="flex gap-4 mb-4">
            <Users className="w-8 h-8 text-slate-400 flex-shrink-0" />
            <h3 className="text-2xl font-bold text-slate-300">Phase 3: Missions</h3>
          </div>
          <p className="text-slate-400 mb-4">From Self → Service</p>
          <p className="text-slate-300 mb-6">
            Users are no longer passive. They become operators.
          </p>
          <div className="space-y-3 text-slate-300 mb-6">
            <p className="font-bold text-slate-300">What Missions Are:</p>
            <ul className="space-y-2 ml-6">
              <li>Real-world righteous actions</li>
              <li>Digital + physical da'wah</li>
              <li>Skill-building</li>
              <li>Halal income pathways</li>
              <li>Serving masajid & communities</li>
            </ul>
          </div>
        </Card>

        {/* Phase 4 */}
        <Card className="bg-slate-800 border-slate-600/30 p-8 mb-6 opacity-75">
          <div className="flex gap-4 mb-4">
            <Lock className="w-8 h-8 text-slate-400 flex-shrink-0" />
            <h3 className="text-2xl font-bold text-slate-300">Phase 4: Security</h3>
          </div>
          <p className="text-slate-400 mb-4">Elite Infrastructure Layer</p>
          <p className="text-slate-300 mb-6">
            NurGuard becomes serious infrastructure.
          </p>
          <div className="space-y-3 text-slate-300 mb-6">
            <p className="font-bold text-slate-300">What It Expands Into:</p>
            <ul className="space-y-2 ml-6">
              <li>🔑 Password & credential vaults</li>
              <li>🧾 Identity protection</li>
              <li>💳 Financial security</li>
              <li>🧠 AI threat monitoring</li>
              <li>🕵️ Digital risk prevention</li>
              <li>🔐 Private communications</li>
            </ul>
          </div>
        </Card>

        {/* Phase 5 */}
        <Card className="bg-slate-800 border-slate-600/30 p-8 opacity-75">
          <div className="flex gap-4 mb-4">
            <Globe className="w-8 h-8 text-slate-400 flex-shrink-0" />
            <h3 className="text-2xl font-bold text-slate-300">Phase 5: Civilization Layer</h3>
          </div>
          <p className="text-slate-400 mb-4">Standard for the Ummah</p>
          <p className="text-slate-300 mb-6">
            NurGuard is no longer "an app". It becomes the entry gate to Rizq Labs.
          </p>
          <div className="space-y-3 text-slate-300">
            <p className="font-bold text-slate-300">Integrations:</p>
            <ul className="space-y-2 ml-6">
              <li>Masajid Builder</li>
              <li>Rizq OS</li>
              <li>Halal App Store</li>
              <li>Devices (phone, laptop, pad)</li>
              <li>Cities, schools, and economies</li>
            </ul>
          </div>
        </Card>
      </section>

      {/* Simple Model */}
      <section className="max-w-6xl mx-auto px-4 py-16 bg-emerald-500/5 rounded-lg border border-emerald-500/20 p-8">
        <h2 className="text-3xl font-bold mb-8 text-center">Remember It Like This</h2>
        <div className="text-center">
          <p className="text-2xl font-bold text-emerald-400 mb-8">
            Shield → Habits → Missions → Security → Civilization
          </p>
          <p className="text-slate-300 mb-8">Or even simpler:</p>
          <div className="grid md:grid-cols-5 gap-4">
            <div className="bg-slate-800 rounded-lg p-4">
              <div className="text-emerald-400 font-bold text-lg">1</div>
              <div className="text-slate-300">Protect</div>
            </div>
            <div className="bg-slate-800 rounded-lg p-4">
              <div className="text-emerald-400 font-bold text-lg">2</div>
              <div className="text-slate-300">Build</div>
            </div>
            <div className="bg-slate-800 rounded-lg p-4">
              <div className="text-emerald-400 font-bold text-lg">3</div>
              <div className="text-slate-300">Serve</div>
            </div>
            <div className="bg-slate-800 rounded-lg p-4">
              <div className="text-emerald-400 font-bold text-lg">4</div>
              <div className="text-slate-300">Secure</div>
            </div>
            <div className="bg-slate-800 rounded-lg p-4">
              <div className="text-emerald-400 font-bold text-lg">5</div>
              <div className="text-slate-300">Scale</div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8 text-center">What NurGuard Is Designed To Be</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-8">
            <p className="text-emerald-400 font-bold mb-4">✓ Simple at first</p>
            <p className="text-emerald-400 font-bold mb-4">✓ Deep over time</p>
            <p className="text-emerald-400 font-bold">✓ Massive in destiny</p>
          </div>
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-8">
            <p className="text-red-400 font-bold mb-4">✗ No hype</p>
            <p className="text-red-400 font-bold mb-4">✗ No shortcuts</p>
            <p className="text-red-400 font-bold">✗ No extraction</p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-xl text-slate-300">
            <span className="text-emerald-400 font-bold">Just protection — done properly.</span>
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="max-w-6xl mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl font-bold mb-6">Start With the Shield</h2>
        <p className="text-xl text-slate-300 mb-8">
          Everything else comes after.
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
