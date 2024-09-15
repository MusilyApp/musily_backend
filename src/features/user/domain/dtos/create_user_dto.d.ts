import { UserEntityBirthday } from '../entities/user.entity';

export interface ICreateUserDTO {
  admin: boolean;
  name: string;
  surname: string;
  birthday: UserEntityBirthday;
  cpf: string;
  email: string;
  password: string;
  verifiedEmail: boolean;
}
