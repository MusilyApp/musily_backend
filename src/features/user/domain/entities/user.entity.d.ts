export interface IUserEntity {
  id: string;
  name: string;
  email: string;
  password?: string;
  recoveryPhrase: string;
  createdAt: Date;
}
