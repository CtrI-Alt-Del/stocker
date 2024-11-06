'use server'

import { cookies } from 'next/headers'

export async function deleteCookieAction(key: string) {
 (await cookies()).delete(key)
}
