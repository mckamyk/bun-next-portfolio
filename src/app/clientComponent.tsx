"use client"
import {trpc} from '@/trpc'

export default function ClientComponent(): JSX.Element {
  const {data} = trpc.test.useQuery()

  console.log(data)

  return (
    <div className="outline outline-sky-600 rounded-md p-2 my-2">
      <div>This is a client component</div>
      <div>result: {data}</div>
    </div>
  )
}
