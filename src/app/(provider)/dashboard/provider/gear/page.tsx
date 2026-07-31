import { Search, Plus } from "lucide-react";
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

const ProviderGearPage = () => {
  return (
    <div className="p-5 sm:p-8">
      <PageHeading
        title="My Gear Listings"
        action={
          <Link
            href="/dashboard/provider/gear/new"
            className="flex h-10 items-center gap-2 rounded-lg bg-[#e31824] px-4 text-sm font-bold text-white"
          >
            <Plus className="size-4" />
            Add New Gear
          </Link>
        }
      />
      <div className="mb-6 grid gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-[0_1px_3px_rgba(0,0,0,0.02)] md:grid-cols-4">
        <label className="relative md:col-span-2">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
          <Input
            placeholder="Search your gear..."
            className="h-10 w-full rounded-lg border border-slate-200 bg-white pl-9 pr-3 text-sm focus:border-[#e31824] focus:ring-2 focus:ring-red-100"
          />
        </label>
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
        <label className="flex h-10 items-center gap-3 text-sm font-bold text-[#1b2748]">
          <Availability active />
          Available only
        </label>
      </div>
      <GearTable />
      <div className="mt-7 flex justify-center gap-2 text-sm font-bold">
        <span className="flex size-9 items-center justify-center rounded-lg bg-[#e31824] text-sm font-bold text-white">
          1
        </span>
        <span className="flex size-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-sm font-bold text-slate-600 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
          2
        </span>
        <Link
          href="#next"
          className="flex h-9 items-center rounded-lg px-3 text-sm font-bold text-slate-600 transition-colors hover:bg-white"
        >
          Next →
        </Link>
      </div>
    </div>
  );
};

export default ProviderGearPage;

