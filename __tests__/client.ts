import { createMercuriusTestClient } from 'mercurius-integration-testing';
import app from '../src/app';
import { DocumentNode } from 'graphql';

export const testClient = (token = '') =>
  createMercuriusTestClient(app, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

export const testQuery = <
  TData extends Record<string, unknown>,
  TVariables extends Record<string, unknown>,
>(
  query: DocumentNode,
  variables: TVariables,
  authToken = '',
) => testClient(authToken).query<TData, TVariables>(query, { variables });

export const testMutation = <
  TData extends Record<string, unknown>,
  TVariables extends Record<string, unknown>,
>(
  mutation: DocumentNode,
  variables: TVariables,
  authToken = '',
) => testClient(authToken).mutate<TData, TVariables>(mutation, { variables });
