import { inputObjectType, mutationField, nonNull } from 'nexus';
import bcrypt from 'bcryptjs';
import { generateToken } from '@core/auth/auth.service';
import ERRORS, { throwGraphQLError } from '@core/errors';
import { AuthenticationToken } from '@core/auth/auth.type';

export const CreateUserInput = inputObjectType({
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
      return throwGraphQLError(ERRORS.EMAIL_ALREADY_REGISTERED);
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const user = ctx.db.user.create({
      name,
      email,
      passwordHash,
    });

    await ctx.db.user.save(user);

    return { token: generateToken(user.id) };
  },
});

export default CreateUserMutation;
