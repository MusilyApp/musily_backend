import { PaginationArgs } from './pagination.types';

export interface DataRequestArgs {
  pagination: PaginationArgs;
  searchQuery: string;
}
