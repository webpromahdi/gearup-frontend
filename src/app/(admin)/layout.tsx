import type React from "react";
import {
  Boxes,
  ClipboardList,
  LayoutDashboard,
  LogOut,
  Settings,
  Tags,
  Users,
} from "lucide-react";
import Link from "next/link";
import Logo from "@/components/shared/Logo";

const AdminSidebar = () => {
  const nav: [React.ElementType, string, string][] = [
    [LayoutDashboard, "Dashboard", "/dashboard/admin"],
    [Users, "Users", "/dashboard/admin/users"],
    [Tags, "Categories", "/dashboard/admin/categories"],
    [Boxes, "Gear Moderation", "/dashboard/admin/gear"],
    [ClipboardList, "Rentals", "/dashboard/admin/rentals"],
    [Settings, "Profile", "#profile"],
  ];
  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-[260px] flex-col bg-[#1b2748] px-4 py-7 text-white lg:flex">
      <Link href="/dashboard/admin">
        <Logo inverse />
      </Link>
      <div className="mt-10 flex items-center gap-3 border-b border-white/15 pb-6">
        <span className="flex size-11 items-center justify-center rounded-full bg-gradient-to-br from-red-400 to-rose-700 text-sm font-extrabold">
          AD
        </span>
        <div>
          <p className="font-bold">Platform Admin</p>
          <span className="mt-1 inline-flex rounded-full bg-white/15 px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-[.1em]">
            Admin
          </span>
        </div>
      </div>
      <nav className="mt-7 space-y-1">
        {nav.map(([Icon, label, href]) => (
          <Link
            key={label as string}
            href={href as string}
            className="flex items-center gap-3 rounded-lg border-l-2 border-transparent px-3 py-3 text-sm font-semibold text-slate-200 hover:border-[#e31824] hover:bg-white/5 hover:text-white"
          >
            <Icon className="size-5" />
            {label}
          </Link>
        ))}
      </nav>
      <Link
        href="/"
        className="mt-auto flex h-11 items-center justify-center gap-2 rounded-lg border border-[#e31824] text-sm font-bold text-red-200 hover:bg-[#e31824] hover:text-white"
      >
        <LogOut className="size-4" />
        Log Out
      </Link>
    </aside>
  );
};

const AdminDashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-[#f5f6fa] font-[Inter]">
      <AdminSidebar />
      <header className="flex h-16 items-center justify-between bg-[#1b2748] px-5 text-white lg:hidden">
        <a href="/dashboard/admin">
          <Logo inverse />
        </a>
        <a href="/" className="text-sm font-bold text-red-200">
          Exit dashboard
        </a>
      </header>
      <main className="min-h-screen lg:ml-[260px]">{children}</main>
    </div>
  );
};

export default AdminDashboardLayout;
