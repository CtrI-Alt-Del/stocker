import { ENV } from '@/constants'
import { NextApiClient } from './next-api-client'

export const NextServerApiClient = () => {
  const apiClient = NextApiClient()
  console.log(ENV.serverUrl)
  apiClient.setBaseUrl(ENV.serverUrl)
  return apiClient
}
