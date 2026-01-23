// app/(dashboard)/settings/page.tsx
"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Trash2,
  Download,
  AlertTriangle,
  Palette,
  Globe,
  Shield,
  Zap,
  Moon,
  Sun,
  Monitor,
  Languages,
  Clock,
  Calendar,
  Eye,
  TrendingUp,
  User,
  Link2,
  CheckCircle2,
} from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] py-8">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
            Settings
          </h1>
          <p className="text-[#888888] text-lg">
            Manage your application settings and preferences
          </p>
        </div>

        {/* Appearance */}
        <Card className="mb-6 bg-gradient-to-br from-[#161616] to-[#0F0F0F] border-[#2A2A2A]">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-[#1F1F1F] border border-[#2A2A2A]">
                <Palette className="h-5 w-5 text-[#888888]" />
              </div>
              <div>
                <CardTitle className="text-white text-xl">Appearance</CardTitle>
                <CardDescription className="text-[#888888]">
                  Customize how the application looks and feels
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg bg-[#1A1A1A] border-2 border-[#2A2A2A] hover:border-[#3A3A3A] transition-colors">
              <div className="flex items-center gap-3 flex-1">
                <div className="p-2 rounded-lg bg-[#2A2A2A]">
                  <Moon className="h-5 w-5 text-white" />
                </div>
                <div className="space-y-0.5">
                  <Label className="text-white font-medium">Theme</Label>
                  <p className="text-sm text-[#888888]">
                    Select your preferred theme
                  </p>
                </div>
              </div>
              <Select defaultValue="dark">
                <SelectTrigger className="w-44 bg-[#161616] border-[#2A2A2A] text-white h-10">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#161616] border-[#2A2A2A]">
                  <SelectItem
                    value="light"
                    className="text-white hover:bg-[#2A2A2A]"
                  >
                    <div className="flex items-center gap-2">
                      <Sun className="h-4 w-4" />
                      Light
                    </div>
                  </SelectItem>
                  <SelectItem
                    value="dark"
                    className="text-white hover:bg-[#2A2A2A]"
                  >
                    <div className="flex items-center gap-2">
                      <Moon className="h-4 w-4" />
                      Dark
                    </div>
                  </SelectItem>
                  <SelectItem
                    value="system"
                    className="text-white hover:bg-[#2A2A2A]"
                  >
                    <div className="flex items-center gap-2">
                      <Monitor className="h-4 w-4" />
                      System
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg bg-[#1A1A1A] border-2 border-[#2A2A2A] hover:border-[#3A3A3A] transition-colors">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-[#2A2A2A]">
                  <Monitor className="h-5 w-5 text-white" />
                </div>
                <div className="space-y-0.5">
                  <Label className="text-white font-medium">Compact Mode</Label>
                  <p className="text-sm text-[#888888]">
                    Display more content on screen
                  </p>
                </div>
              </div>
              <Switch className="data-[state=checked]:bg-emerald-500 data-[state=unchecked]:bg-[#2A2A2A] scale-125" />
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg bg-[#1A1A1A] border-2 border-[#2A2A2A] hover:border-[#3A3A3A] transition-colors">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-[#2A2A2A]">
                  <Zap className="h-5 w-5 text-white" />
                </div>
                <div className="space-y-0.5">
                  <Label className="text-white font-medium">Animations</Label>
                  <p className="text-sm text-[#888888]">
                    Enable interface animations
                  </p>
                </div>
              </div>
              <Switch
                defaultChecked
                className="data-[state=checked]:bg-emerald-500 data-[state=unchecked]:bg-[#2A2A2A] scale-125"
              />
            </div>
          </CardContent>
        </Card>

        {/* Language & Region */}
        <Card className="mb-6 bg-gradient-to-br from-[#161616] to-[#0F0F0F] border-[#2A2A2A]">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-[#1F1F1F] border border-[#2A2A2A]">
                <Globe className="h-5 w-5 text-[#888888]" />
              </div>
              <div>
                <CardTitle className="text-white text-xl">
                  Language & Region
                </CardTitle>
                <CardDescription className="text-[#888888]">
                  Set your language and regional preferences
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg bg-[#1A1A1A] border-2 border-[#2A2A2A] hover:border-[#3A3A3A] transition-colors">
              <div className="flex items-center gap-3 flex-1">
                <div className="p-2 rounded-lg bg-[#2A2A2A]">
                  <Languages className="h-5 w-5 text-white" />
                </div>
                <div className="space-y-0.5">
                  <Label className="text-white font-medium">Language</Label>
                  <p className="text-sm text-[#888888]">
                    Select your preferred language
                  </p>
                </div>
              </div>
              <Select defaultValue="en">
                <SelectTrigger className="w-44 bg-[#161616] border-[#2A2A2A] text-white h-10">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#161616] border-[#2A2A2A]">
                  <SelectItem
                    value="en"
                    className="text-white hover:bg-[#2A2A2A]"
                  >
                    English
                  </SelectItem>
                  <SelectItem
                    value="es"
                    className="text-white hover:bg-[#2A2A2A]"
                  >
                    Spanish
                  </SelectItem>
                  <SelectItem
                    value="fr"
                    className="text-white hover:bg-[#2A2A2A]"
                  >
                    French
                  </SelectItem>
                  <SelectItem
                    value="de"
                    className="text-white hover:bg-[#2A2A2A]"
                  >
                    German
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg bg-[#1A1A1A] border-2 border-[#2A2A2A] hover:border-[#3A3A3A] transition-colors">
              <div className="flex items-center gap-3 flex-1">
                <div className="p-2 rounded-lg bg-[#2A2A2A]">
                  <Clock className="h-5 w-5 text-white" />
                </div>
                <div className="space-y-0.5">
                  <Label className="text-white font-medium">Timezone</Label>
                  <p className="text-sm text-[#888888]">
                    Your current timezone
                  </p>
                </div>
              </div>
              <Select defaultValue="utc">
                <SelectTrigger className="w-64 bg-[#161616] border-[#2A2A2A] text-white h-10">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#161616] border-[#2A2A2A]">
                  <SelectItem
                    value="utc"
                    className="text-white hover:bg-[#2A2A2A]"
                  >
                    UTC (GMT+0)
                  </SelectItem>
                  <SelectItem
                    value="est"
                    className="text-white hover:bg-[#2A2A2A]"
                  >
                    Eastern Time (GMT-5)
                  </SelectItem>
                  <SelectItem
                    value="pst"
                    className="text-white hover:bg-[#2A2A2A]"
                  >
                    Pacific Time (GMT-8)
                  </SelectItem>
                  <SelectItem
                    value="cet"
                    className="text-white hover:bg-[#2A2A2A]"
                  >
                    Central European (GMT+1)
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg bg-[#1A1A1A] border-2 border-[#2A2A2A] hover:border-[#3A3A3A] transition-colors">
              <div className="flex items-center gap-3 flex-1">
                <div className="p-2 rounded-lg bg-[#2A2A2A]">
                  <Calendar className="h-5 w-5 text-white" />
                </div>
                <div className="space-y-0.5">
                  <Label className="text-white font-medium">Date Format</Label>
                  <p className="text-sm text-[#888888]">
                    How dates are displayed
                  </p>
                </div>
              </div>
              <Select defaultValue="mdy">
                <SelectTrigger className="w-44 bg-[#161616] border-[#2A2A2A] text-white h-10">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#161616] border-[#2A2A2A]">
                  <SelectItem
                    value="mdy"
                    className="text-white hover:bg-[#2A2A2A]"
                  >
                    MM/DD/YYYY
                  </SelectItem>
                  <SelectItem
                    value="dmy"
                    className="text-white hover:bg-[#2A2A2A]"
                  >
                    DD/MM/YYYY
                  </SelectItem>
                  <SelectItem
                    value="ymd"
                    className="text-white hover:bg-[#2A2A2A]"
                  >
                    YYYY-MM-DD
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Privacy & Data */}
        <Card className="mb-6 bg-gradient-to-br from-[#161616] to-[#0F0F0F] border-[#2A2A2A]">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-[#1F1F1F] border border-[#2A2A2A]">
                <Shield className="h-5 w-5 text-[#888888]" />
              </div>
              <div>
                <CardTitle className="text-white text-xl">
                  Privacy & Data
                </CardTitle>
                <CardDescription className="text-[#888888]">
                  Control your data and privacy settings
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg bg-[#1A1A1A] border-2 border-[#2A2A2A] hover:border-[#3A3A3A] transition-colors">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-[#2A2A2A]">
                  <TrendingUp className="h-5 w-5 text-white" />
                </div>
                <div className="space-y-0.5">
                  <Label className="text-white font-medium">Analytics</Label>
                  <p className="text-sm text-[#888888]">
                    Help us improve by sharing usage data
                  </p>
                </div>
              </div>
              <Switch
                defaultChecked
                className="data-[state=checked]:bg-emerald-500 data-[state=unchecked]:bg-[#2A2A2A] scale-125"
              />
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg bg-[#1A1A1A] border-2 border-[#2A2A2A] hover:border-[#3A3A3A] transition-colors">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-[#2A2A2A]">
                  <User className="h-5 w-5 text-white" />
                </div>
                <div className="space-y-0.5">
                  <Label className="text-white font-medium">Show Profile</Label>
                  <p className="text-sm text-[#888888]">
                    Make your profile visible to other users
                  </p>
                </div>
              </div>
              <Switch
                defaultChecked
                className="data-[state=checked]:bg-emerald-500 data-[state=unchecked]:bg-[#2A2A2A] scale-125"
              />
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg bg-[#1A1A1A] border-2 border-[#2A2A2A] hover:border-[#3A3A3A] transition-colors">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-[#2A2A2A]">
                  <Eye className="h-5 w-5 text-white" />
                </div>
                <div className="space-y-0.5">
                  <Label className="text-white font-medium">
                    Activity Status
                  </Label>
                  <p className="text-sm text-[#888888]">
                    Show when you're online
                  </p>
                </div>
              </div>
              <Switch
                defaultChecked
                className="data-[state=checked]:bg-emerald-500 data-[state=unchecked]:bg-[#2A2A2A] scale-125"
              />
            </div>

            <Separator className="bg-[#2A2A2A]" />

            <div className="p-4 rounded-lg bg-[#1A1A1A] border border-[#2A2A2A]">
              <Button
                variant="outline"
                className="border-[#2A2A2A] bg-[#161616] text-white hover:bg-[#1F1F1F] hover:border-[#3A3A3A] h-10"
              >
                <Download className="mr-2 h-4 w-4" />
                Download My Data
              </Button>
              <p className="mt-3 text-sm text-[#888888]">
                Export all your data in a portable format
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Integrations */}
        <Card className="mb-6 bg-gradient-to-br from-[#161616] to-[#0F0F0F] border-[#2A2A2A]">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-[#1F1F1F] border border-[#2A2A2A]">
                <Link2 className="h-5 w-5 text-[#888888]" />
              </div>
              <div>
                <CardTitle className="text-white text-xl">
                  Integrations
                </CardTitle>
                <CardDescription className="text-[#888888]">
                  Manage connected applications and services
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              {
                name: "Slack",
                connected: true,
                description: "Team communication",
                color:
                  "from-purple-500/20 to-purple-600/20 border-purple-500/30",
                textColor: "text-purple-400",
              },
              {
                name: "GitHub",
                connected: true,
                description: "Code repository",
                color: "from-gray-500/20 to-gray-600/20 border-gray-500/30",
                textColor: "text-gray-400",
              },
              {
                name: "Jira",
                connected: false,
                description: "Project management",
                color: "from-blue-500/20 to-blue-600/20 border-blue-500/30",
                textColor: "text-blue-400",
              },
            ].map((integration, i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded-xl border border-[#2A2A2A] bg-[#1A1A1A] p-4 hover:border-[#3A3A3A] transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`rounded-xl bg-gradient-to-br ${integration.color} p-3 border`}
                  >
                    <div className={`h-6 w-6 rounded ${integration.textColor}`}>
                      <Link2 className="h-6 w-6" />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-white">
                        {integration.name}
                      </p>
                      {integration.connected && (
                        <Badge
                          variant="outline"
                          className="bg-emerald-500/10 text-emerald-400 border-emerald-500/30 text-xs"
                        >
                          <CheckCircle2 className="h-3 w-3 mr-1" />
                          Connected
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-[#888888] mt-0.5">
                      {integration.description}
                    </p>
                  </div>
                </div>
                {integration.connected ? (
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:border-red-500/40"
                  >
                    Disconnect
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-[#2A2A2A] bg-[#161616] text-white hover:bg-[#1F1F1F] hover:border-[#3A3A3A]"
                  >
                    Connect
                  </Button>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="bg-gradient-to-br from-red-500/5 to-[#0F0F0F] border-red-500/20">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-red-500/20 border border-red-500/30">
                <AlertTriangle className="h-5 w-5 text-red-400" />
              </div>
              <div>
                <CardTitle className="text-red-400 text-xl">
                  Danger Zone
                </CardTitle>
                <CardDescription className="text-[#888888]">
                  Irreversible actions that affect your account
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between rounded-xl border border-red-500/20 bg-[#1A1A1A] p-5">
              <div>
                <p className="font-semibold text-white mb-1">Delete Account</p>
                <p className="text-sm text-[#888888]">
                  Permanently delete your account and all associated data
                </p>
              </div>
              <Button
                variant="destructive"
                className="bg-red-500 text-white hover:bg-red-600 font-semibold"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Account
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
