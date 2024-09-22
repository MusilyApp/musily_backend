/* eslint-disable @typescript-eslint/no-explicit-any */
import { Document, FilterQuery, Model, Schema } from 'mongoose';
import mongoose from '../infra/database/mongoose';
import {
  AppModelFilter,
  AppModelSelection,
  AppModelSort,
  IAppBaseModel,
  IAppModel,
  ModelDefinition,
} from '../domain/adapters/app_model.adapter';
import {
  PaginatedResultOutput,
  PaginationArgs,
} from '../domain/types/pagination.types';
import { IModelMapper } from '../domain/mappers/model_mapper';

export class AppModelAdapter<T extends IAppBaseModel> implements IAppModel<T> {
  private model: Model<Document>;

  constructor(
    public modelName: string,
    private modelMapper: IModelMapper<T>,
    modelDefinition: ModelDefinition<T>,
  ) {
    const schemaDefinition: Record<string, unknown> = {};
    for (const key in modelDefinition) {
      const prop = modelDefinition[key];
      schemaDefinition[key] = {
        type: prop.type,
        required: prop.required ?? false,
        default: prop.default,
        select: prop.select ?? true,
        unique: prop.unique ?? false,
      };
    }
    const schema = new Schema<T>(schemaDefinition);
    this.model = mongoose.model<Document>(modelName, schema);
  }

  private sortConverter(sort: AppModelSort<T>) {
    const convertedSort: Record<keyof T, 'asc' | 'desc'> = {} as Record<
      keyof T,
      'asc' | 'desc'
    >;
    for (const key in sort) {
      convertedSort[key as keyof T] = sort[key] ?? 'desc';
    }
    return convertedSort;
  }

  private selectionConverter(select?: AppModelSelection<T>): string {
    if (!select) {
      return '';
    }
    return select.map((item) => `+${item}`).join(',');
  }

  private filterConverter(filter?: AppModelFilter<T>): FilterQuery<T> {
    if (!filter) {
      return {};
    }
    const filterQuery: FilterQuery<T> = {};
    for (const key in filter) {
      if (key === '$or') {
        const orFilters = filter.$or?.map((item) => this.filterConverter(item));
        if (orFilters && orFilters.length) {
          filterQuery['$or'] = orFilters as FilterQuery<T>[];
        }
      } else if (key === '$and') {
        const andFilters = filter.$and?.map((item) =>
          this.filterConverter(item),
        );
        if (andFilters && andFilters.length) {
          filterQuery['$and'] = andFilters as FilterQuery<T>[];
        }
      } else {
        const filterValue = filter[key as keyof T];
        if (typeof filterValue === 'object' && filterValue !== null) {
          if ('$includesInArray' in filterValue) {
            filterQuery[key as keyof FilterQuery<T>] = {
              $in: filterValue.$includesInArray as string[],
            };
          } else if ('$includesString' in filterValue) {
            filterQuery[key as keyof FilterQuery<T>] = {
              $regex: new RegExp(filterValue.$includesString as string, 'i'),
            };
          }
        } else {
          filterQuery[key as keyof T] = filterValue as T[keyof T];
        }
      }
    }
    return filterQuery;
  }

  async findPaginated(
    paginationArgs: PaginationArgs,
    filters?: AppModelFilter<T>,
    args?: {
      sort?: AppModelSort<T>;
      select?: AppModelSelection<T>;
    },
  ): Promise<PaginatedResultOutput<T>> {
    const startIn = (paginationArgs.page - 1) * paginationArgs.limit;
    const length = await this.model
      .find(this.filterConverter(filters) ?? {})
      .countDocuments();
    const items = await this.model
      .find(this.filterConverter(filters) ?? {})
      .select(this.selectionConverter(args?.select) ?? '')
      .limit(paginationArgs.limit)
      .skip(startIn)
      .sort(this.sortConverter(args?.sort ?? { createdAt: 'desc' }));
    return {
      items: items.map((e) => this.modelMapper.fromJsonDataToEntity(e)),
      total: length,
    };
  }

  async findOne(
    filters: AppModelFilter<T>,
    args?: {
      select?: AppModelSelection<T>;
    },
  ): Promise<T | null> {
    const item = await this.model
      .findOne(this.filterConverter(filters))
      .select(args?.select ?? '');
    if (item) {
      return this.modelMapper.fromJsonDataToEntity(item.toObject());
    }
    return null;
  }

  async findOneAndUpdate(
    filters: AppModelFilter<T>,
    updatedItem: T,
    args?: { select?: AppModelSelection<T> | undefined } | undefined,
  ): Promise<T | null> {
    const item = await this.model
      .findOneAndUpdate(this.filterConverter(filters), updatedItem)
      .select(args?.select ?? '');
    if (item) {
      return this.modelMapper.fromJsonDataToEntity(item.toObject());
    }
    return null;
  }

  async find(
    filters?: AppModelFilter<T>,
    args?: { select?: AppModelSelection<T>; sort?: AppModelSort<T> },
  ): Promise<T[]> {
    const items = await this.model
      .find(this.filterConverter(filters))
      .select(this.selectionConverter(args?.select) ?? '')
      .sort(this.sortConverter(args?.sort ?? { createdAt: 'desc' }));
    return items.map((item) =>
      this.modelMapper.fromJsonDataToEntity(item.toObject()),
    );
  }

  async findById(id: T['id']): Promise<T | null> {
    const item = await this.model.findOne({ id: id });
    if (item) {
      return this.modelMapper.fromJsonDataToEntity(item.toObject());
    }
    return null;
  }

  async create(item: T): Promise<T> {
    this.model.create(item);
    return item;
  }

  async findByIdAndUpdate(
    id: T['id'],
    updatedItem: Partial<T>,
  ): Promise<T | null> {
    const item = await this.model.findOneAndUpdate({ id }, updatedItem);
    const itemData = await this.model.findOne({ id });
    if (itemData?.toObject()) {
      return this.modelMapper.fromJsonDataToEntity(itemData?.toObject());
    }
    return null;
  }

  async findByIdAndDelete(id: T['id']): Promise<T | null> {
    const deletedItem = await this.model.findOneAndDelete({ id: id });
    if (deletedItem?.toObject()) {
      return this.modelMapper.fromJsonDataToEntity(deletedItem?.toObject());
    }
    return null;
  }
}
