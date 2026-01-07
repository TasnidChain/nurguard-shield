import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { Users, DollarSign, Copy, ArrowLeft, Trophy, Loader2 } from "lucide-react";
import { Link } from "wouter";
import { toast } from "sonner";

export default function Affiliate() {
  useAuth({ redirectOnUnauthenticated: true });
  
  const { data: stats, isLoading } = trpc.affiliate.getStats.useQuery();
  const { data: leaderboard } = trpc.affiliate.getLeaderboard.useQuery();

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
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b">
        <div className="container flex h-16 items-center gap-4">
          <Link href="/dashboard">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <Users className="h-6 w-6 text-primary" />
            <span className="font-bold">Affiliate Program</span>
          </div>
        </div>
      </header>

      <main className="container py-6">
        {/* Referral Code Card */}
        <Card className="mb-6 border-primary">
          <CardHeader>
            <CardTitle>Your Referral Code</CardTitle>
            <CardDescription>Share this code and earn 30% on every subscription</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex-1 bg-muted p-3 rounded-lg font-mono text-lg text-center">
                {stats?.affiliateCode || "---"}
              </div>
              <Button variant="outline" size="icon" onClick={copyCode}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <Button className="w-full" onClick={copyReferralLink}>
              <Copy className="h-4 w-4 mr-2" />
              Copy Referral Link
            </Button>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card>
            <CardContent className="pt-6">
              <DollarSign className="h-5 w-5 text-primary mb-2" />
              <p className="text-2xl font-bold">${stats?.totalEarnings?.toFixed(2) || "0.00"}</p>
              <p className="text-sm text-muted-foreground">Total Earnings</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <DollarSign className="h-5 w-5 text-green-500 mb-2" />
              <p className="text-2xl font-bold">${stats?.availableBalance?.toFixed(2) || "0.00"}</p>
              <p className="text-sm text-muted-foreground">Available Balance</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <Users className="h-5 w-5 text-blue-500 mb-2" />
              <p className="text-2xl font-bold">{stats?.totalReferrals || 0}</p>
              <p className="text-sm text-muted-foreground">Total Referrals</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <Users className="h-5 w-5 text-orange-500 mb-2" />
              <p className="text-2xl font-bold">{stats?.convertedReferrals || 0}</p>
              <p className="text-sm text-muted-foreground">Converted</p>
            </CardContent>
          </Card>
        </div>

        {/* How It Works */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">How It Works</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="space-y-3 text-sm">
              <li className="flex gap-3">
                <span className="bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">1</span>
                <span>Share your referral link or code with friends</span>
              </li>
              <li className="flex gap-3">
                <span className="bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">2</span>
                <span>They subscribe to NurGuard Shield ($7.77/mo)</span>
              </li>
              <li className="flex gap-3">
                <span className="bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">3</span>
                <span>You earn 30% ($2.33) for every subscription</span>
              </li>
            </ol>
          </CardContent>
        </Card>

        {/* Leaderboard */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Trophy className="h-5 w-5 text-yellow-500" />
              Top Affiliates
            </CardTitle>
          </CardHeader>
          <CardContent>
            {leaderboard?.length === 0 ? (
              <p className="text-center text-muted-foreground py-4">
                Be the first on the leaderboard!
              </p>
            ) : (
              <div className="space-y-2">
                {leaderboard?.map((affiliate, index) => (
                  <div
                    key={affiliate.id}
                    className="flex items-center justify-between p-2 rounded-lg bg-muted/50"
                  >
                    <div className="flex items-center gap-3">
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        index === 0 ? "bg-yellow-500 text-white" :
                        index === 1 ? "bg-gray-400 text-white" :
                        index === 2 ? "bg-orange-600 text-white" :
                        "bg-muted text-muted-foreground"
                      }`}>
                        {index + 1}
                      </span>
                      <span className="font-medium">{affiliate.name || "Anonymous"}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      ${parseFloat(affiliate.affiliateEarnings?.toString() || "0").toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
