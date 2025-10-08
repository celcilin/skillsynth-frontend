// components/dashboard/mobile-sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Compass,
  Map,
  FolderKanban,
  User,
  CreditCard,
  Settings,
  Menu,
} from "lucide-react";

const navigation = [
  { name: "Explore", href: "/explore", icon: Compass },
  { name: "Roadmap", href: "/roadmap", icon: Map },
  { name: "Project", href: "/project", icon: FolderKanban },
];

const bottomNavigation = [
  { name: "Account", href: "/account", icon: User },
  { name: "Billing", href: "/billing", icon: CreditCard },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function MobileSidebar() {
  const pathname = usePathname();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 p-0">
        <div className="flex h-full flex-col">
          <div className="flex h-16 items-center border-b px-6">
            <Link href="/dashboard" className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Map className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">Roadmap</span>
            </Link>
          </div>

          <ScrollArea className="flex-1 px-3 py-4">
            <div className="space-y-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Button
                    key={item.name}
                    variant={isActive ? "secondary" : "ghost"}
                    className={cn(
                      "w-full justify-start",
                      isActive && "bg-muted font-semibold"
                    )}
                    asChild
                  >
                    <Link href={item.href}>
                      <item.icon className="mr-3 h-5 w-5" />
                      {item.name}
                    </Link>
                  </Button>
                );
              })}
            </div>
          </ScrollArea>

          <div className="border-t p-3">
            <div className="space-y-1">
              {bottomNavigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Button
                    key={item.name}
                    variant={isActive ? "secondary" : "ghost"}
                    className={cn(
                      "w-full justify-start",
                      isActive && "bg-muted font-semibold"
                    )}
                    asChild
                  >
                    <Link href={item.href}>
                      <item.icon className="mr-3 h-5 w-5" />
                      {item.name}
                    </Link>
                  </Button>
                );
              })}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
