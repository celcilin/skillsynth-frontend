// app/(dashboard)/billing/page.tsx
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  CreditCard,
  Download,
  Calendar,
  CheckCircle2,
  Plus,
  TrendingUp,
  Database,
  Users,
  Crown,
  ArrowRight,
  FileText,
  AlertCircle,
} from "lucide-react";

export default function BillingPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
            Billing & Subscription
          </h1>
          <p className="text-[#888888] text-lg">
            Manage your subscription and billing information
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Current Plan - Large Card */}
          <Card className="bg-gradient-to-br from-[#161616] to-[#0F0F0F] border-[#2A2A2A] lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-600/20 border border-purple-500/30">
                    <Crown className="h-6 w-6 text-purple-400" />
                  </div>
                  <div>
                    <CardTitle className="text-white text-xl">
                      Premium Plan
                    </CardTitle>
                    <CardDescription className="text-[#888888]">
                      Professional features for your team
                    </CardDescription>
                  </div>
                </div>
                <Badge
                  variant="outline"
                  className="bg-emerald-500/10 text-emerald-400 border-emerald-500/30 font-medium"
                >
                  <CheckCircle2 className="h-3 w-3 mr-1" />
                  Active
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Pricing Info */}
              <div className="rounded-xl border-2 border-[#2A2A2A] bg-gradient-to-br from-[#1A1A1A] to-[#161616] p-6 hover:border-[#3A3A3A] transition-colors">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <p className="text-4xl font-bold text-white">
                      $250
                      <span className="text-lg font-normal text-[#888888] ml-2">
                        / month
                      </span>
                    </p>
                    <div className="flex items-center gap-2 text-sm text-[#888888]">
                      <Calendar className="h-4 w-4" />
                      <span>Next billing: April 1, 2024</span>
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-600/20 border border-purple-500/30">
                    <CreditCard className="h-6 w-6 text-purple-400" />
                  </div>
                </div>
              </div>

              <Separator className="bg-[#2A2A2A]" />

              {/* Plan Features */}
              <div className="space-y-4">
                <p className="text-sm font-semibold text-white uppercase tracking-wide">
                  Plan Includes
                </p>
                <div className="grid gap-3">
                  {[
                    { icon: Users, text: "Up to 50 team members" },
                    { icon: TrendingUp, text: "Advanced roadmap features" },
                    { icon: Database, text: "50GB storage" },
                    { icon: CheckCircle2, text: "Priority support" },
                    { icon: FileText, text: "Advanced analytics" },
                  ].map((feature, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 p-3 rounded-lg bg-[#1A1A1A] border border-[#2A2A2A] hover:border-[#3A3A3A] transition-colors"
                    >
                      <div className="p-1.5 rounded-lg bg-[#2A2A2A]">
                        <feature.icon className="h-4 w-4 text-purple-400" />
                      </div>
                      <span className="text-sm text-[#CCCCCC]">
                        {feature.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <Separator className="bg-[#2A2A2A]" />

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                <Button
                  variant="outline"
                  className="flex-1 border-[#2A2A2A] bg-[#161616] text-[#CCCCCC] hover:bg-[#1F1F1F] hover:text-white hover:border-[#3A3A3A] h-11"
                >
                  Change Plan
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  className="border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:border-red-500/40 h-11"
                >
                  Cancel Subscription
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats Sidebar */}
          <div className="space-y-6">
            {/* Usage Stats */}
            <Card className="bg-gradient-to-br from-[#161616] to-[#0F0F0F] border-[#2A2A2A]">
              <CardHeader>
                <CardTitle className="text-white text-lg flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-[#888888]" />
                  Usage This Month
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                {/* Team Members */}
                <div>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-[#888888] font-medium">
                      Team Members
                    </span>
                    <span className="text-white font-semibold">28 / 50</span>
                  </div>
                  <div className="h-2.5 w-full overflow-hidden rounded-full bg-[#2A2A2A]">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-purple-400 transition-all rounded-full"
                      style={{ width: "56%" }}
                    />
                  </div>
                  <p className="text-xs text-[#666666] mt-1">56% capacity</p>
                </div>

                {/* Storage */}
                <div>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-[#888888] font-medium">Storage</span>
                    <span className="text-white font-semibold">
                      32GB / 50GB
                    </span>
                  </div>
                  <div className="h-2.5 w-full overflow-hidden rounded-full bg-[#2A2A2A]">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-blue-400 transition-all rounded-full"
                      style={{ width: "64%" }}
                    />
                  </div>
                  <p className="text-xs text-[#666666] mt-1">64% capacity</p>
                </div>
              </CardContent>
            </Card>

            {/* Next Invoice */}
            <Card className="bg-gradient-to-br from-[#161616] to-[#0F0F0F] border-[#2A2A2A]">
              <CardHeader>
                <CardTitle className="text-white text-lg flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-[#888888]" />
                  Next Invoice
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 rounded-lg bg-[#1A1A1A] border border-[#2A2A2A]">
                    <div className="flex items-center gap-2 text-[#888888] mb-2">
                      <Calendar className="h-4 w-4" />
                      <span className="text-sm">April 1, 2024</span>
                    </div>
                    <p className="text-3xl font-bold text-white">$250.00</p>
                  </div>
                  <p className="text-xs text-[#666666]">
                    Your card will be charged automatically
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Payment Method */}
        <Card className="mt-6 bg-gradient-to-br from-[#161616] to-[#0F0F0F] border-[#2A2A2A]">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-[#1F1F1F] border border-[#2A2A2A]">
                <CreditCard className="h-5 w-5 text-[#888888]" />
              </div>
              <div>
                <CardTitle className="text-white text-xl">
                  Payment Method
                </CardTitle>
                <CardDescription className="text-[#888888]">
                  Manage your payment methods securely
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Existing Card */}
            <div className="flex items-center justify-between rounded-xl border-2 border-[#2A2A2A] bg-[#1A1A1A] p-5 hover:border-[#3A3A3A] transition-colors">
              <div className="flex items-center gap-4">
                <div className="rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-500/30 p-3">
                  <CreditCard className="h-6 w-6 text-blue-400" />
                </div>
                <div>
                  <p className="font-semibold text-white">
                    Visa ending in 4242
                  </p>
                  <p className="text-sm text-[#888888] mt-0.5">
                    Expires 12/2025
                  </p>
                  <Badge
                    variant="outline"
                    className="bg-emerald-500/10 text-emerald-400 border-emerald-500/30 text-xs mt-2"
                  >
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    Default
                  </Badge>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="border-[#2A2A2A] bg-[#161616] text-[#CCCCCC] hover:bg-[#1F1F1F] hover:text-white hover:border-[#3A3A3A]"
              >
                Update
              </Button>
            </div>

            {/* Add Payment Button */}
            <Button
              variant="outline"
              className="w-full border-[#2A2A2A] bg-[#1A1A1A] text-white hover:bg-[#1F1F1F] hover:border-[#3A3A3A] h-12"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Payment Method
            </Button>
          </CardContent>
        </Card>

        {/* Billing History */}
        <Card className="mt-6 bg-gradient-to-br from-[#161616] to-[#0F0F0F] border-[#2A2A2A]">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-[#1F1F1F] border border-[#2A2A2A]">
                <FileText className="h-5 w-5 text-[#888888]" />
              </div>
              <div>
                <CardTitle className="text-white text-xl">
                  Billing History
                </CardTitle>
                <CardDescription className="text-[#888888]">
                  Download your previous invoices and receipts
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                {
                  date: "Mar 1, 2024",
                  amount: "$250.00",
                  status: "Paid",
                  invoice: "INV-2024-003",
                },
                {
                  date: "Feb 1, 2024",
                  amount: "$250.00",
                  status: "Paid",
                  invoice: "INV-2024-002",
                },
                {
                  date: "Jan 1, 2024",
                  amount: "$250.00",
                  status: "Paid",
                  invoice: "INV-2024-001",
                },
              ].map((invoice, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between rounded-xl border border-[#2A2A2A] bg-[#1A1A1A] p-4 hover:border-[#3A3A3A] hover:bg-[#1C1C1C] transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div className="rounded-lg bg-[#2A2A2A] p-2.5 group-hover:bg-[#333333] transition-colors">
                      <Calendar className="h-5 w-5 text-[#888888]" />
                    </div>
                    <div>
                      <p className="font-semibold text-white">{invoice.date}</p>
                      <p className="text-sm text-[#888888] mt-0.5">
                        {invoice.invoice}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="font-semibold text-white">
                        {invoice.amount}
                      </p>
                      <Badge
                        variant="outline"
                        className="bg-emerald-500/10 text-emerald-400 border-emerald-500/30 text-xs mt-1"
                      >
                        {invoice.status}
                      </Badge>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-[#888888] hover:bg-[#2A2A2A] hover:text-white"
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Billing Alert */}
        <Card className="mt-6 bg-gradient-to-br from-blue-500/5 to-[#0F0F0F] border-blue-500/20">
          <CardContent className="py-6">
            <div className="flex items-start gap-4">
              <div className="p-2.5 rounded-lg bg-blue-500/20 border border-blue-500/30">
                <AlertCircle className="h-5 w-5 text-blue-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-white mb-1">
                  Need help with billing?
                </h3>
                <p className="text-sm text-[#888888]">
                  Our support team is here to help. Contact us if you have any
                  questions about your subscription or billing.
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="border-blue-500/30 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 hover:border-blue-500/40"
              >
                Contact Support
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
