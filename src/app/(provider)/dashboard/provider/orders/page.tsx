import { Search } from "lucide-react";
import Link from "next/link";
import PageHeading from "@/components/shared/PageHeading";
import StatusBadge from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const ProviderOrdersPage = () => {
  const orders = [
    [
      "#ORD-001",
      "John Doe",
      "Trek MTB",
      "Jul 15",
      "Jul 18",
      "1",
      "$75",
      "PLACED",
      "✓ Confirm",
    ],
    [
      "#ORD-002",
      "Sarah Miller",
      "GoPro Kit",
      "Jul 10",
      "Jul 12",
      "1",
      "$30",
      "PLACED",
      "✓ Confirm",
    ],
    [
      "#ORD-003",
      "Alex Khan",
      "Kayak",
      "Jul 1",
      "Jul 3",
      "1",
      "$70",
      "CONFIRMED",
      "View",
    ],
    [
      "#ORD-004",
      "Rahim K.",
      "Tent 4P",
      "Jun 25",
      "Jun 28",
      "1",
      "$54",
      "PAID",
      "Mark Picked Up",
    ],
    [
      "#ORD-005",
      "Nadia Islam",
      "Ski Set",
      "Jun 10",
      "Jun 15",
      "1",
      "$225",
      "PICKED_UP",
      "Mark Returned",
    ],
    [
      "#ORD-006",
      "Tarek M.",
      "Climbing Shoes",
      "Jun 5",
      "Jun 7",
      "1",
      "$16",
      "RETURNED",
      "View",
    ],
  ];
  return (
    <div className="p-5 sm:p-8">
      <PageHeading
        title="Incoming Orders"
        action={
          <label className="relative">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
            <Input
              placeholder="Search orders..."
              className="h-10 rounded-lg border border-slate-200 pl-9 pr-3 text-sm"
            />
          </label>
        }
      />
      <div className="flex gap-5 overflow-x-auto border-b border-slate-100 bg-white px-4 pt-4 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
        {[
          "All (9)",
          "PLACED (2)",
          "CONFIRMED (1)",
          "PAID (2)",
          "PICKED_UP (2)",
          "RETURNED (1)",
          "CANCELLED (1)",
        ].map((tab, index) => (
          <Button
            key={tab}
            className={`h-auto whitespace-nowrap rounded-none border-b-2 pb-3 text-sm font-bold transition-colors hover:bg-transparent ${index === 0 ? "border-[#e31824] text-[#e31824]" : "border-transparent text-slate-500 hover:text-[#1b2748]"}`}
          >
            {tab}
          </Button>
        ))}
      </div>
      <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
        <Table className="min-w-[960px] w-full text-left text-sm">
        <TableHeader className="border-b border-slate-100 bg-slate-50/50 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
          <TableRow className="hover:bg-transparent">
              {[
                "Order ID",
                "Customer",
                "Gear Item",
                "Start Date",
                "End Date",
                "Qty",
                "Total",
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
            {orders.map(
              ([
                id,
                customer,
                gear,
                start,
                end,
                qty,
                total,
                status,
                action,
              ]) => (
                <TableRow
                  key={id}
                  className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50"
                >
                  <TableCell className="px-4 py-4">
                    <Link
                      href="/dashboard/provider/orders/ord-001"
                      className="font-bold text-[#e31824]"
                    >
                      {id}
                    </Link>
                  </TableCell>
                  <TableCell className="px-5 py-4 text-[13px] font-medium text-[#1b2748]">{customer}</TableCell>
                  <TableCell className="px-5 py-4 text-[13px] text-slate-600">{gear}</TableCell>
                  <TableCell className="px-5 py-4 text-[13px] text-slate-500">{start}</TableCell>
                  <TableCell className="px-5 py-4 text-[13px] text-slate-500">{end}</TableCell>
                  <TableCell className="px-5 py-4 text-[13px] text-slate-500">{qty}</TableCell>
                  <TableCell className="px-5 py-4 text-[13px] font-bold text-[#1b2748]">{total}</TableCell>
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
              ),
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ProviderOrdersPage;

