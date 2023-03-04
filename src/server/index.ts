import http from 'node:http';

import { koaMiddleware } from '@as-integrations/koa';
import gracefulShutdown from 'http-graceful-shutdown';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import logger from 'koa-logger';
import route from 'koa-route';
import send from 'koa-send';
import session from 'koa-session';
import serve from 'koa-static';

import type { Context } from './context';
import { dataSource } from './data_source';
import { initializeApolloServer } from './graphql';
import { initializeDatabase } from './utils/initialize_database';
import { rootResolve } from './utils/root_resolve';

const PORT = Number(process.env.PORT ?? 8080);

async function init(): Promise<void> {
  await initializeDatabase();
  await dataSource.initialize();

  const app = new Koa();
  const httpServer = http.createServer(app.callback());

  app.keys = ['cookie-key'];
  app.use(logger());
  app.use(bodyParser());
  app.use(session({}, app));

  app.use(async (ctx, next) => {
    ctx.set('Cache-Control', 'no-store');
    await next();
  });

  const apolloServer = await initializeApolloServer();
  await apolloServer.start();

  app.use(
    route.all(
      '/graphql',
      koaMiddleware(apolloServer, {
        context: async ({ ctx }) => {
          return { session: ctx.session } as Context;
        },
      }),
    ),
  );

  app.use(
    route.post('/initialize', async (ctx) => {
      await initializeDatabase();
      ctx.status = 204;
    }),
  );

  app.use(serve(rootResolve('dist')));
  app.use(serve(rootResolve('public')));

  app.use(async (ctx) => await send(ctx, rootResolve('/dist/index.html')));

  httpServer.listen({ port: PORT }, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}`);
  });

  gracefulShutdown(httpServer, {
    async onShutdown(signal) {
      console.log(`Received signal to terminate: ${signal}`);
      await apolloServer.stop();
      await dataSource.destroy();
    },
  });
}

init().catch((err) => {
  console.error(err);
  process.exit(1);
});
