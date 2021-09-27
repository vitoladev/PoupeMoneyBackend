import { objectType } from 'nexus';

export const AuthenticationToken = objectType({
  name: 'Token',
  definition(t) {
    t.nonNull.jwt('token');
  },
});
