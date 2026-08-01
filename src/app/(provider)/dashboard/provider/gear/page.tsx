"use client";
import { useState, useMemo } from "react";
import { Search, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import GearTable from "@/app/(provider)/_components/GearTable";
import PageHeading from "@/components/shared/PageHeading";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Availability from "@/components/shared/Availability";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getProviderGearAction } from "@/app/(provider)/_actions/gearActions";

const PAGE_SIZE = 10;

const ProviderGearPage = () => {
  const [page, setPage] = useState(1);

  const { data } = useQuery({
    queryKey: ["provider-gear"],
    queryFn: getProviderGearAction,
  });

  const gearData = useMemo(() => {
    if (Array.isArray(data?.data?.gearItems)) return data.data.gearItems;
    if (Array.isArray(data?.data)) return data.data;
    if (Array.isArray(data)) return data;
    return [];
  }, [data]);

  const totalPages = Math.ceil(gearData.length / PAGE_SIZE);

  return (
    <div className="p-5 sm:p-8">
      <PageHeading
        title="My Gear Listings"
        action={
          <Link
            href="/dashboard/provider/gear/new"
            className="flex h-10 items-center gap-2 rounded-lg bg-[#e31824] px-4 text-sm font-bold text-white transition-colors hover:bg-[#c41520]"
          >
            <Plus className="size-4" />
            Add New Gear
          </Link>
        }
      />
      <div className="mb-6 grid gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-[0_1px_3px_rgba(0,0,0,0.02)] sm:grid-cols-2 md:grid-cols-4">
        <label className="relative sm:col-span-2">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
          <Input
            placeholder="Search your gear..."
            className="h-10 w-full rounded-lg border border-slate-200 bg-white pl-9 pr-3 text-sm focus:border-[#e31824] focus:ring-2 focus:ring-red-100"
          />
        </label>
        {/* Two filter dropdowns in a 2-col grid on mobile */}
        <div className="grid grid-cols-2 gap-3 sm:col-span-2 sm:contents">
          <Select defaultValue="all">
            <SelectTrigger className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm focus:border-[#e31824] focus:ring-2 focus:ring-red-100">
              <SelectValue placeholder="All categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All categories</SelectItem>
              <SelectItem value="cycling">Cycling</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all">
            <SelectTrigger className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm focus:border-[#e31824] focus:ring-2 focus:ring-red-100">
              <SelectValue placeholder="All conditions" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All conditions</SelectItem>
              <SelectItem value="excellent">Excellent</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <label className="flex h-10 items-center gap-3 text-sm font-bold text-[#1b2748] sm:col-span-2 md:col-span-1">
          <Availability active />
          Available only
        </label>
      </div>
      <GearTable />

      {/* Pagination — only render when more than 1 page exists */}
      {totalPages > 1 && (
        <div className="mt-7 flex items-center justify-center gap-2 text-sm font-bold">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="flex h-9 items-center gap-1 rounded-lg px-3 text-slate-600 transition-colors hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="size-4" />
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`flex size-9 items-center justify-center rounded-lg text-sm font-bold transition-colors ${
                p === page
                  ? "bg-[#e31824] text-white"
                  : "border border-slate-200 bg-white text-slate-600 shadow-sm hover:bg-slate-50"
              }`}
            >
              {p}
            </button>
          ))}
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="flex h-9 items-center gap-1 rounded-lg px-3 text-slate-600 transition-colors hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Next
            <ChevronRight className="size-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProviderGearPage;
