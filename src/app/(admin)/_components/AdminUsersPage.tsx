import { Search, User, UserPlus } from "lucide-react";
import AdminShell from "./AdminShell";
import AdminUsersTable from "./AdminUsersTable";
import PageHeading from "@/components/shared/PageHeading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const AdminUsersPage = () => {
  return (
    <AdminShell>
      <div className="p-5 sm:p-8">
        <PageHeading
          title="User Management"
          action={
            <Button className="flex h-10 items-center gap-2 rounded-lg bg-[#e31824] px-4 text-sm font-bold text-white">
              <UserPlus className="size-4" />
              Add Admin
            </Button>
          }
        />
        <div className="mb-6 rounded-xl bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center">
            <label className="relative xl:w-72">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
              <Input
                placeholder="Search by name or email..."
                className="h-10 w-full rounded-lg border border-slate-200 pl-9 pr-3 text-sm"
              />
            </label>
            <div className="flex gap-4 overflow-x-auto border-b border-slate-100 xl:border-0">
              {[
                "All (1,247)",
                "Customer (980)",
                "Provider (261)",
                "Admin (6)",
              ].map((x, i) => (
                <button
                  key={x}
                  className={`whitespace-nowrap border-b-2 pb-2 text-sm font-bold ${i === 0 ? "border-[#e31824] text-[#e31824]" : "border-transparent text-slate-500"}`}
                >
                  {x}
                </button>
              ))}
            </div>
            <div className="flex gap-2 xl:ml-auto">
              <button className="rounded-lg bg-emerald-100 px-3 py-2 text-xs font-bold text-emerald-700">
                Active
              </button>
              <button className="rounded-lg bg-red-100 px-3 py-2 text-xs font-bold text-red-700">
                Suspended
              </button>
            </div>
          </div>
        </div>
        <AdminUsersTable />
        <div className="mt-7 flex justify-center gap-2 text-sm font-bold">
          <span className="flex size-9 items-center justify-center rounded-lg bg-white">
            1
          </span>
          <span className="flex size-9 items-center justify-center rounded-lg bg-[#e31824] text-white">
            2
          </span>
          <span className="flex size-9 items-center justify-center rounded-lg bg-white">
            3
          </span>
          <span className="px-2 py-2 text-slate-400">...</span>
          <span className="px-2 py-2">125</span>
          <span className="px-2 py-2">Next →</span>
        </div>
      </div>
    </AdminShell>
  );
}

export default AdminUsersPage;
