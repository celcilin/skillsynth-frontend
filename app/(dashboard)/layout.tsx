// app/(dashboard)/layout.tsx
import { DashboardSidebar } from "@/components/dashboard/Sidebar";
import { DashboardHeader } from "@/components/dashboard/header";
// import { DashboardFooter } from "@/components/dashboard/footer";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-[#0b0b0b]">
      <DashboardSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* <DashboardHeader /> */}
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-7xl px-6 py-8">{children}</div>
          {/* <DashboardFooter /> */}
        </main>
      </div>
    </div>
  );
}
