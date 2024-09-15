import { NextFunction } from 'express-serve-static-core';
import express, { Request, Response } from 'express';
import { IRouter, Middleware } from '../domain/adapters/router.adapter';
import { UserEntity } from '../../features/user/data/entities/user.entity';

declare module 'express' {
  interface Request {
    user?: UserEntity;
  }
}

export class RouterAdapter implements IRouter {
  public router = express.Router();

  private convertMiddlewareToExpress(middlewares: Middleware[]) {
    const expressMiddlewares = middlewares.map((middleware) => {
      return (req: Request, res: Response, next: NextFunction) => {
        middleware(
          {
            body: req.body,
            query: req.query,
            params: req.params,
            headers: req.headers,
            defineUser(user) {
              req.user = user;
            },
            user: req.user,
          },
          {
            send: (status?: number, body?: unknown) => {
              res.status(status ?? 200).send(body);
            },
            setHeader(name, value) {
              res.setHeader(name, value);
            },
          },
          () => {
            next();
          },
        );
      };
    });
    return expressMiddlewares;
  }
  get(path: string, ...middlewares: Middleware[]) {
    this.router.get(
      path,
      this.convertMiddlewareToExpress(middlewares),
    );
  }
  post(path: string, ...middlewares: Middleware[]) {
    this.router.post(
      path,
      this.convertMiddlewareToExpress(middlewares),
    );
  }
  patch(path: string, ...middlewares: Middleware[]) {
    this.router.patch(
      path,
      this.convertMiddlewareToExpress(middlewares),
    );
  }
  put(path: string, ...middlewares: Middleware[]) {
    this.router.put(
      path,
      this.convertMiddlewareToExpress(middlewares),
    );
  }
  delete(path: string, ...middlewares: Middleware[]) {
    this.router.delete(
      path,
      this.convertMiddlewareToExpress(middlewares),
    );
  }
}
