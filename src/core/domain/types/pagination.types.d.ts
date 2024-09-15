export type PaginationArgs = {
  page: number;
  limit: number;
};

export type PaginatedResultOutput<T> = {
  items: T[];
  total: number;
};
