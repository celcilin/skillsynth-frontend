"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Logo from "@/components/logo"; // Assuming a Logo component will be created

export default function Navbar() {
  const { setTheme } = useTheme();

  return (
    <nav className="bg-white dark:bg-slate-950 shadow-md dark:shadow-slate-800 py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <Logo />
          <span className="text-xl font-bold text-slate-900 dark:text-white">
            SaaS Product
          </span>
        </Link>
        <div className="flex items-center space-x-4">
          <Link
            href="#features"
            className="text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200 hidden md:inline-block"
          >
            Features
          </Link>
          <Link
            href="#pricing"
            className="text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200 hidden md:inline-block"
          >
            Pricing
          </Link>
          <Button asChild variant="ghost" className="hidden md:inline-flex">
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild className="hidden md:inline-flex">
            <Link href="/signup">Sign Up</Link>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}
