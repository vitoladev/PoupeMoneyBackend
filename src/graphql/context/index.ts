import { FastifyRequest } from 'fastify';
import { getUserFromAuthToken } from '../../core/auth';
import { databaseRepositories } from './database';

const buildContext = async (req: FastifyRequest) => {
  const token = req.headers.authorization || '';
  const user = await getUserFromAuthToken(token);

  const db = databaseRepositories();
  return {
    db,
    user,
  };
};

export default buildContext;
