import { useState, useMemo, useEffect } from "react";

export function usePagination<T>(data: T[], pageSize: number = 10, dependencies: any[] = []) {
  const [page, setPage] = useState(1);

  // Reset to page 1 when external dependencies change (e.g. search/filter)
  useEffect(() => {
    setPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  const totalPages = Math.max(1, Math.ceil(data.length / pageSize));
  
  // Ensure valid page if data shrinks and the current page becomes out of bounds
  const validPage = Math.max(1, Math.min(page, totalPages));

  const paginatedData = useMemo(() => {
    return data.slice((validPage - 1) * pageSize, validPage * pageSize);
  }, [data, validPage, pageSize]);

  const startIndex = (validPage - 1) * pageSize;

  return {
    page: validPage,
    setPage,
    totalPages,
    paginatedData,
    startIndex,
  };
}
