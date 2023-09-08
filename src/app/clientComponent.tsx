"use client"
import {trpc} from '@/trpc/client'
import {useRouter} from 'next/navigation'
import { useEffect } from 'react'

export default function ClientComponent(): JSX.Element {
  const {data, refetch} = trpc.nonce.useQuery()
  const {mutateAsync, error, isLoading } = trpc.reset.useMutation()
  const router = useRouter()

  useEffect(() => {
    if (data) router.refresh()
  }, [data])

  const handleReset = async () => {
    await mutateAsync()
    await refetch()
    router.refresh()
  }

  return (
    <div className="outline outline-sky-600 rounded-md p-2 my-2">
      <div>This is a client component</div>
      <div>result: {data}</div>
      <button onClick={handleReset} className={`${isLoading ? 'bg-slate-600' : 'bg-sky-600'} rounded-md px-2 py-1`}>reset</button>
      <div>{error?.message}</div>
    </div>
  )
}
