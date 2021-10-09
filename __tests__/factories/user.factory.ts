import faker from 'faker';
import { getRepository } from 'typeorm';
import bcrypt from 'bcryptjs';
import UserEntity from '../../src/modules/user/user.entity';

export const userFactory = () => ({
  name: faker.name.firstName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
});

export const createUserFixture = async (
  { name, email, password } = userFactory(),
) => {
  const passwordHash = await bcrypt.hash(password, 12);
  const user = getRepository(UserEntity).create({ name, email, passwordHash });

  await getRepository(UserEntity).save(user);
};
