import mercurius from 'mercurius';
import ErrorWithProps = mercurius.ErrorWithProps;

const errors = {
  EMAIL_ALREADY_EXISTS: 'EMAIL_ALREADY_EXISTS',
};

export const throwGraphQLError = (message: string, code: string) => {
  throw new ErrorWithProps(message, {
    code,
    timestamp: Math.round(new Date().getTime() / 1000),
  });
};

export default errors;
