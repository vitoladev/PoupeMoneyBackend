import { generateToken, getUserFromAuthToken } from '../auth.service';
import { createUserFixture } from '../../../../__tests__/factories/user.factory';

describe('Auth service', () => {
  it('should get user from token', async () => {
    const user = await createUserFixture();
    const token = generateToken(user.id);
    const decodedUser = await getUserFromAuthToken(`Bearer ${token}`);

    expect(decodedUser).toMatchObject(user);
  });

  it('should return undefined from a invalid token', async () => {
    const token = generateToken('invalid_token');
    const decoded = await getUserFromAuthToken(`Bearer ${token}`);

    expect(decoded).toBeNull();
  });
});
