import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { trpc } from "@/lib/trpc";
import { CheckCircle2, AlertCircle, Loader2, Link as LinkIcon } from "lucide-react";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";
import { useAuth } from "@/_core/hooks/useAuth";

export default function NextDNSConnect() {
  const { isAuthenticated } = useAuth({ redirectOnUnauthenticated: true });
  const [profileId, setProfileId] = useState("");
  const [verifying, setVerifying] = useState(false);

  const { data: status } = trpc.dns.getStatus.useQuery(undefined, {
    enabled: isAuthenticated,
  });

  const verifyMutation = trpc.dns.verifyConnection.useMutation({
    onSuccess: () => {
      toast.success("NextDNS account connected!");
      setProfileId("");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to verify connection");
    },
  });

  const handleVerify = async () => {
    if (!profileId.trim()) {
      toast.error("Please enter your NextDNS profile ID");
      return;
    }

    setVerifying(true);
    verifyMutation.mutate({ profileId: profileId.trim() });
    setVerifying(false);
  };

  if (status?.isConnected) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container py-12">
          <div className="max-w-2xl mx-auto">
            <Card className="border-2 border-emerald-200 bg-emerald-50">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <CheckCircle2 className="h-16 w-16 text-emerald-600" />
                </div>
                <CardTitle className="text-2xl">NextDNS Connected!</CardTitle>
                <CardDescription>Your DNS protection is active</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-center">
                <p className="text-lg font-semibold">Profile ID: {status.profileId}</p>
                <p className="text-sm text-muted-foreground">
                  Your devices are now protected with enterprise-grade DNS filtering.
                </p>
                <div className="bg-white rounded-lg p-4 text-left">
                  <p className="text-sm font-medium mb-2">What's Protected:</p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>✓ Explicit content & pornography</li>
                    <li>✓ Malware & phishing sites</li>
                    <li>✓ Trackers & data harvesters</li>
                    <li>✓ Addictive apps & social media</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container py-12">
        <div className="max-w-2xl mx-auto space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Connect Your NextDNS Account</h1>
            <p className="text-muted-foreground">
              Link your NextDNS profile to activate enterprise-grade DNS protection
            </p>
          </div>

          {/* Info Box */}
          <Card className="bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-900">
                <AlertCircle className="h-5 w-5" />
                What is NextDNS?
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-blue-900 space-y-2">
              <p>
                NextDNS is an enterprise-grade DNS service that blocks malicious content at the network level. 
                By connecting your account, NurGuard can manage your protection settings automatically.
              </p>
              <p>
                <strong>No additional cost.</strong> NextDNS is included with your NurGuard subscription.
              </p>
            </CardContent>
          </Card>

          {/* Connection Form */}
          <Card>
            <CardHeader>
              <CardTitle>Connect Account</CardTitle>
              <CardDescription>
                Enter your NextDNS profile ID to link your account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Step 1: Get Profile ID */}
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-emerald-100 text-emerald-700 font-bold text-sm flex-shrink-0">
                    1
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium mb-2">Get Your Profile ID</h4>
                    <ol className="text-sm text-muted-foreground space-y-1 ml-4 list-decimal">
                      <li>Go to <a href="https://nextdns.io" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline">nextdns.io</a></li>
                      <li>Sign in to your account</li>
                      <li>Copy your Profile ID from the dashboard (looks like: <code className="bg-gray-100 px-2 py-1 rounded text-xs">abc123def</code>)</li>
                    </ol>
                  </div>
                </div>
              </div>

              {/* Step 2: Enter Profile ID */}
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-emerald-100 text-emerald-700 font-bold text-sm flex-shrink-0">
                    2
                  </div>
                  <div className="flex-1 w-full">
                    <h4 className="font-medium mb-2">Enter Profile ID</h4>
                    <Input
                      placeholder="Enter your NextDNS profile ID"
                      value={profileId}
                      onChange={(e) => setProfileId(e.target.value)}
                      className="font-mono"
                    />
                    <p className="text-xs text-muted-foreground mt-2">
                      Your profile ID is case-sensitive and usually 6-9 characters
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 3: Verify */}
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-emerald-100 text-emerald-700 font-bold text-sm flex-shrink-0">
                    3
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium mb-2">Verify Connection</h4>
                    <Button
                      onClick={handleVerify}
                      disabled={verifyMutation.isPending || verifying || !profileId}
                      className="bg-emerald-600 hover:bg-emerald-700"
                      size="lg"
                    >
                      {verifyMutation.isPending || verifying ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Verifying...
                        </>
                      ) : (
                        <>
                          <LinkIcon className="h-4 w-4 mr-2" />
                          Connect Account
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>

              {/* Security Note */}
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-xs text-muted-foreground">
                  <strong>🔒 Security:</strong> Your NextDNS account remains secure. NurGuard only reads your profile settings 
                  and cannot access your account credentials.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Help Section */}
          <Card className="bg-gray-50">
            <CardHeader>
              <CardTitle className="text-base">Need Help?</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p>
                <strong>Can't find your profile ID?</strong> Log in to <a href="https://nextdns.io" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline">nextdns.io</a> and 
                look for it in your dashboard settings.
              </p>
              <p>
                <strong>Still stuck?</strong> <a href="/contact" className="text-emerald-600 hover:underline">Contact support</a> and we'll help you connect.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
