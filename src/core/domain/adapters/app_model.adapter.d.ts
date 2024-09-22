/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  PaginatedResultOutput,
  PaginationArgs,
} from '../types/pagination.types';

export type ModelProps = {
  type: unknown;
  required?: boolean;
  default?: unknown;
  select?: boolean;
  unique?: boolean;
  encrypt?: boolean;
};
export type ModelDefinition<T> = {
  [Key in keyof T]?: ModelProps;
} & {
  [key: string]: ModelProps;
};

export interface IAppBaseModel {
  id: string | number;
  createdAt: Date;
}

export type AppModelFilter<T> = {
  [K in keyof T]?:
    | {
        $includesInArray?: string[];
        $includesString?: string;
      }
    | T[K];
} & {
  $or?: AppModelFilter<T>[];
  $and?: AppModelFilter<T>[];
};

export type AppModelSortOrder = 'desc' | 'asc';
export type AppModelSort<T> = {
  [K in keyof T]?: AppModelSortOrder;
};

export type AppModelSelection<T> = (keyof T & string)[];

export interface IAppModel<T extends IAppBaseModel> {
  find(
    filters?: AppModelFilter<T>,
    args?: { select?: AppModelSelection<T>; sort?: AppModelSort<T> },
  ): Promise<T[]>;
  findOne(
    filters: AppModelFilter<T>,
    args?: {
      select?: AppModelSelection<T>;
    },
  ): Promise<T | null>;
  findOneAndUpdate(
    filters: AppModelFilter<T>,
    updatedItem: T,
    args?: {
      select?: AppModelSelection<T>;
    },
  ): Promise<T | null>;
  findById(id: T['id']): Promise<T | null>;
  create(item: T): Promise<T>;
  findByIdAndUpdate(id: T['id'], updatedItem: Partial<T>): Promise<T | null>;
  findByIdAndDelete(id: T['id']): Promise<T | null>;
  deleteMany(filters: AppModelFilter<T>): Promise<void>;
  findPaginated(
    paginationArgs: PaginationArgs,
    filters?: AppModelFilter<T>,
    args?: {
      sort?: AppModelSort<T>;
      select?: AppModelSelection<T>;
    },
  ): Promise<PaginatedResultOutput<T>>;
}
