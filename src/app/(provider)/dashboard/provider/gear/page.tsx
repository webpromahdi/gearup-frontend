import { Search, Plus } from "lucide-react";
import GearTable from "@/app/(provider)/_components/GearTable";
import PageHeading from "@/components/shared/PageHeading";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import Availability from "@/components/shared/Availability";

const ProviderGearPage = () => {
  return (
    <div className="p-5 sm:p-8">
      <PageHeading
        title="My Gear Listings"
        action={
          <a
            href="/dashboard/provider/gear/new"
            className="flex h-10 items-center gap-2 rounded-lg bg-[#e31824] px-4 text-sm font-bold text-white"
          >
            <Plus className="size-4" />
            Add New Gear
          </a>
        }
      />
      <div className="mb-6 grid gap-3 rounded-xl bg-white p-4 shadow-sm md:grid-cols-4">
        <label className="relative md:col-span-2">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
          <Input
            placeholder="Search your gear..."
            className="h-10 w-full rounded-lg border border-slate-200 pl-9 pr-3 text-sm outline-none"
          />
        </label>
        <Select className="h-10 rounded-lg border border-slate-200 px-3 text-sm">
          <option>All categories</option>
          <option>Cycling</option>
        </Select>
        <Select className="h-10 rounded-lg border border-slate-200 px-3 text-sm">
          <option>All conditions</option>
          <option>Excellent</option>
        </Select>
        <label className="flex items-center gap-3 text-sm font-bold text-[#1b2748]">
          <Availability active />
          Available only
        </label>
      </div>
      <GearTable />
      <div className="mt-7 flex justify-center gap-2">
        <span className="flex size-9 items-center justify-center rounded-lg bg-[#e31824] text-sm font-bold text-white">
          1
        </span>
        <span className="flex size-9 items-center justify-center rounded-lg bg-white text-sm font-bold text-slate-600">
          2
        </span>
        <a
          href="#next"
          className="flex h-9 items-center rounded-lg px-3 text-sm font-bold text-slate-600"
        >
          Next →
        </a>
      </div>
    </div>
  );
};

export default ProviderGearPage;

