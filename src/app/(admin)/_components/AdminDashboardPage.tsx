import type React from "react";
import {
  DollarSign,
  ClipboardList,
  Boxes,
  Users,
  TrendingUp,
  BarChart3,
  PieChart,
} from "lucide-react";
import AdminShell from "./AdminShell";
import AdminUsersTable from "./AdminUsersTable";
import AdminRentalTable from "./AdminRentalTable";
import PageHeading from "@/components/shared/PageHeading";
import { Card } from "@/components/ui/card";

const AdminDashboardPage = () => {
  const stats: [React.ElementType, string, string, string, string][] = [
    [
      Users,
      "1,247",
      "Total Users",
      "+24 this week",
      "bg-blue-50 text-blue-600",
    ],
    [
      Boxes,
      "342",
      "Active Gear Listings",
      "+8 this week",
      "bg-red-50 text-[#e31824]",
    ],
    [
      ClipboardList,
      "891",
      "Total Rentals",
      "+31 this week",
      "bg-amber-50 text-amber-600",
    ],
    [
      DollarSign,
      "$24,560",
      "Platform Revenue",
      "+$1,240 this week",
      "bg-emerald-50 text-emerald-600",
    ],
  ];
  return (
    <AdminShell>
      <div className="p-5 sm:p-8">
        <PageHeading title="Admin Dashboard" />
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map(([Icon, num, label, trend, bg]) => (
            <Card
              key={label as string}
              className="rounded-xl bg-white p-5 shadow-[0_2px_12px_rgba(0,0,0,.06)]"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-3xl font-extrabold text-[#1b2748]">
                    {num}
                  </p>
                  <p className="mt-1 text-sm font-medium text-slate-500">
                    {label}
                  </p>
                  <p className="mt-3 flex items-center gap-1 text-xs font-bold text-emerald-600">
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
        <div className="mt-8 grid gap-6 xl:grid-cols-2">
          <Card className="rounded-xl bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,.06)]">
            <h2 className="flex items-center gap-2 text-lg font-extrabold text-[#1b2748]">
              <BarChart3 className="size-5 text-[#e31824]" />
              Rentals Over Time{" "}
              <span className="font-medium text-slate-400">(Last 30 Days)</span>
            </h2>
            <div className="mt-9 flex h-48 items-end gap-2 border-b border-slate-200 pb-1">
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
                  className={`flex-1 rounded-t ${height} ${i === 17 ? "bg-[#e31824]" : "bg-[#1b2748]"}`}
                />
              ))}
            </div>
            <div className="mt-3 flex justify-between text-[10px] font-bold uppercase tracking-[.1em] text-slate-400">
              <span>Jul 1</span>
              <span>Jul 8</span>
              <span>Jul 15</span>
              <span>Jul 22</span>
              <span>Jul 29</span>
            </div>
          </Card>
          <Card className="rounded-xl bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,.06)]">
            <h2 className="flex items-center gap-2 text-lg font-extrabold text-[#1b2748]">
              <PieChart className="size-5 text-[#e31824]" />
              Revenue by Category
            </h2>
            <div className="mt-7 flex items-center gap-8">
              <div className="flex size-40 shrink-0 items-center justify-center rounded-full bg-[conic-gradient(#e31824_0_28%,#1b2748_28%_50%,#f4b740_50%_68%,#60a5fa_68%_83%,#cbd5e1_83%_100%)]">
                <div className="flex size-24 items-center justify-center rounded-full bg-white text-center text-xs font-bold text-[#1b2748]">
                  $24.5k
                  <br />
                  <span className="font-medium text-slate-400">revenue</span>
                </div>
              </div>
              <ul className="space-y-2 text-xs font-semibold text-slate-600">
                <li>
                  <i className="mr-2 inline-block size-2 rounded-full bg-[#e31824]" />
                  Cycling 28%
                </li>
                <li>
                  <i className="mr-2 inline-block size-2 rounded-full bg-[#1b2748]" />
                  Camping 22%
                </li>
                <li>
                  <i className="mr-2 inline-block size-2 rounded-full bg-[#f4b740]" />
                  Water Sports 18%
                </li>
                <li>
                  <i className="mr-2 inline-block size-2 rounded-full bg-blue-400" />
                  Winter 15%
                </li>
                <li>
                  <i className="mr-2 inline-block size-2 rounded-full bg-slate-300" />
                  Others 17%
                </li>
              </ul>
            </div>
          </Card>
        </div>
        <section className="mt-8">
          <h2 className="mb-4 text-xl font-extrabold text-[#1b2748]">
            Recent Users
          </h2>
          <AdminUsersTable short />
        </section>
        <section className="mt-8">
          <h2 className="mb-4 text-xl font-extrabold text-[#1b2748]">
            Recent Rentals
          </h2>
          <AdminRentalTable short />
        </section>
      </div>
    </AdminShell>
  );
}

export default AdminDashboardPage;
