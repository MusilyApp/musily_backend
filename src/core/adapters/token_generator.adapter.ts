import jwt from 'jsonwebtoken';
import {
  ISignOptions,
  ITokenGenerator,
} from '../domain/adapters/token_generator.adapter';
import { LoginRequiredError } from '../../features/auth/data/errors/login_required.error';

export class TokenGeneratorAdapter<T> implements ITokenGenerator<T> {
  async verify(token: string, key: string): Promise<T> {
    let tokenData: T | undefined = undefined;
    jwt.verify(token, key, (err, decoded) => {
      if (err) {
        throw new LoginRequiredError();
      }
      tokenData = decoded as T;
    });
    return tokenData as T;
  }
  sign(
    params: Record<string, unknown>,
    key: string,
    signOptions: ISignOptions,
  ): string {
    const token = jwt.sign(params, key, signOptions);
    return token;
  }
}
