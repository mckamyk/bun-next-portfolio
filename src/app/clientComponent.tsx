"use client"
import {trpc} from '@/trpc'
import {useRouter} from 'next/navigation'
import { useEffect, useState } from 'react'
import { getNonce, resetSession } from './serverActions'

export default function ClientComponent(): JSX.Element {
  const {data, refetch} = trpc.nonce.useQuery()
  const {mutateAsync, error, isLoading } = trpc.reset.useMutation()
  const router = useRouter()

  const [saNonce, setSaNonce] = useState<string>()
  
  useEffect(() => {
    getNonce().then(setSaNonce)
  }, [])

  const handleReset = async () => {
    await mutateAsync()
    await refetch()
    router.refresh()
  }

  const handleResetSA = async () => {
    await resetSession()
    router.refresh()
  }

  return (
    <div className="outline outline-sky-600 rounded-md p-2 my-2">
      <div>This is a client component</div>
      <div>result: {data}</div>
      <button onClick={handleReset} className={`${isLoading ? 'bg-slate-600' : 'bg-sky-600'} rounded-md px-2 py-1`}>reset</button>
      <div>{error?.message}</div>
      <div>SA nonce: {saNonce}</div>
      <button onClick={handleResetSA} className="bg-sky-600 rounded-md px-2 py-1">SA reset</button>
    </div>
  )
}
