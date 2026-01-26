import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import TrustQuotes from "@/components/TrustQuotes";
import { ArrowRight, Pause, Shield, Clock, BarChart3, Zap } from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-950 text-white overflow-hidden">
      <Navigation />

      {/* Hero Section - Asymmetric with Visual Depth */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background gradient orbs */}
        <div className="absolute top-20 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-emerald-600/5 rounded-full blur-3xl -z-10"></div>

        <div className="container max-w-6xl mx-auto px-4 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text Content */}
            <div className="space-y-8 z-10">
              <div className="space-y-4">
                <div className="inline-block px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full">
                  <p className="text-sm text-emerald-400 font-semibold">Digital Protection</p>
                </div>
                
                <h1 className="text-6xl lg:text-7xl font-bold leading-tight">
                  A pause between
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600">
                    impulse and action
                  </span>
                </h1>
                
                <p className="text-xl text-gray-300 leading-relaxed max-w-lg">
                  NurGuard gently interrupts distractions — so you can choose on purpose. Built for Muslims. Useful for everyone.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href="/pricing">
                  <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-lg hover:shadow-emerald-500/50 transition-all hover:scale-105">
                    Get NurGuard — $33/year
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
                <Link href="/how-it-works">
                  <Button size="lg" variant="outline" className="border-gray-700 text-gray-200 hover:bg-gray-800/50 hover:border-emerald-500/50 transition-all">
                    Learn How It Works
                  </Button>
                </Link>
              </div>

              <div className="pt-8 space-y-2">
                <p className="text-sm text-gray-400">
                  <span className="text-emerald-400 font-semibold">No ads.</span> No data selling. No distractions disguised as "features."
                </p>
              </div>
            </div>

            {/* Right: Visual Element */}
            <div className="relative h-96 lg:h-full min-h-96 hidden lg:flex items-center justify-center">
              <div className="relative w-full h-full flex items-center justify-center">
                {/* Animated background card */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/20 to-gray-900/20 rounded-3xl border border-emerald-500/20 backdrop-blur-sm"></div>
                
                {/* Pause icon visualization */}
                <div className="relative z-10 flex flex-col items-center justify-center space-y-8">
                  <div className="w-32 h-32 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center shadow-2xl shadow-emerald-500/50">
                    <Pause className="w-16 h-16 text-white" />
                  </div>
                  <div className="text-center space-y-2">
                    <p className="text-sm text-gray-300 font-semibold">The moment that matters</p>
                    <p className="text-xs text-gray-500">Before the scroll begins</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Actually Happens - Enhanced */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900/50 to-gray-950">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-5xl font-bold">What actually happens</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">Four simple steps. One powerful moment.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { num: "1", title: "You open Instagram", desc: "Just like always." },
              { num: "2", title: "NurGuard pauses you", desc: "Before the scroll begins." },
              { num: "3", title: "A question appears", desc: "What's your intention?" },
              { num: "4", title: "You choose", desc: "Or you walk away." },
            ].map((step, idx) => (
              <div
                key={idx}
                className="group relative p-6 bg-gray-900/50 border border-gray-800 rounded-xl hover:border-emerald-500/50 hover:bg-gray-900/80 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/10"
              >
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  {step.num}
                </div>
                <div className="pt-4 space-y-2">
                  <h3 className="text-lg font-semibold group-hover:text-emerald-400 transition">{step.title}</h3>
                  <p className="text-gray-400 text-sm">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cinematic Feature Showcase */}
      <section className="py-0">
        {[
          {
            image: "/hero-1-guard-attention.jpg",
            title: "Guard your attention.",
            subtitle: "Digital protection for a focused life.",
          },
          {
            image: "/hero-2-not-everything.jpg",
            title: "Not everything",
            subtitle: "online is meant for you.",
          },
          {
            image: "/hero-3-network-blocking.jpg",
            title: "NurGuard blocks harmful",
            subtitle: "content at the network level.",
          },
          {
            image: "/hero-4-background.jpg",
            title: "Once it's set up,",
            subtitle: "it works quietly in the background.",
          },
          {
            image: "/hero-5-control.jpg",
            title: "No ads. No tracking.",
            subtitle: "Full control.",
          },
        ].map((section, idx) => (
          <div
            key={idx}
            className="relative h-screen w-full flex items-center justify-start"
            style={{
              backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.3)), url(${section.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="container max-w-6xl mx-auto px-4">
              <div className="max-w-xl space-y-2">
                <h2 className="text-5xl lg:text-6xl font-bold text-white leading-tight">
                  {section.title}
                </h2>
                <p className="text-2xl lg:text-3xl text-gray-200">
                  {section.subtitle}
                </p>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Features - Better Hierarchy */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-5xl font-bold">How it protects you</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">Built with intention. Designed for real life.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: Pause,
                title: "Niyyah Gate",
                desc: "A pause before every distraction. One question: What's your intention?",
              },
              {
                icon: Zap,
                title: "Impulse Cooldown",
                desc: "7, 15, or 33 second breathing delay. Time to reconsider.",
              },
              {
                icon: Clock,
                title: "Sacred Hours",
                desc: "Auto-block during prayer times, work hours, or whenever you need focus.",
              },
              {
                icon: BarChart3,
                title: "Daily Accountability",
                desc: "See what you blocked, how many times you paused, time you saved.",
              },
            ].map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div
                  key={idx}
                  className="group p-8 bg-gradient-to-br from-gray-900/50 to-gray-950/50 border border-gray-800 rounded-2xl hover:border-emerald-500/50 hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-300"
                >
                  <div className="w-14 h-14 bg-emerald-600/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-emerald-600/30 transition">
                    <Icon className="w-7 h-7 text-emerald-400" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-emerald-400 transition">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trust Quotes */}
      <TrustQuotes />

      {/* Pricing - Enhanced */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-950 to-gray-900/50">
        <div className="container max-w-4xl mx-auto text-center space-y-12">
          <div className="space-y-4">
            <div className="inline-block px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full">
              <p className="text-sm text-emerald-400 font-semibold">PRICING</p>
            </div>
            <h2 className="text-6xl font-bold">$33 / year</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              One price. No upsells. No tracking. No tricks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-8">
            {[
              "Block distracting apps & adult content",
              "Niyyah Gate before every open",
              "Time budgets & Sacred Hours",
              "Daily accountability reports",
            ].map((feature, idx) => (
              <div key={idx} className="flex items-start gap-3 p-4 bg-gray-900/50 rounded-lg border border-gray-800">
                <div className="w-5 h-5 rounded-full bg-emerald-600/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                </div>
                <p className="text-gray-300">{feature}</p>
              </div>
            ))}
          </div>

          <Link href="/pricing">
            <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-lg hover:shadow-emerald-500/50 transition-all hover:scale-105">
              See what's included
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Final CTA - Compelling */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="container max-w-4xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-900/30 via-emerald-800/20 to-gray-900/30 border border-emerald-500/30 p-12 md:p-16">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl -z-10"></div>

            <div className="relative z-10 text-center space-y-8">
              <div className="space-y-4">
                <h2 className="text-5xl font-bold">Ready to reclaim your focus?</h2>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                  Join others who are choosing intention over impulse.
                </p>
              </div>

              <Link href="/pricing">
                <Button size="lg" className="bg-white hover:bg-gray-100 text-emerald-950 font-semibold shadow-lg hover:shadow-white/20 transition-all hover:scale-105">
                  Get Started — $33/year
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
