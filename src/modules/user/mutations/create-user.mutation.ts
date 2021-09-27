import { inputObjectType, mutationField, nonNull } from 'nexus';
import bcrypt from 'bcryptjs';
import { generateToken } from '../../../core/auth';
import { AuthenticationToken } from './login.mutation';
import errors, { throwGraphQLError } from '../../../core/errors';

const CreateUserInput = inputObjectType({
  name: 'CreateUserInput',
  definition(t) {
    t.nonNull.string('name');
    t.nonNull.email('email');
    t.nonNull.string('password');
  },
});

const CreateUserMutation = mutationField('CreateUser', {
  type: AuthenticationToken,
  args: { input: nonNull(CreateUserInput) },
  async resolve(_source, { input: { email, name, password } }, ctx) {
    const emailExists = await ctx.db.user.findOne({ email });
    if (emailExists) {
      return throwGraphQLError(
        'Email already exists',
        errors.EMAIL_ALREADY_EXISTS,
      );
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const user = ctx.db.user.create({
      name,
      email,
      passwordHash,
    });

    await ctx.db.user.create(user);

    return { token: generateToken(user.id) };
  },
});

export default CreateUserMutation;
