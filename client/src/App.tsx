import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Subscribe from "./pages/Subscribe";
import Affiliate from "./pages/Affiliate";
import Settings from "./pages/Settings";

import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import { Loader2 } from "lucide-react";

// Pages to be created
import HowItWorks from "./pages/HowItWorks";
import Pricing from "./pages/Pricing";
import Setup from "./pages/Setup";
import Earn from "./pages/Earn";
import AppPage from "./pages/App";
import Support from "./pages/Support";

function Router() {
  const { isAuthenticated, loading } = useAuth();

  // Show loading while checking auth
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }



  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/how-it-works" component={HowItWorks} />
      <Route path="/pricing" component={Pricing} />
      <Route path="/setup" component={Setup} />
      <Route path="/earn" component={Earn} />
      <Route path="/app" component={AppPage} />
      <Route path="/support" component={Support} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/terms" component={Terms} />
      <Route path="/contact" component={Contact} />
      <Route path="/faq" component={FAQ} />

      <Route path="/dashboard" component={Dashboard} />
      <Route path="/subscribe" component={Subscribe} />
      <Route path="/affiliate" component={Affiliate} />
      <Route path="/settings" component={Settings} />
      <Route path="*" component={Home} />
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
