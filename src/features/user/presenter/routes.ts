import { CreateUserUseCase } from '../data/usecases/create_user.usecase';
import { UserRepository } from '../data/repositories/user.respository';
import { GetUsersController } from './controllers/get_users.controller';
import { GetUsersUseCase } from '../data/usecases/get_users.usecase';
import { GetUserController } from './controllers/get_user.controller';
import { GetUserUseCase } from '../data/usecases/get_user.usecase';
import { CreateUserController } from './controllers/create_user.controller';
import { UpdateUserUseCase } from '../data/usecases/update_user.usecase';
import { UpdateUserController } from './controllers/update_user.controller';
import { RouterAdapter } from '../../../core/adapters/router.adapter';
import { UserModel } from './models/user.model';
import { EncryptAdapter } from '../../../core/adapters/encrypt.adapter';
import { authMiddleware } from '../../auth/presenter/middlewares/auth.middleware';

const userRoutes = new RouterAdapter();

const userRepository = new UserRepository(UserModel);
const encryptAdapter = new EncryptAdapter();

// Load all users
userRoutes.get('/', authMiddleware(), async (req, res) => {
  const getUsersUseCase = new GetUsersUseCase(userRepository);
  const getUsersController = new GetUsersController(getUsersUseCase);
  return getUsersController.handleRequest(req, res);
});

// Get user by id
userRoutes.get('/:id', async (req, res) => {
  const getUserUseCase = new GetUserUseCase(userRepository);
  const getUserController = new GetUserController(getUserUseCase);
  return getUserController.handleRequest(req, res);
});

// Create a new user
userRoutes.post('/', authMiddleware(), async (req, res) => {
  const createUserUseCase = new CreateUserUseCase(
    userRepository,
    encryptAdapter,
  );
  const createUserController = new CreateUserController(createUserUseCase);
  return createUserController.handleRequest(req, res);
});

// Update an existing user
userRoutes.patch('/:id', authMiddleware(), async (req, res) => {
  const updateUserUseCase = new UpdateUserUseCase(
    userRepository,
    encryptAdapter,
  );
  const updateUserController = new UpdateUserController(updateUserUseCase);
  return updateUserController.handleRequest(req, res);
});

export default userRoutes;
