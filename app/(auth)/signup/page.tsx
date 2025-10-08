// app/(auth)/signup/page.tsx
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
import { Checkbox } from "@/components/ui/checkbox";
import {
  Github,
  Mail,
  Sparkles,
  Lock,
  User,
  Eye,
  EyeOff,
  XCircleIcon,
} from "lucide-react";
import { IconStack2Filled } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { authApi } from "@/utils/api";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [Error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Signup:", formData);

    try {
      if (formData.password !== formData.confirmPassword) {
        throw "Confirm Password Doesn't Match";
      } else if (!formData.agreeToTerms)
        throw "Please Agree to the Terms & Privacy";
      const data = await authApi.signup(formData.email, formData.password);
      console.log("Logged in:", data.user);
      router.push("/generate");
    } catch (err: any) {
      setError(err.response?.data?.error || err || "SignIn failed");
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0A0A0A] p-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-4 top-1/4 h-72 w-72 animate-pulse rounded-full bg-blue-500/5 blur-3xl" />
        <div className="absolute -right-4 top-1/2 h-72 w-72 animate-pulse rounded-full bg-purple-500/5 blur-3xl delay-1000" />
        <div className="absolute bottom-1/4 left-1/2 h-72 w-72 animate-pulse rounded-full bg-pink-500/5 blur-3xl delay-500" />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#2A2A2A1a_1px,transparent_1px),linear-gradient(to_bottom,#2A2A2A1a_1px,transparent_1px)] bg-[size:14px_24px]" />

      <Card className="relative z-10 w-full max-w-md border-[#2A2A2A] bg-gradient-to-br from-[#161616] to-[#0F0F0F] shadow-2xl shadow-black/40 hover:shadow-black/60 transition-all">
        <CardHeader className="space-y-1 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-white/10 to-white/5 shadow-lg border border-[#2A2A2A]">
            <IconStack2Filled className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-3xl font-bold tracking-tight text-white">
            Create an account
          </CardTitle>
          <CardDescription className="text-[#888888]">
            Get started with your free account today
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* OAuth Buttons */}
          <div className="grid gap-3">
            <Button
              variant="outline"
              className="group w-full border-[#2A2A2A] bg-[#161616] text-[#CCCCCC] transition-all hover:border-[#3A3A3A] hover:bg-[#1F1F1F] hover:text-white"
            >
              <Github className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
              Continue with GitHub
            </Button>
            <Button
              variant="outline"
              className="group w-full border-[#2A2A2A] bg-[#161616] text-[#CCCCCC] transition-all hover:border-[#3A3A3A] hover:bg-[#1F1F1F] hover:text-white"
            >
              <Mail className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
              Continue with Google
            </Button>
          </div>

          {/* Divider */}
          <div className="relative my-6">
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
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-[#CCCCCC]">
                Full Name
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#888888]" />
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="border-[#2A2A2A] bg-[#1F1F1F] pl-10 text-white placeholder:text-[#888888] focus:border-[#3A3A3A] focus:ring-0 hover:bg-[#252525] transition-colors"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-[#CCCCCC]">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#888888]" />
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="border-[#2A2A2A] bg-[#1F1F1F] pl-10 text-white placeholder:text-[#888888] focus:border-[#3A3A3A] focus:ring-0 hover:bg-[#252525] transition-colors"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-[#CCCCCC]">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#888888]" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="border-[#2A2A2A] bg-[#1F1F1F] pl-10 pr-10 text-white placeholder:text-[#888888] focus:border-[#3A3A3A] focus:ring-0 hover:bg-[#252525] transition-colors"
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

            {/* Confirm Password */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-[#CCCCCC]">
                Confirm Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#888888]" />
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
                  }
                  className="border-[#2A2A2A] bg-[#1F1F1F] pl-10 pr-10 text-white placeholder:text-[#888888] focus:border-[#3A3A3A] focus:ring-0 hover:bg-[#252525] transition-colors"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#888888] hover:text-[#CCCCCC] transition-colors"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start space-x-2 pt-2">
              <Checkbox
                id="terms"
                checked={formData.agreeToTerms}
                onCheckedChange={(checked) =>
                  setFormData({
                    ...formData,
                    agreeToTerms: checked as boolean,
                  })
                }
                className="mt-0.5 border-[#2A2A2A] data-[state=checked]:border-white data-[state=checked]:bg-white data-[state=checked]:text-black"
              />
              <label
                htmlFor="terms"
                className="text-sm leading-relaxed text-[#888888]"
              >
                I agree to the{" "}
                <Link
                  href="/terms"
                  className="text-[#CCCCCC] transition-colors hover:text-white hover:underline"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="text-[#CCCCCC] transition-colors hover:text-white hover:underline"
                >
                  Privacy Policy
                </Link>
              </label>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="group relative w-full overflow-hidden bg-white text-black shadow-lg shadow-black/40 transition-all hover:bg-white/90 hover:shadow-xl hover:shadow-black/60 font-semibold"
              size="lg"
            >
              <span className="relative z-10 flex items-center justify-center">
                Create Account
                <Sparkles className="ml-2 h-4 w-4 transition-transform group-hover:scale-110" />
              </span>
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex justify-center border-t border-[#2A2A2A] pt-6">
          <p className="text-sm text-[#888888]">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-[#CCCCCC] transition-colors hover:text-white hover:underline"
            >
              Sign in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
