import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { trpc } from "@/lib/trpc";
import { DollarSign, Send, AlertCircle, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";
import { useAuth } from "@/_core/hooks/useAuth";
import { Link } from "wouter";

export default function PayoutRequest() {
  const { isAuthenticated } = useAuth({ redirectOnUnauthenticated: true });
  const [paymentMethod, setPaymentMethod] = useState<"bank" | "paypal" | "crypto">("bank");
  const [amount, setAmount] = useState("");
  const [bankDetails, setBankDetails] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const { data: stats } = trpc.affiliate.getStats.useQuery(undefined, {
    enabled: isAuthenticated,
  });

  const requestMutation = trpc.affiliate.requestPayout.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      toast.success("Payout request submitted!");
      setTimeout(() => setSubmitted(false), 5000);
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to submit payout request");
    },
  });

  const handleSubmit = () => {
    const requestAmount = parseFloat(amount);
    
    if (!amount || requestAmount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    
    if (requestAmount < 10) {
      toast.error("Minimum payout is $10");
      return;
    }
    
    if (requestAmount > (stats?.availableBalance || 0)) {
      toast.error("Amount exceeds available balance");
      return;
    }
    
    if (paymentMethod === "bank" && !bankDetails) {
      toast.error("Please enter your bank details");
      return;
    }
    
    requestMutation.mutate({
      amount: requestAmount,
      paymentMethod,
      bankDetails: paymentMethod === "bank" ? bankDetails : undefined,
    });
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="flex items-center justify-center p-4 min-h-[calc(100vh-80px)]">
          <Card className="w-full max-w-md border-2 border-emerald-200 bg-emerald-50">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <CheckCircle2 className="h-16 w-16 text-emerald-600" />
              </div>
              <CardTitle className="text-2xl">Payout Requested!</CardTitle>
              <CardDescription>We'll process your request within 5-7 business days</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-center">
              <p className="text-lg font-semibold">${amount}</p>
              <p className="text-sm text-muted-foreground">
                You'll receive a confirmation email shortly
              </p>
              <Link href="/affiliate">
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                  Back to Dashboard
                </Button>
              </Link>
            </CardContent>
          </Card>
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
            <h1 className="text-3xl font-bold mb-2">Request Payout</h1>
            <p className="text-muted-foreground">Withdraw your affiliate earnings</p>
          </div>

          {/* Balance Info */}
          <Card className="bg-emerald-50 border-emerald-200">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Available Balance</p>
                  <p className="text-3xl font-bold text-emerald-600">
                    ${stats?.availableBalance?.toFixed(2) || "0.00"}
                  </p>
                </div>
                <DollarSign className="h-12 w-12 text-emerald-600 opacity-20" />
              </div>
            </CardContent>
          </Card>

          {/* Payout Form */}
          <Card>
            <CardHeader>
              <CardTitle>Payout Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Amount */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Amount to Withdraw</label>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold">$</span>
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    min="10"
                    step="0.01"
                    className="flex-1"
                  />
                </div>
                <p className="text-xs text-muted-foreground">Minimum: $10</p>
              </div>

              {/* Payment Method */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Payment Method</label>
                <div className="space-y-2">
                  {[
                    { value: "bank", label: "Bank Transfer (ACH)", description: "Direct to your US bank account" },
                    { value: "paypal", label: "PayPal", description: "Sent to your PayPal account" },
                    { value: "crypto", label: "Cryptocurrency", description: "Bitcoin or Ethereum" },
                  ].map((method) => (
                    <label key={method.value} className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-slate-50">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method.value}
                        checked={paymentMethod === method.value}
                        onChange={(e) => setPaymentMethod(e.target.value as any)}
                        className="w-4 h-4"
                      />
                      <div>
                        <p className="font-medium">{method.label}</p>
                        <p className="text-xs text-muted-foreground">{method.description}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Bank Details (if bank transfer selected) */}
              {paymentMethod === "bank" && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Bank Details</label>
                  <textarea
                    placeholder="Account holder name, bank name, account number, routing number"
                    value={bankDetails}
                    onChange={(e) => setBankDetails(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg min-h-24"
                  />
                  <p className="text-xs text-muted-foreground">We'll keep this information secure</p>
                </div>
              )}

              {/* Info Box */}
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg flex gap-3">
                <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-blue-900">
                  <p className="font-medium mb-1">Processing Time</p>
                  <p>Payouts are processed within 5-7 business days. You'll receive a confirmation email.</p>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                onClick={handleSubmit}
                disabled={requestMutation.isPending || !amount}
                className="w-full bg-emerald-600 hover:bg-emerald-700"
                size="lg"
              >
                {requestMutation.isPending ? (
                  <>
                    <Send className="h-4 w-4 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Request Payout
                  </>
                )}
              </Button>

              <Link href="/affiliate">
                <Button variant="outline" className="w-full">
                  Back to Dashboard
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
