import { serve } from '@hono/node-server';
import { trpcServer } from '@hono/trpc-server';
import { greet } from '@monorepo-trpc-scaffold/shared/utils';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { appRouter } from './trpc/router';

const app = new Hono();

// Enable CORS for all routes
app.use('*', cors({ origin: '*' }));

app.use('/trpc/*', trpcServer({ router: appRouter }));

app.get('/', c => {
  return c.text(greet('Hello Hono!'));
});

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  info => {
    console.log(`Server is running on http://localhost:${info.port}`);
  }
);
