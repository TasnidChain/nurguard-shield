import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { trpc } from "@/lib/trpc";
import { Shield, Flame, Target, Ban, Clock, Settings, Users, LogOut, Loader2 } from "lucide-react";
import { Link, useLocation } from "wouter";

export default function Dashboard() {
  const { user, logout, isAuthenticated } = useAuth({ redirectOnUnauthenticated: true });
  const [, setLocation] = useLocation();
  
  const { data: dashboard, isLoading } = trpc.analytics.getDashboard.useQuery(undefined, {
    enabled: isAuthenticated,
  });
  
  const { data: subscription } = trpc.subscription.getStatus.useQuery(undefined, {
    enabled: isAuthenticated,
  });

  const handleLogout = async () => {
    await logout();
    setLocation("/");
  };

  if (!isAuthenticated || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const isSubscribed = subscription?.isActive;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer">
              <Shield className="h-8 w-8 text-primary" />
              <span className="font-bold text-xl">NurGuard</span>
            </div>
          </Link>
          <nav className="flex items-center gap-2">
            <Link href="/settings">
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
            </Link>
            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut className="h-5 w-5" />
            </Button>
          </nav>
        </div>
      </header>

      <main className="container py-6">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Welcome back, {user?.name || "Shield Bearer"}</h1>
          <p className="text-muted-foreground">
            {isSubscribed ? "Your shield is active and protecting you." : "Activate your shield to unlock all features."}
          </p>
        </div>

        {/* Subscription Banner */}
        {!isSubscribed && (
          <Card className="mb-6 border-primary bg-primary/5">
            <CardContent className="flex items-center justify-between py-4">
              <div>
                <p className="font-medium">Upgrade to unlock all features</p>
                <p className="text-sm text-muted-foreground">Get unlimited blocking rules, analytics, and more.</p>
              </div>
              <Link href="/subscribe">
                <Button>Subscribe for $7.77/mo</Button>
              </Link>
            </CardContent>
          </Card>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            icon={<Target className="h-5 w-5" />}
            label="Compliance Score"
            value={`${dashboard?.complianceScore || 100}%`}
            color="text-primary"
          />
          <StatCard
            icon={<Flame className="h-5 w-5" />}
            label="Current Streak"
            value={`${dashboard?.currentStreak || 0} days`}
            color="text-orange-500"
          />
          <StatCard
            icon={<Ban className="h-5 w-5" />}
            label="Blocked Attempts"
            value={dashboard?.totalBlockedAttempts?.toString() || "0"}
            color="text-red-500"
          />
          <StatCard
            icon={<Clock className="h-5 w-5" />}
            label="Avg Screen Time"
            value={`${dashboard?.avgScreenTimeMinutes || 0}m`}
            color="text-blue-500"
          />
        </div>

        {/* Compliance Progress */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Weekly Compliance</CardTitle>
            <CardDescription>Your adherence to blocking rules this week</CardDescription>
          </CardHeader>
          <CardContent>
            <Progress value={dashboard?.complianceScore || 100} className="h-3" />
            <div className="flex justify-between mt-2 text-sm text-muted-foreground">
              <span>0%</span>
              <span className="font-medium text-foreground">{dashboard?.complianceScore || 100}%</span>
              <span>100%</span>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link href="/blocking">
            <Card className="cursor-pointer hover:border-primary transition-colors">
              <CardHeader>
                <Shield className="h-8 w-8 text-primary mb-2" />
                <CardTitle className="text-lg">Blocking Rules</CardTitle>
                <CardDescription>
                  {dashboard?.activeRules || 0} active / {dashboard?.totalRules || 0} total
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
          
          <Link href="/affiliate">
            <Card className="cursor-pointer hover:border-primary transition-colors">
              <CardHeader>
                <Users className="h-8 w-8 text-primary mb-2" />
                <CardTitle className="text-lg">Affiliate Program</CardTitle>
                <CardDescription>Earn 30% on referrals</CardDescription>
              </CardHeader>
            </Card>
          </Link>
          
          <Link href="/settings">
            <Card className="cursor-pointer hover:border-primary transition-colors">
              <CardHeader>
                <Settings className="h-8 w-8 text-primary mb-2" />
                <CardTitle className="text-lg">Settings</CardTitle>
                <CardDescription>Manage your account</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        </div>

        {/* Streak Info */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Flame className="h-5 w-5 text-orange-500" />
              Streak Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold">{dashboard?.currentStreak || 0}</p>
                <p className="text-sm text-muted-foreground">Current streak</p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold">{dashboard?.longestStreak || 0}</p>
                <p className="text-sm text-muted-foreground">Longest streak</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

function StatCard({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: string; color: string }) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className={`${color} mb-2`}>{icon}</div>
        <p className="text-2xl font-bold">{value}</p>
        <p className="text-sm text-muted-foreground">{label}</p>
      </CardContent>
    </Card>
  );
}
