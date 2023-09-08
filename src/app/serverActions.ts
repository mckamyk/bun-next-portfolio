"use server"

import { getServerActionSession } from "@/tools/session"
import { generateNonce } from "siwe"

export const getNonce = async () => {
  const session = await getServerActionSession()
  if (session.user?.nonce) return session.user.nonce

  const n = generateNonce()
  if (!session.user) session.user = {}
  session.user.nonce = n

  return n
}

export const resetSession = async () => {
  const session = await getServerActionSession()
  session.destroy()
}
