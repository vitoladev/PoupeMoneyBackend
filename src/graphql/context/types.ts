import buildContext from './index';

type PromiseType<T> = T extends PromiseLike<infer U> ? U : T;

export type GraphQLContext = PromiseType<ReturnType<typeof buildContext>>;

declare module 'mercurius' {
  interface MercuriusContext extends GraphQLContext {}
}
