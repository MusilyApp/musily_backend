import { InvalidRequestError } from '../data/errors/invalid_request.error';

const generateError = (value: unknown, typeId: string) => {
  console.error(
    `TypeError: type ${typeof value} is not assinable to type ${typeId} - ${value}`,
  );
};

export const typeSafe = {
  boolean(value: unknown): boolean {
    if (typeof value === 'boolean') {
      return value;
    }
    generateError(value, 'boolean');
    throw new InvalidRequestError();
  },
  string(value: unknown): string {
    if (typeof value === 'string') {
      return value;
    }
    generateError(value, 'string');
    throw new InvalidRequestError();
  },
  number(value: unknown): number {
    if (typeof value === 'number') {
      return value;
    }
    generateError(value, 'number');
    throw new InvalidRequestError();
  },
  date(value: unknown): Date {
    if (value instanceof Date) {
      return value;
    }
    generateError(value, 'Date');
    throw new InvalidRequestError();
  },
};
