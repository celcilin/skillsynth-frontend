// components/landing/hero-section.tsx
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Code2,
  GitBranch,
  Target,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";

export function HeroSection() {
  return (
    <section
      className="relative overflow-hidden bg-[#0A0A0A] py-20 sm:py-32"
      id="product"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-20 top-1/4 h-96 w-96 animate-pulse rounded-full bg-purple-500/10 blur-3xl" />
        <div className="absolute -right-20 top-1/2 h-96 w-96 animate-pulse rounded-full bg-blue-500/10 blur-3xl delay-1000" />
        <div className="absolute bottom-1/4 left-1/2 h-96 w-96 animate-pulse rounded-full bg-pink-500/10 blur-3xl delay-500" />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#2A2A2A1a_1px,transparent_1px),linear-gradient(to_bottom,#2A2A2A1a_1px,transparent_1px)] bg-[size:14px_24px]" />

      <div className="container relative z-10 mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-5xl text-center">
          {/* Badge */}
          <Badge className="mb-6 border-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 text-white hover:from-purple-500/20 hover:to-blue-500/20 border border-purple-500/20 px-4 py-1.5 text-sm font-medium">
            <Sparkles className="mr-1.5 h-4 w-4 inline" />
            Transform Your Career Journey
          </Badge>

          {/* Main Heading */}
          <h1 className="mb-6 text-5xl font-bold tracking-tight text-white sm:text-7xl lg:text-8xl">
            Build Your{" "}
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Dream Career
            </span>{" "}
            Roadmap
          </h1>

          {/* Subheading */}
          <p className="mb-8 text-lg text-[#CCCCCC] sm:text-xl lg:text-2xl leading-relaxed max-w-3xl mx-auto">
            Get personalized learning paths, master in-demand skills, and solve
            real-world GitHub projects to accelerate your career growth.
          </p>

          {/* Feature Pills */}
          <div className="mb-10 flex flex-wrap items-center justify-center gap-4">
            <div className="flex items-center gap-2 rounded-full bg-[#161616] border border-[#2A2A2A] px-4 py-2 text-sm text-[#CCCCCC]">
              <Target className="h-4 w-4 text-purple-400" />
              <span>Custom Roadmaps</span>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-[#161616] border border-[#2A2A2A] px-4 py-2 text-sm text-[#CCCCCC]">
              <Code2 className="h-4 w-4 text-blue-400" />
              <span>Real Projects</span>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-[#161616] border border-[#2A2A2A] px-4 py-2 text-sm text-[#CCCCCC]">
              <GitBranch className="h-4 w-4 text-pink-400" />
              <span>GitHub Integration</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
            <Button
              size="lg"
              className="group h-14 rounded-xl bg-white text-black hover:bg-white/90 px-8 text-base font-semibold shadow-2xl shadow-white/20 hover:shadow-white/30 transition-all"
              asChild
            >
              <Link href="/signup">
                Start Your Journey
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-14 rounded-xl border-[#2A2A2A] bg-[#161616] text-white hover:bg-[#1F1F1F] hover:border-[#3A3A3A] px-8 text-base font-semibold transition-all"
              asChild
            >
              <Link href="/roadmap">
                Explore Roadmaps
                <Target className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="mb-16 flex flex-wrap items-center justify-center gap-8 text-sm text-[#888888]">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              <span>Free to start</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              <span>10,000+ learners</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              <span>500+ projects</span>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Card 1 */}
            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#161616] to-[#0F0F0F] border border-[#2A2A2A] p-6 hover:border-[#3A3A3A] transition-all hover:shadow-xl hover:shadow-black/40">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10 border border-purple-500/20 flex-shrink-0">
                  <Target className="h-6 w-6 text-purple-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">
                  Personalized Roadmaps
                </h3>
              </div>
              <p className="text-sm text-[#888888] leading-relaxed">
                Get AI-powered learning paths tailored to your career goals and
                skill level.
              </p>
            </div>

            {/* Card 2 */}
            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#161616] to-[#0F0F0F] border border-[#2A2A2A] p-6 hover:border-[#3A3A3A] transition-all hover:shadow-xl hover:shadow-black/40">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 border border-blue-500/20 flex-shrink-0">
                  <Code2 className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">
                  Real-World Projects
                </h3>
              </div>
              <p className="text-sm text-[#888888] leading-relaxed">
                Solve practical GitHub projects and build your portfolio while
                learning.
              </p>
            </div>

            {/* Card 3 */}
            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#161616] to-[#0F0F0F] border border-[#2A2A2A] p-6 hover:border-[#3A3A3A] transition-all hover:shadow-xl hover:shadow-black/40">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-pink-500/10 border border-pink-500/20 flex-shrink-0">
                  <GitBranch className="h-6 w-6 text-pink-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">
                  Track Your Progress
                </h3>
              </div>
              <p className="text-sm text-[#888888] leading-relaxed">
                Monitor your learning journey with detailed analytics and
                achievements.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent pointer-events-none" />
    </section>
  );
}
