import {initTRPC} from '@trpc/server'
import { IronSession } from 'iron-session';
import { generateNonce } from 'siwe';
import {z} from 'zod'

export type TrpcContext = {
  session: IronSession
}

const t = initTRPC.context<TrpcContext>().create();

export const appRouter = t.router({
  nonce: t.procedure.output(z.string()).query(({ctx}) => {
    const {session} = ctx
    const n = generateNonce()
    if (!session.user) session.user = {}
    session.user.nonce = n
    session.save()
    return n
  })
})

export type AppRouter = typeof appRouter
