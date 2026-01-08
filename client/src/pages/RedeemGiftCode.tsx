import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { trpc } from "@/lib/trpc";
import { Shield, Gift, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { Link, useLocation } from "wouter";
import { toast } from "sonner";

export default function RedeemGiftCode() {
  const [code, setCode] = useState("");
  const [, setLocation] = useLocation();
  const [isRedeemed, setIsRedeemed] = useState(false);

  const redeemMutation = trpc.subscription.redeemGiftCode.useMutation({
    onSuccess: () => {
      setIsRedeemed(true);
      toast.success("Gift code redeemed! Your protection is now active.");
      setTimeout(() => {
        setLocation("/dashboard");
      }, 2000);
    },
    onError: (error) => {
      toast.error(error.message || "Invalid or expired gift code");
    },
  });

  const handleRedeem = () => {
    if (!code.trim()) {
      toast.error("Please enter a gift code");
      return;
    }
    redeemMutation.mutate({ code: code.toUpperCase() });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleRedeem();
    }
  };

  if (isRedeemed) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md border-2 border-emerald-200 bg-emerald-50">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <CheckCircle2 className="h-16 w-16 text-emerald-600" />
            </div>
            <CardTitle className="text-2xl">🎉 Success!</CardTitle>
            <CardDescription>Your gift code has been redeemed</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-center">
            <p className="text-lg font-semibold">Your protection is now active for 1 month.</p>
            <p className="text-sm text-muted-foreground">Redirecting to your dashboard...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Gift className="h-12 w-12 text-emerald-600" />
          </div>
          <CardTitle className="text-2xl">Redeem Gift Code</CardTitle>
          <CardDescription>Enter your gift code to activate free protection</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Gift Code</label>
            <Input
              placeholder="Enter your code"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              onKeyPress={handleKeyPress}
              disabled={redeemMutation.isPending}
              className="text-center text-lg font-mono tracking-widest"
            />
          </div>

          <Button
            onClick={handleRedeem}
            disabled={redeemMutation.isPending || !code.trim()}
            className="w-full bg-emerald-600 hover:bg-emerald-700"
            size="lg"
          >
            {redeemMutation.isPending ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Redeeming...
              </>
            ) : (
              "Redeem Code"
            )}
          </Button>

          {redeemMutation.error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex gap-2">
              <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-red-900">Redemption Failed</p>
                <p className="text-xs text-red-700">{redeemMutation.error.message}</p>
              </div>
            </div>
          )}

          <div className="pt-4 border-t">
            <p className="text-sm text-muted-foreground text-center mb-3">Don't have a code?</p>
            <Link href="/subscribe">
              <Button variant="outline" className="w-full">
                <Shield className="h-4 w-4 mr-2" />
                Subscribe Instead
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
