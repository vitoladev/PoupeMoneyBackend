import { makeSchema } from 'nexus';
import Query from './query';
import CustomScalars from './scalars';
import Mutation from './mutation';

const schema = makeSchema({
  types: [Query, Mutation, CustomScalars],
  outputs: {
    schema: __dirname + '/generated/schema.graphql',
    typegen: __dirname + '/generated/typings.ts',
  },
  contextType: {
    module: __dirname + '/context/types.ts',
    export: 'GraphQLContext',
  },
});

export default schema;
