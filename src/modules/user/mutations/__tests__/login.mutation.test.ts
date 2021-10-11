import gql from 'graphql-tag';
import { NexusGenInputs } from '../../../../graphql/generated/typings';
import {
  createUserFixture,
  userFactory,
} from '../../../../../__tests__/factories/user.factory';
import { testMutation } from '../../../../../__tests__/client';
import ERRORS from '../../../../core/errors';
import { prisma } from '../../../../graphql/context';

afterAll(async () => await prisma.$disconnect());

const LOGIN_MUTATION = gql`
  mutation LoginTest($input: LoginInput!) {
    Login(input: $input) {
      token
    }
  }
`;

const executeLoginMutation = (input: NexusGenInputs['LoginInput']) =>
  testMutation<
    { Login: { token: string } },
    { input: NexusGenInputs['LoginInput'] }
  >(LOGIN_MUTATION, { input });

describe('Login test', () => {
  it('should authenticate and return jwt token', async () => {
    const user = userFactory();
    await createUserFixture(user);

    const response = await executeLoginMutation({
      email: user.email,
      password: user.password,
    });

    expect(response.data.Login.token).toBeTruthy();
    expect(response.errors).toBeFalsy();
  });

  it('should throw a invalid email or password error if user does not exist', async () => {
    const { email, password } = userFactory();
    const response = await executeLoginMutation({ email, password });

    expect(response.data.Login).toBeNull();
    expect(response.errors?.[0].message).toBe(ERRORS.INVALID_EMAIL_OR_PASSWORD);
  });

  it('should throw a invalid email or password error if passwords didnt match', async () => {
    const user = userFactory();
    await createUserFixture(user);

    const userWithInvalidPassword = { ...user, password: 'invalid_password' };

    const response = await executeLoginMutation({
      email: userWithInvalidPassword.email,
      password: userWithInvalidPassword.password,
    });

    expect(response.data.Login).toBeNull();
    expect(response.errors?.[0].message).toBe(ERRORS.INVALID_EMAIL_OR_PASSWORD);
  });
});
