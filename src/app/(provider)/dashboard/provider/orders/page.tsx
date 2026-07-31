import { Search } from "lucide-react";
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
      <div className="flex gap-5 overflow-x-auto border-b border-slate-200">
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
            className={`whitespace-nowrap border-b-2 pb-3 text-sm font-bold ${index === 0 ? "border-[#e31824] text-[#e31824]" : "border-transparent text-slate-500"}`}
          >
            {tab}
          </Button>
        ))}
      </div>
      <div className="mt-6 overflow-x-auto rounded-xl bg-white shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
        <Table className="min-w-[960px] w-full text-left text-sm">
          <TableHeader className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-[.08em] text-slate-500">
            <TableRow>
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
                <TableHead key={x} className="px-4 py-4">
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
                  className="border-b border-slate-100 last:border-0"
                >
                  <TableCell className="px-4 py-4">
                    <a
                      href="/dashboard/provider/orders/ord-001"
                      className="font-bold text-[#e31824]"
                    >
                      {id}
                    </a>
                  </TableCell>
                  <TableCell className="px-4 py-4">{customer}</TableCell>
                  <TableCell className="px-4 py-4">{gear}</TableCell>
                  <TableCell className="px-4 py-4">{start}</TableCell>
                  <TableCell className="px-4 py-4">{end}</TableCell>
                  <TableCell className="px-4 py-4">{qty}</TableCell>
                  <TableCell className="px-4 py-4 font-bold">{total}</TableCell>
                  <TableCell className="px-4 py-4">
                    <StatusBadge status={status} />
                  </TableCell>
                  <TableCell className="px-4 py-4">
                    <Button
                      className={`rounded-lg px-3 py-2 text-xs font-bold ${status === "PLACED" ? "bg-[#e31824] text-white" : status === "PAID" ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-600"}`}
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

