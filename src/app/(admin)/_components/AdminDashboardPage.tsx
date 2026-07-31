import type React from "react";
import {
  DollarSign,
  ClipboardList,
  Boxes,
  Users,
  TrendingUp,
  BarChart3,
  PieChart,
  Calendar,
  ChevronDown,
} from "lucide-react";
import AdminUsersTable from "./AdminUsersTable";
import AdminRentalTable from "./AdminRentalTable";
import { Card } from "@/components/ui/card";

const AdminDashboardPage = () => {
  const stats: [React.ElementType, string, string, string, string, string][] = [
    [
      Users,
      "1,247",
      "Total Users",
      "+24 this week",
      "bg-blue-50 text-blue-600",
      "bg-blue-600",
    ],
    [
      Boxes,
      "342",
      "Active Listings",
      "+8 this week",
      "bg-red-50 text-[#e31824]",
      "bg-[#e31824]",
    ],
    [
      ClipboardList,
      "891",
      "Total Rentals",
      "+31 this week",
      "bg-amber-50 text-amber-600",
      "bg-amber-500",
    ],
    [
      DollarSign,
      "$24,560",
      "Platform Revenue",
      "+$1,240 this week",
      "bg-emerald-50 text-emerald-600",
      "bg-emerald-500",
    ],
  ];

  return (
    <div className="p-6 sm:p-10 bg-slate-50/50 min-h-screen">
      {/* Hero Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-[#1b2748]">
            Welcome back, Admin 👋
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Here&apos;s what&apos;s happening on GearUp today.
          </p>
        </div>
        <button className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-colors hover:bg-slate-50">
          <Calendar className="size-4 text-slate-400" />
          Jul 30 — Aug 29, 2026
          <ChevronDown className="ml-2 size-4 text-slate-400" />
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(([Icon, num, label, trend, bg, accent]) => (
          <Card
            key={label}
            className="relative overflow-hidden rounded-lg border border-slate-200 bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)]"
          >
            <div className={`absolute left-0 top-0 h-full w-1 ${accent}`} />
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  {label}
                </p>
                <p className="mt-2 text-3xl font-extrabold text-[#1b2748]">
                  {num}
                </p>
                <p className="mt-3 flex items-center gap-1 text-xs font-semibold text-emerald-600">
                  <TrendingUp className="size-3.5" />
                  {trend}
                </p>
              </div>
              <span
                className={`flex size-11 items-center justify-center rounded-full ${bg}`}
              >
                <Icon className="size-5" />
              </span>
            </div>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="mt-10 grid gap-6 xl:grid-cols-2">
        <Card className="rounded-lg border border-slate-200 bg-white p-8 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
          <div className="flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-base font-bold text-[#1b2748]">
              <BarChart3 className="size-5 text-[#e31824]" />
              Rentals Over Time{" "}
              <span className="text-sm font-medium text-slate-400">
                Last 30 days
              </span>
            </h2>
            <button className="flex items-center gap-2 rounded-md border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 transition-colors hover:bg-slate-50">
              Daily
              <ChevronDown className="size-3 text-slate-400" />
            </button>
          </div>
          <div className="mt-9 flex h-48 items-end gap-2 border-b border-slate-100 pb-1">
            {[
              "h-[76px]",
              "h-[92px]",
              "h-[54px]",
              "h-[116px]",
              "h-[103px]",
              "h-[140px]",
              "h-[84px]",
              "h-[132px]",
              "h-[111px]",
              "h-[162px]",
              "h-[97px]",
              "h-[124px]",
              "h-[146px]",
              "h-[105px]",
              "h-[154px]",
              "h-[86px]",
              "h-[121px]",
              "h-[135px]",
            ].map((height, i) => (
              <div
                key={i}
                className={`flex-1 rounded-t-sm ${height} ${i === 17 ? "bg-[#e31824]" : "bg-[#1b2748]"}`}
              />
            ))}
          </div>
          <div className="mt-3 flex justify-between text-[11px] font-semibold text-slate-400">
            <span>Jul 1</span>
            <span>Jul 8</span>
            <span>Jul 15</span>
            <span>Jul 22</span>
            <span>Jul 29</span>
          </div>
        </Card>
        <Card className="rounded-lg border border-slate-200 bg-white p-8 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
          <h2 className="flex items-center gap-2 text-base font-bold text-[#1b2748]">
            <PieChart className="size-5 text-[#e31824]" />
            Revenue by Category
          </h2>
          <div className="mt-8 flex items-center justify-around gap-8 sm:justify-start sm:gap-12">
            <div className="flex size-44 shrink-0 items-center justify-center rounded-full bg-[conic-gradient(#e31824_0_28%,#1b2748_28%_50%,#f4b740_50%_68%,#60a5fa_68%_83%,#cbd5e1_83%_100%)]">
              <div className="flex size-28 flex-col items-center justify-center rounded-full bg-white text-center">
                <span className="text-xl font-extrabold text-[#1b2748]">
                  $24.5k
                </span>
                <span className="text-xs font-medium text-slate-400 mt-0.5">
                  Total Revenue
                </span>
              </div>
            </div>
            <ul className="space-y-3 text-sm font-medium text-slate-600">
              <li className="flex items-center">
                <i className="mr-3 inline-block size-2 rounded-full bg-[#e31824]" />
                Cycling 28%
              </li>
              <li className="flex items-center">
                <i className="mr-3 inline-block size-2 rounded-full bg-[#1b2748]" />
                Camping 22%
              </li>
              <li className="flex items-center">
                <i className="mr-3 inline-block size-2 rounded-full bg-[#f4b740]" />
                Water Sports 18%
              </li>
              <li className="flex items-center">
                <i className="mr-3 inline-block size-2 rounded-full bg-blue-400" />
                Winter 15%
              </li>
              <li className="flex items-center">
                <i className="mr-3 inline-block size-2 rounded-full bg-slate-300" />
                Others 17%
              </li>
            </ul>
          </div>
        </Card>
      </div>

      {/* Tables Section */}
      <div className="mt-10 grid gap-6 xl:grid-cols-2">
        <section className="flex flex-col h-full">
          <div className="mb-4 flex shrink-0 items-center justify-between">
            <h2 className="text-base font-bold tracking-tight text-[#1b2748]">
              Recent Users
            </h2>
            <button className="text-[13px] font-semibold text-blue-600 hover:underline">
              View all
            </button>
          </div>
          <div className="flex-1 min-h-0">
            <AdminUsersTable short />
          </div>
        </section>
        <section className="flex flex-col h-full">
          <div className="mb-4 flex shrink-0 items-center justify-between">
            <h2 className="text-base font-bold tracking-tight text-[#1b2748]">
              Recent Rentals
            </h2>
            <button className="text-[13px] font-semibold text-blue-600 hover:underline">
              View all
            </button>
          </div>
          <div className="flex-1 min-h-0">
            <AdminRentalTable short />
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
