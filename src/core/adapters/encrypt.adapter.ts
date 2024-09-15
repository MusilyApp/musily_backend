import bcrypt from 'bcrypt';
import { IEncryptAdapter } from '../domain/adapters/encrypt.adapter';

export class EncryptAdapter implements IEncryptAdapter {
  async compare(value: string, hashedValue: string): Promise<boolean> {
    const result = await bcrypt.compare(value, hashedValue);
    return result;
  }
  async hash(value: string): Promise<string> {
    const hash = await bcrypt.hash(value, 10);
    return hash;
  }
}
