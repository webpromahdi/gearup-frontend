import { useCallback, useState, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export function useGearFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const urlMaxPrice = searchParams.get("maxPrice")
    ? parseInt(searchParams.get("maxPrice") as string)
    : 1000;
  
  const urlCategories = searchParams.get("categories")?.split(",").filter(Boolean) || [];
  const urlConditions = searchParams.get("conditions")?.split(",").filter(Boolean) || [];
  const urlAvailableOnly = searchParams.get("availableOnly") === "true";

  const [maxPrice, setMaxPrice] = useState([urlMaxPrice]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(urlCategories);
  const [selectedConditions, setSelectedConditions] = useState<string[]>(urlConditions);
  const [isAvailableOnly, setIsAvailableOnly] = useState<boolean>(urlAvailableOnly);

  // Sync from URL to local state if URL changes externally
  useEffect(() => {
    setMaxPrice([urlMaxPrice]);
    setSelectedCategories(urlCategories);
    setSelectedConditions(urlConditions);
    setIsAvailableOnly(urlAvailableOnly);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    urlMaxPrice, 
    searchParams.get("categories"), 
    searchParams.get("conditions"), 
    urlAvailableOnly
  ]);

  const updateQueryParams = useCallback(
    (updates: Record<string, string | null>) => {
      // Using window.location.search ensures we get the absolutely latest URL params 
      // preventing race conditions with other updates
      const currentSearch = typeof window !== 'undefined' ? window.location.search : searchParams.toString();
      const params = new URLSearchParams(currentSearch);
      
      let hasChanges = false;
      Object.entries(updates).forEach(([key, value]) => {
        const currentVal = params.get(key);
        if (value === null || value === "") {
          if (currentVal !== null) {
            params.delete(key);
            hasChanges = true;
          }
        } else {
          if (currentVal !== value) {
            params.set(key, value);
            hasChanges = true;
          }
        }
      });
      
      if (hasChanges) {
        params.set("page", "1"); // reset page on filter change
        router.replace(pathname + "?" + params.toString(), { scroll: false });
      }
    },
    [pathname, router, searchParams],
  );

  useEffect(() => {
    const handler = setTimeout(() => {
      const newMaxPrice = maxPrice[0] < 1000 ? maxPrice[0].toString() : null;
      const newCats = selectedCategories.length > 0 ? selectedCategories.join(",") : null;
      const newConds = selectedConditions.length > 0 ? selectedConditions.join(",") : null;
      const newAvail = isAvailableOnly ? "true" : null;

      const oldMaxPrice = searchParams.get("maxPrice");
      const oldCats = searchParams.get("categories");
      const oldConds = searchParams.get("conditions");
      const oldAvail = searchParams.get("availableOnly");

      if (
        newMaxPrice !== oldMaxPrice ||
        newCats !== oldCats ||
        newConds !== oldConds ||
        newAvail !== oldAvail
      ) {
        updateQueryParams({
          maxPrice: newMaxPrice,
          categories: newCats,
          conditions: newConds,
          availableOnly: newAvail,
        });
      }
    }, 400);
    return () => clearTimeout(handler);
  }, [
    maxPrice, 
    selectedCategories, 
    selectedConditions, 
    isAvailableOnly, 
    updateQueryParams,
    searchParams
  ]);

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    setSelectedCategories((prev) => {
      if (checked) {
        return prev.includes(categoryId) ? prev : [...prev, categoryId];
      } else {
        return prev.filter((id) => id !== categoryId);
      }
    });
  };

  const handleConditionChange = (condition: string, checked: boolean) => {
    setSelectedConditions((prev) => {
      if (checked) {
        return prev.includes(condition) ? prev : [...prev, condition];
      } else {
        return prev.filter((c) => c !== condition);
      }
    });
  };

  const toggleAvailableOnly = () => {
    setIsAvailableOnly((prev) => !prev);
  };

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
