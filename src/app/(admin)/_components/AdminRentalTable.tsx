import { adminRentals } from "@/lib/data/adminData";
import StatusBadge from "@/components/shared/StatusBadge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const AdminRentalTable = ({
  short = false,
}: {
  short?: boolean;
}) => {
  const rows = short ? adminRentals.slice(0, 5) : adminRentals;
  const heads = short
    ? ["ID", "Customer", "Gear", "Provider", "Amount", "Status", "Date"]
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
      ];
  return (
    <div className="overflow-x-auto rounded-xl bg-white shadow-[0_2px_12px_rgba(0,0,0,.06)]">
      <Table className="min-w-[940px] w-full text-left text-sm">
        <TableHeader className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-[.08em] text-slate-500">
          <TableRow>
            {heads.map((h) => (
              <TableHead key={h} className="px-4 py-4">
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
                key={id}
                className="border-b border-slate-100 last:border-0"
              >
                <TableCell className="px-4 py-3 font-bold text-[#e31824]">
                  {id}
                </TableCell>
                <TableCell className="px-4 py-3">{customer}</TableCell>
                <TableCell className="px-4 py-3">{gear}</TableCell>
                <TableCell className="px-4 py-3">{provider}</TableCell>
                {!short && (
                  <>
                    <TableCell className="px-4 py-3">{start}</TableCell>
                    <TableCell className="px-4 py-3">{end}</TableCell>
                    <TableCell className="px-4 py-3">{days}</TableCell>
                  </>
                )}
                <TableCell className="px-4 py-3 font-bold">{amount}</TableCell>
                <TableCell className="px-4 py-3">
                  <StatusBadge status={status} />
                </TableCell>
                <TableCell className="px-4 py-3 text-slate-500">
                  {created}
                </TableCell>
              </TableRow>
            ),
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default AdminRentalTable;
