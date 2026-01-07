import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Clock, BarChart3, Users, Heart, Gift, Check, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { getLoginUrl } from "@/const";

export default function Home() {
  const { user, isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-8 w-8 text-primary" />
            <span className="font-bold text-xl">NurGuard Shield</span>
          </div>
          <nav className="flex items-center gap-4">
            {isAuthenticated ? (
              <Link href="/dashboard">
                <Button>Dashboard</Button>
              </Link>
            ) : (
              <>
                <a href={getLoginUrl()}>
                  <Button variant="ghost">Sign In</Button>
                </a>
                <Link href="/subscribe">
                  <Button>Get Started</Button>
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="container text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Shield className="h-4 w-4" />
            Digital Wellness Protection
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Guard Your Digital<br />
            <span className="text-primary">Well-being</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            NurGuard Shield helps you take control of your screen time, block distracting content, and build healthier digital habits.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/subscribe">
              <Button size="lg" className="gap-2">
                Start Protection for $7.77/mo <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            {!isAuthenticated && (
              <a href={getLoginUrl()}>
                <Button size="lg" variant="outline">Sign In</Button>
              </a>
            )}
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            <Heart className="h-4 w-4 inline mr-1 text-primary" />
            20% of every subscription goes to Masajid Builder Foundation
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 bg-muted/50">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">What NurGuard Does</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={<Shield className="h-8 w-8" />}
              title="Content Blocking"
              description="Block distracting websites, apps, and content categories with customizable rules and schedules."
            />
            <FeatureCard
              icon={<Clock className="h-8 w-8" />}
              title="Time Limits"
              description="Set daily time limits for specific apps and websites. Get reminders when you're approaching your limit."
            />
            <FeatureCard
              icon={<BarChart3 className="h-8 w-8" />}
              title="Usage Analytics"
              description="Track your screen time, see usage patterns, and monitor your compliance score over time."
            />
            <FeatureCard
              icon={<Users className="h-8 w-8" />}
              title="Affiliate Program"
              description="Earn 30% commission for every subscription you refer. Help others while earning."
            />
            <FeatureCard
              icon={<Heart className="h-8 w-8" />}
              title="Give Back"
              description="20% of every subscription is donated to Masajid Builder Foundation to build mosques worldwide."
            />
            <FeatureCard
              icon={<Gift className="h-8 w-8" />}
              title="Gift Subscriptions"
              description="Purchase gift codes for friends and family. Help them protect their digital wellness."
            />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-4">Simple, Transparent Pricing</h2>
          <p className="text-center text-muted-foreground mb-12">One plan, all features, meaningful impact.</p>
          
          <Card className="max-w-md mx-auto border-primary">
            <CardHeader className="text-center pb-2">
              <div className="inline-block bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full mb-4">
                Most Popular
              </div>
              <CardTitle className="text-2xl">NurGuard Shield</CardTitle>
              <div className="mt-4">
                <span className="text-5xl font-bold">$7.77</span>
                <span className="text-muted-foreground">/month</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 mb-6">
                {[
                  "Unlimited blocking rules",
                  "App & website time limits",
                  "Usage analytics dashboard",
                  "AI content categorization",
                  "Habit tracking & streaks",
                  "PWA mobile app",
                  "30% affiliate commissions",
                  "Gift subscriptions",
                ].map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <p className="text-sm text-center text-muted-foreground mb-4">
                <Heart className="h-4 w-4 inline mr-1 text-primary" />
                20% ($1.55) goes to Masajid Builder Foundation
              </p>
              <Link href="/subscribe">
                <Button className="w-full" size="lg">
                  Get Started <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t">
        <div className="container text-center text-sm text-muted-foreground">
          <p>© 2026 NurGuard Shield. All rights reserved.</p>
          <p className="mt-2">No ads. No algorithms. No surprise billing.</p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <Card>
      <CardHeader>
        <div className="text-primary mb-2">{icon}</div>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{description}</CardDescription>
      </CardContent>
    </Card>
  );
}
