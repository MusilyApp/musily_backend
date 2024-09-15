import { InternalServerError } from '../../data/errors/internal_server.error';
import { AppError } from '../../data/exceptions/app_error.exception';
import { Request, Response } from '../../domain/adapters/router.adapter';
import { IAppController } from '../../domain/presenter/app_controller';

export abstract class AppController implements IAppController {
  abstract controllerBusiness(
    req: Request,
    res: Response,
    next?: () => void,
  ): Promise<void>;

  private handleHttpError(error: unknown, res: Response) {
    if (error instanceof AppError) {
      return res.send(error.code, error.extractError());
    }
    console.log(error);
    return res.send(500, new InternalServerError().extractError());
  }

  async handleRequest(req: Request, res: Response, next?: () => void) {
    try {
      await this.controllerBusiness(req, res, next);
    } catch (error) {
      this.handleHttpError(error, res);
    }
  }
}
