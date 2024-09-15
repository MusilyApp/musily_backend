import { Request, Response } from '../adapters/router.adapter';

export interface IAppController {
  controllerBusiness(req: Request, res: Response): Promise<void>;
  handleRequest(req: Request, res: Response): Promise<void>;
}
