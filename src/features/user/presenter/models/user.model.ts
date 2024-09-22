import { AppModelAdapter } from '../../../../core/adapters/app_model.adapter';
import { UserMapper } from '../../data/mappers/user.mapper';
import { IUserEntity } from '../../domain/entities/user.entity';

const userMapper = new UserMapper();

export const UserModel = new AppModelAdapter<IUserEntity>('users', userMapper, {
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  recoveryPhrase: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
});
