import fp from 'fastify-plugin';
import { createConnection, getConnectionOptions } from 'typeorm';
import UserEntity from '@modules/user/user.entity';

const databasePlugin = fp(async (server) => {
  try {
    if (process.env.NODE_ENV === 'test') return;

    const connectionOptions = await getConnectionOptions();
    Object.assign(connectionOptions, {
      options: { encrypt: true },
      entities: [UserEntity],
      logging: ['error'],
    });

    await createConnection(connectionOptions);
    server.log.info('Connected with database');
  } catch (e) {
    server.log.fatal(e);
  }
});

export default databasePlugin;
