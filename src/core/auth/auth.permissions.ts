import { User } from '@prisma/client';
import ERRORS from '@core/errors';
import { GraphQLError } from 'graphql/error/GraphQLError';

export const isAuthenticated = (user: Maybe<Omit<User, 'passwordHash'>>) => {
  if (user) return true;

  return new GraphQLError(ERRORS.UNAUTHENTICATED);
};
