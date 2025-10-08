// components/dashboard/header.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Bell,
  Search,
  Plus,
  Menu,
  Github,
  Star,
  User,
  CreditCard,
  Settings,
  Keyboard,
  LogOut,
  Command,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { IconBrandGithub } from "@tabler/icons-react";

export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-[#2A2A2A] bg-[#0F0F0F]/95 backdrop-blur-sm px-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="text-[#888888] hover:bg-[#1A1A1A] hover:text-white md:hidden"
        >
          <Menu className="h-5 w-5" />
        </Button>

        {/* Search Bar */}
        {/* <div className="relative w-64 md:w-96">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#666666]" />
          <Input
            type="search"
            placeholder="Search documentation..."
            className="pl-10 pr-20 h-10 bg-[#161616] border-[#2A2A2A] text-white placeholder:text-[#666666] focus:border-[#3A3A3A] focus:ring-1 focus:ring-[#3A3A3A] rounded-lg transition-all"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
            <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-[#2A2A2A] bg-[#1A1A1A] px-1.5 font-mono text-[10px] font-medium text-[#888888]">
              <Command className="h-3 w-3" />K
            </kbd>
          </div>
        </div> */}
      </div>

      <div className="flex items-center gap-2">
        {/* GitHub Stars */}
        <Button
          variant="outline"
          size="sm"
          className="hidden border-[#2A2A2A] bg-[#161616] text-white hover:bg-[#1A1A1A] hover:border-[#3A3A3A] md:flex gap-2 h-9"
          asChild
        >
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconBrandGithub className="h-4 w-4" />
            <Separator orientation="vertical" className="h-4 bg-[#2A2A2A]" />
            <Star className="h-3 w-3 text-[#888888]" />
            <span className="text-[#888888] font-medium">95.8k</span>
          </a>
        </Button>

        {/* Quick Create Button */}
        {/* <Button
          size="sm"
          className="hidden bg-white text-black hover:bg-gray-200 md:flex h-9 gap-2 font-medium"
        >
          <Plus className="h-4 w-4" />
          Quick Create
        </Button> */}

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="relative text-[#888888] hover:bg-[#1A1A1A] hover:text-white h-9 w-9"
            >
              <Bell className="h-5 w-5" />
              <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full border-2 border-[#0F0F0F] bg-red-500 p-0 text-[10px] font-bold flex items-center justify-center">
                3
              </Badge>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-80 bg-[#161616] border-[#2A2A2A] p-0"
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-[#2A2A2A]">
              <h3 className="font-semibold text-white">Notifications</h3>
              <Badge
                variant="secondary"
                className="bg-red-500/10 text-red-400 border-red-500/30 text-xs"
              >
                3 new
              </Badge>
            </div>
            <div className="max-h-[300px] overflow-y-auto">
              {[
                {
                  title: "New roadmap published",
                  description:
                    "Complete Machine Learning Path is now available",
                  time: "2 min ago",
                },
                {
                  title: "Project updated",
                  description: "Your DevOps project received 5 new stars",
                  time: "1 hour ago",
                },
                {
                  title: "Milestone reached",
                  description: "You've completed 50% of your learning path!",
                  time: "3 hours ago",
                },
              ].map((notification, index) => (
                <div
                  key={index}
                  className="px-4 py-3 hover:bg-[#1A1A1A] transition-colors cursor-pointer border-b border-[#2A2A2A] last:border-0"
                >
                  <div className="flex gap-3">
                    <div className="h-2 w-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white">
                        {notification.title}
                      </p>
                      <p className="text-xs text-[#888888] mt-1">
                        {notification.description}
                      </p>
                      <p className="text-xs text-[#666666] mt-1">
                        {notification.time}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="px-4 py-3 border-t border-[#2A2A2A]">
              <Button
                variant="ghost"
                size="sm"
                className="w-full text-[#888888] hover:text-white hover:bg-[#1A1A1A] text-xs"
              >
                View all notifications
              </Button>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="relative h-9 w-9 rounded-full hover:bg-[#1A1A1A] p-0"
            >
              <Avatar className="h-9 w-9">
                <AvatarImage src="/avatars/user.png" alt="User" />
                <AvatarFallback className="bg-gradient-to-br from-white to-gray-300 text-black font-bold">
                  JD
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-64 bg-[#161616] border-[#2A2A2A] p-2"
          >
            <DropdownMenuLabel className="p-3">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src="/avatars/user.png" alt="User" />
                  <AvatarFallback className="bg-gradient-to-br from-white to-gray-300 text-black font-bold">
                    JD
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-semibold text-white">John Doe</p>
                  <p className="text-xs text-[#888888]">john@example.com</p>
                  <Badge
                    variant="secondary"
                    className="bg-emerald-500/10 text-emerald-400 border-emerald-500/30 text-[10px] w-fit"
                  >
                    Pro Plan
                  </Badge>
                </div>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator className="bg-[#2A2A2A] my-2" />

            <DropdownMenuItem className="text-[#CCCCCC] hover:bg-[#1A1A1A] hover:text-white rounded-md cursor-pointer p-2.5">
              <User className="mr-3 h-4 w-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem className="text-[#CCCCCC] hover:bg-[#1A1A1A] hover:text-white rounded-md cursor-pointer p-2.5">
              <CreditCard className="mr-3 h-4 w-4" />
              Billing
            </DropdownMenuItem>
            <DropdownMenuItem className="text-[#CCCCCC] hover:bg-[#1A1A1A] hover:text-white rounded-md cursor-pointer p-2.5">
              <Settings className="mr-3 h-4 w-4" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuItem className="text-[#CCCCCC] hover:bg-[#1A1A1A] hover:text-white rounded-md cursor-pointer p-2.5">
              <Keyboard className="mr-3 h-4 w-4" />
              Keyboard shortcuts
            </DropdownMenuItem>

            <DropdownMenuSeparator className="bg-[#2A2A2A] my-2" />

            <DropdownMenuItem className="text-red-400 hover:bg-red-500/10 hover:text-red-300 rounded-md cursor-pointer p-2.5">
              <LogOut className="mr-3 h-4 w-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
