"use client";

import { Trash2, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getProviderGearAction } from "../_actions/gearActions";
import ConditionBadge from "@/components/shared/ConditionBadge";
import Availability from "@/components/shared/Availability";
import Link from "next/link";

type GearItem = {
  id: string;
  name: string;
  brand: string;
  category?: { name: string } | string;
  categoryId?: string;
  pricePerDay: number;
  stock: number;
  condition: string;
  availability?: boolean;
  active?: boolean;
  image?: string;
};

const GearTable = ({ short = false }: { short?: boolean }) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["provider-gear"],
    queryFn: getProviderGearAction,
  });

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center rounded-xl border border-slate-200 bg-white">
        <Loader2 className="size-8 animate-spin text-slate-300" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-64 items-center justify-center rounded-xl border border-slate-200 bg-white text-sm font-medium text-red-500">
        Failed to load gear.
      </div>
    );
  }

  const gearData = Array.isArray(data?.data?.gearItems)
    ? data.data.gearItems
    : Array.isArray(data?.data)
      ? data.data
      : Array.isArray(data)
        ? data
        : [];
  const rows = short ? gearData.slice(0, 4) : gearData;

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
      <Table className="min-w-[1000px] w-full text-left text-sm">
        <TableHeader className="border-b border-slate-100 bg-slate-50/50 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
          <TableRow className="hover:bg-transparent">
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
              <TableHead key={x} className="px-5 py-3.5">
                {x}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={10}
                className="py-8 text-center text-slate-500"
              >
                No gear found. Add some gear to get started!
              </TableCell>
            </TableRow>
          ) : (
            rows.map((gear: GearItem, index: number) => (
              <TableRow
                key={gear.id || index}
                className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50"
              >
                <TableCell className="px-5 py-4">
                  {short ? (
                    <img
                      src={gear.image || "https://placehold.co/400"}
                      alt={gear.name}
                      className="size-10 rounded-lg object-cover"
                    />
                  ) : (
                    <span className="text-slate-500">{index + 1}</span>
                  )}
                </TableCell>
                <TableCell className="px-5 py-4">
                  {short ? (
                    <span className="font-bold text-[#1b2748]">
                      {gear.name}
                    </span>
                  ) : (
                    <img
                      src={gear.image || "https://placehold.co/400"}
                      alt={gear.name}
                      className="size-10 rounded-lg object-cover"
                    />
                  )}
                </TableCell>
                {!short && (
                  <TableCell className="px-5 py-4 text-[13px] font-bold text-[#1b2748]">
                    {gear.name}
                  </TableCell>
                )}
                {!short && (
                  <TableCell className="px-5 py-4 text-[13px] text-slate-600">
                    {gear.brand}
                  </TableCell>
                )}
                <TableCell className="px-5 py-4 text-[13px] text-slate-600">
                  {typeof gear.category === 'object' ? gear.category?.name : gear.category || gear.categoryId}
                </TableCell>
                <TableCell className="px-5 py-4 text-[13px] font-bold text-[#1b2748]">
                  ${gear.pricePerDay}
                </TableCell>
                <TableCell className="px-5 py-4 text-[13px] text-slate-500">
                  {gear.stock}
                </TableCell>
                <TableCell className="px-5 py-4">
                  <ConditionBadge condition={gear.condition} />
                </TableCell>
                <TableCell className="px-5 py-4">
                  <Availability
                    active={
                      gear.availability !== false && gear.active !== false
                    }
                  />
                </TableCell>
                <TableCell className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <Link
                      href={`/dashboard/provider/gear/${gear.id}/edit`}
                      className="rounded-md px-1.5 py-1 text-xs font-bold text-[#e31824] transition-colors hover:bg-red-50"
                    >
                      Edit
                    </Link>
                    <Button className="size-8 rounded-md text-slate-400 hover:bg-red-50 hover:text-[#e31824]">
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default GearTable;
