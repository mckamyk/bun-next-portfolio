import {fetchRequestHandler } from '@trpc/server/adapters/fetch'
import {Context, appRouter} from '@/trpc/trpcServer'
import { getServerSession } from '@/tools/session'
import { NextApiHandler } from 'next'

const handler: NextApiHandler = (request) => {
  return fetchRequestHandler({
    endpoint: '/api/trpc',
    req: request as unknown as Request,
    router: appRouter,
    createContext: async function(): Promise<Context> {
      const session = await getServerSession();
      return {session}
    }
  })
}

export const GET = handler
export const POST = handler
