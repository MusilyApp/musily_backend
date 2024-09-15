import { EncryptAdapter } from '../../../../core/adapters/encrypt.adapter';
import { TokenGeneratorAdapter } from '../../../../core/adapters/token_generator.adapter';
import { IAuthRepository } from '../../domain/repositories/auth.repository';
import {
  ILoginUseCase,
  LoginOutput,
} from '../../domain/usecases/login.usecase';
import { InvalidCredentialsError } from '../errors/invalid_credentials.error';

export class LoginUseCase implements ILoginUseCase {
  private encrypt = new EncryptAdapter();
  private tokenGenerator = new TokenGeneratorAdapter();
  constructor(private repository: IAuthRepository) {}
  async exec(email: string, password: string): Promise<LoginOutput> {
    const user = await this.repository.findUserByEmail(email);
    if (!user) {
      throw new InvalidCredentialsError();
    }
    if (!(await this.encrypt.compare(password, user.password!))) {
      throw new InvalidCredentialsError();
    }
    const token = this.tokenGenerator.sign(
      { id: user.id },
      process.env.AUTH_HASH ?? '',
      {
        expiresIn: 604800,
      },
    );
    return {
      token,
      user: {
        ...user,
        password: undefined,
      },
    };
  }
}
