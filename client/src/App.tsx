import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Subscribe from "./pages/Subscribe";
import Blocking from "./pages/Blocking";
import Affiliate from "./pages/Affiliate";
import Settings from "./pages/Settings";
import Onboarding from "./pages/Onboarding";
import AffiliatePublic from "./pages/AffiliatePublic";
import OverflowEconomy from "./pages/OverflowEconomy";
import VisionPage from "./pages/VisionPage";
import Download from "./pages/Download";
import CheckoutSuccess from "./pages/CheckoutSuccess";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import RefundPolicy from "./pages/RefundPolicy";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";

import PayoutRequest from "./pages/PayoutRequest";
import NextDNSConnect from "./pages/NextDNSConnect";
import SetupDNS from "./pages/SetupDNS";
import DeviceSetup from "./pages/DeviceSetup";
import ProfileSelect from "./pages/ProfileSelect";
import DashboardV2 from "./pages/DashboardV2";
import { Loader2 } from "lucide-react";

function Router() {
  const { isAuthenticated, loading } = useAuth();
  const { data: onboardingStatus } = trpc.onboarding.getStatus.useQuery(undefined, {
    enabled: isAuthenticated,
  });

  // Show loading while checking auth
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // Force onboarding if user is authenticated but hasn't completed it
  if (isAuthenticated && onboardingStatus && !onboardingStatus.hasCompletedOnboarding) {
    return <Onboarding />;
  }

  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/affiliate-public" component={AffiliatePublic} />
      <Route path="/economy" component={OverflowEconomy} />
      <Route path="/vision" component={VisionPage} />
      <Route path="/onboarding" component={Onboarding} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/subscribe" component={Subscribe} />
      <Route path="/blocking" component={Blocking} />
      <Route path="/affiliate" component={Affiliate} />
      <Route path="/settings" component={Settings} />
      <Route path="/download" component={Download} />
      <Route path="/checkout/success" component={CheckoutSuccess} />
      <Route path="/setup-dns" component={SetupDNS} />
      <Route path="/device-setup" component={DeviceSetup} />
      <Route path="/profile-select" component={ProfileSelect} />
      <Route path="/dashboard-v2" component={DashboardV2} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/terms" component={Terms} />
      <Route path="/refund-policy" component={RefundPolicy} />
      <Route path="/contact" component={Contact} />
      <Route path="/faq" component={FAQ} />
      <Route path="/payout" component={PayoutRequest} />
      <Route path="/nextdns-connect" component={NextDNSConnect} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
