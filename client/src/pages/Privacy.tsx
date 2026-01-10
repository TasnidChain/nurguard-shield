import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import { Link } from "wouter";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navigation />

      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-12">Privacy Policy</h1>

          <div className="space-y-8">
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="pt-8">
                <h2 className="text-2xl font-bold mb-4">Your Privacy Matters</h2>
                <p className="text-gray-300 mb-4">
                  NurGuard is designed with privacy-first principles. We collect minimal data and never sell your information.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="pt-8">
                <h2 className="text-2xl font-bold mb-4">What We Collect</h2>
                <ul className="space-y-3 text-gray-300">
                  <li>• Email address (for account and billing)</li>
                  <li>• Blocking rules you create (stored locally on your device)</li>
                  <li>• Usage analytics (anonymized, no personal data)</li>
                  <li>• Payment information (processed by Lemon Squeezy, not stored by us)</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="pt-8">
                <h2 className="text-2xl font-bold mb-4">What We Don't Do</h2>
                <ul className="space-y-3 text-gray-300">
                  <li>✗ We don't read your messages or emails</li>
                  <li>✗ We don't track your browsing history</li>
                  <li>✗ We don't sell your data to third parties</li>
                  <li>✗ We don't share data with advertisers</li>
                  <li>✗ We don't use your data for targeted ads</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="pt-8">
                <h2 className="text-2xl font-bold mb-4">Data Storage</h2>
                <p className="text-gray-300 mb-4">
                  Most of your blocking rules are stored locally on your device. We only store your account information and subscription status on our servers.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="pt-8">
                <h2 className="text-2xl font-bold mb-4">Questions?</h2>
                <p className="text-gray-300">
                  <Link href="/contact"><span className="text-emerald-500 hover:text-emerald-400">Contact us</span></Link> with any privacy concerns.
                </p>
              </CardContent>
            </Card>

            <p className="text-gray-500 text-sm">Last updated: January 2024</p>
          </div>
        </div>
      </section>
    </div>
  );
}
