import { BROWSER_ENV, COOKIES } from '@/constants'
import { NextApiClient } from './next-api-client'
import type { CacheConfig } from '../types'
import { cookies } from 'next/headers'

export const NextServerApiClient = (cacheConfig?: CacheConfig) => {
  const apiClient = NextApiClient(cacheConfig)
  apiClient.setBaseUrl(BROWSER_ENV.serverUrl)

  const jwt = cookies().get(COOKIES.jwt.key)

  console.log('JWT:', jwt?.value)

  if (jwt?.value) {
    apiClient.setHeader('Authorization', `Bearer ${jwt?.value.replaceAll('"', '')}`)
  }

  return apiClient
}
