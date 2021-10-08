import 'fastify';

interface IProcessEnv {
  NODE_ENV: 'development' | 'production';
  JWT_SECRET: string;
  JWT_EXPIRE: string;
}

declare global {
  namespace NodeJS {
    interface ProcessEnv extends IProcessEnv {}
  }
}

declare module 'fastify' {
  interface FastifyInstance {
    config: IProcessEnv;
  }
}

export {};
