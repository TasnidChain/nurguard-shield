import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Copy, ChevronDown } from "lucide-react";
import { Link } from "wouter";
import Navigation from "@/components/Navigation";

type Platform = "ios" | "android" | "windows" | "mac" | "linux" | null;

export default function DeviceSetup() {
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Detect platform
    const ua = navigator.userAgent.toLowerCase();
    if (ua.includes("iphone") || ua.includes("ipad")) {
      setSelectedPlatform("ios");
    } else if (ua.includes("android")) {
      setSelectedPlatform("android");
    } else if (ua.includes("win")) {
      setSelectedPlatform("windows");
    } else if (ua.includes("mac")) {
      setSelectedPlatform("mac");
    } else if (ua.includes("linux")) {
      setSelectedPlatform("linux");
    }
  }, []);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navigation />

      {/* Hero */}
      <section className="py-16 px-4 bg-gradient-to-b from-gray-900 to-gray-950 border-b border-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Set Up Your Shield
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Choose your device and follow the step-by-step instructions. Takes less than 60 seconds.
          </p>
        </div>
      </section>

      {/* Platform Selection */}
      <section className="py-12 px-4 bg-gray-950">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">Select Your Device</h2>

          <div className="grid md:grid-cols-2 gap-4 mb-12">
            {[
              { id: "ios", label: "iPhone / iPad", icon: "🍎" },
              { id: "android", label: "Android Phone", icon: "🤖" },
              { id: "windows", label: "Windows PC", icon: "🪟" },
              { id: "mac", label: "Mac", icon: "🍎" },
              { id: "linux", label: "Linux", icon: "🐧" },
            ].map((platform) => (
              <button
                key={platform.id}
                onClick={() => setSelectedPlatform(platform.id as Platform)}
                className={`p-4 rounded-lg border-2 transition ${
                  selectedPlatform === platform.id
                    ? "border-emerald-500 bg-emerald-500/10"
                    : "border-gray-700 bg-gray-900 hover:border-gray-600"
                }`}
              >
                <div className="text-3xl mb-2">{platform.icon}</div>
                <div className="font-semibold">{platform.label}</div>
              </button>
            ))}
          </div>

          {/* Instructions */}
          {selectedPlatform && (
            <div className="space-y-8">
              {selectedPlatform === "ios" && (
                <Card className="bg-gray-900 border-emerald-500/30">
                  <CardContent className="pt-8">
                    <h3 className="text-2xl font-bold mb-6 text-emerald-400">
                      iOS Setup (iPhone / iPad)
                    </h3>
                    <div className="space-y-6">
                      <div>
                        <div className="flex items-start gap-4 mb-4">
                          <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center flex-shrink-0 font-bold">
                            1
                          </div>
                          <div>
                            <h4 className="font-bold mb-2">Open Settings</h4>
                            <p className="text-gray-300">
                              Go to Settings → Wi-Fi (or Cellular)
                            </p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="flex items-start gap-4 mb-4">
                          <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center flex-shrink-0 font-bold">
                            2
                          </div>
                          <div>
                            <h4 className="font-bold mb-2">Select Your Network</h4>
                            <p className="text-gray-300">
                              Tap the "i" icon next to your WiFi network name
                            </p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="flex items-start gap-4 mb-4">
                          <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center flex-shrink-0 font-bold">
                            3
                          </div>
                          <div>
                            <h4 className="font-bold mb-2">Configure DNS</h4>
                            <p className="text-gray-300 mb-4">
                              Tap "DNS" and select "Manual"
                            </p>
                            <div className="bg-gray-800 p-4 rounded border border-gray-700 mb-4">
                              <p className="text-sm text-gray-400 mb-2">Primary DNS:</p>
                              <div className="flex items-center gap-2">
                                <code className="text-emerald-400 font-mono flex-1">
                                  dns.nurguard.app
                                </code>
                                <button
                                  onClick={() => copyToClipboard("dns.nurguard.app")}
                                  className="p-2 hover:bg-gray-700 rounded"
                                >
                                  {copied ? (
                                    <Check className="w-4 h-4 text-emerald-400" />
                                  ) : (
                                    <Copy className="w-4 h-4 text-gray-400" />
                                  )}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="flex items-start gap-4 mb-4">
                          <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center flex-shrink-0 font-bold">
                            4
                          </div>
                          <div>
                            <h4 className="font-bold mb-2">Save & Verify</h4>
                            <p className="text-gray-300">
                              Tap "Save". Your device is now protected.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {selectedPlatform === "android" && (
                <Card className="bg-gray-900 border-emerald-500/30">
                  <CardContent className="pt-8">
                    <h3 className="text-2xl font-bold mb-6 text-emerald-400">
                      Android Setup
                    </h3>
                    <div className="space-y-6">
                      <div>
                        <div className="flex items-start gap-4 mb-4">
                          <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center flex-shrink-0 font-bold">
                            1
                          </div>
                          <div>
                            <h4 className="font-bold mb-2">Open Settings</h4>
                            <p className="text-gray-300">
                              Go to Settings → Network & Internet → Private DNS
                            </p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="flex items-start gap-4 mb-4">
                          <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center flex-shrink-0 font-bold">
                            2
                          </div>
                          <div>
                            <h4 className="font-bold mb-2">Select Provider</h4>
                            <p className="text-gray-300 mb-4">
                              Choose "Private DNS provider hostname"
                            </p>
                            <div className="bg-gray-800 p-4 rounded border border-gray-700 mb-4">
                              <p className="text-sm text-gray-400 mb-2">Enter hostname:</p>
                              <div className="flex items-center gap-2">
                                <code className="text-emerald-400 font-mono flex-1">
                                  dns.nurguard.app
                                </code>
                                <button
                                  onClick={() => copyToClipboard("dns.nurguard.app")}
                                  className="p-2 hover:bg-gray-700 rounded"
                                >
                                  {copied ? (
                                    <Check className="w-4 h-4 text-emerald-400" />
                                  ) : (
                                    <Copy className="w-4 h-4 text-gray-400" />
                                  )}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="flex items-start gap-4 mb-4">
                          <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center flex-shrink-0 font-bold">
                            3
                          </div>
                          <div>
                            <h4 className="font-bold mb-2">Confirm</h4>
                            <p className="text-gray-300">
                              Tap "Save". Your device is now protected.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {selectedPlatform === "windows" && (
                <Card className="bg-gray-900 border-emerald-500/30">
                  <CardContent className="pt-8">
                    <h3 className="text-2xl font-bold mb-6 text-emerald-400">
                      Windows Setup
                    </h3>
                    <div className="space-y-6">
                      <div>
                        <div className="flex items-start gap-4 mb-4">
                          <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center flex-shrink-0 font-bold">
                            1
                          </div>
                          <div>
                            <h4 className="font-bold mb-2">Open Settings</h4>
                            <p className="text-gray-300">
                              Right-click network icon → Network & Internet settings
                            </p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="flex items-start gap-4 mb-4">
                          <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center flex-shrink-0 font-bold">
                            2
                          </div>
                          <div>
                            <h4 className="font-bold mb-2">Edit DNS</h4>
                            <p className="text-gray-300 mb-4">
                              Click "Change adapter options" → Right-click your connection → Properties → IPv4 → Properties
                            </p>
                            <div className="bg-gray-800 p-4 rounded border border-gray-700 mb-4">
                              <p className="text-sm text-gray-400 mb-2">Preferred DNS:</p>
                              <div className="flex items-center gap-2">
                                <code className="text-emerald-400 font-mono flex-1">
                                  dns.nurguard.app
                                </code>
                                <button
                                  onClick={() => copyToClipboard("dns.nurguard.app")}
                                  className="p-2 hover:bg-gray-700 rounded"
                                >
                                  {copied ? (
                                    <Check className="w-4 h-4 text-emerald-400" />
                                  ) : (
                                    <Copy className="w-4 h-4 text-gray-400" />
                                  )}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="flex items-start gap-4 mb-4">
                          <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center flex-shrink-0 font-bold">
                            3
                          </div>
                          <div>
                            <h4 className="font-bold mb-2">Apply & Restart</h4>
                            <p className="text-gray-300">
                              Click OK and restart your browser. Your device is now protected.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {selectedPlatform === "mac" && (
                <Card className="bg-gray-900 border-emerald-500/30">
                  <CardContent className="pt-8">
                    <h3 className="text-2xl font-bold mb-6 text-emerald-400">
                      Mac Setup
                    </h3>
                    <div className="space-y-6">
                      <div>
                        <div className="flex items-start gap-4 mb-4">
                          <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center flex-shrink-0 font-bold">
                            1
                          </div>
                          <div>
                            <h4 className="font-bold mb-2">Open System Preferences</h4>
                            <p className="text-gray-300">
                              Apple menu → System Preferences → Network
                            </p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="flex items-start gap-4 mb-4">
                          <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center flex-shrink-0 font-bold">
                            2
                          </div>
                          <div>
                            <h4 className="font-bold mb-2">Select Connection</h4>
                            <p className="text-gray-300">
                              Click your active connection → Advanced → DNS tab
                            </p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="flex items-start gap-4 mb-4">
                          <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center flex-shrink-0 font-bold">
                            3
                          </div>
                          <div>
                            <h4 className="font-bold mb-2">Add DNS Server</h4>
                            <p className="text-gray-300 mb-4">
                              Click "+" and enter the NurGuard DNS server
                            </p>
                            <div className="bg-gray-800 p-4 rounded border border-gray-700 mb-4">
                              <p className="text-sm text-gray-400 mb-2">DNS Server:</p>
                              <div className="flex items-center gap-2">
                                <code className="text-emerald-400 font-mono flex-1">
                                  dns.nurguard.app
                                </code>
                                <button
                                  onClick={() => copyToClipboard("dns.nurguard.app")}
                                  className="p-2 hover:bg-gray-700 rounded"
                                >
                                  {copied ? (
                                    <Check className="w-4 h-4 text-emerald-400" />
                                  ) : (
                                    <Copy className="w-4 h-4 text-gray-400" />
                                  )}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="flex items-start gap-4 mb-4">
                          <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center flex-shrink-0 font-bold">
                            4
                          </div>
                          <div>
                            <h4 className="font-bold mb-2">Apply</h4>
                            <p className="text-gray-300">
                              Click "OK" → "Apply". Your device is now protected.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {selectedPlatform === "linux" && (
                <Card className="bg-gray-900 border-emerald-500/30">
                  <CardContent className="pt-8">
                    <h3 className="text-2xl font-bold mb-6 text-emerald-400">
                      Linux Setup
                    </h3>
                    <div className="space-y-6">
                      <p className="text-gray-300 mb-4">
                        Configure DNS through your network manager or edit /etc/resolv.conf:
                      </p>
                      <div className="bg-gray-800 p-4 rounded border border-gray-700 mb-4">
                        <p className="text-sm text-gray-400 mb-2">Add to /etc/resolv.conf:</p>
                        <div className="flex items-center gap-2">
                          <code className="text-emerald-400 font-mono flex-1">
                            nameserver dns.nurguard.app
                          </code>
                          <button
                            onClick={() => copyToClipboard("nameserver dns.nurguard.app")}
                            className="p-2 hover:bg-gray-700 rounded"
                          >
                            {copied ? (
                              <Check className="w-4 h-4 text-emerald-400" />
                            ) : (
                              <Copy className="w-4 h-4 text-gray-400" />
                            )}
                          </button>
                        </div>
                      </div>
                      <p className="text-gray-300">
                        Or use your network manager GUI to set the DNS server to dns.nurguard.app
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Next Steps */}
              <Card className="bg-emerald-950/20 border-emerald-500/30">
                <CardContent className="pt-8">
                  <h3 className="text-xl font-bold mb-4 text-emerald-400">
                    ✓ Setup Complete
                  </h3>
                  <p className="text-gray-300 mb-6">
                    Your device is now configured with NurGuard protection. You can now select your filtering profile and start protecting your digital life.
                  </p>
                  <Link href="/profile-select">
                    <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                      Select Your Protection Profile
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          )}

          {!selectedPlatform && (
            <Card className="bg-gray-900 border-gray-800 text-center py-12">
              <p className="text-gray-400">
                Select your device above to see setup instructions
              </p>
            </Card>
          )}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 bg-gray-950 border-t border-gray-800">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Troubleshooting</h2>
          <div className="space-y-4">
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="pt-6">
                <h3 className="font-bold mb-2">DNS not working?</h3>
                <p className="text-gray-300 text-sm">
                  Restart your device after configuring DNS. It may take a few minutes to activate.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="pt-6">
                <h3 className="font-bold mb-2">Still seeing blocked content?</h3>
                <p className="text-gray-300 text-sm">
                  Clear your browser cache and restart. Some apps cache content before DNS filtering applies.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="pt-6">
                <h3 className="font-bold mb-2">Need help?</h3>
                <p className="text-gray-300 text-sm">
                  <Link href="/contact"><span className="text-emerald-400 hover:underline">Contact support</span></Link> for additional assistance.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
