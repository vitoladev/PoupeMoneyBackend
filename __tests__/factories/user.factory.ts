import faker from 'faker';
import bcrypt from 'bcryptjs';
import { prisma } from '../../src/graphql/context';

export const userFactory = () => ({
  name: faker.name.firstName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
});

export const createUserFixture = async (
  { name, email, password } = userFactory(),
) => {
  const passwordHash = await bcrypt.hash(password, 12);

  return await prisma.user.create({
    data: {
      name,
      email,
      passwordHash,
    },
  });
};
