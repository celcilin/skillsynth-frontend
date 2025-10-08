import { Navbar } from "@/components/landing/navbar";
// import { DashboardFooter } from "@/components/dashboard/footer";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="bg-[#0A0A0A]">
      <Navbar />
      {children}
    </section>
  );
}
