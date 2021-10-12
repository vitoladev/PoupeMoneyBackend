import { fieldAuthorizePlugin, makeSchema } from 'nexus';
import Query from '@gql/query';
import Mutation from '@gql/mutation';
import CustomScalars from '@gql/scalars';
import { join } from 'path';
import Types from '@gql/types';

const schema = makeSchema({
  types: [Query, Mutation, Types, CustomScalars],
  outputs: {
    schema: __dirname + '/generated/schema.graphql',
    typegen: __dirname + '/generated/typings.ts',
  },
  contextType: {
    module: join(process.cwd(), 'src/graphql/context/index.ts'),
    export: 'Context',
  },
  shouldExitAfterGenerateArtifacts: Boolean(
    process.env.NEXUS_SHOULD_EXIT_AFTER_REFLECTION,
  ),
  plugins: [
    fieldAuthorizePlugin({
      formatError: ({ error }) => {
        return error ?? new Error('Not authorized');
      },
    }),
  ],
});

export default schema;
