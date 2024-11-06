'use server'

import { cookies } from 'next/headers'

export async function deleteCookieAction(key: string) {
  cookies().delete(key)
}
