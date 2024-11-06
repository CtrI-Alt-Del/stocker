'use server'

import { cookies } from 'next/headers'

export async function getCookieAction<Data>(key: string) {
  const cookie = cookies().get(key)
  return cookie?.value ? (JSON.stringify(cookie.value) as Data) : null
}
