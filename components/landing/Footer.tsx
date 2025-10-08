// components/landing/footer.tsx
import Link from "next/link";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";
import { IconStack2, IconStack2Filled } from "@tabler/icons-react";

export function Footer() {
  return (
    <footer className="border-t border-[#2A2A2A] bg-[#0A0A0A]">
      <div className="container mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-white/10 to-white/5 border border-[#2A2A2A]">
                {/* <span className="text-lg font-bold text-white">R</span> */}
                <IconStack2Filled color="white" />
              </div>
              <span className="text-xl font-bold text-white">Skill Synth</span>
            </Link>
            <p className="text-sm text-[#888888] leading-relaxed max-w-xs">
              Build your dream career with personalized learning paths and
              real-world projects.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-white">Product</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/roadmap"
                  className="text-[#888888] transition-colors hover:text-white"
                >
                  Roadmaps
                </Link>
              </li>
              <li>
                <Link
                  href="/#pricing"
                  className="text-[#888888] transition-colors hover:text-white"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="/#features"
                  className="text-[#888888] transition-colors hover:text-white"
                >
                  Features
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-white">Company</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/about"
                  className="text-[#888888] transition-colors hover:text-white"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-[#888888] transition-colors hover:text-white"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-[#888888] transition-colors hover:text-white"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-white">Legal</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/privacy"
                  className="text-[#888888] transition-colors hover:text-white"
                >
                  Privacy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-[#888888] transition-colors hover:text-white"
                >
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[#2A2A2A] pt-8 sm:flex-row">
          <p className="text-sm text-[#888888]">
            © {new Date().getFullYear()} Roadmap. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link
              href="https://twitter.com"
              className="text-[#888888] transition-colors hover:text-white"
              aria-label="Twitter"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Twitter className="h-5 w-5" />
            </Link>
            <Link
              href="https://github.com"
              className="text-[#888888] transition-colors hover:text-white"
              aria-label="GitHub"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="h-5 w-5" />
            </Link>
            <Link
              href="https://linkedin.com"
              className="text-[#888888] transition-colors hover:text-white"
              aria-label="LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin className="h-5 w-5" />
            </Link>
            <Link
              href="mailto:contact@roadmap.com"
              className="text-[#888888] transition-colors hover:text-white"
              aria-label="Email"
            >
              <Mail className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
