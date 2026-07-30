import { adminUsers } from "@/lib/data/adminData";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const RoleBadge = ({ role }: { role: string }) => {
  const classes: Record<string, string> = {
    CUSTOMER: "bg-blue-100 text-blue-700",
    PROVIDER: "bg-amber-100 text-amber-700",
    ADMIN: "bg-[#1b2748] text-white",
  };
  return (
    <span
      className={`rounded-full px-2.5 py-1 text-[10px] font-extrabold tracking-[.06em] ${classes[role]}`}
    >
      {role}
    </span>
  );
};
const AdminUsersTable = ({ short = false }: { short?: boolean }) => {
  const rows = short ? adminUsers.slice(0, 5) : adminUsers;
  return (
    <div className="overflow-x-auto rounded-xl bg-white shadow-[0_2px_12px_rgba(0,0,0,.06)]">
      <Table className="min-w-[860px] w-full text-left text-sm">
        <TableHeader className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-[.08em] text-slate-500">
          <TableRow>
            {[
              "#",
              "Avatar",
              "Full Name",
              "Email",
              "Role",
              "Status",
              "Joined Date",
              "Actions",
            ].map((x) => (
              <TableHead key={x} className="px-4 py-4">
                {x}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map(([ini, name, email, role, status, date, color], i) => (
            <TableRow
              key={email}
              className="border-b border-slate-100 last:border-0"
            >
              <TableCell className="px-4 py-3 text-slate-500">
                {i + 1}
              </TableCell>
              <TableCell className="px-4 py-3">
                <span
                  className={`flex size-9 items-center justify-center rounded-full text-xs font-extrabold ${color}`}
                >
                  {ini}
                </span>
              </TableCell>
              <TableCell className="px-4 py-3 font-bold text-[#1b2748]">
                {name}
              </TableCell>
              <TableCell className="px-4 py-3 text-slate-500">
                {email}
              </TableCell>
              <TableCell className="px-4 py-3">
                <RoleBadge role={role} />
              </TableCell>
              <TableCell className="px-4 py-3">
                <span
                  className={`rounded-full px-2.5 py-1 text-[10px] font-extrabold ${status === "ACTIVE" ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"}`}
                >
                  {status}
                </span>
              </TableCell>
              <TableCell className="px-4 py-3 text-slate-500">{date}</TableCell>
              <TableCell className="px-4 py-3">
                {role === "ADMIN" ? (
                  "—"
                ) : (
                  <button
                    className={`rounded-lg border px-3 py-1.5 text-xs font-bold ${status === "ACTIVE" ? "border-[#e31824] text-[#e31824]" : "border-emerald-600 text-emerald-600"}`}
                  >
                    {status === "ACTIVE" ? "Suspend" : "Activate"}
                  </button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminUsersTable;
