import { UserEntity } from '../../../features/user/data/entities/user.entity';

/* eslint-disable @typescript-eslint/no-explicit-any */
interface Query {
  [key: string]: any;
}

interface Params {
  [key: string]: string | undefined;
}

interface Headers {
  [key: string]: string | string[] | undefined;
}

export type Request = {
  body: any;
  query: Query;
  params: Params;
  headers: Headers;
  defineUser(user: UserEntity): void;
  user?: UserEntity | null | undefined;
};

export type Response = {
  send: (status?: number, body?: any) => void;
  setHeader(name: string, value: string | number | readonly string[]): void;
};

export type Middleware = (
  req: Request,
  res: Response,
  next: () => void,
) => void;

export type Routes = Record<string, unknown>;

export interface IRouter {
  get: (path: string, ...middlewares: Middleware[]) => void;
  post: (path: string, ...middlewares: Middleware[]) => void;
  patch: (path: string, ...middlewares: Middleware[]) => void;
  put: (path: string, ...middlewares: Middleware[]) => void;
  delete: (path: string, ...middlewares: Middleware[]) => void;
}
