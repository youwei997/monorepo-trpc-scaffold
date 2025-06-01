import type { AppRouter } from '@monorepo-trpc-scaffold/shared/trpc/types';
import { createTRPCProxyClient, httpLink } from '@trpc/client';

export const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpLink({
      url: 'http://localhost:3000/trpc',
    }),
  ],
});
