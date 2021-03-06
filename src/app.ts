import 'module-alias/register';
import fastify from 'fastify';
import fastifyEnv from 'fastify-env';
import AltairFastify from 'altair-fastify-plugin';
import mercurius from 'mercurius';
import schema from './graphql';
import buildContext from './graphql/context';

const envSchema = {
  type: 'object',
  required: ['JWT_SECRET', 'JWT_EXPIRE'],
  properties: {
    JWT_SECRET: {
      type: 'string',
    },
    JWT_EXPIRE: {
      type: 'string',
    },
  },
};

const app = fastify();

app.register(fastifyEnv, { schema: envSchema, dotenv: true });

app.register(mercurius, {
  schema,
  context: buildContext,
});

app.register(AltairFastify, {
  path: '/altair',
  endpointURL: '/graphql',
});

export default app;
