"use client";

import { useCallback, useState, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { ChevronDown, ChevronUp, Filter } from "lucide-react";

type PublicCategory = {
  id: string;
  name: string;
};

export function SidebarFilters({
  categories,
  hideApplyButton,
}: {
  categories: PublicCategory[];
  hideApplyButton?: boolean;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const urlMaxPrice = searchParams.get("maxPrice")
    ? parseInt(searchParams.get("maxPrice") as string)
    : 1000;

  const [maxPrice, setMaxPrice] = useState([urlMaxPrice]);

  useEffect(() => {
    setMaxPrice([urlMaxPrice]);
  }, [urlMaxPrice]);

  const updateQueryParams = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(updates).forEach(([key, value]) => {
        if (value === null) {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      });
      router.replace(pathname + "?" + params.toString(), { scroll: false });
    },
    [searchParams, pathname, router]
  );

  useEffect(() => {
    const handler = setTimeout(() => {
      if (maxPrice[0] !== urlMaxPrice) {
        updateQueryParams({
          maxPrice: maxPrice[0] < 1000 ? maxPrice[0].toString() : null,
        });
      }
    }, 400);
    return () => clearTimeout(handler);
  }, [maxPrice, urlMaxPrice, updateQueryParams]);

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    const currentCats = searchParams.get("categories")?.split(",") || [];
    let newCats = [...currentCats];
    
    if (checked) {
      if (!newCats.includes(categoryId)) newCats.push(categoryId);
    } else {
      newCats = newCats.filter((id) => id !== categoryId && id !== "");
    }
    
    updateQueryParams({
      categories: newCats.length > 0 ? newCats.join(",") : null,
    });
  };

  const handleConditionChange = (condition: string, checked: boolean) => {
    const currentConds = searchParams.get("conditions")?.split(",") || [];
    let newConds = [...currentConds];
    
    if (checked) {
      if (!newConds.includes(condition)) newConds.push(condition);
    } else {
      newConds = newConds.filter((c) => c !== condition && c !== "");
    }
    
    updateQueryParams({
      conditions: newConds.length > 0 ? newConds.join(",") : null,
    });
  };

  const selectedCategories = searchParams.get("categories")?.split(",") || [];
  const selectedConditions = searchParams.get("conditions")?.split(",") || [];

  return (
    <div className="space-y-8 mt-2">
      <details className="group pt-1" open>
        <summary className="flex cursor-pointer items-center justify-between text-sm font-extrabold text-[#1b2748] list-none [&::-webkit-details-marker]:hidden">
          Category
          <ChevronDown className="size-4 text-[#1b2748] transition-transform group-open:hidden" />
          <ChevronUp className="size-4 text-[#1b2748] hidden transition-transform group-open:block" />
        </summary>
        <div className="mt-6 space-y-5">
          {categories.map((category) => (
            <label
              key={category.id}
              className="flex cursor-pointer items-center justify-between text-sm text-slate-600"
            >
              <div className="flex items-center gap-3">
                <Checkbox
                  checked={selectedCategories.includes(category.id)}
                  onCheckedChange={(checked) =>
                    handleCategoryChange(category.id, checked as boolean)
                  }
                  className="size-4 rounded border-slate-300 accent-[#e31824]"
                />
                <span>{category.name}</span>
              </div>
            </label>
          ))}
        </div>
      </details>

      <details className="group pt-1" open>
        <summary className="flex cursor-pointer items-center justify-between text-sm font-extrabold text-[#1b2748] list-none [&::-webkit-details-marker]:hidden">
          Max Price Per Day
          <ChevronDown className="size-4 text-[#1b2748] transition-transform group-open:hidden" />
          <ChevronUp className="size-4 text-[#1b2748] hidden transition-transform group-open:block" />
        </summary>
        <div className="pt-6">
          <Slider
            value={maxPrice}
            onValueChange={setMaxPrice}
            max={1000}
            step={10}
            className="mt-2"
          />
          <div className="mt-4 flex items-center justify-between text-xs font-bold text-slate-500">
            <span className="rounded-md bg-red-50 px-2.5 py-1.5 text-[#e31824]">
              $0
            </span>
            <span>Up to ${maxPrice[0]}{maxPrice[0] === 1000 ? "+" : ""}/day</span>
            <span className="rounded-md bg-red-50 px-2.5 py-1.5 text-[#e31824]">
              $1000+
            </span>
          </div>
        </div>
      </details>

      <details className="group pt-1" open>
        <summary className="flex cursor-pointer items-center justify-between text-sm font-extrabold text-[#1b2748] list-none [&::-webkit-details-marker]:hidden">
          Condition
          <ChevronDown className="size-4 text-[#1b2748] transition-transform group-open:hidden" />
          <ChevronUp className="size-4 text-[#1b2748] hidden transition-transform group-open:block" />
        </summary>
        <div className="mt-6 space-y-5">
          {["NEW", "EXCELLENT", "GOOD", "FAIR"].map((condition) => (
            <label
              key={condition}
              className="flex cursor-pointer items-center justify-between text-sm text-slate-600 capitalize"
            >
              <div className="flex items-center gap-3">
                <Checkbox
                  checked={selectedConditions.includes(condition)}
                  onCheckedChange={(checked) =>
                    handleConditionChange(condition, checked as boolean)
                  }
                  className="size-4 rounded border-slate-300 accent-[#e31824]"
                />
                <span>{condition.toLowerCase()}</span>
              </div>
            </label>
          ))}
        </div>
      </details>

      <div className="flex items-center justify-between pt-1 pb-4">
        <span className="text-sm font-extrabold text-[#1b2748]">
          Show Available Only
        </span>
        <button
          onClick={() => {
            const current = searchParams.get("availableOnly") === "true";
            updateQueryParams({ availableOnly: current ? null : "true" });
          }}
          aria-label="Show available gear only"
          className={`relative h-6 w-11 rounded-full transition ${
            searchParams.get("availableOnly") === "true"
              ? "bg-[#e31824]"
              : "bg-slate-300"
          }`}
        >
          <i
            className={`absolute top-1 size-4 rounded-full bg-white shadow-sm transition-all ${
              searchParams.get("availableOnly") === "true"
                ? "right-1"
                : "left-1"
            }`}
          />
        </button>
      </div>

      {!hideApplyButton && (
        <button
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="mt-8 flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#e31824] text-sm font-bold text-white transition hover:bg-[#c41520]"
        >
          <Filter className="size-4" />
          View Results
        </button>
      )}
    </div>
  );
}
