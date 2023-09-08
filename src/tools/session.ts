import { getIronSession } from "iron-session";
import { NextResponse } from "next/server";

const ironPass = process.env.IRON_PASSWORD
if (!ironPass) throw new Error("Need IRON_PASSWORD for session keys");

declare module "iron-session" {
  interface IronSessionData {
    user?: {
      nonce?: string;
      address?: `0x${string}`
    }
  }
}

export const getSession = async (req: Request) => {
  const res = NextResponse.next()
  const session = await getIronSession(req, res, {
    cookieName: 'app',
    password: ironPass,
    cookieOptions: {
      secure: process.env.NODE_ENV === 'production'
    }
  })

  return session
}
