import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Lock, TrendingUp, Users, Heart, Zap, CheckCircle2, ArrowRight } from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  const { user, isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Shield className="w-8 h-8 text-emerald-600" />
            <span className="text-xl font-bold text-gray-900">NurGuard Shield</span>
          </div>
          {isAuthenticated ? (
            <Link href="/dashboard">
              <Button className="bg-emerald-600 hover:bg-emerald-700">Dashboard</Button>
            </Link>
          ) : null}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-50 to-teal-50 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full mb-6 text-sm font-semibold">
            ✨ Digital Wellness Protection
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Guard Your Digital <span className="text-emerald-600">Well-being</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Take control of your screen time. Block distracting content. Build healthier digital habits. 
            NurGuard Shield helps you stay focused and accountable.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/subscribe">
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white px-8">
                Start Protection for $7.77/mo <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/redeem">
              <Button size="lg" variant="outline" className="px-8">
                Have a Gift Code?
              </Button>
            </Link>
          </div>

          <p className="text-sm text-gray-500">
            ❤️ 20% of every subscription goes to Masajid Builder Foundation
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">What NurGuard Does</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition">
              <CardHeader>
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                  <Lock className="w-6 h-6 text-emerald-600" />
                </div>
                <CardTitle>Smart Content Blocking</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Block distracting websites, apps, and keywords. Choose from presets or customize your own protection rules.
                </p>
              </CardContent>
            </Card>

            {/* Feature 2 */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition">
              <CardHeader>
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-emerald-600" />
                </div>
                <CardTitle>Real-Time Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Track your screen time, compliance score, and daily streaks. See your progress at a glance.
                </p>
              </CardContent>
            </Card>

            {/* Feature 3 */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition">
              <CardHeader>
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-emerald-600" />
                </div>
                <CardTitle>Accountability Built-In</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Streaks motivate discipline. Violations reset your progress. Stay committed to your goals.
                </p>
              </CardContent>
            </Card>

            {/* Feature 4 */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition">
              <CardHeader>
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-emerald-600" />
                </div>
                <CardTitle>Earn by Referring</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Share your referral code. Earn $2.33 for every friend who subscribes. Unlimited earnings.
                </p>
              </CardContent>
            </Card>

            {/* Feature 5 */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition">
              <CardHeader>
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                  <Heart className="w-6 h-6 text-emerald-600" />
                </div>
                <CardTitle>Give Back</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Every subscription automatically donates to the Masajid Builder Foundation. Impact with every purchase.
                </p>
              </CardContent>
            </Card>

            {/* Feature 6 */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition">
              <CardHeader>
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-emerald-600" />
                </div>
                <CardTitle>Works Offline</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Install as a PWA. Full protection works even without internet. Protection never stops.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">How It Works</h2>
          
          <div className="space-y-8">
            {/* Step 1 */}
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-emerald-600 text-white font-bold">
                  1
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Choose Your Protection</h3>
                <p className="text-gray-600">
                  Select what you want to protect yourself from: social media, adult content, gaming, news doomscrolling, or create a custom setup.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-emerald-600 text-white font-bold">
                  2
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Activate Your Shield</h3>
                <p className="text-gray-600">
                  Blocking rules apply instantly. Your compliance score starts at 100. Your streak begins at Day 1.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-emerald-600 text-white font-bold">
                  3
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Stay Accountable</h3>
                <p className="text-gray-600">
                  Track your daily compliance. Build streaks. Every violation resets progress. Stay motivated.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-emerald-600 text-white font-bold">
                  4
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Share & Earn</h3>
                <p className="text-gray-600">
                  After your first 3-day streak, unlock your referral code. Earn $2.33 per referral. Build passive income.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h2>
          <p className="text-xl text-gray-600 mb-12">One plan. All features. No hidden fees.</p>

          <Card className="border-2 border-emerald-600 shadow-2xl">
            <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50">
              <CardTitle className="text-3xl text-emerald-600">$7.77/month</CardTitle>
              <CardDescription className="text-lg">Full Protection</CardDescription>
            </CardHeader>
            <CardContent className="pt-8">
              <ul className="space-y-4 mb-8 text-left">
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  <span className="text-gray-700">Unlimited content blocking rules</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  <span className="text-gray-700">Real-time analytics & compliance tracking</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  <span className="text-gray-700">Daily streak & accountability</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  <span className="text-gray-700">Referral program (30% commission)</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  <span className="text-gray-700">PWA with offline support</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  <span className="text-gray-700">20% goes to Masajid Builder Foundation</span>
                </li>
              </ul>

              <Link href="/subscribe">
                <Button size="lg" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
                  Start Your Free Trial
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-emerald-600 to-teal-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl font-bold mb-6">Ready to Take Control?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands protecting their digital well-being. Start your protection today.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/subscribe">
              <Button size="lg" className="bg-white text-emerald-600 hover:bg-gray-100 px-8">
                Start Protection for $7.77/mo
              </Button>
            </Link>
            <Link href="/redeem">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8">
                Redeem Gift Code
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-6 h-6 text-emerald-600" />
                <span className="font-bold text-white">NurGuard Shield</span>
              </div>
              <p className="text-sm">Digital wellness protection for healthier habits.</p>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Features</a></li>
                <li><a href="#" className="hover:text-white">Pricing</a></li>
                <li><a href="#" className="hover:text-white">How It Works</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Privacy</a></li>
                <li><a href="#" className="hover:text-white">Terms</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>&copy; 2024 NurGuard Shield. All rights reserved.</p>
            <p className="mt-2">❤️ 20% of every subscription goes to Masajid Builder Foundation</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
