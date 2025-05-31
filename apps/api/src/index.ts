import { serve } from '@hono/node-server';
import { greet } from '@shared/utils';
import { Hono } from 'hono';

const app = new Hono();

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
