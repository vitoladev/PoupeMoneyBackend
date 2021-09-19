import { mutationField, nonNull, stringArg } from 'nexus';
import UserEntity from '../user.entity';
import { getRepository } from 'typeorm';
import bcrypt from 'bcryptjs';
import UserType from '../user.type';

const CreateUserMutation = mutationField('createUser', {
  type: UserType,
  args: {
    name: nonNull(stringArg()),
    email: nonNull(stringArg()),
    password: nonNull(stringArg()),
  },
  async resolve(_source, { name, email, password }) {
    const userRepository = getRepository(UserEntity);
    const passwordHash = await bcrypt.hash(password, 12);
    const user = userRepository.create({
      name,
      email,
      passwordHash,
    });

    return await userRepository.save(user);
  },
});

export default CreateUserMutation;
