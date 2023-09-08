import { getServerSession } from "@/tools/session"
import { appRouter } from "./trpcServer"

export const getTrpc = async () => {
  const cookieData = await getServerSession()
  return appRouter.createCaller({session: cookieData})
}
