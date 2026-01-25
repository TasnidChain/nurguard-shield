import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect } from "react";
import { Loader2, Settings } from "lucide-react";
import { Link, useLocation } from "wouter";

export default function AppPage() {
  const { isAuthenticated, user, loading } = useAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      setLocation("/");
    }
  }, [isAuthenticated, loading, setLocation]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="text-center space-y-4">
          <p className="text-slate-300">Redirecting...</p>
          <Loader2 className="h-8 w-8 animate-spin text-emerald-600 mx-auto" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/50">
        <div className="container max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/">
            <h1 className="text-2xl font-bold text-white cursor-pointer hover:text-emerald-400">NurGuard</h1>
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-slate-300">{user?.email}</span>
            <Link href="/settings">
              <Button size="sm" variant="outline" className="border-slate-600 text-slate-200">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container max-w-6xl mx-auto px-4 py-20">
        <div className="space-y-8">
          {/* Welcome */}
          <div className="space-y-2">
            <h2 className="text-4xl font-bold text-white">Welcome back, {user?.email?.split("@")[0]}</h2>
            <p className="text-slate-300">Your devices are protected with NurGuard</p>
          </div>

          {/* Status Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="pt-8 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-white">Subscription</h3>
                  <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                </div>
                <p className="text-slate-300">Annual Plan</p>
                <p className="text-2xl font-bold text-emerald-400">$33/year</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="pt-8 space-y-4">
                <h3 className="text-lg font-bold text-white">Devices Protected</h3>
                <p className="text-3xl font-bold text-emerald-400">∞</p>
                <p className="text-slate-300 text-sm">All your devices</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="pt-8 space-y-4">
                <h3 className="text-lg font-bold text-white">Protection Status</h3>
                <p className="text-emerald-400 font-semibold">Active</p>
                <p className="text-slate-300 text-sm">DNS configured</p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="pt-8 space-y-4">
                <h3 className="text-xl font-bold text-white">Setup Guide</h3>
                <p className="text-slate-300">Configure DNS on your devices</p>
                <Link href="/setup">
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
                    View Setup Steps
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="pt-8 space-y-4">
                <h3 className="text-xl font-bold text-white">Earn Commission</h3>
                <p className="text-slate-300">Share NurGuard and earn 30% recurring</p>
                <Link href="/earn">
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
                    Learn How to Earn
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Support */}
          <Card className="bg-emerald-950 border-emerald-700">
            <CardContent className="pt-8 space-y-4">
              <h3 className="text-xl font-bold text-white">Need Help?</h3>
              <p className="text-slate-300">Check our setup guide or contact support</p>
              <div className="flex gap-4">
                <Link href="/setup">
                  <Button variant="outline" className="border-emerald-600 text-emerald-400">
                    Setup Guide
                  </Button>
                </Link>
                <Link href="/support">
                  <Button variant="outline" className="border-emerald-600 text-emerald-400">
                    Support
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
