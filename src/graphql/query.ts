import { GraphQLObjectType, GraphQLString } from 'graphql';

const query = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    hello: {
      type: GraphQLString,
      resolve: () => 'world',
    },
  }),
});

export default query;
