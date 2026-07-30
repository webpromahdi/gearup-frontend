import { Mountain, Search, CheckCircle, XCircle } from "lucide-react";
import AdminShell from "./AdminShell";
import ConditionBadge from "@/components/shared/ConditionBadge";
import Availability from "@/components/shared/Availability";
import { providerGear } from "@/lib/data/providerData";
import PageHeading from "@/components/shared/PageHeading";
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

const AdminGearPage = () => {
  const gear = [
    ...providerGear,
    [
      "Adjustable Dumbbells",
      "Bowflex",
      "Fitness",
      "$10",
      "3",
      "NEW",
      true,
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=160&auto=format&fit=crop&q=80",
    ],
    [
      "DJI Drone Mini 3",
      "DJI",
      "Photography",
      "$40",
      "1",
      "EXCELLENT",
      true,
      "https://images.unsplash.com/photo-1526779259212-939e64788e3c?w=160&auto=format&fit=crop&q=80",
    ],
  ];
  return (
    <AdminShell>
      <div className="p-5 sm:p-8">
        <PageHeading title="Gear Moderation" />
        <p className="-mt-5 mb-6 text-sm text-slate-500">
          All gear listed across the platform
        </p>
        <div className="mb-6 grid gap-3 rounded-xl bg-white p-4 shadow-sm md:grid-cols-5">
          <label className="relative md:col-span-2">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
            <Input
              placeholder="Search gear..."
              className="h-10 w-full rounded-lg border border-slate-200 pl-9 pr-3 text-sm"
            />
          </label>
          <select className="h-10 rounded-lg border border-slate-200 px-3 text-sm">
            <option>All categories</option>
          </select>
          <select className="h-10 rounded-lg border border-slate-200 px-3 text-sm">
            <option>All conditions</option>
          </select>
          <label className="flex items-center gap-2 text-sm font-bold">
            <Availability active />
            Available
          </label>
          <Button className="text-sm font-bold text-[#e31824]">Reset</Button>
        </div>
        <div className="overflow-x-auto rounded-xl bg-white shadow-[0_2px_12px_rgba(0,0,0,.06)]">
          <Table className="min-w-[1100px] w-full text-left text-sm">
            <TableHeader className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-[.08em] text-slate-500">
              <TableRow>
                {[
                  "#",
                  "Image",
                  "Gear Name",
                  "Brand",
                  "Category",
                  "Provider",
                  "Price/Day",
                  "Stock",
                  "Condition",
                  "Available",
                  "Listed",
                ].map((x) => (
                  <TableHead key={x} className="px-4 py-4">
                    {x}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {gear.map(
                (
                  [name, brand, cat, price, stock, condition, available, image],
                  i,
                ) => (
                  <TableRow
                    key={name as string}
                    className="border-b border-slate-100 last:border-0"
                  >
                    <TableCell className="px-4 py-3 text-slate-500">
                      {i + 1}
                    </TableCell>
                    <TableCell className="px-4 py-3">
                      <img
                        src={image as string}
                        alt={name as string}
                        className="size-10 rounded-lg object-cover"
                      />
                    </TableCell>
                    <TableCell className="px-4 py-3 font-bold text-[#1b2748]">
                      {name}
                    </TableCell>
                    <TableCell className="px-4 py-3">{brand}</TableCell>
                    <TableCell className="px-4 py-3">{cat}</TableCell>
                    <TableCell className="px-4 py-3 text-slate-600">
                      {i % 3 === 0
                        ? "Adventure Gear Co."
                        : i % 3 === 1
                          ? "Mountain Peak"
                          : "Alpine Rentals"}
                    </TableCell>
                    <TableCell className="px-4 py-3 font-bold">
                      {price}
                    </TableCell>
                    <TableCell className="px-4 py-3">{stock}</TableCell>
                    <TableCell className="px-4 py-3">
                      <ConditionBadge condition={condition as string} />
                    </TableCell>
                    <TableCell className="px-4 py-3">
                      {available ? (
                        <CheckCircle className="size-5 text-emerald-600" />
                      ) : (
                        <XCircle className="size-5 text-red-500" />
                      )}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-slate-500">
                      Jul {i + 1}
                    </TableCell>
                  </TableRow>
                ),
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </AdminShell>
  );
};

export default AdminGearPage;
