import { ExecutionResult, graphql } from 'graphql';
import schema from '../src/graphql';

export const executeGraphQL = (
  query: string,
  variables = {},
  ctx = {},
): Promise<ExecutionResult> => graphql(schema, query, {}, ctx, variables);
