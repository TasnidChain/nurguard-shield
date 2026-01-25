import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { trpc } from "@/lib/trpc";
import { Shield, Check, Heart, ArrowRight, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useLocation, useSearch } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

export default function Subscribe() {
  const { user, isAuthenticated } = useAuth();
  const search = useSearch();
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState("");
  const [affiliateCode, setAffiliateCode] = useState("");
  
  // Get affiliate code from URL if present
  useEffect(() => {
    const params = new URLSearchParams(search);
    const ref = params.get("ref");
    if (ref) setAffiliateCode(ref);
  }, [search]);

  const { data: subscription } = trpc.subscription.getStatus.useQuery(undefined, {
    enabled: isAuthenticated,
  });

  const { data: affiliateValid } = trpc.affiliate.validateCode.useQuery(
    { code: affiliateCode },
    { enabled: affiliateCode.length >= 4 }
  );

  const checkoutMutation = trpc.subscription.getCheckoutUrl.useMutation({
    onSuccess: (data) => {
      if (data?.url) {
        window.location.href = data.url;
      } else {
        toast.error("Failed to get checkout URL");
      }
    },
    onError: (error) => {
      toast.error(error.message || "Checkout failed");
    },
  });

  const handleCheckout = () => {
    if (!email && !isAuthenticated) {
      toast.error("Please enter your email");
      return;
    }
    checkoutMutation.mutate({ 
      affiliateCode: affiliateCode || undefined,
      email: email || user?.email || undefined
    });
  };

  // Already subscribed
  if (subscription?.isActive) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="container py-16 text-center">
          <div className="max-w-md mx-auto">
            <div className="bg-primary/10 rounded-full p-4 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
              <Check className="h-10 w-10 text-primary" />
            </div>
            <h1 className="text-2xl font-bold mb-4">You're Already Protected!</h1>
            <p className="text-muted-foreground mb-6">
              Your NurGuard Shield subscription is active until{" "}
              {subscription.endsAt ? new Date(subscription.endsAt).toLocaleDateString() : "forever"}.
            </p>
            <Link href="/dashboard">
              <Button size="lg">Go to Dashboard</Button>
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container py-12">
        <div className="max-w-2xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Guard Your Nūr for the Year</h1>
            <p className="text-lg text-muted-foreground">
              One simple payment. No ads. No data selling.
            </p>
          </div>

          {/* Pricing Card */}
          <Card className="border-primary mb-8">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">NurGuard Shield Annual</CardTitle>
              <div className="mt-4">
                <span className="text-5xl font-bold">$33</span>
                <span className="text-muted-foreground text-lg">/year</span>
              </div>
              <p className="text-muted-foreground mt-2">
                Less than $3/month to protect your focus, family, and devices.
              </p>
            </CardHeader>
            <CardContent>
              {/* What You Get */}
              <div className="mb-8">
                <h3 className="font-semibold text-lg mb-4">Your annual membership includes:</h3>
                <ul className="space-y-3">
                  {[
                    { icon: "🛡️", title: "Device-wide protection", desc: "Blocks explicit content, pornography, gambling, scams, and malicious sites at the network level." },
                    { icon: "🧠", title: "Digital discipline tools", desc: "Reduce addictive scrolling, limit distractions, and take back your time." },
                    { icon: "🔒", title: "Privacy by default", desc: "No ads. No trackers. Your data is never sold or monetized." },
                    { icon: "👨‍👩‍👧", title: "Family & parental controls", desc: "Protect children's devices with safe search, schedules, and content controls." },
                    { icon: "🤲", title: "Barakah-driven technology", desc: "Built with niyyah — designed to serve your dīn, not your dopamine." },
                  ].map((item) => (
                    <li key={item.title} className="flex gap-3">
                      <span className="text-2xl flex-shrink-0">{item.icon}</span>
                      <div>
                        <p className="font-semibold">{item.title}</p>
                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Impact Section */}
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-4 mb-6">
                <h3 className="font-semibold mb-3">Your Subscription Does More Than Protect You</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-600" />
                    <span><strong>20%</strong> supports masjid construction & maintenance</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-600" />
                    <span><strong>30%</strong> rewards community members who spread NurGuard</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-600" />
                    <span><strong>0%</strong> goes to ads or selling your data</span>
                  </li>
                </ul>
                <p className="text-xs text-muted-foreground mt-3">
                  NurGuard is built as a community protection system, not a surveillance business.
                </p>
              </div>

              {/* Email Input for Non-Authenticated Users */}
              {!isAuthenticated && (
                <div className="mb-4">
                  <Label htmlFor="email" className="text-sm">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1"
                  />
                </div>
              )}

              {/* Affiliate Code Input */}
              <div className="mb-6">
                <Label htmlFor="affiliate" className="text-sm">Referral Code (optional)</Label>
                <Input
                  id="affiliate"
                  placeholder="Enter referral code"
                  value={affiliateCode}
                  onChange={(e) => setAffiliateCode(e.target.value.toUpperCase())}
                  className="mt-1"
                />
                {affiliateCode && affiliateValid && (
                  <p className="text-sm text-emerald-600 mt-1">
                    ✓ Referred by {affiliateValid.affiliateName}
                  </p>
                )}
              </div>

              {/* CTA Button */}
              <Button 
                className="w-full mb-4" 
                size="lg" 
                onClick={handleCheckout}
                disabled={checkoutMutation.isPending}
              >
                {checkoutMutation.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : null}
                Activate NurGuard — $33 / Year
              </Button>

              {/* Subtext */}
              <p className="text-xs text-center text-muted-foreground">
                Instant access • Secure checkout • 24-hour support
              </p>
            </CardContent>
          </Card>

          {/* Trust Signals */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-6 mb-8">
            <h3 className="font-semibold mb-4">Why Choose NurGuard?</h3>
            <ul className="space-y-2 text-sm">
              {[
                "✔ Works on phones, tablets, and computers",
                "✔ Install once — protection runs in the background",
                "✔ Cancel anytime — no contracts, no lock-ins",
                "✔ Built for Muslims. Useful for everyone.",
              ].map((item) => (
                <li key={item} className="text-muted-foreground">{item}</li>
              ))}
            </ul>
          </div>

          {/* Founder Quote */}
          <div className="text-center mb-8 italic text-muted-foreground border-l-4 border-emerald-600 pl-4">
            <p className="mb-2">"NurGuard exists to help us use technology with intention, discipline, and barakah."</p>
            <p className="font-semibold text-foreground">— Tex Bénèche, Founder</p>
          </div>

          {/* FAQ */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Common Questions</h3>
            
            <div className="bg-slate-900/30 rounded-lg p-4">
              <p className="font-semibold mb-2">Why $33/year?</p>
              <p className="text-sm text-muted-foreground">
                Because digital protection should be accessible, sustainable, and independent from ads or data exploitation.
              </p>
            </div>

            <div className="bg-slate-900/30 rounded-lg p-4">
              <p className="font-semibold mb-2">Do I need to be tech-savvy?</p>
              <p className="text-sm text-muted-foreground">
                No. Setup takes minutes. We guide you step-by-step.
              </p>
            </div>

            <div className="bg-slate-900/30 rounded-lg p-4">
              <p className="font-semibold mb-2">Is this for Muslims only?</p>
              <p className="text-sm text-muted-foreground">
                Built for Muslims. Useful for anyone who wants control over their digital life.
              </p>
            </div>

            <Link href="/faq">
              <Button variant="outline" className="w-full mt-4">
                View Full FAQ
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
