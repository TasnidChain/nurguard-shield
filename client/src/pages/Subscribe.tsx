import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { trpc } from "@/lib/trpc";
import { Shield, Check, Heart, ArrowRight, Gift, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useLocation, useSearch } from "wouter";
import { getLoginUrl } from "@/const";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

export default function Subscribe() {
  const { user, isAuthenticated } = useAuth();
  const search = useSearch();
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState("");
  
  const [affiliateCode, setAffiliateCode] = useState("");
  const [giftCode, setGiftCode] = useState("");
  const [isRedeeming, setIsRedeeming] = useState(false);
  
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

  const redeemMutation = trpc.subscription.redeemGiftCode.useMutation({
    onSuccess: () => {
      toast.success("Gift code redeemed! Your subscription is now active.");
      setLocation("/dashboard");
    },
    onError: (error) => {
      toast.error(error.message);
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

  const handleRedeemGift = () => {
    if (!giftCode.trim()) {
      toast.error("Please enter a gift code");
      return;
    }
    setIsRedeeming(true);
    redeemMutation.mutate({ code: giftCode.trim() });
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
        <div className="max-w-lg mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Activate Your Shield</h1>
            <p className="text-muted-foreground">
              Start protecting your digital well-being today.
            </p>
            <p className="text-sm text-emerald-600 font-semibold mt-2">
              Phase 1: Founding Member Pricing — Limited to 333 members
            </p>
          </div>

          {/* Pricing Card */}
          <Card className="border-primary mb-6">
            <CardHeader className="text-center">
              <CardTitle className="text-xl">NurGuard Shield</CardTitle>
              <div className="mt-2">
                <span className="text-4xl font-bold">$7.77</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Price will increase in Phase 2. Lock in Founding Member pricing now.
              </p>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 mb-6">
                {[
                  "Unlimited blocking rules",
                  "App & website time limits",
                  "Usage analytics & streaks",
                  "AI content categorization",
                  "30% affiliate commissions",
                  "Gift subscriptions",
                ].map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-primary flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Affiliate Code Input */}
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

              <div className="mb-4">
                <Label htmlFor="affiliate" className="text-sm">Referral Code (optional)</Label>
                <Input
                  id="affiliate"
                  placeholder="Enter referral code"
                  value={affiliateCode}
                  onChange={(e) => setAffiliateCode(e.target.value.toUpperCase())}
                  className="mt-1"
                />
                {affiliateCode && affiliateValid && (
                  <p className="text-sm text-primary mt-1">
                    ✓ Referred by {affiliateValid.affiliateName}
                  </p>
                )}
              </div>

              <Button 
                className="w-full" 
                size="lg" 
                onClick={handleCheckout}
                disabled={checkoutMutation.isPending}
              >
                {checkoutMutation.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : null}
                Proceed to Checkout
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>

              <p className="text-xs text-center text-muted-foreground mt-4">
                <Heart className="h-3 w-3 inline mr-1 text-primary" />
                20% ($1.55) goes to Masajid Builder Foundation
              </p>
            </CardContent>
          </Card>

          {/* Gift Code Redemption */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Gift className="h-5 w-5 text-primary" />
                Have a Gift Code?
              </CardTitle>
              <CardDescription>
                Redeem a gift code to activate your subscription.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Input
                  placeholder="Enter gift code"
                  value={giftCode}
                  onChange={(e) => setGiftCode(e.target.value.toUpperCase())}
                />
                <Button 
                  onClick={handleRedeemGift}
                  disabled={redeemMutation.isPending || !isAuthenticated}
                >
                  {redeemMutation.isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    "Redeem"
                  )}
                </Button>
              </div>
              {!isAuthenticated && (
                <p className="text-xs text-muted-foreground mt-2">
                  Please sign in to redeem a gift code.
                </p>
              )}
            </CardContent>
          </Card>

          {/* Trust Badges */}
          <div className="mt-8 text-center text-sm text-muted-foreground">
            <p>🔒 Secure payment via Lemon Squeezy</p>
            <p className="mt-1">Cancel anytime • No hidden fees</p>
          </div>
        </div>
      </main>
    </div>
  );
}
