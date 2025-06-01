import { initTRPC } from '@trpc/server';
import { z } from 'zod';
import { prisma } from '../../db/prisma';

const t = initTRPC.create();

export const todoRouter = t.router({
  getTodo: t.procedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const todo = await prisma.todo.findUnique({
        where: { id: input.id },
      });
      return todo || { error: 'Todo not found' };
    }),
  getTodos: t.procedure.query(async () => {
    const todos = await prisma.todo.findMany();
    return todos;
  }),
  createTodo: t.procedure
    .input(z.object({ title: z.string(), completed: z.boolean().optional() }))
    .mutation(async ({ input }) => {
      const newTodo = await prisma.todo.create({
        data: {
          title: input.title,
          completed: input.completed ?? false,
        },
      });
      return newTodo;
    }),
  updateTodo: t.procedure
    .input(
      z.object({
        id: z.number(),
        title: z.string().optional(),
        completed: z.boolean().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const updatedTodo = await prisma.todo.update({
        where: { id: input.id },
        data: {
          title: input.title,
          completed: input.completed,
        },
      });
      return updatedTodo;
    }),
  deleteTodo: t.procedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      await prisma.todo.delete({
        where: { id: input.id },
      });
      return { success: true };
    }),
});
