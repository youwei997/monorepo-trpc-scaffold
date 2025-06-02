import type { AppRouter } from '@monorepo-trpc-scaffold/shared/trpc/types';
import { httpBatchLink } from '@trpc/client';
import { createTRPCReact } from '@trpc/react-query';

export const trpc = createTRPCReact<AppRouter>();

export const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: 'http://localhost:3000/trpc', // 替换为 API 服务的实际地址
    }),
  ],
});
