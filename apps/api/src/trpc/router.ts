import { initTRPC } from '@trpc/server';
import { todoRouter } from './routers/todo';

const t = initTRPC.create();

export const appRouter = t.router({
  test: t.procedure.query(() => {
    return { message: 'Hello from tRPC!' };
  }),
  todo: todoRouter,
});

export type AppRouter = typeof appRouter;
// 最终决定使用export * 导出api生成的类型
