import http from 'node:http';

import { koaMiddleware } from '@as-integrations/koa';
import gracefulShutdown from 'http-graceful-shutdown';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import compress from 'koa-compress';
import logger from 'koa-logger';
import route from 'koa-route';
import send from 'koa-send';
import session from 'koa-session';
import serve from 'koa-static';
import zipcodeJa from 'zipcode-ja';

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
    ctx.set('Cache-Control', 'max-age=86400');
    await next();
  });

  app.use(compress());

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

  app.use(route.get('/zipCode', (ctx) => {
    const zipCode = ctx.request.query.zipCode;
    const address = [...(zipcodeJa[zipCode]?.address ?? [])];
    const prefecture = address.shift();
    const city = address.join(' ');
    const responseJson = {
      address,
      city,
      prefecture,
      zipCode,
    };

    if (!zipCode) {
      ctx.response.status = 404;
      return;
    }

    ctx.response.type = 'application/json';
    ctx.response.body = JSON.stringify(responseJson);
    ctx.response.status = 200;
  }));

  app.use(async (ctx, next) => {
      const url = ctx.request.url;
      const isHero = ctx.request.query.isHero;
      if (url.includes('/images') && url.includes('jpg')) {
          if (isHero === 'true') {
              ctx.response.redirect(url.replace('jpg', 'hero.webp'));
              await next();
              return;
          }
          ctx.response.redirect(url.replace('jpg', 'min.webp'));
      }
      await next();
  });

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
