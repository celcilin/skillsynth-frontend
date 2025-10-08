// app/(auth)/login/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Github,
  Mail,
  Lock,
  Eye,
  EyeOff,
  LogIn,
  User2,
  XCircleIcon,
} from "lucide-react";
import { authApi } from "@/utils/api";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [Error, setError] = useState("");

  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const data = await authApi.login(email, password);
      console.log("Logged in:", data.user);
      router.push("/generate");
    } catch (err: any) {
      setError(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div
      className={`relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0A0A0A] p-`}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-4 top-1/4 h-72 w-72 animate-pulse rounded-full bg-blue-500/5 blur-3xl" />
        <div className="absolute -right-4 top-1/2 h-72 w-72 animate-pulse rounded-full bg-purple-500/5 blur-3xl delay-1000" />
        <div className="absolute bottom-1/4 left-1/2 h-72 w-72 animate-pulse rounded-full bg-pink-500/5 blur-3xl delay-500" />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#2A2A2A1a_1px,transparent_1px),linear-gradient(to_bottom,#2A2A2A1a_1px,transparent_1px)] bg-[size:14px_24px]" />

      <Card
        className={`relative z-10 w-full max-w-md border-[#2A2A2A] bg-gradient-to-br from-[#161616] to-[#0F0F0F] shadow-2xl shadow-black/40 hover:shadow-black/60 transition-all`}
      >
        <CardHeader className="space-y-1 text-center pb-4">
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-white/10 to-white/5 shadow-lg border border-[#2A2A2A]">
            <User2 className="h-6 w-6 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight text-white">
            Welcome back
          </CardTitle>
          <CardDescription className="text-[#888888] text-sm">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4 px-6 pb-4">
          {/* OAuth Buttons */}
          <div className="grid gap-2.5">
            <Button
              variant="outline"
              className="group w-full border-[#2A2A2A] bg-[#161616] text-[#CCCCCC] transition-all hover:border-[#3A3A3A] hover:bg-[#1F1F1F] hover:text-white h-10"
            >
              <Github className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
              Continue with GitHub
            </Button>
            <Button
              variant="outline"
              className="group w-full border-[#2A2A2A] bg-[#161616] text-[#CCCCCC] transition-all hover:border-[#3A3A3A] hover:bg-[#1F1F1F] hover:text-white h-10"
            >
              <Mail className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
              Continue with Google
            </Button>
          </div>

          {/* Divider */}
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <Separator className="bg-[#2A2A2A]" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-[#161616] px-2 text-[#888888]">
                Or continue with email
              </span>
            </div>
          </div>
          {Error ? (
            <CardDescription className="flex justify-center items-center text-red-400 text-md">
              <XCircleIcon size={18} className="mr-2" /> {Error}
            </CardDescription>
          ) : null}
          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-3.5">
            {/* Email */}
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-[#CCCCCC] text-sm">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#888888]" />
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-[#2A2A2A] bg-[#1F1F1F] pl-10 text-white placeholder:text-[#888888] focus:border-[#3A3A3A] focus:ring-0 hover:bg-[#252525] transition-colors h-10"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-[#CCCCCC] text-sm">
                  Password
                </Label>
                <Link
                  href="/forgot-password"
                  className="text-xs text-[#888888] hover:text-[#CCCCCC] transition-colors hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#888888]" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border-[#2A2A2A] bg-[#1F1F1F] pl-10 pr-10 text-white placeholder:text-[#888888] focus:border-[#3A3A3A] focus:ring-0 hover:bg-[#252525] transition-colors h-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#888888] hover:text-[#CCCCCC] transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="group relative w-full overflow-hidden bg-white text-black shadow-lg shadow-black/40 transition-all hover:bg-white/90 hover:shadow-xl hover:shadow-black/60 font-semibold h-10 mt-4"
            >
              <span className="relative z-10 flex items-center justify-center">
                Sign In
                <LogIn className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex justify-center border-t border-[#2A2A2A] pt-4 pb-6 px-6">
          <p className="text-sm text-[#888888]">
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="font-semibold text-[#CCCCCC] transition-colors hover:text-white hover:underline"
            >
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
