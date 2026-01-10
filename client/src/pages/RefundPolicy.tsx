import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import { Link } from "wouter";

export default function RefundPolicy() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navigation />

      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-12">Refund Policy</h1>

          <div className="space-y-8">
            <Card className="bg-gray-900 border-emerald-500/30">
              <CardContent className="pt-8">
                <h2 className="text-2xl font-bold mb-4 text-emerald-400">30-Day Money-Back Guarantee</h2>
                <p className="text-gray-300 text-lg">
                  If NurGuard isn't right for you, we'll refund your money. No questions asked.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="pt-8">
                <h2 className="text-2xl font-bold mb-4">How to Request a Refund</h2>
                <ol className="space-y-3 text-gray-300">
                  <li>1. <Link href="/contact"><span className="text-emerald-500 hover:text-emerald-400">Contact us</span></Link> within 30 days of your purchase</li>
                  <li>2. Tell us why NurGuard isn't working for you</li>
                  <li>3. We'll process your refund within 5 business days</li>
                </ol>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="pt-8">
                <h2 className="text-2xl font-bold mb-4">Refund Timeline</h2>
                <ul className="space-y-3 text-gray-300">
                  <li>• <strong>Request window:</strong> Within 30 days of purchase</li>
                  <li>• <strong>Processing time:</strong> 5 business days</li>
                  <li>• <strong>Refund method:</strong> Same payment method used for purchase</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="pt-8">
                <h2 className="text-2xl font-bold mb-4">Subscription Cancellation</h2>
                <p className="text-gray-300 mb-4">
                  You can cancel your subscription anytime from your account settings. Your access continues until the end of your billing cycle.
                </p>
                <p className="text-gray-300">
                  If you cancel before the end of your billing cycle, you won't be charged again.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="pt-8">
                <h2 className="text-2xl font-bold mb-4">Questions?</h2>
                <p className="text-gray-300">
                  <Link href="/contact"><span className="text-emerald-500 hover:text-emerald-400">Contact our support team</span></Link> for any refund questions.
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
