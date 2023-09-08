import {fetchRequestHandler, FetchCreateContextFnOptions} from '@trpc/server/adapters/fetch'
import {TrpcContext, appRouter} from '@/trpcServer'
import { getSession } from '@/tools/session'

const handler = (request: Request) => {
  console.log(`Incoming trpc request ${request.url}`)
  return fetchRequestHandler({
    endpoint: '/api/trpc',
    req: request,
    router: appRouter,
    createContext: async function(opts: FetchCreateContextFnOptions): Promise<TrpcContext> {
      const session = await getSession(request)
      return {session}
    }
  })
}

export const GET = handler
export const POST = handler
