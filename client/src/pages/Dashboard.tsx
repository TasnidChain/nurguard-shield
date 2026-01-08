import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { trpc } from "@/lib/trpc";
import { Shield, Flame, Target, Ban, Clock, Settings, Users, LogOut, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { Link, useLocation } from "wouter";
import { FoundationImpactCard } from "@/components/FoundationImpactCard";

export default function Dashboard() {
  const { user, logout, isAuthenticated } = useAuth({ redirectOnUnauthenticated: true });
  const [, setLocation] = useLocation();
  
  const { data: dashboard, isLoading } = trpc.analytics.getDashboard.useQuery(undefined, {
    enabled: isAuthenticated,
  });

  const { data: compliance } = trpc.compliance.getStatus.useQuery(undefined, {
    enabled: isAuthenticated,
  });
  
  const { data: subscription } = trpc.subscription.getStatus.useQuery(undefined, {
    enabled: isAuthenticated,
  });

  const handleLogout = async () => {
    await logout();
    setLocation("/");
  };

  // Redirect if no active subscription
  if (!subscription?.isActive && !isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Shield className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
          <h1 className="text-2xl font-bold mb-2">Upgrade to Shield</h1>
          <p className="text-muted-foreground mb-6">Subscribe to access your dashboard</p>
          <Link href="/subscribe">
            <Button>Subscribe Now</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const isSubscribed = subscription?.isActive;
  const complianceScore = compliance?.complianceScore || 100;
  const streakDays = compliance?.streakDays || 0;
  const protectionStatus = compliance?.status || "ACTIVE";

  // Determine status color
  const getStatusColor = () => {
    if (protectionStatus === "ACTIVE") return "text-emerald-600";
    if (protectionStatus === "AT_RISK") return "text-yellow-600";
    return "text-red-600";
  };

  const getStatusBg = () => {
    if (protectionStatus === "ACTIVE") return "bg-emerald-50 border-emerald-200";
    if (protectionStatus === "AT_RISK") return "bg-yellow-50 border-yellow-200";
    return "bg-red-50 border-red-200";
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer">
              <Shield className="h-8 w-8 text-emerald-600" />
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

      <main className="container py-6 space-y-6">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Welcome back, {user?.name || "Shield Bearer"}</h1>
          <p className="text-muted-foreground mt-1">
            {isSubscribed ? "Your shield is active and protecting you." : "Activate your shield to unlock all features."}
          </p>
        </div>

        {/* PROTECTION STATUS CARD - CRITICAL */}
        <Card className={`border-2 ${getStatusBg()}`}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {protectionStatus === "ACTIVE" ? (
                  <CheckCircle2 className="h-8 w-8 text-emerald-600" />
                ) : (
                  <AlertCircle className="h-8 w-8 text-yellow-600" />
                )}
                <div>
                  <CardTitle className="text-2xl">
                    {protectionStatus === "ACTIVE" ? "🛡️ Protection Active" : "⚠️ At Risk"}
                  </CardTitle>
                  <CardDescription>
                    {protectionStatus === "ACTIVE"
                      ? "All rules are enforced. Stay on track!"
                      : "Your compliance score is dropping. Be careful!"}
                  </CardDescription>
                </div>
              </div>
              <Link href="/blocking">
                <Button variant="outline">Edit Rules</Button>
              </Link>
            </div>
          </CardHeader>
        </Card>

        {/* Subscription Banner */}
        {!isSubscribed && (
          <Card className="mb-6 border-emerald-200 bg-emerald-50">
            <CardContent className="flex items-center justify-between py-4">
              <div>
                <p className="font-medium">Upgrade to unlock all features</p>
                <p className="text-sm text-muted-foreground">Get unlimited blocking rules, analytics, and more.</p>
              </div>
              <Link href="/subscribe">
                <Button className="bg-emerald-600 hover:bg-emerald-700">Subscribe for $7.77/mo</Button>
              </Link>
            </CardContent>
          </Card>
        )}

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Compliance Score */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Target className="h-4 w-4 text-emerald-600" />
                Compliance Score
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="text-3xl font-bold">{complianceScore}/100</div>
              <Progress value={complianceScore} className="h-2" />
              <p className="text-xs text-muted-foreground">
                {complianceScore > 80
                  ? "Excellent! Keep it up."
                  : complianceScore > 50
                  ? "Good, but watch for violations."
                  : "Critical. Reset your streak today."}
              </p>
            </CardContent>
          </Card>

          {/* Current Streak */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Flame className="h-4 w-4 text-orange-500" />
                Current Streak
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="text-3xl font-bold">{streakDays} days</div>
              <p className="text-xs text-muted-foreground">
                {streakDays === 0
                  ? "Start fresh today"
                  : streakDays < 3
                  ? "Building momentum"
                  : streakDays < 7
                  ? "Great progress!"
                  : "Incredible discipline!"}
              </p>
            </CardContent>
          </Card>

          {/* Blocked Attempts */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Ban className="h-4 w-4 text-red-500" />
                Blocked Today
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="text-3xl font-bold">{compliance?.todayViolations || 0}</div>
              <p className="text-xs text-muted-foreground">
                {(compliance?.todayViolations || 0) === 0
                  ? "Perfect! No violations."
                  : "Stay focused for the rest of the day."}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Daily Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Today's Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 rounded-lg">
                <p className="text-sm text-muted-foreground">Avg Screen Time</p>
                <p className="text-2xl font-bold">{dashboard?.avgScreenTimeMinutes || 0}m</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-lg">
                <p className="text-sm text-muted-foreground">Active Rules</p>
                <p className="text-2xl font-bold">{dashboard?.activeRules || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Foundation Impact */}
        <FoundationImpactCard />

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/blocking">
            <Button variant="outline" className="w-full justify-start">
              <Ban className="h-4 w-4 mr-2" />
              Manage Blocking Rules
            </Button>
          </Link>
          <Link href="/affiliate">
            <Button variant="outline" className="w-full justify-start">
              <Users className="h-4 w-4 mr-2" />
              Share & Earn
            </Button>
          </Link>
          <Link href="/settings">
            <Button variant="outline" className="w-full justify-start">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
