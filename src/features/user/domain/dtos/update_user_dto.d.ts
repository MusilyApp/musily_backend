export interface IUpdateUserDTO {
  id: string;
  name?: string;
  cpf?: string;
  email?: string;
  password?: string;
  recoveryPhrase?: string;
}
