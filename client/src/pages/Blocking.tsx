import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { trpc } from "@/lib/trpc";
import { Shield, Plus, Trash2, ArrowLeft, Globe, Smartphone, Type, Loader2, AlertCircle, CheckCircle } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

export default function Blocking() {
  const { isAuthenticated } = useAuth({ redirectOnUnauthenticated: true });
  const { data: subscription } = trpc.subscription.getStatus.useQuery(undefined, {
    enabled: isAuthenticated,
  });
  
  if (!subscription?.isActive) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Shield className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
          <h1 className="text-2xl font-bold mb-2">Upgrade to Shield</h1>
          <p className="text-muted-foreground mb-6">Subscribe to manage blocking rules</p>
          <Link href="/subscribe">
            <Button>Subscribe Now</Button>
          </Link>
        </div>
      </div>
    );
  }
  
  const [newRule, setNewRule] = useState({ type: "website" as "website" | "app" | "keyword" | "category", value: "", limit: "" });
  
  const utils = trpc.useUtils();
  const { data: rules, isLoading } = trpc.blocking.list.useQuery();
  
  const createMutation = trpc.blocking.create.useMutation({
    onSuccess: () => {
      utils.blocking.list.invalidate();
      setNewRule({ type: "website", value: "", limit: "" });
      toast.success("Blocking rule created");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const updateMutation = trpc.blocking.update.useMutation({
    onSuccess: () => {
      utils.blocking.list.invalidate();
    },
  });

  const deleteMutation = trpc.blocking.delete.useMutation({
    onSuccess: () => {
      utils.blocking.list.invalidate();
      toast.success("Rule deleted");
    },
  });

  const handleCreate = () => {
    if (!newRule.value.trim()) {
      toast.error("Please enter a value");
      return;
    }
    createMutation.mutate({
      ruleType: newRule.type,
      value: newRule.value.trim(),
      dailyLimitMinutes: newRule.limit ? parseInt(newRule.limit) : undefined,
    });
  };

  const handleToggle = (id: number, isActive: boolean) => {
    updateMutation.mutate({ id, isActive });
  };

  const handleDelete = (id: number) => {
    deleteMutation.mutate({ id });
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "website": return <Globe className="h-4 w-4" />;
      case "app": return <Smartphone className="h-4 w-4" />;
      case "keyword": return <Type className="h-4 w-4" />;
      default: return <Shield className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container py-6">
        {/* DNS Status Banner */}
        <Card className="mb-6 bg-yellow-950/30 border-yellow-500/30">
          <CardContent className="pt-6">
            <div className="flex gap-4 items-start">
              <AlertCircle className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-yellow-400 mb-2">⚠️ Important: DNS Setup Required</h3>
                <p className="text-yellow-300 text-sm mb-3">
                  NurGuard currently uses DNS-based protection. This provides real blocking but can be bypassed by changing DNS settings. Native VPN protection is coming in a future update.
                </p>
                <Link href="/setup-dns">
                  <Button variant="outline" size="sm" className="text-yellow-400 border-yellow-500/50 hover:bg-yellow-950/30">
                    Complete DNS Setup
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* DNS Status Card */}
        <Card className="mb-6 bg-gray-900 border-emerald-500/30">
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <p className="text-gray-400 text-sm mb-2">Protection Method</p>
                <p className="font-bold">DNS-Based Blocking</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-2">Status</p>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <p className="font-bold">Setup Required</p>
                </div>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-2">Protection Level</p>
                <p className="font-bold">Basic (Phase 1)</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Add New Rule */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Blocking Rules (DNS-Enforced)</CardTitle>
            <CardDescription>These rules are enforced through your device's DNS settings. For maximum protection, ensure NurGuard DNS is active.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Type</Label>
                  <Select
                    value={newRule.type}
                    onValueChange={(v) => setNewRule({ ...newRule, type: v as any })}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="website">Website</SelectItem>
                      <SelectItem value="app">App</SelectItem>
                      <SelectItem value="keyword">Keyword</SelectItem>
                      <SelectItem value="category">Category</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Daily Limit (minutes)</Label>
                  <Input
                    type="number"
                    placeholder="Leave empty to fully block"
                    value={newRule.limit}
                    onChange={(e) => setNewRule({ ...newRule, limit: e.target.value })}
                    className="mt-1"
                  />
                </div>
              </div>
              <div>
                <Label>
                  {newRule.type === "website" && "Website URL or domain"}
                  {newRule.type === "app" && "App name"}
                  {newRule.type === "keyword" && "Keyword to block"}
                  {newRule.type === "category" && "Category name"}
                </Label>
                <Input
                  placeholder={
                    newRule.type === "website" ? "e.g., facebook.com" :
                    newRule.type === "app" ? "e.g., TikTok" :
                    newRule.type === "keyword" ? "e.g., gambling" :
                    "e.g., social-media"
                  }
                  value={newRule.value}
                  onChange={(e) => setNewRule({ ...newRule, value: e.target.value })}
                  className="mt-1"
                />
              </div>
              <Button onClick={handleCreate} disabled={createMutation.isPending}>
                {createMutation.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : (
                  <Plus className="h-4 w-4 mr-2" />
                )}
                Add Rule
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Rules List */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Active Rules</CardTitle>
            <CardDescription>{rules?.length || 0} rules configured</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
              </div>
            ) : rules?.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Shield className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No blocking rules yet.</p>
                <p className="text-sm">Add your first rule above to start protecting yourself.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {rules?.map((rule) => (
                  <div
                    key={rule.id}
                    className="flex items-center justify-between p-3 rounded-lg border bg-card"
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-muted-foreground">
                        {getIcon(rule.ruleType)}
                      </div>
                      <div>
                        <p className="font-medium">{rule.value}</p>
                        <p className="text-xs text-muted-foreground">
                          {rule.ruleType} • {rule.dailyLimitMinutes ? `${rule.dailyLimitMinutes}min/day` : "Fully blocked"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={rule.isActive}
                        onCheckedChange={(checked) => handleToggle(rule.id, checked)}
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(rule.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
