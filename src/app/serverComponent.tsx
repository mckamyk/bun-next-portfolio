import {appRouter} from '@/trpcServer'

export default async function() {
  const caller = appRouter.createCaller({});

  const val = await caller.test()

  return (
    <div className="outline outline-red-600 rounded-md p-2 my-2">
      <div>This is a server component</div>
      <div>result: {val}</div>
    </div>
  )
}

