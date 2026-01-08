import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { Heart, Loader2 } from "lucide-react";

export function FoundationImpactCard() {
  const { data: foundationData, isLoading } = trpc.foundation.getTotal.useQuery();
  const totalDonations = foundationData?.total || 0;

  if (isLoading) {
    return (
      <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
        <CardContent className="flex items-center justify-center py-6">
          <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
        </CardContent>
      </Card>
    );
  }

  const mosqueCount = Math.floor((totalDonations || 0) / 1000); // Assuming $1000 per mosque
  const formattedAmount = ((totalDonations || 0) / 100).toFixed(2);

  return (
    <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-blue-900">
          <Heart className="h-5 w-5 text-red-500" />
          Community Impact
        </CardTitle>
        <CardDescription className="text-blue-700">
          20% of every subscription goes to Masajid Builder Foundation
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="p-4 bg-white rounded-lg border border-blue-100">
          <p className="text-sm text-muted-foreground">Total Donated</p>
          <p className="text-3xl font-bold text-blue-600">${formattedAmount}</p>
        </div>
        <p className="text-sm text-blue-700">
          {mosqueCount > 0
            ? `Your protection is helping build ${mosqueCount} mosques in underserved communities.`
            : "Every subscription helps build mosques in underserved communities."}
        </p>
      </CardContent>
    </Card>
  );
}
