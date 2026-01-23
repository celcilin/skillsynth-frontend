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
    try {
      if (formData.password !== formData.confirmPassword)
        throw "Confirm Password Doesn't Match";
      if (!formData.agreeToTerms) throw "Please Agree to the Terms & Privacy";
      const data = await authApi.signup(formData.email, formData.password);
      router.push("/generate");
    } catch (err: any) {
      setError(err.response?.data?.error || err || "SignUp failed");
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-[#0A0A0A] px-3 sm:px-4 py-6 sm:py-8 overflow-auto">
      {/* background glow */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-10 top-1/4 h-60 w-60 sm:h-72 sm:w-72 rounded-full bg-blue-500/5 blur-3xl animate-pulse" />
        <div className="absolute -right-10 top-1/2 h-60 w-60 sm:h-72 sm:w-72 rounded-full bg-purple-500/5 blur-3xl animate-pulse delay-1000" />
        <div className="absolute bottom-1/4 left-1/2 h-60 w-60 sm:h-72 sm:w-72 rounded-full bg-pink-500/5 blur-3xl animate-pulse delay-500" />
      </div>

      {/* grid overlay */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#2A2A2A1a_1px,transparent_1px),linear-gradient(to_bottom,#2A2A2A1a_1px,transparent_1px)] bg-[size:14px_24px]" />

      {/* card */}
      <Card className="w-full max-w-sm sm:max-w-md border-[#2A2A2A] bg-gradient-to-br from-[#161616] to-[#0F0F0F] shadow-2xl shadow-black/40">
        <CardHeader className="text-center space-y-1 px-4 sm:px-6 pt-6 sm:pt-8">
          <div className="mx-auto mb-4 flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-gradient-to-br from-white/10 to-white/5 border border-[#2A2A2A]">
            <IconStack2Filled className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
          </div>
          <CardTitle className="text-2xl sm:text-3xl font-bold text-white">
            Create an account
          </CardTitle>
          <CardDescription className="text-[#888888] text-sm sm:text-base">
            Get started with your free account today
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4 px-4 sm:px-6">
          {/* OAuth Buttons */}
          <div className="grid gap-3">
            <Button
              variant="outline"
              className="group w-full border-[#2A2A2A] bg-[#161616] text-[#CCCCCC] hover:border-[#3A3A3A] hover:bg-[#1F1F1F] hover:text-white transition-all text-sm sm:text-base"
            >
              <Github className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
              Continue with GitHub
            </Button>
            <Button
              variant="outline"
              className="group w-full border-[#2A2A2A] bg-[#161616] text-[#CCCCCC] hover:border-[#3A3A3A] hover:bg-[#1F1F1F] hover:text-white transition-all text-sm sm:text-base"
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
            <CardDescription className="flex justify-center items-center text-red-400 text-sm sm:text-md">
              <XCircleIcon size={16} className="mr-2" /> {Error}
            </CardDescription>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* full name */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-[#CCCCCC] text-sm">
                Full Name
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#888888]" />
                <Input
                  id="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="pl-10 border-[#2A2A2A] bg-[#1F1F1F] text-white placeholder:text-[#888888] focus:border-[#3A3A3A] focus:ring-0 text-sm sm:text-base"
                  required
                />
              </div>
            </div>

            {/* email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-[#CCCCCC] text-sm">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#888888]" />
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="pl-10 border-[#2A2A2A] bg-[#1F1F1F] text-white placeholder:text-[#888888] focus:border-[#3A3A3A] focus:ring-0 text-sm sm:text-base"
                  required
                />
              </div>
            </div>

            {/* password */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-[#CCCCCC] text-sm">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#888888]" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
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

            {/* confirm password */}
            <div className="space-y-2">
              <Label htmlFor="confirm" className="text-[#CCCCCC] text-sm">
                Confirm Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#888888]" />
                <Input
                  id="confirm"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
                  }
                  className="pl-10 pr-10 border-[#2A2A2A] bg-[#1F1F1F] text-white placeholder:text-[#888888] focus:border-[#3A3A3A] focus:ring-0 text-sm sm:text-base"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#888888] hover:text-[#CCCCCC]"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* terms */}
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
                className="mt-0.5 border-[#2A2A2A] data-[state=checked]:bg-white data-[state=checked]:text-black"
              />
              <label
                htmlFor="terms"
                className="text-xs sm:text-sm text-[#888888]"
              >
                I agree to the{" "}
                <Link
                  href="/terms"
                  className="text-[#CCCCCC] hover:text-white underline"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="text-[#CCCCCC] hover:text-white underline"
                >
                  Privacy Policy
                </Link>
              </label>
            </div>

            {/* submit */}
            <Button
              type="submit"
              size="lg"
              className="w-full bg-white text-black hover:bg-white/90 shadow-md font-semibold text-sm sm:text-base"
            >
              Create Account
              <Sparkles className="ml-2 h-4 w-4" />
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex justify-center border-t border-[#2A2A2A] py-4 sm:py-6 text-center">
          <p className="text-xs sm:text-sm text-[#888888]">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-[#CCCCCC] hover:text-white underline"
            >
              Sign in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
