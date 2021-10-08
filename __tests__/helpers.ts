import schema from '../src/graphql';
import { ExecutionResult, graphql } from 'graphql';

export const executeGraphQL = (
  query: string,
  variables = {},
  ctx = {},
): Promise<ExecutionResult> => graphql(schema, query, {}, ctx, variables);
