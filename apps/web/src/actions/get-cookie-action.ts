'use server'

import { cookies } from 'next/headers'

export async function getCookieAction(key: string) {
  const cookie = cookies().get(key)
  return cookie?.value ? cookie.value : null
}
