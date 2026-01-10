import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import { Link } from "wouter";

export default function Terms() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navigation />

      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-12">Terms of Service</h1>

          <div className="space-y-8">
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="pt-8">
                <h2 className="text-2xl font-bold mb-4">Agreement</h2>
                <p className="text-gray-300">
                  By using NurGuard, you agree to these terms. If you don't agree, please don't use the service.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="pt-8">
                <h2 className="text-2xl font-bold mb-4">Use License</h2>
                <p className="text-gray-300 mb-4">
                  NurGuard grants you a personal, non-commercial license to use the app. You may not:
                </p>
                <ul className="space-y-2 text-gray-300">
                  <li>• Modify or copy the app</li>
                  <li>• Use it for commercial purposes</li>
                  <li>• Attempt to reverse-engineer or hack it</li>
                  <li>• Remove any copyright or proprietary notices</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="pt-8">
                <h2 className="text-2xl font-bold mb-4">Subscription</h2>
                <p className="text-gray-300 mb-4">
                  Your subscription renews monthly. You can cancel anytime from your account settings. Cancellations take effect at the end of your current billing cycle.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="pt-8">
                <h2 className="text-2xl font-bold mb-4">Disclaimer</h2>
                <p className="text-gray-300">
                  NurGuard is provided "as is" without warranties. We're not liable for any damages from using the app. NurGuard is a tool to help you build better habits—it's not a replacement for professional help if you're struggling with addiction.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="pt-8">
                <h2 className="text-2xl font-bold mb-4">Questions?</h2>
                <p className="text-gray-300">
                  <Link href="/contact"><span className="text-emerald-500 hover:text-emerald-400">Contact us</span></Link> with any questions about these terms.
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
