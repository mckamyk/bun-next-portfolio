import { getServerSession } from "@/tools/session"

export default async function() {
  const session = await getServerSession();

  return (
    <div className="outline outline-red-600 rounded-md p-2 my-2">
      <div>This is a server component</div>
      <div>nonce: {session.user?.nonce}</div>
    </div>
  )
}

