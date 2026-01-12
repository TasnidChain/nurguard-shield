import { Link } from "wouter";
import { Shield } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-950 border-t border-gray-800 mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-6 h-6 text-emerald-500" />
              <span className="text-lg font-bold">NurGuard</span>
            </div>
            <p className="text-gray-400 text-sm">
              Digital protection for the modern believer. Guard your iman, mind, and devices.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold text-white mb-4">Product</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/download" className="text-gray-400 hover:text-emerald-500 transition">
                  Download App
                </Link>
              </li>
              <li>
                <Link href="/device-setup" className="text-gray-400 hover:text-emerald-500 transition">
                  Setup Guide
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-400 hover:text-emerald-500 transition">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/economy" className="text-gray-400 hover:text-emerald-500 transition">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="font-semibold text-white mb-4">Community</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/affiliate-public" className="text-gray-400 hover:text-emerald-500 transition">
                  Affiliate Program
                </Link>
              </li>
              <li>
                <Link href="/vision" className="text-gray-400 hover:text-emerald-500 transition">
                  Our Vision
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-emerald-500 transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-white mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-emerald-500 transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-emerald-500 transition">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/refund-policy" className="text-gray-400 hover:text-emerald-500 transition">
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2026 NurGuard Shield. Built with niyyah for the modern believer.
            </p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-emerald-500 transition">
                Twitter
              </a>
              <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-emerald-500 transition">
                Discord
              </a>
              <a href="https://telegram.org" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-emerald-500 transition">
                Telegram
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
