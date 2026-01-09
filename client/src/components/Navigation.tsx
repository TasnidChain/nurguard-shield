import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Shield, Menu, X } from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";

interface NavigationProps {
  theme?: 'dark' | 'slate';
}

export default function Navigation({ theme = 'dark' }: NavigationProps) {
  const { isAuthenticated } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const bgColor = theme === 'slate' ? 'bg-slate-900/95' : 'bg-gray-950/95';
  const borderColor = theme === 'slate' ? 'border-slate-800' : 'border-gray-800';
  const mobileBg = theme === 'slate' ? 'bg-slate-800' : 'bg-gray-900';

  return (
    <nav className={`sticky top-0 z-50 ${bgColor} backdrop-blur border-b ${borderColor}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition">
          <Shield className="w-8 h-8 text-emerald-500" />
          <span className="text-xl font-bold">NurGuard</span>
        </Link>

        <div className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/affiliate-public" className="text-gray-300 hover:text-emerald-500 transition">
            Earn 30%
          </Link>
          <Link href="/economy" className="text-gray-300 hover:text-emerald-500 transition">
            Our Model
          </Link>
          <Link href="/vision" className="text-gray-300 hover:text-emerald-500 transition">
            Our Vision
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {isAuthenticated && (
            <Link href="/dashboard">
              <Button className="bg-emerald-600 hover:bg-emerald-700">Dashboard</Button>
            </Link>
          )}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-gray-300 hover:text-emerald-500 transition"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className={`md:hidden ${mobileBg} border-t ${borderColor} py-4 px-4`}>
          <div className="space-y-3">
            <Link
              href="/affiliate-public"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-gray-300 hover:text-emerald-500 transition py-2"
            >
              Earn 30%
            </Link>
            <Link
              href="/economy"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-gray-300 hover:text-emerald-500 transition py-2"
            >
              Our Model
            </Link>
            <Link
              href="/vision"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-gray-300 hover:text-emerald-500 transition py-2"
            >
              Our Vision
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
