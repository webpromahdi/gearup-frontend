import { adminRentals } from "@/lib/data/adminData";
import { MoreVertical } from "lucide-react";
import StatusBadge from "@/components/shared/StatusBadge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const AdminRentalTable = ({ short = false }: { short?: boolean }) => {
  const rows = short ? adminRentals.slice(0, 5) : adminRentals;
  const heads = short
    ? ["ID", "Customer", "Item", "Amount", "Status", "Date", ""]
    : [
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
        "", // Actions
      ];

  return (
    <ScrollArea className="h-full w-full rounded-lg border border-slate-200 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
      <Table className="min-w-[500px] w-full text-left text-sm">
        <TableHeader className="border-b border-slate-100 bg-slate-50/50 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
          <TableRow className="hover:bg-transparent">
            {heads.map((h, i) => (
              <TableHead key={i} className="px-5 py-3.5">
                {h}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map(
            ([
              id,
              customer,
              gear,
              provider,
              start,
              end,
              days,
              amount,
              status,
              created,
            ]) => (
              <TableRow
                key={id as string}
                className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50"
              >
                <TableCell className="px-5 py-4 text-[13px] font-bold text-[#e31824]">
                  {id}
                </TableCell>
                <TableCell className="px-5 py-4 text-[13px] font-medium text-[#1b2748]">
                  {customer}
                </TableCell>
                <TableCell className="px-5 py-4 text-[13px] text-slate-600">
                  {gear}
                </TableCell>
                {!short && (
                  <TableCell className="px-5 py-4 text-[13px] text-slate-600">
                    {provider}
                  </TableCell>
                )}
                {!short && (
                  <>
                    <TableCell className="px-5 py-4 text-[13px] text-slate-500">
                      {start}
                    </TableCell>
                    <TableCell className="px-5 py-4 text-[13px] text-slate-500">
                      {end}
                    </TableCell>
                    <TableCell className="px-5 py-4 text-[13px] text-slate-500">
                      {days}
                    </TableCell>
                  </>
                )}
                <TableCell className="px-5 py-4 text-[13px] font-bold text-[#1b2748]">
                  {amount}
                </TableCell>
                <TableCell className="px-5 py-4">
                  <StatusBadge status={status as string} />
                </TableCell>
                <TableCell className="px-5 py-4 text-[13px] text-slate-500">
                  {short ? (created as string).substring(0, 6) : created}
                </TableCell>
                <TableCell className="px-5 py-4 text-right">
                  <button className="rounded-md p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600">
                    <MoreVertical className="size-4" />
                  </button>
                </TableCell>
              </TableRow>
            ),
          )}
        </TableBody>
      </Table>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

export default AdminRentalTable;
