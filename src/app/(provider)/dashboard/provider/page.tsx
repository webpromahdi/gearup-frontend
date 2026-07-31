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
import { getProviderGearAction } from "@/app/(provider)/_actions/gearActions";
import Link from "next/link";

const ProviderDashboardPage = async () => {
  let totalGear = 0;
  try {
    const res = await getProviderGearAction();
    const gearData = Array.isArray(res?.data?.gearItems)
      ? res.data.gearItems
      : Array.isArray(res?.data)
        ? res.data
        : Array.isArray(res)
          ? res
          : [];
    totalGear = gearData.length;
  } catch (err) {
    console.error("Failed to fetch gear stats");
  }

  const stats = [
    { Icon: Boxes, n: totalGear.toString(), label: "Total Gear Listed", c: "text-[#e31824]", b: "bg-red-50" },
    { Icon: RotateCw, n: "4", label: "Active Rentals", c: "text-emerald-600", b: "bg-emerald-50" },
    { Icon: ClipboardList, n: "3", label: "Pending Orders", c: "text-amber-600", b: "bg-amber-50" },
    { Icon: DollarSign, n: "$1,240", label: "Total Earnings", c: "text-[#1b2748]", b: "bg-slate-100" },
  ];
  return (
    <div className="min-h-screen bg-slate-50/50 p-6 sm:p-10">
      <PageHeading
        title="Provider Dashboard"
        action={
          <div className="flex gap-3">
            <Link
              href="/dashboard/provider/gear/new"
            className="flex h-10 items-center gap-2 rounded-lg bg-[#e31824] px-4 text-sm font-bold text-white transition-colors hover:bg-[#c41520]"
            >
              <Plus className="size-4" />
              Add New Gear
            </Link>
            <Link
              href="/dashboard/provider/orders"
            className="hidden h-10 items-center rounded-lg border border-[#e31824] px-4 text-sm font-bold text-[#e31824] transition-colors hover:bg-red-50 sm:flex"
            >
              View All Orders
            </Link>
          </div>
        }
      />
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(({ Icon, n, label, c, b }) => (
          <Card
            key={label}
            className="relative flex items-center gap-4 overflow-hidden rounded-xl border border-slate-200 bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)]"
          >
            <span
              className={`flex size-11 items-center justify-center rounded-full ${b}`}
            >
              <Icon className={`size-6 ${c}`} />
            </span>
            <div>
              <p className="text-2xl font-extrabold tracking-tight text-[#1b2748]">{n}</p>
              <p className="mt-1 text-[11px] font-bold uppercase tracking-wider text-slate-500">{label}</p>
            </div>
          </Card>
        ))}
      </div>
      <section className="mt-10">
        <h2 className="mb-4 text-xl font-extrabold text-[#1b2748]">
          Gear Inventory
        </h2>
        <GearTable short />
      </section>
      <section className="mt-10">
        <h2 className="mb-4 text-xl font-extrabold text-[#1b2748]">
          Pending Orders
        </h2>
        <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
          <Table className="min-w-[760px] w-full text-left text-sm">
          <TableHeader className="border-b border-slate-100 bg-slate-50/50 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
            <TableRow className="hover:bg-transparent">
                {[
                  "Order ID",
                  "Customer",
                  "Gear Item",
                  "Dates",
                  "Amount",
                  "Status",
                  "Action",
                ].map((x) => (
                  <TableHead key={x} className="px-5 py-3.5">
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
                  className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50"
                >
                  <TableCell className="px-5 py-4">
                    <Link
                      href="/dashboard/provider/orders/ord-001"
                      className="font-bold text-[#e31824]"
                    >
                      {id}
                    </Link>
                  </TableCell>
                  <TableCell className="px-5 py-4 text-[13px] font-medium text-[#1b2748]">{cust}</TableCell>
                  <TableCell className="px-5 py-4 text-[13px] text-slate-600">{gear}</TableCell>
                  <TableCell className="px-5 py-4 text-[13px] text-slate-500">
                    {dates}
                  </TableCell>
                  <TableCell className="px-5 py-4 text-[13px] font-bold text-[#1b2748]">
                    {amount}
                  </TableCell>
                  <TableCell className="px-5 py-4">
                    <StatusBadge status={status} />
                  </TableCell>
                  <TableCell className="px-5 py-4">
                    <Button
                      className={`h-8 rounded-lg px-3 text-xs font-bold transition-colors ${status === "PLACED" ? "bg-[#e31824] text-white hover:bg-[#c41520]" : status === "PAID" ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
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

