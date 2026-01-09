import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { Users, DollarSign, Copy, ArrowLeft, Trophy, Loader2, Shield, Lock, Flame } from "lucide-react";
import { Link } from "wouter";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

export default function Affiliate() {
  const { isAuthenticated } = useAuth({ redirectOnUnauthenticated: true });
  const { data: subscription } = trpc.subscription.getStatus.useQuery(undefined, {
    enabled: isAuthenticated,
  });

  const { data: compliance } = trpc.compliance.getStatus.useQuery(undefined, {
    enabled: isAuthenticated,
  });
  
  if (!subscription?.isActive) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Shield className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
          <h1 className="text-2xl font-bold mb-2">Upgrade to Shield</h1>
          <p className="text-muted-foreground mb-6">Subscribe to access affiliate program</p>
          <Link href="/subscribe">
            <Button>Subscribe Now</Button>
          </Link>
        </div>
      </div>
    );
  }

  const streakDays = compliance?.streakDays || 0;
  const isUnlocked = streakDays >= 0; // Unlock on Day 1
  
  const { data: stats, isLoading } = trpc.affiliate.getStats.useQuery(undefined, {
    enabled: isUnlocked,
  });
  const { data: leaderboard } = trpc.affiliate.getLeaderboard.useQuery(undefined, {
    enabled: isUnlocked,
  });

  const copyReferralLink = () => {
    const link = `${window.location.origin}/subscribe?ref=${stats?.affiliateCode}`;
    navigator.clipboard.writeText(link);
    toast.success("Referral link copied!");
  };

  const copyCode = () => {
    navigator.clipboard.writeText(stats?.affiliateCode || "");
    toast.success("Code copied!");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // LOCKED STATE - Show unlock prompt
  if (!isUnlocked) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md border-2 border-yellow-200 bg-yellow-50">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Lock className="h-12 w-12 text-yellow-600" />
            </div>
            <CardTitle className="text-2xl">Affiliate Program Locked</CardTitle>
            <CardDescription>Build your streak to unlock referrals</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 text-center">
            <div className="bg-white p-6 rounded-lg border border-yellow-200">
              <div className="flex items-center justify-center gap-2 mb-3">
                <Flame className="h-6 w-6 text-orange-500" />
                <span className="text-3xl font-bold">{streakDays}/3</span>
              </div>
              <p className="text-muted-foreground">Days until you can share & earn</p>
            </div>

            <p className="text-sm text-muted-foreground">
              Maintain a 3-day clean streak to unlock the affiliate program. This ensures you're truly committed to your protection goals before earning.
            </p>

            <Link href="/dashboard">
              <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                Back to Dashboard
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  // UNLOCKED STATE - Show affiliate dashboard
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container py-6 space-y-6">
        {/* Unlock Badge */}
        <Card className="bg-emerald-50 border-emerald-200">
          <CardContent className="flex items-center gap-3 py-4">
            <Flame className="h-5 w-5 text-orange-500 flex-shrink-0" />
            <div>
              <p className="font-medium">🎉 You've unlocked the affiliate program!</p>
              <p className="text-sm text-muted-foreground">Earn $2.33 per referral</p>
            </div>
          </CardContent>
        </Card>

        {/* Your Code */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Your Referral Code
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-slate-100 rounded-lg flex items-center justify-between">
              <code className="font-mono font-bold text-lg">{stats?.affiliateCode}</code>
              <Button variant="outline" size="sm" onClick={copyCode}>
                <Copy className="h-4 w-4 mr-2" />
                Copy
              </Button>
            </div>
            <Button onClick={copyReferralLink} className="w-full bg-emerald-600 hover:bg-emerald-700">
              Copy Full Referral Link
            </Button>
          </CardContent>
        </Card>

        {/* Earnings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Your Earnings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 rounded-lg">
                <p className="text-sm text-muted-foreground">Total Earned</p>
                <p className="text-2xl font-bold">${stats?.totalEarnings?.toFixed(2) || "0.00"}</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-lg">
                <p className="text-sm text-muted-foreground">Available Balance</p>
                <p className="text-2xl font-bold">${stats?.availableBalance?.toFixed(2) || "0.00"}</p>
              </div>
            </div>
            <div className="p-4 bg-slate-50 rounded-lg">
              <p className="text-sm text-muted-foreground">Referrals Converted</p>
              <p className="text-2xl font-bold">{stats?.convertedReferrals || 0}</p>
            </div>
          </CardContent>
        </Card>

        {/* Leaderboard */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5" />
              Top Affiliates
            </CardTitle>
            <CardDescription>This month's top earners</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {leaderboard && leaderboard.length > 0 ? (
                leaderboard.map((affiliate, idx) => (
                  <div key={affiliate.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="text-lg font-bold text-muted-foreground">#{idx + 1}</span>
                      <div>
                        <p className="font-medium">{affiliate.name || "Anonymous"}</p>
                        <p className="text-xs text-muted-foreground">{affiliate.affiliateCode}</p>
                      </div>
                    </div>
                    <p className="font-bold text-emerald-600">${(Number(affiliate.affiliateEarnings) || 0).toFixed(2)}</p>
                  </div>
                ))
              ) : (
                <p className="text-center text-muted-foreground py-6">No affiliates yet</p>
              )}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
