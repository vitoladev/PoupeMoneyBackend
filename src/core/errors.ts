import mercurius from 'mercurius';
import ErrorWithProps = mercurius.ErrorWithProps;

enum ERRORS {
  EMAIL_ALREADY_EXISTS = 'EMAIL_ALREADY_EXISTS',
  INVALID_EMAIL_OR_PASSWORD = 'INVALID_EMAIL_OR_PASSWORD',
}

export const throwGraphQLError = (message: ERRORS) => {
  throw new ErrorWithProps(message, {
    timestamp: Math.round(new Date().getTime() / 1000),
  });
};

export default ERRORS;
