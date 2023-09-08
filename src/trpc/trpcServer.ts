import { getServerActionSession, getServerSession } from '@/tools/session';
import {inferAsyncReturnType, initTRPC} from '@trpc/server'
import { generateNonce } from 'siwe';
import {z} from 'zod'

async function createContextInner() {
  const session = await getServerSession();
  return {session}
}

export type Context = inferAsyncReturnType<typeof createContextInner>

const t = initTRPC.context<Context>().create();
const publicProcedure = t.procedure
const apiProcedure = publicProcedure.use(async opts => {
  const session = await getServerActionSession();
  return opts.next({
    ctx: {session}
  })
})

export const appRouter = t.router({
  reset: apiProcedure.output(z.void()).mutation(async ({ctx}) => ctx.session.destroy()),

  nonce: apiProcedure.output(z.string()).query(async ({ctx}) => {
    const {session} = ctx
    if (session.user?.nonce) return session.user.nonce
    const n = generateNonce()
    if (!session.user) session.user = {}
    session.user.nonce = n
    await session.save()
    return n
  })
})

export type AppRouter = typeof appRouter

