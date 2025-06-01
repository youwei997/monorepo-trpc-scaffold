import { serve } from '@hono/node-server';
import { trpcServer } from '@hono/trpc-server';
import { greet } from '@monorepo-trpc-scaffold/shared/utils';
import { initTRPC } from '@trpc/server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';

const t = initTRPC.create();
const appRouter = t.router({
  test: t.procedure.query(() => {
    return { message: 'Hello from tRPC!' };
  }),
});

export type AppRouter = typeof appRouter;

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
