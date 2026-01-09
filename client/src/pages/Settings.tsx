import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { Settings as SettingsIcon, ArrowLeft, User, CreditCard, Download, LogOut, Loader2, Shield, Heart } from "lucide-react";
import { Link, useLocation } from "wouter";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

export default function Settings() {
  const { user, logout, isAuthenticated } = useAuth({ redirectOnUnauthenticated: true });
  const [, setLocation] = useLocation();
  
  const { data: subscription } = trpc.subscription.getStatus.useQuery(undefined, {
    enabled: isAuthenticated,
  });
  
  const { data: foundation } = trpc.foundation.getTotal.useQuery();

  const handleLogout = async () => {
    await logout();
    setLocation("/");
  };

  const handleInstallPWA = () => {
    // Check if PWA install prompt is available
    const deferredPrompt = (window as any).deferredPrompt;
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === "accepted") {
          toast.success("NurGuard Shield installed!");
        }
        (window as any).deferredPrompt = null;
      });
    } else {
      toast.info("To install, use your browser's 'Add to Home Screen' option");
    }
  };

  // Redirect if no active subscription
  if (!subscription?.isActive && isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Shield className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
          <h1 className="text-2xl font-bold mb-2">Upgrade to Shield</h1>
          <p className="text-muted-foreground mb-6">Subscribe to access settings</p>
          <Link href="/subscribe">
            <Button>Subscribe Now</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
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
        {/* Profile */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <User className="h-5 w-5" />
              Profile
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Name</span>
                <span className="font-medium">{user?.name || "Not set"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Email</span>
                <span className="font-medium">{user?.email || "Not set"}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Subscription */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Subscription
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Status</span>
                <span className={`font-medium px-2 py-1 rounded text-sm ${
                  subscription?.isActive 
                    ? "bg-primary/10 text-primary" 
                    : "bg-muted text-muted-foreground"
                }`}>
                  {subscription?.isActive ? "Active" : "Free"}
                </span>
              </div>
              {subscription?.endsAt && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Renews</span>
                  <span className="font-medium">
                    {new Date(subscription.endsAt).toLocaleDateString()}
                  </span>
                </div>
              )}
            </div>
            {!subscription?.isActive && (
              <Link href="/subscribe">
                <Button className="w-full mt-4">
                  <Shield className="h-4 w-4 mr-2" />
                  Upgrade to Shield
                </Button>
              </Link>
            )}
          </CardContent>
        </Card>

        {/* Foundation Impact */}
        <Card className="border-primary/50">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Heart className="h-5 w-5 text-primary" />
              Your Impact
            </CardTitle>
            <CardDescription>
              20% of every subscription goes to {foundation?.foundationName}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-4">
              <p className="text-3xl font-bold text-primary">
                ${foundation?.total?.toFixed(2) || "0.00"}
              </p>
              <p className="text-sm text-muted-foreground">
                Total donated by NurGuard community
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Install PWA */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Download className="h-5 w-5" />
              Install App
            </CardTitle>
            <CardDescription>
              Install NurGuard Shield on your device for quick access
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full" onClick={handleInstallPWA}>
              <Download className="h-4 w-4 mr-2" />
              Install NurGuard Shield
            </Button>
          </CardContent>
        </Card>

        {/* Logout */}
        <Card>
          <CardContent className="pt-6">
            <Button variant="destructive" className="w-full" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
