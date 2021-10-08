import { makeSchema } from 'nexus';
import Query from './query';
import Mutation from './mutation';
import CustomScalars from './scalars';
import { join } from 'path';

const schema = makeSchema({
  types: [Query, Mutation, CustomScalars],
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
});

export default schema;
