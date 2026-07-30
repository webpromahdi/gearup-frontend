import AdminShell from "./AdminShell";
import PageHeading from "@/components/shared/PageHeading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const AdminCategoriesPage = () => {
  const cats = [
    ["Camping & Hiking", "Tents, packs, sleeping gear", "87", "Jan 1, 2025"],
    ["Cycling", "Bikes, helmets, accessories", "64", "Jan 1, 2025"],
    ["Water Sports", "Kayaks, SUPs, wetsuits", "42", "Jan 5, 2025"],
    ["Winter Sports", "Skis, snowboards, boots", "38", "Jan 5, 2025"],
    ["Fitness & Gym", "Weights, yoga, cardio", "51", "Jan 10, 2025"],
    ["Rock Climbing", "Shoes, harness, ropes", "29", "Jan 10, 2025"],
    ["Team Sports", "Balls, nets, uniforms", "47", "Jan 15, 2025"],
    ["Photography Gear", "Cameras, tripods, drones", "33", "Jan 15, 2025"],
  ];
  return (
    <AdminShell>
      <div className="p-5 sm:p-8">
        <PageHeading title="Category Management" />
        <div className="grid gap-6 xl:grid-cols-[13fr_7fr]">
          <section>
            <div className="mb-4 flex items-end justify-between">
              <div>
                <h2 className="text-xl font-extrabold text-[#1b2748]">
                  All Categories
                </h2>
                <p className="mt-1 text-sm text-slate-500">8 categories</p>
              </div>
            </div>
            <div className="overflow-x-auto rounded-xl bg-white shadow-[0_2px_12px_rgba(0,0,0,.06)]">
              <Table className="min-w-[700px] w-full text-left text-sm">
                <TableHeader className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-[.08em] text-slate-500">
                  <TableRow>
                    {[
                      "#",
                      "Category Name",
                      "Description",
                      "Total Gear",
                      "Created",
                      "Actions",
                    ].map((x) => (
                      <TableHead key={x} className="px-4 py-4">
                        {x}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cats.map(([name, description, total, date], i) => (
                    <TableRow
                      key={name}
                      className="border-b border-slate-100 last:border-0"
                    >
                      <TableCell className="px-4 py-3 text-slate-500">
                        {i + 1}
                      </TableCell>
                      <TableCell className="px-4 py-3 font-bold text-[#1b2748]">
                        {name}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-slate-500">
                        {description}
                      </TableCell>
                      <TableCell className="px-4 py-3 font-bold">
                        {total}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-slate-500">
                        {date}
                      </TableCell>
                      <TableCell className="px-4 py-3">
                        <div className="flex gap-2">
                          <button className="rounded-lg border border-blue-600 px-2.5 py-1.5 text-xs font-bold text-blue-600">
                            Edit
                          </button>
                          <button className="rounded-lg border border-[#e31824] px-2.5 py-1.5 text-xs font-bold text-[#e31824]">
                            Delete
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </section>
          <aside className="xl:mt-16 h-fit rounded-xl bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,.06)]">
            <h2 className="text-xl font-extrabold text-[#1b2748]">
              Add New Category
            </h2>
            <label className="mt-6 block text-sm font-bold text-[#1b2748]">
              Name*
              <Input
                placeholder="e.g. Water Sports"
                className="mt-2 h-11 w-full rounded-lg border border-slate-200 px-3 text-sm"
              />
            </label>
            <label className="mt-5 block text-sm font-bold text-[#1b2748]">
              Description
              <Textarea
                placeholder="Brief description of this category..."
                className="mt-2 min-h-24 w-full rounded-lg border border-slate-200 p-3 text-sm"
              />
            </label>
            <Button className="mt-5 h-11 w-full rounded-lg bg-[#e31824] text-sm font-bold text-white">
              Add Category
            </Button>
            <p className="mt-5 border-t border-slate-100 pt-4 text-xs leading-5 text-slate-400">
              Click “Edit” in the table to update an existing category.
            </p>
          </aside>
        </div>
      </div>
    </AdminShell>
  );
};

export default AdminCategoriesPage;
