import { useState, useEffect, useCallback } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export function useSearchAndSort(debounceMs = 400) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const urlSearchTerm = searchParams.get("search") || "";
  const urlSortValue = searchParams.get("sort") || "newest";

  const [localSearch, setLocalSearch] = useState(urlSearchTerm);
  const [localSort, setLocalSort] = useState(urlSortValue);
  const [localFilters, setLocalFilters] = useState<Record<string, string>>({});

  // Sync initial URL param to local state
  useEffect(() => {
    setLocalSearch(urlSearchTerm);
    setLocalSort(urlSortValue);
    
    const filters: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      if (key !== "search" && key !== "sort" && key !== "page") {
        filters[key] = value;
      }
    });
    setLocalFilters(filters);
  }, [urlSearchTerm, urlSortValue, searchParams]);

  // Debounced URL update for search
  useEffect(() => {
    const handler = setTimeout(() => {
      if (localSearch !== urlSearchTerm) {
        const currentSearch = typeof window !== 'undefined' ? window.location.search : searchParams.toString();
        const params = new URLSearchParams(currentSearch);
        if (localSearch) {
          params.set("search", localSearch);
        } else {
          params.delete("search");
        }
        params.set("page", "1");
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
      }
    }, debounceMs);

    return () => clearTimeout(handler);
  }, [localSearch, urlSearchTerm, pathname, router, searchParams, debounceMs]);

  const handleSearchChange = (value: string) => {
    setLocalSearch(value);
  };

  const handleSort = useCallback(
    (sortValue: string | null) => {
      setLocalSort(sortValue || "newest");
      const currentSearch = typeof window !== 'undefined' ? window.location.search : searchParams.toString();
      const params = new URLSearchParams(currentSearch);
      
      if (sortValue && sortValue !== "newest") {
        params.set("sort", sortValue);
      } else {
        params.delete("sort");
      }
      
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [searchParams, pathname, router],
  );

  const handleFilterChange = useCallback(
    (key: string, value: string | null) => {
      setLocalFilters(prev => {
        const next = { ...prev };
        if (!value || value.toLowerCase() === "all") {
          delete next[key];
        } else {
          next[key] = value;
        }
        return next;
      });

      const currentSearch = typeof window !== 'undefined' ? window.location.search : searchParams.toString();
      const params = new URLSearchParams(currentSearch);
      
      if (value && value.toLowerCase() !== "all") {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      params.set("page", "1");
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [searchParams, pathname, router]
  );

  return {
    searchTerm: urlSearchTerm,
    localSearch,
    handleSearchChange,
    sortValue: localSort,
    handleSort,
    handleFilterChange,
    searchParams,
    localFilters,
  };
}
