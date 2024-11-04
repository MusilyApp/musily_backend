import { InvalidRequestError } from '../data/errors/invalid_request.error';

const generateError = (value: unknown, typeId: string) => {
  console.error(
    `TypeError: type ${typeof value} is not assignable to type ${typeId} - ${value}`,
  );
};

type TypeSafeOptions = { optional: boolean };

type TypeSafeFunction<T> = (value: unknown, options?: TypeSafeOptions) => T;

const createTypeSafeFunction = <T>(props: {
  type: string;
  defaultValue: T;
  check: (value: unknown) => boolean;
}): TypeSafeFunction<T> => {
  return (value: unknown, options?: TypeSafeOptions): T => {
    if (props.check(value)) {
      return value as T;
    }
    if (typeof value === 'undefined' && options?.optional) {
      return props.defaultValue;
    }
    generateError(value, props.type);
    throw new InvalidRequestError();
  };
};

export const typeSafe = {
  boolean: createTypeSafeFunction({
    type: 'boolean',
    defaultValue: false,
    check: (value) => typeof value === 'boolean',
  }),
  string: createTypeSafeFunction({
    type: 'string',
    defaultValue: '',
    check: (value) => typeof value === 'string' || typeof value === 'object',
  }),
  stringOptional: createTypeSafeFunction<string | undefined>({
    type: 'string|undefined',
    defaultValue: undefined,
    check: (value) =>
      typeof value === 'string' ||
      typeof value === 'undefined' ||
      value === null,
  }),
  number: createTypeSafeFunction({
    type: 'number',
    defaultValue: 0,
    check: (value) => typeof value === 'number',
  }),
  date: createTypeSafeFunction({
    type: 'Date',
    defaultValue: new Date(),
    check: (value) => value instanceof Date,
  }),
  array: <T>(value: unknown, options?: TypeSafeOptions): T[] => {
    if (Array.isArray(value)) {
      return value as T[];
    }
    if (typeof value === 'undefined' && options?.optional) {
      return [] as T[];
    }
    generateError(value, 'array');
    throw new InvalidRequestError();
  },
};
