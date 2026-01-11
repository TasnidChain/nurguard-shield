import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { trpc } from "@/lib/trpc";
import { Gift, Copy, Trash2, Plus, Loader2 } from "lucide-react";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";
import { useAuth } from "@/_core/hooks/useAuth";

export default function AdminGiftCodes() {
  const { user } = useAuth();
  const [durationMonths, setDurationMonths] = useState(1);
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);

  // Only allow admin users
  if (user?.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-muted-foreground">Access denied. Admin only.</p>
        </div>
      </div>
    );
  }

  const { data: giftCodes, isLoading, refetch } = trpc.gift.list.useQuery(undefined, {
    enabled: user?.role === "admin",
  });

  const generateMutation = trpc.gift.generate.useMutation({
    onSuccess: (data: any) => {
      setGeneratedCode(data.code);
      toast.success("Gift code generated!");
      refetch();
      setDurationMonths(1);
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to generate gift code");
    },
  });

  const deleteMutation = trpc.gift.delete.useMutation({
    onSuccess: () => {
      toast.success("Gift code deleted");
      refetch();
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to delete gift code");
    },
  });

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success("Code copied!");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container py-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Gift Code Management</h1>
          <p className="text-muted-foreground">Create and manage gift codes for users</p>
        </div>

        {/* Generate New Code */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Generate New Gift Code
            </CardTitle>
            <CardDescription>Create a gift code for a specific duration</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Duration (months)</label>
              <select
                value={durationMonths}
                onChange={(e) => setDurationMonths(Number(e.target.value))}
                className="w-full px-3 py-2 border rounded-lg"
              >
                <option value={1}>1 month</option>
                <option value={3}>3 months</option>
                <option value={6}>6 months</option>
                <option value={12}>12 months</option>
              </select>
            </div>

            <Button
              onClick={() => generateMutation.mutate({ durationMonths })}
              disabled={generateMutation.isPending}
              className="w-full bg-emerald-600 hover:bg-emerald-700"
            >
              {generateMutation.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Gift className="h-4 w-4 mr-2" />
                  Generate Code
                </>
              )}
            </Button>

            {generatedCode && (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
                <p className="text-sm text-muted-foreground mb-2">New code generated:</p>
                <div className="flex items-center justify-between gap-2">
                  <code className="font-mono font-bold text-lg">{generatedCode}</code>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyCode(generatedCode)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Gift Codes List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gift className="h-5 w-5" />
              All Gift Codes
            </CardTitle>
            <CardDescription>
              {giftCodes?.length || 0} total codes
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center py-6">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
              </div>
            ) : giftCodes && giftCodes.length > 0 ? (
              <div className="space-y-3">
                {giftCodes.map((code) => (
                  <div
                    key={code.id}
                    className="flex items-center justify-between p-4 bg-slate-50 rounded-lg"
                  >
                    <div>
                      <div className="flex items-center gap-3">
                        <code className="font-mono font-bold">{code.code}</code>
                        <span
                          className={`text-xs px-2 py-1 rounded font-medium ${
                            code.status === "available"
                              ? "bg-emerald-100 text-emerald-800"
                              : code.status === "redeemed"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {code.status}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {code.durationMonths} month{code.durationMonths > 1 ? "s" : ""} •{" "}
                        {code.status === "redeemed"
                          ? `Redeemed by user #${code.redeemedById}`
                          : "Not redeemed"}
                      </p>
                      {code.purchasedAt && (
                        <p className="text-xs text-muted-foreground">
                          Created {new Date(code.purchasedAt).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyCode(code.code)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      {code.status === "available" && (
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => deleteMutation.mutate({ id: code.id })}
                          disabled={deleteMutation.isPending}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-6">No gift codes yet</p>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
