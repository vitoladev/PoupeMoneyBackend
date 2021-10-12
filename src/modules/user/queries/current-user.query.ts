import { queryField } from 'nexus';
import { User } from '@prisma/client';
import { isAuthenticated } from '@core/auth/auth.permissions';

const CurrentUserQuery = queryField((t) => {
  t.nonNull.field('me', {
    type: 'User',
    authorize: (_, __, ctx) => isAuthenticated(ctx.user),
    resolve: (_, __, ctx) => ctx.user as Omit<User, 'passwordHash'>,
  });
});

export default CurrentUserQuery;
