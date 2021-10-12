import { createUserFixture } from '../../../../../__tests__/factories/user.factory';
import { generateToken } from '../../../../core/auth/auth.service';
import { testQuery } from '../../../../../__tests__/client';
import gql from 'graphql-tag';
import { User } from '@prisma/client';
import ERRORS from '../../../../core/errors';

const CURRENT_USER_QUERY = gql`
  query {
    me {
      id
      name
      email
    }
  }
`;

const executeCurrentUserQuery = async (token: string) =>
  testQuery<
    {
      me: Omit<User, 'passwordHash'>;
    },
    Record<string, unknown>
  >(CURRENT_USER_QUERY, {}, token);

describe('Current user test', () => {
  it('should return user from context', async () => {
    const user = await createUserFixture();
    const token = generateToken(user.id);

    const response = await executeCurrentUserQuery(token);
    expect(response.data.me).toMatchObject(user);
    expect(response.errors).toBeUndefined();
  });

  it('should throw UNAUTHENTICATED error if a invalid JWT token is provided', async () => {
    const token = generateToken('invalid_token');

    const response = await executeCurrentUserQuery(token);

    expect(response.data).toBeNull();
    expect(response.errors?.[0].message).toBe(ERRORS.UNAUTHENTICATED);
  });
});
