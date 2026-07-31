"use client";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { PackageOpen } from "lucide-react";
import StatusBadge from "@/components/shared/StatusBadge";
import PageHeading from "@/components/shared/PageHeading";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { getAdminRentalsAction } from "@/app/(admin)/_actions/adminActions";

const STATUS_TABS = [
  "All",
  "PLACED",
  "CONFIRMED",
  "PAID",
  "PICKED_UP",
  "RETURNED",
  "CANCELLED",
] as const;
type StatusTab = (typeof STATUS_TABS)[number];

const formatDate = (dateStr: string) =>
  new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

const AdminRentalsPage = () => {
  const [activeTab, setActiveTab] = useState<StatusTab>("All");

  const { data: rentals = [], isLoading } = useQuery({
    queryKey: ["admin-rentals"],
    queryFn: getAdminRentalsAction,
  });

  const filtered =
    activeTab === "All"
      ? rentals
      : rentals.filter((r: any) => r.status === activeTab);

  const stats = [
    ["Total", rentals.length, "text-[#1b2748]"],
    [
      "Active",
      rentals.filter((r: any) =>
        ["PLACED", "CONFIRMED", "PAID", "PICKED_UP"].includes(r.status),
      ).length,
      "text-blue-600",
    ],
    [
      "Completed",
      rentals.filter((r: any) => r.status === "RETURNED").length,
      "text-emerald-600",
    ],
    [
      "Cancelled",
      rentals.filter((r: any) => r.status === "CANCELLED").length,
      "text-[#e31824]",
    ],
  ];

  return (
    <div className="p-5 sm:p-8">
      <PageHeading title="Rental Management" />
      <div className="grid gap-4 sm:grid-cols-4">
        {stats.map(([label, n, c]) => (
          <Card key={label as string} className="rounded-xl bg-white p-5 shadow-sm">
            <p className={`text-2xl font-extrabold ${c}`}>{n}</p>
            <p className="mt-1 text-sm text-slate-500">{label}</p>
          </Card>
        ))}
      </div>
      <div className="mt-8 flex gap-5 overflow-x-auto border-b border-slate-200">
        {STATUS_TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`whitespace-nowrap border-b-2 pb-3 text-sm font-bold ${activeTab === tab ? "border-[#e31824] text-[#e31824]" : "border-transparent text-slate-500"}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="flex h-[40vh] items-center justify-center">
          <div className="size-8 animate-spin rounded-full border-4 border-slate-200 border-t-[#e31824]" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="mt-6 flex flex-col items-center justify-center rounded-xl bg-white py-20 shadow-sm">
          <PackageOpen className="mb-4 size-12 text-slate-300" />
          <p className="font-bold text-slate-500">No rentals found</p>
        </div>
      ) : (
        <ScrollArea className="mt-6 h-full w-full rounded-xl border border-slate-200 bg-white shadow-sm">
          <Table className="min-w-[1000px] w-full text-left text-sm">
            <TableHeader className="border-b border-slate-100 bg-slate-50/50 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
              <TableRow className="hover:bg-transparent">
                {[
                  "ID",
                  "Customer",
                  "Gear Item",
                  "Provider",
                  "Start",
                  "End",
                  "Days",
                  "Amount",
                  "Status",
                  "Created",
                ].map((h, i) => (
                  <TableHead key={i} className="px-5 py-3.5">
                    {h}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((order: any) => {
                const startDate = new Date(order.startDate);
                const endDate = new Date(order.endDate);
                const days = Math.max(
                  1,
                  Math.ceil(
                    (endDate.getTime() - startDate.getTime()) /
                      (1000 * 60 * 60 * 24),
                  ),
                );
                return (
                  <TableRow
                    key={order.id}
                    className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50"
                  >
                    <TableCell className="px-5 py-4 text-[13px] font-bold text-[#e31824]">
                      #{order.id.slice(0, 8).toUpperCase()}
                    </TableCell>
                    <TableCell className="px-5 py-4 text-[13px] font-medium text-[#1b2748]">
                      {order.customer?.name ?? "—"}
                    </TableCell>
                    <TableCell className="px-5 py-4 text-[13px] text-slate-600">
                      {order.gearItem?.name ?? "—"}
                    </TableCell>
                    <TableCell className="px-5 py-4 text-[13px] text-slate-600">
                      {order.gearItem?.provider?.name ?? "—"}
                    </TableCell>
                    <TableCell className="px-5 py-4 text-[13px] text-slate-500">
                      {formatDate(order.startDate)}
                    </TableCell>
                    <TableCell className="px-5 py-4 text-[13px] text-slate-500">
                      {formatDate(order.endDate)}
                    </TableCell>
                    <TableCell className="px-5 py-4 text-[13px] text-slate-500">
                      {days}d
                    </TableCell>
                    <TableCell className="px-5 py-4 text-[13px] font-bold text-[#1b2748]">
                      ${parseFloat(order.totalAmount).toFixed(2)}
                    </TableCell>
                    <TableCell className="px-5 py-4">
                      <StatusBadge status={order.status} />
                    </TableCell>
                    <TableCell className="px-5 py-4 text-[13px] text-slate-500">
                      {formatDate(order.createdAt)}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      )}
    </div>
  );
};

export default AdminRentalsPage;
