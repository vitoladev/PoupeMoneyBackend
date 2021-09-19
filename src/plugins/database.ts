import fp from 'fastify-plugin';
import { createConnection, getConnectionOptions } from 'typeorm';

const databasePlugin = fp(async (server) => {
  try {
    const connectionOptions = await getConnectionOptions();
    Object.assign(connectionOptions, {
      options: { encrypt: true },
    });

    await createConnection(connectionOptions);
    server.log.info('Connected with database');
  } catch (e) {
    server.log.fatal(e);
  }
});

export default databasePlugin;
