import { IEncryptAdapter } from '../../../../core/domain/adapters/encrypt.adapter';
import { ITokenGenerator } from '../../../../core/domain/adapters/token_generator.adapter';
import { IAuthRepository } from '../../domain/repositories/auth.repository';
import {
  ILoginUsecase,
  LoginOutput,
} from '../../domain/usecases/login.usecase';
import { InvalidCredentialsError } from '../errors/invalid_credentials.error';

export class LoginUsecase implements ILoginUsecase {
  constructor(
    private props: {
      authRepository: IAuthRepository;
      encrypt: IEncryptAdapter;
      tokenGenerator: ITokenGenerator<{ id: string }>;
    },
  ) {}

  async exec(email: string, password: string): Promise<LoginOutput> {
    const user = await this.props.authRepository.findUserByEmail(email);
    if (!user) {
      throw new InvalidCredentialsError();
    }
    if (!(await this.props.encrypt.compare(password, user.password ?? ''))) {
      throw new InvalidCredentialsError();
    }
    const token = this.props.tokenGenerator.sign(
      { id: user.id },
      'b68cec109e1b620ba32a1bb7f21d48e490c253ad',
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
