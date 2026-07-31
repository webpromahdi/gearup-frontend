import React from "react";
import { Star, Plus, Package, RotateCw, DollarSign } from "lucide-react";
import StatusBadge from "@/components/shared/StatusBadge";
import PageHeading from "@/components/shared/PageHeading";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { rentalRows } from "@/lib/data/customerData";

type StatRow = [React.ElementType, string, string, string, string];

const CustomerDashboardPage = () => {
  const stats: StatRow[] = [
    [Package, "12", "Total Rentals", "text-[#e31824]", "bg-red-50"],
    [RotateCw, "2", "Active Rentals", "text-emerald-600", "bg-emerald-50"],
    [DollarSign, "$340", "Total Spent", "text-amber-600", "bg-amber-50"],
    [Star, "5", "Reviews Given", "text-blue-600", "bg-blue-50"],
  ];
  return (
    <div className="p-5 sm:p-8">
      <PageHeading
        title="Welcome back, John!"
        action={
          <div className="flex gap-3">
            <a
              href="/gear"
              className="inline-flex h-10 items-center gap-2 rounded-lg bg-[#e31824] px-4 text-sm font-bold text-white hover:bg-[#c41520]"
            >
              <Plus className="size-4" />
              Rent New Gear
            </a>
            <a
              href="/dashboard/customer/rentals/ord-2025-0089"
              className="hidden h-10 items-center rounded-lg border border-[#e31824] px-4 text-sm font-bold text-[#e31824] hover:bg-red-50 sm:inline-flex"
            >
              View All Rentals →
            </a>
          </div>
        }
      />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(([Icon, number, label, color, bg]) => (
          <Card
            key={label as string}
            className="flex items-center gap-4 rounded-xl bg-white p-5 shadow-[0_2px_12px_rgba(0,0,0,0.06)]"
          >
            <span
              className={`flex size-11 items-center justify-center rounded-lg ${bg}`}
            >
              <Icon className={`size-6 ${color}`} />
            </span>
            <div>
              <p className="text-2xl font-extrabold text-[#1b2748]">{number}</p>
              <p className="text-sm text-slate-500">{label}</p>
            </div>
          </Card>
        ))}
      </div>
      <section className="mt-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-extrabold text-[#1b2748]">
            Recent Rentals
          </h2>
          <a
            href="/dashboard/customer/rentals/ord-2025-0089"
            className="text-sm font-bold text-[#e31824] hover:underline"
          >
            View All
          </a>
        </div>
        <div className="overflow-x-auto rounded-xl bg-white shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
          <Table className="min-w-[860px] w-full text-left text-sm">
            <TableHeader className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-[0.08em] text-slate-500">
              <TableRow>
                {[
                  "Gear Item",
                  "Rental Period",
                  "Days",
                  "Amount",
                  "Status",
                  "Action",
                ].map((item) => (
                  <TableHead key={item} className="px-5 py-4 font-bold">
                    {item}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {rentalRows.map(
                ([gear, period, days, amount, status, action, image]) => (
                  <TableRow
                    key={gear}
                    className="border-b border-slate-100 last:border-0"
                  >
                    <TableCell className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={image}
                          alt={gear}
                          className="size-10 rounded-lg object-cover"
                        />
                        <span className="font-bold text-[#1b2748]">
                          {gear}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="px-5 py-4 text-slate-600">
                      {period}
                    </TableCell>
                    <TableCell className="px-5 py-4 text-slate-600">
                      {days}
                    </TableCell>
                    <TableCell className="px-5 py-4 font-bold text-[#1b2748]">
                      {amount}
                    </TableCell>
                    <TableCell className="px-5 py-4">
                      <StatusBadge status={status} />
                    </TableCell>
                    <TableCell className="px-5 py-4">
                      {action === "Pay Now" ? (
                        <a
                          href="/dashboard/customer/payment/ord-2025-0089"
                          className="inline-flex rounded-lg bg-[#e31824] px-3 py-2 text-xs font-bold text-white"
                        >
                          Pay Now
                        </a>
                      ) : (
                        <a
                          href={
                            action === "Leave Review"
                              ? "/dashboard/customer/reviews"
                              : "/dashboard/customer/rentals/ord-2025-0089"
                          }
                          className="text-xs font-bold text-[#e31824] hover:underline"
                        >
                          {action}
                        </a>
                      )}
                    </TableCell>
                  </TableRow>
                ),
              )}
            </TableBody>
          </Table>
        </div>
      </section>
      <section className="mt-8">
        <h2 className="mb-4 text-xl font-extrabold text-[#1b2748]">
          Recent Payments
        </h2>
        <div className="overflow-x-auto rounded-xl bg-white shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
          <Table className="min-w-[650px] w-full text-left text-sm">
            <TableHeader className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-[0.08em] text-slate-500">
              <TableRow>
                {[
                  "Transaction ID",
                  "Gear",
                  "Amount",
                  "Method",
                  "Status",
                  "Date",
                ].map((item) => (
                  <TableHead key={item} className="px-5 py-4">
                    {item}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                [
                  "TXN-2025-0089",
                  "Trek MTB",
                  "$75.00",
                  "Stripe",
                  "Jul 15, 2025",
                ],
                [
                  "TXN-2025-0071",
                  "GoPro Kit",
                  "$30.00",
                  "Stripe",
                  "Jul 10, 2025",
                ],
                ["TXN-2025-0065", "Kayak", "$70.00", "Stripe", "Jul 1, 2025"],
              ].map(([id, gear, amount, method, date]) => (
                <TableRow
                  key={id}
                  className="border-b border-slate-100 last:border-0"
                >
                  <TableCell className="px-5 py-4 font-bold text-[#1b2748]">
                    {id}
                  </TableCell>
                  <TableCell className="px-5 py-4">{gear}</TableCell>
                  <TableCell className="px-5 py-4 font-bold">
                    {amount}
                  </TableCell>
                  <TableCell className="px-5 py-4">{method}</TableCell>
                  <TableCell className="px-5 py-4">
                    <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-[11px] font-extrabold text-emerald-700">
                      PAID
                    </span>
                  </TableCell>
                  <TableCell className="px-5 py-4 text-slate-500">
                    {date}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>
    </div>
  );
};

export default CustomerDashboardPage;
