import { useMemo } from 'react';

export const usePagination = <T>(items: T[], page: number, rowsPerPage: number) => {
  const totalPages = Math.ceil(items.length / rowsPerPage);

  const paginatedItems = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return items.slice(start, start + rowsPerPage);
  }, [items, page, rowsPerPage]);

  return {
    paginatedItems,
    totalPages,
  };
};
