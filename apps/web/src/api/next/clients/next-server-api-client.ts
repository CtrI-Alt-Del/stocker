import { ENV } from '@/constants'
import { NextApiClient } from './next-api-client'
import type { CacheConfig } from '../types'

export const NextServerApiClient = (cacheConfig?: CacheConfig) => {
  const apiClient = NextApiClient(cacheConfig)
  apiClient.setBaseUrl(ENV.serverUrl)
  return apiClient
}
