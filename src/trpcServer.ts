import {initTRPC} from '@trpc/server'
import { IronSession } from 'iron-session';
import { generateNonce } from 'siwe';
import {z} from 'zod'

export type TrpcContext = {
  session: IronSession
}

const t = initTRPC.context<TrpcContext>().create();

export const appRouter = t.router({
  reset: t.procedure.output(z.void()).mutation(async ({ctx}) => ctx.session.destroy()),
  nonce: t.procedure.output(z.string()).query(async ({ctx}) => {
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

