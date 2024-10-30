'use server'

import { cookies } from 'next/headers'

export async function setCookieAction(key: string, data: unknown, duration: number) {
  cookies().set(key, JSON.stringify(data))
}