import { IronSession, IronSessionData, IronSessionOptions, getIronSession, sealData, unsealData,  } from "iron-session";
import {cookies} from 'next/headers'

const ironPass = process.env.IRON_PASSWORD || "foobarbinbazfoobarbinbazfoobarbinbazfoobarbinbazfoobarbinbaz"
const cookieName = process.env.IRON_COOKIE_NAME || "app"

declare module "iron-session" {
  interface IronSessionData {
    user?: {
      nonce?: string;
      address?: `0x${string}`
    }
  }
}

export const sessionOptions: IronSessionOptions = {
  cookieName,
  password: ironPass,
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production'
  }
}

export const getSessionContext = async (req: Request, res: Response) => {
  return await getIronSession(req, res, sessionOptions)
}

export const getServerSession = async (): Promise<IronSessionData> => {
  const cookie = cookies()
  const appCookie = cookie.get(cookieName)?.value || ""

  const data = await unsealData<IronSessionData['user']>(appCookie, {password: ironPass})

  return {user: data}
}

export const getServerActionSession = async (): Promise<IronSession> => {
  const cookie = cookies()
  const session = await getServerSession();

  async function save(this: IronSession) {
    const data = await sealData(this.user, {password: ironPass})
    cookie.set(cookieName, data)
  }

  async function destroy() {
    cookie.set(cookieName, '')
  }

  return {
    ...session,
    save, destroy
  }
}
