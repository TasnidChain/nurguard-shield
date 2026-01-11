import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { Users, DollarSign, Copy, Trophy, Loader2, Shield } from "lucide-react";
import { Link } from "wouter";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

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
          <h1 className="text-2xl font-bold mb-2">Upgrade to Shield</h1>
          <p className="text-muted-foreground mb-6">Subscribe to access affiliate program</p>
          <Link href="/subscribe">
            <Button>Subscribe Now</Button>
          </Link>
        </div>
      </div>
    );
  }

  const { data: stats, isLoading } = trpc.affiliate.getStats.useQuery(undefined, {
    enabled: isAuthenticated,
  });
  const { data: leaderboard } = trpc.affiliate.getLeaderboard.useQuery(undefined, {
    enabled: isAuthenticated,
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

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container py-6 space-y-6">
        {/* Unlock Badge */}
        <Card className="bg-emerald-50 border-emerald-200">
          <CardContent className="flex items-center gap-3 py-4">
            <div className="text-2xl">🎉</div>
            <div>
              <p className="font-medium">You've unlocked the affiliate program!</p>
              <p className="text-sm text-muted-foreground">Earn $2.33 per referral, every month</p>
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
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 rounded-lg">
                <p className="text-sm text-muted-foreground">Referrals Converted</p>
                <p className="text-2xl font-bold">{stats?.convertedReferrals || 0}</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-lg">
                <p className="text-sm text-muted-foreground">Conversion Rate</p>
                <p className="text-2xl font-bold">{stats?.conversionRate || 0}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Referral Tracking */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Your Referrals
            </CardTitle>
            <CardDescription>Track your referral conversions - {stats?.totalReferrals || 0} total</CardDescription>
          </CardHeader>
          <CardContent>
            {stats?.referrals && stats.referrals.length > 0 ? (
              <div className="space-y-3">
                {stats.referrals.map((ref) => (
                  <div key={ref.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div>
                      <p className="font-medium">Referral #{ref.referredId}</p>
                      <p className="text-xs text-muted-foreground">{new Date(ref.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div className="text-right">
                      {ref.status === 'converted' && (
                        <span className="inline-block px-3 py-1 rounded text-sm font-medium bg-emerald-100 text-emerald-800">✓ Converted</span>
                      )}
                      {ref.status === 'pending' && (
                        <span className="inline-block px-3 py-1 rounded text-sm font-medium bg-yellow-100 text-yellow-800">Pending</span>
                      )}
                      {ref.status === 'expired' && (
                        <span className="inline-block px-3 py-1 rounded text-sm font-medium bg-gray-100 text-gray-800">Expired</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-6">No referrals yet. Share your code to get started!</p>
            )}
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
