import { FastifyRequest } from 'fastify';
import { getUserFromAuthToken } from '@core/auth/auth.service';
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

type PromiseType<T> = T extends PromiseLike<infer U> ? U : T;

export type Context = PromiseType<ReturnType<typeof buildContext>>;

export default buildContext;
