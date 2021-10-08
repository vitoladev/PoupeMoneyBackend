import { getConnection } from 'typeorm';
import UserEntity from '@modules/user/user.entity';

export const databaseRepositories = () => {
  const connection = getConnection();

  return {
    user: connection.getRepository(UserEntity),
  };
};
