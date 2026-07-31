import type React from "react";
import { Star, LayoutDashboard, Package, CreditCard, Settings, LogOut, PlusCircle } from "lucide-react";
import Logo from "@/components/shared/Logo";
import Link from "next/link";

function DashboardSidebar() {
  const nav = [
    [LayoutDashboard, "Dashboard", "/dashboard/customer"],
    [Package, "My Rentals", "/dashboard/customer/rentals/ord-2025-0089"],
    [PlusCircle, "Rent New Gear", "/dashboard/customer/rent"],
    [CreditCard, "Payments", "/dashboard/customer/payment/ord-2025-0089"],
    [Star, "My Reviews", "/dashboard/customer/reviews"],
    [Settings, "Profile Settings", "#settings"]
  ];
  return (
    <aside className="hidden fixed inset-y-0 left-0 z-40 w-[260px] flex-col bg-[#1b2748] px-4 py-7 text-white lg:flex">
      <Link href="/dashboard/customer" className="mb-10"><Logo inverse /></Link>
      <div className="flex items-center gap-3 border-b border-white/15 pb-6">
        <span className="flex size-11 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-blue-700 text-sm font-extrabold">JD</span>
        <div>
          <p className="font-bold">John Doe</p>
          <span className="mt-1 inline-flex rounded-full bg-[#e31824] px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-[0.1em]">Customer</span>
        </div>
      </div>
      <nav className="mt-7 space-y-1">
        {nav.map(([Icon, label, href]) => {
          const IconComponent = Icon as React.ElementType;
          return (
            <Link key={label as string} href={href as string} className="flex items-center gap-3 rounded-lg border-l-2 border-transparent px-3 py-3 text-sm font-semibold text-slate-200 transition hover:border-[#e31824] hover:bg-white/5 hover:text-white">
              <IconComponent className="size-5" />
              {label as string}
            </Link>
          );
        })}
      </nav>
      <Link href="/" className="mt-auto flex h-11 items-center justify-center gap-2 rounded-lg border border-[#e31824] text-sm font-bold text-red-200 transition hover:bg-[#e31824] hover:text-white">
        <LogOut className="size-4" />
        Log Out
      </Link>
    </aside>
  );
}

function DashboardMobileBar() {
  return (
    <header className="flex h-16 items-center justify-between bg-[#1b2748] px-5 text-white lg:hidden">
      <Link href="/dashboard/customer"><Logo inverse /></Link>
      <Link href="/" className="text-sm font-bold text-red-200">Exit dashboard</Link>
    </header>
  );
}

export default function CustomerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f5f6fa] font-[Inter] text-[#1a1a2e]">
      <DashboardSidebar />
      <DashboardMobileBar />
      <main className="min-h-screen lg:ml-[260px]">{children}</main>
    </div>
  );
}
