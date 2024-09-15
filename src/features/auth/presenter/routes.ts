import { AuthRepository } from '../data/repositories/auth.repository';
import { LoginUsecase } from '../data/usecases/login.usecase';
import { LoginController } from './controllers/login.controller';
import { GetAuthedUserController } from './controllers/get_authed_user.controller';
import { LogoutController } from './controllers/logout.controller';
import { RouterAdapter } from '../../../core/adapters/router.adapter';
import { UserModel } from '../../user/presenter/models/user.model';
import { authMiddleware } from './middlewares/auth.middleware';
import { EncryptAdapter } from '../../../core/adapters/encrypt.adapter';
import { TokenGeneratorAdapter } from '../../../core/adapters/token_generator.adapter';
import { CreateAccountController } from './controllers/create_account.controller';
import { CreateAccoutUsecase } from '../data/usecases/create_account.usecase';

const authRoutes = new RouterAdapter();

const encryptAdatper = new EncryptAdapter();
const tokenGeneratorAdapter = new TokenGeneratorAdapter<{ id: string }>();

const authRepository = new AuthRepository(UserModel);

authRoutes.post('/login', (req, res) => {
  const loginUsecase = new LoginUsecase({
    authRepository,
    encrypt: encryptAdatper,
    tokenGenerator: tokenGeneratorAdapter,
  });
  const loginController = new LoginController(loginUsecase);
  return loginController.handleRequest(req, res);
});

authRoutes.post('/create_account', (req, res) => {
  const createAccoutUsecase = new CreateAccoutUsecase({
    authRepository,
    encryptAdapter: encryptAdatper,
    tokenGenerator: tokenGeneratorAdapter,
  });
  const createAccountController = new CreateAccountController(
    createAccoutUsecase,
  );
  return createAccountController.handleRequest(req, res);
});

authRoutes.get('/user', authMiddleware(), (req, res) => {
  const getAuthedUserController = new GetAuthedUserController();
  return getAuthedUserController.handleRequest(req, res);
});

authRoutes.post('/logout', authMiddleware(), (req, res) => {
  const logoutController = new LogoutController();
  logoutController.handleRequest(req, res);
});

export default authRoutes;
