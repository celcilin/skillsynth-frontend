// components/landing/navbar.tsx
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { IconStack2Filled } from "@tabler/icons-react";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-4 z-50 w-full px-4 sm:px-6">
      <div className="mx-auto max-w-7xl rounded-2xl border border-[#2A2A2A] bg-[#0A0A0A]/35 backdrop-blur-xl shadow-2xl shadow-black/40">
        <div className="flex h-16 items-center justify-between px-6">
          {/* Logo and Desktop Navigation */}
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-white/10 to-white/5 border border-[#2A2A2A] group-hover:border-[#3A3A3A] transition-all">
                <IconStack2Filled className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">Skill Synth</span>
            </Link>

            <nav className="hidden items-center gap-6 md:flex">
              <Link
                href="/#product"
                className="text-sm font-medium text-[#888888] transition-colors hover:text-white relative group"
              >
                Product
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all group-hover:w-full" />
              </Link>
              <Link
                href="/#features"
                className="text-sm font-medium text-[#888888] transition-colors hover:text-white relative group"
              >
                Features
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all group-hover:w-full" />
              </Link>
              <Link
                href="/#pricing"
                className="text-sm font-medium text-[#888888] transition-colors hover:text-white relative group"
              >
                Pricing
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all group-hover:w-full" />
              </Link>
            </nav>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              variant="ghost"
              asChild
              className="text-[#CCCCCC] hover:text-white hover:bg-[#1F1F1F] transition-all"
            >
              <Link href="/login">Sign In</Link>
            </Button>
            <Button
              asChild
              className="bg-white text-black hover:bg-white/90 font-semibold transition-all shadow-lg shadow-black/40 hover:shadow-xl hover:shadow-black/60"
            >
              <Link href="/signup">Get Started</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white hover:text-[#CCCCCC] transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-[#2A2A2A] rounded-b-2xl overflow-hidden">
            <nav className="flex flex-col px-6 py-4 space-y-3 bg-[#0A0A0A]/98">
              <Link
                href="/product"
                className="text-sm font-medium text-[#888888] hover:text-white transition-colors py-2 px-3 rounded-lg hover:bg-[#1F1F1F]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Product
              </Link>
              <Link
                href="/features"
                className="text-sm font-medium text-[#888888] hover:text-white transition-colors py-2 px-3 rounded-lg hover:bg-[#1F1F1F]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Features
              </Link>
              <Link
                href="/pricing"
                className="text-sm font-medium text-[#888888] hover:text-white transition-colors py-2 px-3 rounded-lg hover:bg-[#1F1F1F]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Pricing
              </Link>

              <div className="pt-3 space-y-2 border-t border-[#2A2A2A]">
                <Button
                  variant="ghost"
                  asChild
                  className="w-full text-[#CCCCCC] hover:text-white hover:bg-[#1F1F1F] justify-start"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Link href="/login">Sign In</Link>
                </Button>
                <Button
                  asChild
                  className="w-full bg-white text-black hover:bg-white/90 font-semibold"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Link href="/signup">Get Started</Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
