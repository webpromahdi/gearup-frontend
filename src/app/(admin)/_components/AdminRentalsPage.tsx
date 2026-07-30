import AdminShell from "./AdminShell";
import AdminRentalTable from "./AdminRentalTable";
import PageHeading from "@/components/shared/PageHeading";
import { Card } from "@/components/ui/card";

const AdminRentalsPage = () => {
  return (
    <AdminShell>
      <div className="p-5 sm:p-8">
        <PageHeading title="Rental Management" />
        <div className="grid gap-4 sm:grid-cols-4">
          {[
            ["891", "Total", "text-[#1b2748]"],
            ["127", "Active", "text-blue-600"],
            ["612", "Completed", "text-emerald-600"],
            ["152", "Cancelled", "text-[#e31824]"],
          ].map(([n, l, c]) => (
            <Card key={l} className="rounded-xl bg-white p-5 shadow-sm">
              <p className={`text-2xl font-extrabold ${c}`}>{n}</p>
              <p className="mt-1 text-sm text-slate-500">{l}</p>
            </Card>
          ))}
        </div>
        <div className="mt-8 flex gap-5 overflow-x-auto border-b border-slate-200">
          {[
            "All",
            "PLACED",
            "CONFIRMED",
            "PAID",
            "PICKED_UP",
            "RETURNED",
            "CANCELLED",
          ].map((x, i) => (
            <button
              key={x}
              className={`whitespace-nowrap border-b-2 pb-3 text-sm font-bold ${i === 0 ? "border-[#e31824] text-[#e31824]" : "border-transparent text-slate-500"}`}
            >
              {x}
            </button>
          ))}
        </div>
        <div className="mt-6">
          <AdminRentalTable />
        </div>
        <div className="mt-7 flex justify-center gap-2 text-sm font-bold">
          <span className="flex size-9 items-center justify-center rounded-lg bg-white">
            1
          </span>
          <span className="flex size-9 items-center justify-center rounded-lg bg-[#e31824] text-white">
            2
          </span>
          <span className="px-2 py-2">3</span>
          <span className="px-2 py-2 text-slate-400">...</span>
          <span className="px-2 py-2">90</span>
          <span className="px-2 py-2">Next →</span>
        </div>
      </div>
    </AdminShell>
  );
};

export default AdminRentalsPage;
