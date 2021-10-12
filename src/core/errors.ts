import { GraphQLError } from 'graphql/error/GraphQLError';

enum ERRORS {
  EMAIL_ALREADY_REGISTERED = 'EMAIL_ALREADY_REGISTERED',
  INVALID_EMAIL_OR_PASSWORD = 'INVALID_EMAIL_OR_PASSWORD',
  UNAUTHENTICATED = 'UNAUTHENTICATED',
}

export const throwGraphQLError = (message: ERRORS) => {
  throw new GraphQLError(message);
};

export default ERRORS;
