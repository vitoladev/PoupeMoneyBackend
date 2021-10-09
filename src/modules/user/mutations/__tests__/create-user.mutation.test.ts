import {
  createUserFixture,
  userFactory,
} from '../../../../../__tests__/factories/user.factory';
import { testMutation } from '../../../../../__tests__/client';
import gql from 'graphql-tag';
import ERRORS from '../../../../core/errors';
import { NexusGenInputs } from '../../../../graphql/generated/typings';
import {
  closeDbConnection,
  createTestDbConnection,
} from '../../../../../__tests__/database';

beforeAll(async () => createTestDbConnection());

afterAll(async () => closeDbConnection());

const CREATE_USER_MUTATION = gql`
  mutation CreateUserTest($input: CreateUserInput!) {
    CreateUser(input: $input) {
      token
    }
  }
`;

const executeCreateUserMutation = async (
  input: NexusGenInputs['CreateUserInput'] = userFactory(),
) =>
  testMutation<
    {
      CreateUser: {
        token: string;
      };
    },
    { input: NexusGenInputs['CreateUserInput'] }
  >(CREATE_USER_MUTATION, {
    input,
  });

describe('Create user test', () => {
  it('should create user', async () => {
    const response = await executeCreateUserMutation();

    expect(response.data.CreateUser.token).toBeTruthy();
    expect(response.errors).toBeFalsy();
  });

  it('should return a already registered email error', async () => {
    const user = userFactory();
    await createUserFixture(user);
    const alreadyRegisteredUser = await executeCreateUserMutation(user);

    expect(alreadyRegisteredUser.data.CreateUser).toBeNull();
    expect(alreadyRegisteredUser.errors?.[0]?.message).toBe(
      ERRORS.EMAIL_ALREADY_REGISTERED,
    );
  });
});
