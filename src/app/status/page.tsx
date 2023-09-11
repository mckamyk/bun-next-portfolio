import { getPrysmSync } from "@/connectors/prysm"

const PrysmSync = async () => {
  const {head_slot, sync_distance} = await getPrysmSync();

  let pct = head_slot / (head_slot + sync_distance)
  pct = pct * 100
  pct = Math.round(pct)

  return (
    <div className={`relative rounded-md overflow-clip h-6 w-full]`}>
      <div className={`bg-gray-600 w-full h-6`} />
      <div className={`absolute left-0 top-0 w-[${pct}%] bg-sky-600 h-6 animate-pulse`} />
      <div className="absolute left-0 top-0 w-full text-center">{pct}%</div>
    </div>
  )
}

export default function() {
  return (
    <PrysmSync />
  )
}
