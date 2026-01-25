import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <Navigation />

      <section className="container max-w-3xl mx-auto px-4 py-20">
        <h1 className="text-4xl font-bold text-white mb-12">Privacy Policy</h1>

        <div className="space-y-8 text-slate-300">
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="pt-8">
              <h2 className="text-2xl font-bold text-white mb-4">Your Privacy Matters</h2>
              <p>
                NurGuard is designed with privacy-first principles. We collect minimal data and never sell your information.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="pt-8">
              <h2 className="text-2xl font-bold text-white mb-4">What We Collect</h2>
              <ul className="space-y-3">
                <li>• Email address (for account and billing)</li>
                <li>• Blocking rules you create (stored locally on your device)</li>
                <li>• Usage analytics (anonymized, no personal data)</li>
                <li>• Payment information (processed by Lemon Squeezy, not stored by us)</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="pt-8">
              <h2 className="text-2xl font-bold text-white mb-4">What We Don't Do</h2>
              <ul className="space-y-3">
                <li>✗ We don't read your messages or emails</li>
                <li>✗ We don't track your browsing history</li>
                <li>✗ We don't sell your data to third parties</li>
                <li>✗ We don't share data with advertisers</li>
                <li>✗ We don't use your data for targeted ads</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="pt-8">
              <h2 className="text-2xl font-bold text-white mb-4">DNS Filtering</h2>
              <p>
                NurGuard uses DNS filtering to block harmful domains. DNS requests are encrypted and routed through our secure servers. We don't log or store your browsing data.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="pt-8">
              <h2 className="text-2xl font-bold text-white mb-4">Third-Party Services</h2>
              <p className="mb-4">
                NurGuard uses the following third-party services:
              </p>
              <ul className="space-y-2">
                <li>• <strong>Lemon Squeezy</strong> - Payment processing (they handle your payment info)</li>
                <li>• <strong>NextDNS</strong> - DNS filtering infrastructure</li>
              </ul>
              <p className="mt-4">
                These services have their own privacy policies. We recommend reviewing them.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="pt-8">
              <h2 className="text-2xl font-bold text-white mb-4">Your Rights</h2>
              <p className="mb-4">
                You have the right to:
              </p>
              <ul className="space-y-2">
                <li>• Access your data</li>
                <li>• Delete your account and data</li>
                <li>• Opt out of analytics</li>
                <li>• Request a copy of your data</li>
              </ul>
              <p className="mt-4">
                Contact us at support@nurguard.app to exercise these rights.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="pt-8">
              <h2 className="text-2xl font-bold text-white mb-4">Changes to This Policy</h2>
              <p>
                We may update this privacy policy at any time. We'll notify you of significant changes via email.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="pt-8">
              <h2 className="text-2xl font-bold text-white mb-4">Contact</h2>
              <p>
                Questions about our privacy practices? Contact us at support@nurguard.app
              </p>
            </CardContent>
          </Card>

          <p className="text-slate-400 text-sm pt-8 border-t border-slate-700">
            Last updated: January 2026
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
