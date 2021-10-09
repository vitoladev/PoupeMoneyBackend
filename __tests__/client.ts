import { createMercuriusTestClient } from 'mercurius-integration-testing';
import app from '../src/app';
import { DocumentNode } from 'graphql';

export const testClient = () => createMercuriusTestClient(app);

export const testQuery = <
  TData extends Record<string, unknown>,
  TVariables extends Record<string, unknown>,
>(
  query: DocumentNode,
  variables: TVariables,
) => testClient().query<TData, TVariables>(query, { variables });

export const testMutation = <
  TData extends Record<string, unknown>,
  TVariables extends Record<string, unknown>,
>(
  mutation: DocumentNode,
  variables: TVariables,
) => testClient().mutate<TData, TVariables>(mutation, { variables });
