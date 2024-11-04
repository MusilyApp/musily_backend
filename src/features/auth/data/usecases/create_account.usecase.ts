import { EncryptAdapter } from '../../../../core/adapters/encrypt.adapter';
import { InvalidRequestError } from '../../../../core/data/errors/invalid_request.error';
import { ITokenGenerator } from '../../../../core/domain/adapters/token_generator.adapter';
import { IUserEntity } from '../../../user/domain/entities/user.entity';
import { IAuthRepository } from '../../domain/repositories/auth.repository';
import { ICreateAccountUsecase } from '../../domain/usecases/create_accout.usecase';
import { EmailAlreadyInUseError } from '../errors/email_already_in_use.error';
import * as crypto from 'crypto';

export class CreateAccoutUsecase implements ICreateAccountUsecase {
  constructor(
    private props: {
      authRepository: IAuthRepository;
      tokenGenerator: ITokenGenerator<{ id: string }>;
      encryptAdapter: EncryptAdapter;
    },
  ) {}

  async exec(user: IUserEntity): Promise<{ user: IUserEntity; token: string }> {
    const existingUser = await this.props.authRepository.findUserByEmail(
      user.email,
    );
    if (existingUser) {
      throw new EmailAlreadyInUseError();
    }
    if (!user.password) {
      throw new InvalidRequestError();
    }
    const password = await this.props.encryptAdapter.hash(user.password);
    const createdUser = await this.props.authRepository.createUser({
      id: crypto.randomUUID(),
      name: user.name,
      email: user.email,
      recoveryPhrase: 'random phrase',
      password: password,
      createdAt: new Date(),
    });
    const token = this.props.tokenGenerator.sign(
      { id: createdUser.id },
      'b68cec109e1b620ba32a1bb7f21d48e490c253ad',
      {
        expiresIn: 604800,
      },
    );
    return {
      user: createdUser,
      token,
    };
  }
}
