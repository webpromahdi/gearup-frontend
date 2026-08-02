import { useState, useEffect, useCallback } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export function useSearchAndSort(debounceMs = 400) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const urlSearchTerm = searchParams.get("search") || "";
  const [localSearch, setLocalSearch] = useState(urlSearchTerm);

  // Sync initial URL param to local state
  useEffect(() => {
    setLocalSearch(urlSearchTerm);
  }, [urlSearchTerm]);

  // Debounced URL update
  useEffect(() => {
    const handler = setTimeout(() => {
      if (localSearch !== urlSearchTerm) {
        const params = new URLSearchParams(searchParams.toString());
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
    (sortValue: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (sortValue) {
        params.set("sort", sortValue);
      } else {
        params.delete("sort");
      }
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [searchParams, pathname, router],
  );

  const handleFilterChange = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
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
    sortValue: searchParams.get("sort") || "newest",
    handleSort,
    handleFilterChange,
    searchParams,
  };
}
