import fastify from 'fastify';
import AltairFastify from 'altair-fastify-plugin';
import mercurius from 'mercurius';
import schema from './graphql';
import buildContext from './graphql/context';

const app = fastify({ logger: true });

app.register(mercurius, {
  schema,
  context: buildContext,
});

app.register(AltairFastify, {
  path: '/altair',
  endpointURL: '/graphql',
});

const start = async () => {
  try {
    await app.listen(3000);
  } catch (e) {
    app.log.error(e);
    process.exit(1);
  }
};

start();
