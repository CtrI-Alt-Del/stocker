import { NextApiClient } from './next-api-client'

import { BROWSER_ENV, COOKIES } from '@/constants'
import type { CacheConfig } from '../types'
import { getCookieAction } from '@/actions'

export const NextServerApiClient = async (cacheConfig?: CacheConfig) => {
  const apiClient = NextApiClient(cacheConfig)
  apiClient.setBaseUrl('http://localhost:3333')

  const jwt = await getCookieAction(COOKIES.jwt.key)

  if (jwt) {
    apiClient.setHeader('Authorization', `Bearer ${jwt}`)
  }

  return apiClient
}
