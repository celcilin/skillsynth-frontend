// components/dashboard/sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Compass,
  Map,
  FolderKanban,
  User,
  CreditCard,
  Settings,
  ChevronRight,
  Keyboard,
  LogOut,
  ChevronDown,
  Star,
  Loader2,
} from "lucide-react";
import { IconStack2Filled } from "@tabler/icons-react";
import { authApi, userAPI } from "@/utils/api";
import { useEffect, useState } from "react";
import { UserProfile } from "@/types/roadmap";

const navigation = [
  { name: "Generate", href: "/generate", icon: Star },
  // { name: "Explore", href: "/explore", icon: Compass },
  { name: "Roadmap", href: "/roadmap", icon: Map },
  { name: "Project", href: "/project", icon: FolderKanban },
];

const bottomNavigation = [
  { name: "Account", href: "/account", icon: User },
  { name: "Billing", href: "/billing", icon: CreditCard },
  // { name: "Settings", href: "/settings", icon: Settings },
];

const handlelogout = () => {
  authApi.logout();
};

export function DashboardSidebar() {
  const pathname = usePathname();
  const [userData, setUserData] = useState([]);
  const [userProfile, setUserProfile] = useState<UserProfile>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setIsLoading(true);
        const resProfile = await userAPI.getProfile();
        console.log(resProfile[0]);
        setUserProfile(resProfile[0]);
        const res = await authApi.getUser();
        console.log(res?.user);
        setUserData(res?.user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, []);

  return (
    <aside className="hidden w-72 border-r border-[#2A2A2A] bg-[#0F0F0F] md:block">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-20 items-center border-b border-[#2A2A2A] px-6">
          <Link href="/generate" className="flex items-center space-x-3 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-white to-gray-200 shadow-lg group-hover:shadow-xl transition-all group-hover:scale-105">
              <IconStack2Filled className="h-6 w-6 text-black" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-white tracking-tight">
                Skill Sync
              </span>
              <span className="text-xs text-[#666666]">Learning Platform</span>
            </div>
          </Link>
        </div>

        <ScrollArea className="flex-1 px-4 py-6">
          {/* Main Navigation */}
          <div className="mb-6">
            <h3 className="mb-3 px-3 text-xs font-semibold text-[#666666] uppercase tracking-wider">
              Main Menu
            </h3>
            <div className="space-y-1">
              {navigation.map((item) => {
                const isActive = pathname.startsWith(item.href);
                return (
                  <Link key={item.name} href={item.href}>
                    <Button
                      variant="ghost"
                      className={cn(
                        "w-full justify-between text-[#888888] hover:bg-[#1A1A1A] hover:text-white transition-all duration-200 h-11 px-3 group relative",
                        isActive &&
                          "bg-[#1A1A1A] text-white font-medium shadow-lg"
                      )}
                    >
                      <div className="flex items-center">
                        <div
                          className={cn(
                            "p-1.5 rounded-lg mr-3 transition-all",
                            isActive
                              ? "bg-white/10"
                              : "bg-transparent group-hover:bg-white/5"
                          )}
                        >
                          <item.icon className="h-5 w-5" />
                        </div>
                        <span className="font-medium">{item.name}</span>
                      </div>
                      {isActive && (
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-full" />
                      )}
                      <ChevronRight
                        className={cn(
                          "h-4 w-4 transition-all",
                          isActive
                            ? "opacity-100 translate-x-0"
                            : "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
                        )}
                      />
                    </Button>
                  </Link>
                );
              })}
            </div>
          </div>

          <Separator className="bg-[#2A2A2A] my-6" />

          {/* Quick Stats */}
          <div className="mb-6 px-3">
            <h3 className="mb-3 text-xs font-semibold text-[#666666] uppercase tracking-wider">
              Your Progress
            </h3>
            <div className="space-y-3">
              <div className="rounded-xl bg-gradient-to-br from-[#1A1A1A] to-[#161616] border border-[#2A2A2A] p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-[#888888]">Completed</span>
                  <span className="text-sm font-bold text-white">12/24</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-[#2A2A2A]">
                  <div
                    className="h-full bg-gradient-to-r from-white to-gray-300 transition-all"
                    style={{ width: "50%" }}
                  />
                </div>
              </div>

              <div className="rounded-xl bg-gradient-to-br from-[#1A1A1A] to-[#161616] border border-[#2A2A2A] p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-emerald-500/10">
                      <FolderKanban className="w-4 h-4 text-emerald-400" />
                    </div>
                    <span className="text-sm text-[#888888]">
                      Active Projects
                    </span>
                  </div>
                  <span className="text-lg font-bold text-white">5</span>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>

        {/* Bottom Navigation */}
        <div className="p-4">
          {/* User Profile Section with Dropdown */}
          <div className="mt-4 pt-4 border-t border-[#2A2A2A]">
            {isLoading ? (
              // Loading Skeleton
              <div className="w-full p-3 animate-pulse">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-[#2A2A2A] flex-shrink-0" />
                  <div className="flex flex-col gap-2 flex-1 min-w-0">
                    <div className="h-3.5 bg-[#2A2A2A] rounded w-24" />
                    <div className="h-3 bg-[#2A2A2A] rounded w-32" />
                  </div>
                  <div className="h-4 w-4 bg-[#2A2A2A] rounded flex-shrink-0" />
                </div>
              </div>
            ) : (
              // Actual User Profile
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="w-full justify-start hover:bg-[#1A1A1A] h-auto p-3 transition-all group"
                  >
                    <div className="flex items-center gap-3 w-full">
                      <div className="h-9 w-9 rounded-full bg-gradient-to-br from-white to-gray-300 flex items-center justify-center text-black font-bold text-sm flex-shrink-0 overflow-hidden">
                        {userProfile?.photo_url ? (
                          <img
                            src={userProfile.photo_url}
                            alt="Profile"
                            className="h-full w-full object-cover rounded-full"
                          />
                        ) : (
                          userProfile?.name?.charAt(0)?.toUpperCase() || "U"
                        )}
                      </div>
                      <div className="flex flex-col items-start flex-1 min-w-0">
                        <span className="text-sm font-medium text-white truncate w-full">
                          {userProfile?.name || "User"}
                        </span>
                        <span className="text-xs text-[#666666] truncate w-full">
                          {userProfile?.email || "user@example.com"}
                        </span>
                      </div>
                      <ChevronDown className="h-4 w-4 text-[#666666] group-hover:text-white transition-colors flex-shrink-0" />
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  side="top"
                  className="w-64 bg-[#161616] border-[#2A2A2A] p-2 mb-2"
                >
                  <DropdownMenuLabel className="p-3">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-white to-gray-300 flex items-center justify-center text-black font-bold text-sm overflow-hidden">
                        {userProfile?.photo_url ? (
                          <img
                            src={userProfile.photo_url}
                            alt="Profile"
                            className="h-full w-full object-cover rounded-full"
                          />
                        ) : (
                          userProfile?.name?.charAt(0)?.toUpperCase() || "U"
                        )}
                      </div>
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-semibold text-white">
                          {userProfile?.name || "User"}
                        </p>
                        <p className="text-xs text-[#888888]">
                          {userProfile?.email || "user@example.com"}
                        </p>
                      </div>
                    </div>
                  </DropdownMenuLabel>

                  <DropdownMenuSeparator className="bg-[#2A2A2A] my-2" />

                  <DropdownMenuItem
                    className="text-[#CCCCCC] hover:bg-[#1A1A1A] hover:text-white rounded-md cursor-pointer p-2.5"
                    asChild
                  >
                    <Link href="/account">
                      <User className="mr-3 h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-not-allowed text-[#CCCCCC] hover:bg-[#1A1A1A] hover:text-white rounded-md cursor-pointer p-2.5"
                    asChild
                    disabled
                  >
                    <Link href="/billing">
                      <CreditCard className="mr-3 h-4 w-4" />
                      Billing
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator className="bg-[#2A2A2A] my-2" />

                  <DropdownMenuItem
                    onClick={handlelogout}
                    className="text-red-400 hover:bg-red-500/10 hover:text-red-300 rounded-md cursor-pointer p-2.5"
                  >
                    <LogOut className="mr-3 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
}
