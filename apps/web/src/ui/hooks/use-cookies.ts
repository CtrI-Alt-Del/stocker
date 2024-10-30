"use server"
import { cookies } from 'next/headers'

export async function useCookies() {
  async function getCookie<Data>(key: string) {
    'use server'

    const cookie = cookies().get(key)
    return cookie?.value ? (JSON.stringify(cookie.value) as Data) : null
  }

  async function setCookie(key: string, data: unknown) {
    'use server'

    cookies().set(key, JSON.stringify(data))
  }

  async function deleteCookie(key: string) {
    'use server'

    cookies().delete(key)
  }

  return {
    getCookie,
    setCookie,
    deleteCookie,
  }
}
