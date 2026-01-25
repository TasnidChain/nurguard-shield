import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { Users, DollarSign, Copy, Loader2, Shield, TrendingUp } from "lucide-react";
import { Link } from "wouter";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";
import { useAuth } from "@/_core/hooks/useAuth";

export default function Affiliate() {
  const { isAuthenticated } = useAuth({ redirectOnUnauthenticated: true });
  const { data: subscription } = trpc.subscription.getStatus.useQuery(undefined, {
    enabled: isAuthenticated,
  });
  
  if (!subscription?.isActive) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Shield className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
          <h1 className="text-2xl font-bold mb-2">Upgrade to NurGuard</h1>
          <p className="text-muted-foreground mb-6">Subscribe to access the affiliate program</p>
          <Link href="/subscribe">
            <Button>Subscribe Now - $33/year</Button>
          </Link>
        </div>
      </div>
    );
  }

  const { data: stats, isLoading } = trpc.affiliate.getStats.useQuery(undefined, {
    enabled: isAuthenticated,
  });

  const copyReferralLink = () => {
    const link = `${window.location.origin}/subscribe?ref=${stats?.affiliateCode}`;
    navigator.clipboard.writeText(link);
    toast.success("Referral link copied to clipboard!");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container max-w-2xl py-12 space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold">Earn While Protecting Others</h1>
          <p className="text-lg text-muted-foreground">Share NurGuard and earn 30% recurring commission</p>
        </div>

        {/* Earnings Card */}
        <Card className="border-2 border-emerald-200 bg-emerald-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-6 w-6 text-emerald-600" />
              Your Earnings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-lg p-4 border border-emerald-200">
                <p className="text-sm text-muted-foreground">Total Earnings</p>
                <p className="text-3xl font-bold text-emerald-600">${(stats?.totalEarnings || 0).toFixed(2)}</p>
              </div>
              <div className="bg-white rounded-lg p-4 border border-emerald-200">
                <p className="text-sm text-muted-foreground">Pending Balance</p>
                <p className="text-3xl font-bold text-emerald-600">${(stats?.availableBalance || 0).toFixed(2)}</p>
              </div>
            </div>
            <div className="bg-white rounded-lg p-4 border border-emerald-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Converted Referrals</p>
                  <p className="text-2xl font-bold">{stats?.convertedReferrals || 0}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-emerald-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Referral Link Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Your Referral Link
            </CardTitle>
            <CardDescription>Share this link to earn 30% of every referral's subscription</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-slate-50 rounded-lg p-4 border border-slate-200 font-mono text-sm break-all">
              {`${window.location.origin}/subscribe?ref=${stats?.affiliateCode}`}
            </div>
            <Button onClick={copyReferralLink} className="w-full" size="lg">
              <Copy className="h-4 w-4 mr-2" />
              Copy Link
            </Button>
          </CardContent>
        </Card>

        {/* How It Works */}
        <Card>
          <CardHeader>
            <CardTitle>How It Works</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center font-bold text-emerald-600">1</div>
                <div>
                  <p className="font-medium">Share Your Link</p>
                  <p className="text-sm text-muted-foreground">Copy and share your unique referral link with friends</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center font-bold text-emerald-600">2</div>
                <div>
                  <p className="font-medium">They Subscribe</p>
                  <p className="text-sm text-muted-foreground">When they subscribe via your link, you earn 30% commission</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center font-bold text-emerald-600">3</div>
                <div>
                  <p className="font-medium">Earn Recurring</p>
                  <p className="text-sm text-muted-foreground">You earn 30% every year they stay subscribed</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center font-bold text-emerald-600">4</div>
                <div>
                  <p className="font-medium">Request Payout</p>
                  <p className="text-sm text-muted-foreground">Withdraw your earnings monthly or quarterly</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payout Info */}
        <Card className="border-amber-200 bg-amber-50">
          <CardHeader>
            <CardTitle className="text-base">Payout Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p><strong>Commission:</strong> 30% of each subscription ($9.90/year per referral)</p>
            <p><strong>Minimum Payout:</strong> $50 USD</p>
            <p><strong>Frequency:</strong> Manual payouts (monthly or quarterly)</p>
            <p><strong>Methods:</strong> Bank transfer or Stripe (coming soon)</p>
            <p className="text-xs text-muted-foreground pt-2">Affiliate earnings are paid manually while we scale. Request payouts anytime you reach the minimum balance.</p>
          </CardContent>
        </Card>

        {/* Payout Button */}
        {(stats?.availableBalance || 0) >= 50 && (
          <Link href="/payout">
            <Button className="w-full" size="lg">
              Request Payout
            </Button>
          </Link>
        )}

        {/* FAQ Link */}
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Have questions?</p>
          <Link href="/faq">
            <Button variant="outline">View FAQ</Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
