import { NextApiClient } from './next-api-client'

import { COOKIES } from '@/constants'
import type { CacheConfig } from '../types'
import { getCookieAction } from '@/actions'

export const NextServerApiClient = async (cacheConfig?: CacheConfig) => {
  const apiClient = NextApiClient(cacheConfig)
  const jwt = await getCookieAction(COOKIES.jwt.key)

  if (jwt) {
    apiClient.setHeader('Authorization', `Bearer ${jwt}`)
  }

  return apiClient
}
