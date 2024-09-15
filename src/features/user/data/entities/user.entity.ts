/* eslint-disable @typescript-eslint/no-explicit-any */
import crypto from "crypto";

import { IUserEntity } from "../../domain/entities/user.entity";

export class UserEntity implements IUserEntity {
  public id: string;
  public name: string;
  public email: string;
  public password: string | undefined;
  public createdAt: Date;
  public recoveryPhrase: string;

  constructor(props: IUserEntity) {
    this.id = props.id ?? crypto.randomUUID();
    this.name = props.name;
    this.email = props.email;
    this.password = props.password;
    this.createdAt = props.createdAt;
    this.recoveryPhrase = props.recoveryPhrase;
  }

  updatePassword(value: string) {
    this.password = value;
  }

  static fromJson(json: Record<string, any>) {
    return new UserEntity({
      id: json["id"],
      name: json["name"],
      email: json["email"],
      password: json["password"],
      recoveryPhrase: json["recoveryPhrase"],
      createdAt: new Date(json["createdAt"]),
    });
  }
}
