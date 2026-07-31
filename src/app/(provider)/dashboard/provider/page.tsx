import { Plus, RotateCw, DollarSign, ClipboardList, Boxes } from "lucide-react";
import GearTable from "@/app/(provider)/_components/GearTable";
import PageHeading from "@/components/shared/PageHeading";
import StatusBadge from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";

const ProviderDashboardPage = () => {
  const stats = [
    [Boxes, "8", "Total Gear Listed", "text-[#e31824]", "bg-red-50"],
    [RotateCw, "4", "Active Rentals", "text-emerald-600", "bg-emerald-50"],
    [ClipboardList, "3", "Pending Orders", "text-amber-600", "bg-amber-50"],
    [DollarSign, "$1,240", "Total Earnings", "text-[#1b2748]", "bg-slate-100"],
  ];
  return (
    <div className="p-5 sm:p-8">
      <PageHeading
        title="Provider Dashboard"
        action={
          <div className="flex gap-3">
            <a
              href="/dashboard/provider/gear/new"
              className="flex h-10 items-center gap-2 rounded-lg bg-[#e31824] px-4 text-sm font-bold text-white"
            >
              <Plus className="size-4" />
              Add New Gear
            </a>
            <a
              href="/dashboard/provider/orders"
              className="hidden h-10 items-center rounded-lg border border-[#e31824] px-4 text-sm font-bold text-[#e31824] sm:flex"
            >
              View All Orders
            </a>
          </div>
        }
      />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(([Icon, n, label, c, b]) => (
          <Card
            key={label as string}
            className="flex items-center gap-4 rounded-xl bg-white p-5 shadow-[0_2px_12px_rgba(0,0,0,0.06)]"
          >
            <span
              className={`flex size-11 items-center justify-center rounded-lg ${b}`}
            >
              <Icon className={`size-6 ${c}`} />
            </span>
            <div>
              <p className="text-2xl font-extrabold text-[#1b2748]">{n}</p>
              <p className="text-sm text-slate-500">{label}</p>
            </div>
          </Card>
        ))}
      </div>
      <section className="mt-8">
        <h2 className="mb-4 text-xl font-extrabold text-[#1b2748]">
          Gear Inventory
        </h2>
        <GearTable short />
      </section>
      <section className="mt-8">
        <h2 className="mb-4 text-xl font-extrabold text-[#1b2748]">
          Pending Orders
        </h2>
        <div className="overflow-x-auto rounded-xl bg-white shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
          <Table className="min-w-[760px] w-full text-left text-sm">
            <TableHeader className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-[.08em] text-slate-500">
              <TableRow>
                {[
                  "Order ID",
                  "Customer",
                  "Gear Item",
                  "Dates",
                  "Amount",
                  "Status",
                  "Action",
                ].map((x) => (
                  <TableHead key={x} className="px-5 py-4">
                    {x}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                [
                  "#ORD-001",
                  "John Doe",
                  "Trek MTB",
                  "Jul 15-18",
                  "$75",
                  "PLACED",
                  "Confirm Order",
                ],
                [
                  "#ORD-002",
                  "Sarah M.",
                  "GoPro Kit",
                  "Jul 10-12",
                  "$30",
                  "PAID",
                  "Mark Picked Up",
                ],
                [
                  "#ORD-003",
                  "Alex K.",
                  "Kayak",
                  "Jul 1-3",
                  "$70",
                  "PICKED_UP",
                  "Mark Returned",
                ],
              ].map(([id, cust, gear, dates, amount, status, action]) => (
                <TableRow
                  key={id}
                  className="border-b border-slate-100 last:border-0"
                >
                  <TableCell className="px-5 py-4">
                    <a
                      href="/dashboard/provider/orders/ord-001"
                      className="font-bold text-[#e31824]"
                    >
                      {id}
                    </a>
                  </TableCell>
                  <TableCell className="px-5 py-4">{cust}</TableCell>
                  <TableCell className="px-5 py-4">{gear}</TableCell>
                  <TableCell className="px-5 py-4 text-slate-500">
                    {dates}
                  </TableCell>
                  <TableCell className="px-5 py-4 font-bold">
                    {amount}
                  </TableCell>
                  <TableCell className="px-5 py-4">
                    <StatusBadge status={status} />
                  </TableCell>
                  <TableCell className="px-5 py-4">
                    <Button
                      className={`rounded-lg px-3 py-2 text-xs font-bold ${status === "PLACED" ? "bg-[#e31824] text-white" : status === "PAID" ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-600"}`}
                    >
                      {action}
                    </Button>
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

export default ProviderDashboardPage;

