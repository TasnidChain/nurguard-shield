import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, CheckCircle, Mail, Download, ArrowRight } from "lucide-react";
import { Link, useLocation } from "wouter";
import Navigation from "@/components/Navigation";

export default function CheckoutSuccess() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    // Auto-redirect to download after 5 seconds if user doesn't interact
    const timer = setTimeout(() => {
      // Don't auto-redirect, let user choose
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navigation />

      {/* SUCCESS HERO */}
      <section className="py-24 px-4 bg-gradient-to-b from-emerald-950/30 to-gray-950">
        <div className="max-w-3xl mx-auto text-center">
          <div className="mb-6 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-xl"></div>
              <CheckCircle className="w-20 h-20 text-emerald-500 relative" />
            </div>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Payment Successful.
          </h1>

          <p className="text-xl text-gray-300 mb-8">
            Your NurGuard Shield is now active. Let's get you protected.
          </p>

          {/* CONFIRMATION DETAILS */}
          <Card className="bg-gray-900 border-emerald-500/30 mb-12">
            <CardContent className="pt-8">
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-6 border-b border-gray-800">
                  <span className="text-gray-400">Status</span>
                  <span className="text-emerald-400 font-bold flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    Active
                  </span>
                </div>

                <div className="flex items-center justify-between pb-6 border-b border-gray-800">
                  <span className="text-gray-400">Price</span>
                  <span className="font-bold">$7.77/month</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Receipt</span>
                  <span className="text-gray-300">Sent to your email</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* NEXT STEPS */}
          <div className="space-y-4 mb-12">
            <h2 className="text-2xl font-bold mb-8">What's Next?</h2>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {/* Step 1 */}
              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="pt-8">
                  <div className="flex justify-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-emerald-600 flex items-center justify-center font-bold text-lg">
                      1
                    </div>
                  </div>
                  <h3 className="font-bold mb-2 text-center">Install the App</h3>
                  <p className="text-gray-400 text-sm text-center">
                    Get NurGuard on your phone in 30 seconds
                  </p>
                </CardContent>
              </Card>

              {/* Step 2 */}
              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="pt-8">
                  <div className="flex justify-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-emerald-600 flex items-center justify-center font-bold text-lg">
                      2
                    </div>
                  </div>
                  <h3 className="font-bold mb-2 text-center">Set Your Rules</h3>
                  <p className="text-gray-400 text-sm text-center">
                    Choose what to block and your protection level
                  </p>
                </CardContent>
              </Card>

              {/* Step 3 */}
              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="pt-8">
                  <div className="flex justify-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-emerald-600 flex items-center justify-center font-bold text-lg">
                      3
                    </div>
                  </div>
                  <h3 className="font-bold mb-2 text-center">Stay Protected</h3>
                  <p className="text-gray-400 text-sm text-center">
                    Enjoy a cleaner, more intentional digital life
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* PRIMARY CTA */}
            <Link href="/download">
              <Button
                size="lg"
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-6 text-lg w-full"
              >
                <Download className="w-5 h-5 mr-2" />
                Install NurGuard Now
              </Button>
            </Link>

            {/* SECONDARY CTA */}
            <Link href="/dashboard">
              <Button
                size="lg"
                variant="outline"
                className="w-full"
              >
                <ArrowRight className="w-5 h-5 mr-2" />
                Go to Dashboard
              </Button>
            </Link>
          </div>

          {/* EMAIL CONFIRMATION */}
          <Card className="bg-gray-900 border-gray-800 mb-12">
            <CardContent className="pt-8">
              <div className="flex items-start gap-4">
                <Mail className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-1" />
                <div className="text-left">
                  <h3 className="font-bold mb-2">Check Your Email</h3>
                  <p className="text-gray-400 text-sm">
                    We've sent a receipt and setup instructions to your email. If you don't see it, check your spam folder or <Link href="/contact"><span className="text-emerald-500 hover:text-emerald-400">contact us</span></Link>.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* SUBSCRIPTION INFO */}
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-8">
            <h3 className="font-bold mb-4">Your Subscription</h3>
            <div className="space-y-3 text-left text-gray-300 text-sm">
              <p>✓ Renews monthly on the same date</p>
              <p>✓ Cancel anytime with one click</p>
              <p>✓ 30-day money-back guarantee</p>
              <p>
                ✓ <Link href="/refund-policy"><span className="text-emerald-500 hover:text-emerald-400">View refund policy</span></Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SUPPORT */}
      <section className="py-16 px-4 bg-gray-950 border-t border-gray-800 text-center">
        <p className="text-gray-400 mb-4">
          Need help? <Link href="/contact"><span className="text-emerald-500 hover:text-emerald-400">Contact our support team</span></Link>
        </p>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 border-t border-gray-800 py-12 px-4 text-center text-gray-500 text-sm">
        <div className="max-w-4xl mx-auto">
          <p>© 2024 NurGuard. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
