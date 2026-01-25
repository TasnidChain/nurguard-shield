import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function Terms() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <Navigation />

      <section className="container max-w-3xl mx-auto px-4 py-20">
        <h1 className="text-4xl font-bold text-white mb-12">Terms of Service</h1>

        <div className="space-y-8 text-slate-300">
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="pt-8">
              <h2 className="text-2xl font-bold text-white mb-4">Agreement</h2>
              <p>
                By using NurGuard, you agree to these terms. If you don't agree, please don't use the service.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="pt-8">
              <h2 className="text-2xl font-bold text-white mb-4">Use License</h2>
              <p className="mb-4">
                NurGuard grants you a personal, non-commercial license to use the app. You may not:
              </p>
              <ul className="space-y-2">
                <li>• Modify or copy the app</li>
                <li>• Use it for commercial purposes</li>
                <li>• Attempt to reverse-engineer or hack it</li>
                <li>• Remove any copyright or proprietary notices</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="pt-8">
              <h2 className="text-2xl font-bold text-white mb-4">Subscription</h2>
              <p className="mb-4">
                Your subscription is annual ($33/year). You can cancel anytime from your account settings. Cancellations take effect at the end of your current billing cycle.
              </p>
              <p>
                We offer a 30-day money-back guarantee. If you're not satisfied, request a refund within 30 days of purchase.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="pt-8">
              <h2 className="text-2xl font-bold text-white mb-4">Disclaimer</h2>
              <p className="mb-4">
                NurGuard provides DNS-based content filtering. While we work to block harmful content, no filter is 100% effective. We're not responsible for:
              </p>
              <ul className="space-y-2">
                <li>• Content that bypasses our filters</li>
                <li>• Misuse of the service</li>
                <li>• Loss of data or service interruptions</li>
                <li>• Third-party actions or content</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="pt-8">
              <h2 className="text-2xl font-bold text-white mb-4">Limitation of Liability</h2>
              <p>
                NurGuard is provided "as is." We're not liable for indirect, incidental, or consequential damages. Our total liability is limited to the amount you paid for the service.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="pt-8">
              <h2 className="text-2xl font-bold text-white mb-4">Changes to Terms</h2>
              <p>
                We may update these terms at any time. Continued use of NurGuard means you accept the updated terms.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="pt-8">
              <h2 className="text-2xl font-bold text-white mb-4">Contact</h2>
              <p>
                Questions about these terms? Contact us at support@nurguard.app
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
