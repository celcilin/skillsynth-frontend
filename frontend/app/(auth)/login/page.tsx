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
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [Error, setError] = useState("");

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
    <div className="relative flex items-center justify-center min-h-screen bg-[#0A0A0A] px-3 sm:px-4 py-6 sm:py-8 overflow-auto">
      {/* animated background blobs */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-10 top-1/4 h-60 w-60 sm:h-72 sm:w-72 rounded-full bg-blue-500/5 blur-3xl animate-pulse" />
        <div className="absolute -right-10 top-1/2 h-60 w-60 sm:h-72 sm:w-72 rounded-full bg-purple-500/5 blur-3xl animate-pulse delay-1000" />
        <div className="absolute bottom-1/4 left-1/2 h-60 w-60 sm:h-72 sm:w-72 rounded-full bg-pink-500/5 blur-3xl animate-pulse delay-500" />
      </div>

      {/* grid background */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#2A2A2A1a_1px,transparent_1px),linear-gradient(to_bottom,#2A2A2A1a_1px,transparent_1px)] bg-[size:14px_24px]" />

      <Card className="w-full max-w-sm sm:max-w-md border-[#2A2A2A] bg-gradient-to-br from-[#161616] to-[#0F0F0F] shadow-2xl shadow-black/40">
        <CardHeader className="text-center px-4 sm:px-6 pt-6 sm:pt-8 space-y-1">
          <div className="mx-auto mb-4 flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-gradient-to-br from-white/10 to-white/5 border border-[#2A2A2A]">
            <User2 className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
          </div>
          <CardTitle className="text-2xl sm:text-3xl font-bold text-white">
            Welcome back
          </CardTitle>
          <CardDescription className="text-[#888888] text-sm sm:text-base">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4 px-4 sm:px-6 pb-5">
          {/* OAuth buttons */}
          <div className="grid gap-3">
            <Button
              variant="outline"
              className="group w-full border-[#2A2A2A] bg-[#161616] text-[#CCCCCC] hover:border-[#3A3A3A] hover:bg-[#1F1F1F] hover:text-white transition-all text-sm sm:text-base h-10 sm:h-11"
            >
              <Github className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
              Continue with GitHub
            </Button>
            <Button
              variant="outline"
              className="group w-full border-[#2A2A2A] bg-[#161616] text-[#CCCCCC] hover:border-[#3A3A3A] hover:bg-[#1F1F1F] hover:text-white transition-all text-sm sm:text-base h-10 sm:h-11"
            >
              <Mail className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
              Continue with Google
            </Button>
          </div>

          {/* divider */}
          <div className="relative my-5 sm:my-6">
            <Separator className="bg-[#2A2A2A]" />
            <span className="absolute inset-0 flex items-center justify-center text-xs uppercase">
              <span className="bg-[#161616] px-2 text-[#888888]">
                Or continue with email
              </span>
            </span>
          </div>

          {Error && (
            <CardDescription className="flex justify-center items-center text-red-400 text-sm sm:text-base">
              <XCircleIcon size={16} className="mr-2" /> {Error}
            </CardDescription>
          )}

          {/* form */}
          <form onSubmit={handleLogin} className="space-y-4">
            {/* email */}
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-[#CCCCCC] text-sm">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#888888]" />
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 border-[#2A2A2A] bg-[#1F1F1F] text-white placeholder:text-[#888888] focus:border-[#3A3A3A] focus:ring-0 text-sm sm:text-base"
                  required
                />
              </div>
            </div>

            {/* password */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-[#CCCCCC] text-sm">
                  Password
                </Label>
                <Link
                  href="/forgot-password"
                  className="text-xs sm:text-sm text-[#888888] hover:text-[#CCCCCC] hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#888888]" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 border-[#2A2A2A] bg-[#1F1F1F] text-white placeholder:text-[#888888] focus:border-[#3A3A3A] focus:ring-0 text-sm sm:text-base"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#888888] hover:text-[#CCCCCC]"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* submit */}
            <Button
              type="submit"
              size="lg"
              className="w-full bg-white text-black hover:bg-white/90 shadow-md font-semibold text-sm sm:text-base mt-4"
            >
              Sign In
              <LogIn className="ml-2 h-4 w-4" />
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex justify-center border-t border-[#2A2A2A] py-4 sm:py-6">
          <p className="text-xs sm:text-sm text-[#888888] text-center">
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="font-semibold text-[#CCCCCC] hover:text-white underline"
            >
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
