export interface ISignOptions {
  expiresIn?: number;
}

export interface ITokenGenerator<T> {
  sign: (
    params: Record<string, unknown>,
    key: string,
    signOptions: ISignOptions,
  ) => string;
  verify: (token: string, key: string) => Promise<T>;
}
