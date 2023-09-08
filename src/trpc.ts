import {createTRPCReact} from '@trpc/react-query'
import type { AppRouter } from './trpcServer'
export const trpc = createTRPCReact<AppRouter>();
