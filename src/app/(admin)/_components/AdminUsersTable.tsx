import { adminUsers } from "@/lib/data/adminData";
import { MoreVertical } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const RoleBadge = ({ role }: { role: string }) => {
  const classes: Record<string, string> = {
    CUSTOMER: "bg-blue-50 text-blue-600",
    PROVIDER: "bg-amber-50 text-amber-600",
    ADMIN: "bg-slate-100 text-slate-700",
  };
  return (
    <span
      className={`rounded-full px-2.5 py-1 text-[10px] font-bold tracking-wide ${classes[role]}`}
    >
      {role}
    </span>
  );
};

const AdminUsersTable = ({ short = false }: { short?: boolean }) => {
  const rows = short ? adminUsers.slice(0, 5) : adminUsers;
  return (
    <ScrollArea className="h-full w-full rounded-lg border border-slate-200 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
      <Table className="min-w-[500px] w-full text-left text-sm">
        <TableHeader className="border-b border-slate-100 bg-slate-50/50 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
          <TableRow className="hover:bg-transparent">
            {[
              "#",
              "User",
              "Role",
              "Status",
              "Joined",
              "", // Empty header for actions
            ].map((x, i) => (
              <TableHead key={i} className="px-5 py-3.5">
                {x}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map(([ini, name, email, role, status, date, color], i) => (
            <TableRow
              key={email}
              className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50"
            >
              <TableCell className="px-5 py-4 text-[13px] text-slate-400">
                {i + 1}
              </TableCell>
              <TableCell className="px-5 py-4">
                <div className="flex items-center gap-3">
                  <span
                    className={`flex size-8 shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${color}`}
                  >
                    {ini}
                  </span>
                  <div>
                    <p className="text-[13px] font-bold text-[#1b2748]">
                      {name}
                    </p>
                  </div>
                </div>
              </TableCell>
              <TableCell className="px-5 py-4">
                <RoleBadge role={role} />
              </TableCell>
              <TableCell className="px-5 py-4">
                <span
                  className={`rounded-full px-2.5 py-1 text-[10px] font-bold tracking-wide ${status === "ACTIVE" ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"}`}
                >
                  {status}
                </span>
              </TableCell>
              <TableCell className="px-5 py-4 text-[13px] text-slate-500">
                {date}
              </TableCell>
              <TableCell className="px-5 py-4 text-right">
                <button className="rounded-md p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600">
                  <MoreVertical className="size-4" />
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

export default AdminUsersTable;
