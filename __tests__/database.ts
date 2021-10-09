import { createConnection, getConnection } from 'typeorm';
import UserEntity from '../src/modules/user/user.entity';

export const createTestDbConnection = async () =>
  createConnection({
    type: 'sqlite',
    database: ':memory:',
    entities: [UserEntity],
    synchronize: true,
    logging: false,
  });

export const closeDbConnection = async () => {
  const conn = getConnection();
  return conn.close();
};
