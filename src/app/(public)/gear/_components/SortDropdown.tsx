"use client";

import { ChevronDown } from "lucide-react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export default function SortDropdown({
  className = "",
}: {
  className?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", e.target.value);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const currentSort = searchParams.get("sort") || "newest";

  return (
    <div className={`relative ${className}`}>
      <select
        value={currentSort}
        onChange={handleSortChange}
        className="h-10 w-full appearance-none rounded-lg border border-slate-200 bg-white pl-3 pr-8 text-sm font-semibold text-slate-600 outline-none focus:border-[#e31824] sm:text-sm text-xs"
      >
        <option value="newest">Sort by: Newest First</option>
        <option value="popularity">Sort by: Popularity</option>
        <option value="price-asc">Sort by: Price (Low to High)</option>
        <option value="price-desc">Sort by: Price (High to Low)</option>
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
    </div>
  );
}
