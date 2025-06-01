import { initTRPC } from '@trpc/server';
import { z } from 'zod';
import { prisma } from '../db/prisma';

const t = initTRPC.create();

export const appRouter = t.router({
  test: t.procedure.query(() => {
    return { message: 'Hello from tRPC!' };
  }),
  getUser: t.procedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const user = await prisma.user.findUnique({
        where: { id: input.id },
      });
      return user || { error: 'User not found' };
    }),
  createUser: t.procedure
    .input(z.object({ name: z.string(), email: z.string().email() }))
    .mutation(async ({ input }) => {
      const newUser = await prisma.user.create({
        data: {
          name: input.name,
          email: input.email,
        },
      });
      return newUser;
    }),
});

export type AppRouter = typeof appRouter;
