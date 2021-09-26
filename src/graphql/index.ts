import { makeSchema } from 'nexus';
import Query from './query';
import UserType from '../modules/user/user.type';
import CreateUserMutation from '../modules/user/mutations/create-user.mutation';

const schema = makeSchema({
  types: [Query, UserType, CreateUserMutation],
  outputs: {
    schema: __dirname + '/generated/schema.graphql',
    typegen: __dirname + '/generated/typings.ts',
  },
});

export default schema;
