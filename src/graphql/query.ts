import { queryType, stringArg } from 'nexus';

const Query = queryType({
  definition(t) {
    t.string('hello', {
      args: { name: stringArg() },
      resolve: (parent, { name }) => `Hello ${name || 'World'}!`,
    });
  },
});

export default Query;
