import { fieldAuthorizePlugin, makeSchema } from 'nexus';
import Query from '@graphql/query';
import Mutation from '@graphql/mutation';
import CustomScalars from '@graphql/scalars';
import { join } from 'path';
import Types from '@graphql/types';

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
  plugins: [fieldAuthorizePlugin()],
});

export default schema;
