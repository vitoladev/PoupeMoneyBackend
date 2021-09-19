import { makeSchema } from 'nexus';
import Query from './query';

const schema = makeSchema({
  types: [Query],
  outputs: {
    schema: __dirname + '/generated/schema.graphql',
    typegen: __dirname + '/generated/typings.ts',
  },
});

export default schema;
