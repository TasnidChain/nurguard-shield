import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, AlertCircle, CheckCircle2, Activity, TrendingUp, Heart } from "lucide-react";
import { Link } from "wouter";
import Navigation from "@/components/Navigation";

export default function DashboardV2() {
  const [deviceStatus, setDeviceStatus] = useState<"active" | "inactive">("inactive");
  const [selectedProfile, setSelectedProfile] = useState<string>("halal");
  const [blockedToday, setBlockedToday] = useState(23);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    // Simulate device status check
    const timer = setTimeout(() => {
      setDeviceStatus("active");
      setStreak(5);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const blockedCategories = [
    { name: "Adult Content", count: 8, percentage: 35 },
    { name: "Gambling", count: 5, percentage: 22 },
    { name: "Dating Apps", count: 4, percentage: 17 },
    { name: "Trackers", count: 3, percentage: 13 },
    { name: "Malware", count: 2, percentage: 9 },
    { name: "Other", count: 1, percentage: 4 },
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navigation />

      {/* Hero Section */}
      <section className="py-12 px-4 bg-gradient-to-b from-gray-900 to-gray-950 border-b border-gray-800">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">Your Protection Dashboard</h1>
          <p className="text-gray-400">Monitor your shield status and blocking activity</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-4 bg-gray-950">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Device Status Card */}
          <Card
            className={`border-2 transition ${
              deviceStatus === "active"
                ? "border-emerald-500 bg-emerald-500/5"
                : "border-yellow-500 bg-yellow-500/5"
            }`}
          >
            <CardContent className="pt-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Device Status</h2>
                  <p className="text-gray-400">
                    {deviceStatus === "active"
                      ? "Your device is protected"
                      : "Waiting for device configuration..."}
                  </p>
                </div>
                {deviceStatus === "active" ? (
                  <CheckCircle2 className="w-12 h-12 text-emerald-400 flex-shrink-0" />
                ) : (
                  <AlertCircle className="w-12 h-12 text-yellow-400 flex-shrink-0 animate-pulse" />
                )}
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-gray-900 rounded-lg p-4">
                  <p className="text-gray-400 text-sm mb-1">Status</p>
                  <p className="text-2xl font-bold">
                    {deviceStatus === "active" ? (
                      <span className="text-emerald-400">● Active</span>
                    ) : (
                      <span className="text-yellow-400">● Inactive</span>
                    )}
                  </p>
                </div>
                <div className="bg-gray-900 rounded-lg p-4">
                  <p className="text-gray-400 text-sm mb-1">Profile</p>
                  <p className="text-2xl font-bold capitalize">{selectedProfile} Mode</p>
                </div>
                <div className="bg-gray-900 rounded-lg p-4">
                  <p className="text-gray-400 text-sm mb-1">Last Updated</p>
                  <p className="text-2xl font-bold">Now</p>
                </div>
              </div>

              {deviceStatus === "inactive" && (
                <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                  <p className="text-yellow-200 text-sm">
                    Your device is not yet configured. Complete DNS setup to activate protection.
                  </p>
                  <Link href="/device-setup">
                    <Button className="mt-3 bg-yellow-600 hover:bg-yellow-700">
                      Complete Device Setup
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {/* Blocked Today */}
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="pt-8">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Blocked Today</p>
                    <p className="text-4xl font-bold text-emerald-400">{blockedToday}</p>
                  </div>
                  <Shield className="w-8 h-8 text-emerald-400 flex-shrink-0" />
                </div>
                <p className="text-gray-400 text-sm">Harmful requests blocked</p>
              </CardContent>
            </Card>

            {/* Current Streak */}
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="pt-8">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Current Streak</p>
                    <p className="text-4xl font-bold text-emerald-400">{streak}</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-emerald-400 flex-shrink-0" />
                </div>
                <p className="text-gray-400 text-sm">Days protected</p>
              </CardContent>
            </Card>

            {/* Masajid Impact */}
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="pt-8">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Masajid Support</p>
                    <p className="text-2xl font-bold text-emerald-400">20%</p>
                  </div>
                  <Heart className="w-8 h-8 text-emerald-400 flex-shrink-0" />
                </div>
                <p className="text-gray-400 text-sm">Of your subscription</p>
              </CardContent>
            </Card>
          </div>

          {/* Blocked Categories */}
          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="pt-8">
              <h3 className="text-2xl font-bold mb-6">Blocked Categories (Today)</h3>
              <div className="space-y-4">
                {blockedCategories.map((category) => (
                  <div key={category.name}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-300">{category.name}</span>
                      <span className="text-emerald-400 font-bold">{category.count}</span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-2">
                      <div
                        className="bg-emerald-500 h-2 rounded-full transition-all"
                        style={{ width: `${category.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="pt-8">
                <h3 className="text-xl font-bold mb-4">Manage Protection</h3>
                <p className="text-gray-400 mb-6">
                  Change your filtering profile or adjust blocking rules.
                </p>
                <Link href="/profile-select">
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                    Change Profile
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="pt-8">
                <h3 className="text-xl font-bold mb-4">Device Setup</h3>
                <p className="text-gray-400 mb-6">
                  Configure DNS on additional devices or troubleshoot issues.
                </p>
                <Link href="/device-setup">
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                    Setup New Device
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Mission Section */}
          <Card className="bg-emerald-950/20 border-emerald-500/30">
            <CardContent className="pt-8">
              <div className="flex items-start gap-4">
                <Heart className="w-8 h-8 text-emerald-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold mb-2 text-emerald-400">
                    Supporting the Masajid Builder Foundation
                  </h3>
                  <p className="text-gray-300 mb-4">
                    20% of your subscription supports the Masajid Builder Foundation, funding masajid infrastructure and long-term sadaqah jariyah. Every subscription contributes to building community hubs worldwide.
                  </p>
                  <Link href="/overflow-economy">
                    <span className="text-emerald-400 hover:underline cursor-pointer">
                      Learn more about our mission →
                    </span>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Legal Disclaimer */}
          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="pt-8">
              <p className="text-gray-400 text-sm">
                <strong>Disclaimer:</strong> Protection effectiveness depends on correct device configuration and supported platforms. DNS-level filtering works system-wide but can be bypassed by some apps using encrypted DNS. For maximum protection, ensure your device is properly configured and keep your profile updated.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-8 px-4 text-center text-gray-500 text-sm">
        <div className="max-w-6xl mx-auto">
          <p>
            Need help? <Link href="/contact"><span className="text-emerald-400 hover:underline">Contact support</span></Link> or visit our <Link href="/faq"><span className="text-emerald-400 hover:underline">FAQ</span></Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
