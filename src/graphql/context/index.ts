import { FastifyRequest } from 'fastify';
import { getUserFromAuthToken } from '@core/auth/auth.service';
import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

const buildContext = async (req: FastifyRequest) => {
  const token = req.headers.authorization || '';
  const user = await getUserFromAuthToken(token);

  return {
    prisma,
    user,
  };
};

type PromiseType<T> = T extends PromiseLike<infer U> ? U : T;

export type Context = PromiseType<ReturnType<typeof buildContext>>;

export default buildContext;
