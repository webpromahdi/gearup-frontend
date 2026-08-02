import { useCallback, useState, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export function useGearFilters() {
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
    [searchParams, pathname, router],
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

  const toggleAvailableOnly = () => {
    const current = searchParams.get("availableOnly") === "true";
    updateQueryParams({ availableOnly: current ? null : "true" });
  };

  const selectedCategories = searchParams.get("categories")?.split(",") || [];
  const selectedConditions = searchParams.get("conditions")?.split(",") || [];
  const isAvailableOnly = searchParams.get("availableOnly") === "true";

  return {
    maxPrice,
    setMaxPrice,
    selectedCategories,
    selectedConditions,
    isAvailableOnly,
    handleCategoryChange,
    handleConditionChange,
    toggleAvailableOnly,
  };
}
