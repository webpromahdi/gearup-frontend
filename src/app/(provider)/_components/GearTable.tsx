import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { providerGear } from "@/lib/data/providerData";
import ConditionBadge from "@/components/shared/ConditionBadge";
import Availability from "@/components/shared/Availability";

const GearTable = ({ short = false }: { short?: boolean }) => {
  const rows = short ? providerGear.slice(0, 4) : providerGear;
  return (
    <div className="overflow-x-auto rounded-xl bg-white shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
      <Table className="min-w-[1000px] w-full text-left text-sm">
        <TableHeader className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-[0.08em] text-slate-500">
          <TableRow>
            {(short
              ? [
                  "Thumb",
                  "Gear Name",
                  "Category",
                  "Price/Day",
                  "Stock",
                  "Condition",
                  "Available",
                  "Actions",
                ]
              : [
                  "#",
                  "Image",
                  "Name",
                  "Brand",
                  "Category",
                  "Price/Day",
                  "Stock",
                  "Condition",
                  "Available",
                  "Actions",
                ]
            ).map((x) => (
              <TableHead key={x} className="px-4 py-4">
                {x}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map(
            (
              [name, brand, category, price, stock, condition, active, image],
              index,
            ) => (
              <TableRow
                key={name as string}
                className="border-b border-slate-100 last:border-0"
              >
                <TableCell className="px-4 py-3">
                  {short ? (
                    <img
                      src={image as string}
                      alt={name as string}
                      className="size-10 rounded-lg object-cover"
                    />
                  ) : (
                    <span className="text-slate-500">{index + 1}</span>
                  )}
                </TableCell>
                <TableCell className="px-4 py-3">
                  {short ? (
                    <span className="font-bold text-[#1b2748]">{name}</span>
                  ) : (
                    <img
                      src={image as string}
                      alt={name as string}
                      className="size-10 rounded-lg object-cover"
                    />
                  )}
                </TableCell>
                {!short && (
                  <TableCell className="px-4 py-3 font-bold text-[#1b2748]">
                    {name}
                  </TableCell>
                )}
                {!short && (
                  <TableCell className="px-4 py-3 text-slate-600">
                    {brand}
                  </TableCell>
                )}
                <TableCell className="px-4 py-3">{category}</TableCell>
                <TableCell className="px-4 py-3 font-bold">{price}</TableCell>
                <TableCell className="px-4 py-3">{stock}</TableCell>
                <TableCell className="px-4 py-3">
                  <ConditionBadge condition={condition as string} />
                </TableCell>
                <TableCell className="px-4 py-3">
                  <Availability active={active as boolean} />
                </TableCell>
                <TableCell className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <a
                      href="/dashboard/provider/gear/trek-x-caliber/edit"
                      className="text-xs font-bold text-[#e31824]"
                    >
                      Edit
                    </a>
                    <Button className="text-slate-400">
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ),
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default GearTable;
