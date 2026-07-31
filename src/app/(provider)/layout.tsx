"use client";
import type React from "react";
import {
  Boxes,
  ClipboardList,
  LayoutDashboard,
  LogOut,
  Plus,
  Settings,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Logo from "@/components/shared/Logo";
import { logout } from "@/app/services/auth/logout";

const nav: [React.ElementType, string, string][] = [
  [LayoutDashboard, "Dashboard", "/dashboard/provider"],
  [Boxes, "My Gear", "/dashboard/provider/gear"],
  [Plus, "Add New Gear", "/dashboard/provider/gear/new"],
  [ClipboardList, "Orders", "/dashboard/provider/orders"],
  [Settings, "Profile", "/dashboard/provider/profile"],
];

const ProviderSidebar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-[260px] flex-col bg-[#1b2748] px-4 py-7 text-white lg:flex">
      <Link href="/dashboard/provider">
        <Logo inverse />
      </Link>
      <div className="mt-10 flex items-center gap-3 border-b border-white/15 pb-6">
        <span className="flex size-11 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-600 text-sm font-extrabold">
          AG
        </span>
        <div>
          <p className="font-bold">Adventure Gear Co.</p>
          <span className="mt-1 inline-flex rounded-full bg-amber-400 px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-[0.1em] text-[#1b2748]">
            Provider
          </span>
        </div>
      </div>
      <nav className="mt-7 space-y-1">
        {nav.map(([Icon, label, href]) => {
          const isActive =
            href === "/dashboard/provider"
              ? pathname === href
              : pathname.startsWith(href);
          return (
            <Link
              key={label as string}
              href={href as string}
              className={`flex items-center gap-3 rounded-lg border-l-2 px-3 py-3 text-sm font-semibold transition-colors ${
                isActive
                  ? "border-[#e31824] bg-white/10 text-white"
                  : "border-transparent text-slate-200 hover:border-[#e31824] hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon className="size-5" />
              {label}
            </Link>
          );
        })}
      </nav>
      <button
        onClick={handleLogout}
        className="mt-auto flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-[#e31824] text-sm font-bold text-red-200 transition-colors hover:bg-[#e31824] hover:text-white"
      >
        <LogOut className="size-4" />
        Log Out
      </button>
    </aside>
  );
};

const ProviderDashboardLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="min-h-screen bg-[#f5f6fa] font-[Inter]">
      <ProviderSidebar />
      <header className="flex h-16 items-center justify-between bg-[#1b2748] px-5 text-white lg:hidden">
        <Link href="/dashboard/provider">
          <Logo inverse />
        </Link>
        <a href="/" className="text-sm font-bold text-red-200">
          Exit dashboard
        </a>
      </header>
      <main className="min-h-screen lg:ml-[260px]">{children}</main>
    </div>
  );
};

export default ProviderDashboardLayout;
