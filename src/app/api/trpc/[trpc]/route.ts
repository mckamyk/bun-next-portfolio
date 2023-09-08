import {fetchRequestHandler } from '@trpc/server/adapters/fetch'
import {TrpcContext, appRouter} from '@/trpcServer'
import { getServerActionSession } from '@/tools/session'
import { NextApiHandler } from 'next'

const handler: NextApiHandler = (request) => {
  return fetchRequestHandler({
    endpoint: '/api/trpc',
    req: request as unknown as Request,
    router: appRouter,
    createContext: async function(): Promise<TrpcContext> {
      const session = await getServerActionSession();
      return {session}
    }
  })
}

export const GET = handler
export const POST = handler
