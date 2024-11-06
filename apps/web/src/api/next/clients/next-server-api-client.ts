import { NextApiClient } from './next-api-client'

import { BROWSER_ENV, COOKIES } from '@/constants'
import type { CacheConfig } from '../types'
import { getCookieAction } from '@/actions'

export const NextServerApiClient = async (cacheConfig?: CacheConfig) => {
  const apiClient = NextApiClient(cacheConfig)
  const jwt = await getCookieAction(COOKIES.jwt.key)

  if (jwt) {
    apiClient.setHeader('Authorization', `Bearer ${jwt}`)
  }

  apiClient.setBaseUrl(BROWSER_ENV.serverUrl)

  const jwt = cookies().get(COOKIES.jwt.key)

  console.log('JWT:', jwt?.value)

  if (jwt?.value) {
    apiClient.setHeader('Authorization', `Bearer ${jwt?.value.replaceAll('"', '')}`)
  }

  return apiClient
}
