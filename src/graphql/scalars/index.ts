import { asNexusMethod } from 'nexus';
import { EmailAddressResolver, JWTResolver } from 'graphql-scalars';

export const JwtScalar = asNexusMethod(JWTResolver, 'jwt');

export const EmailScalar = asNexusMethod(EmailAddressResolver, 'email');

const CustomScalars = {
  JwtScalar,
  EmailScalar,
};

export default CustomScalars;
