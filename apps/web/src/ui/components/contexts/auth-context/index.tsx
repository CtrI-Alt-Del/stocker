'use client'

import { createContext, type ReactNode } from 'react'

import { deleteCookieAction, setCookieAction } from '@/actions'
import { useAuthContext, useAuthContextProvider } from './hooks'
import type { AuthContextValue } from './types'
import { NextApiClient } from '@/api/next/clients/next-api-client'
import { BROWSER_ENV } from '@/constants'
import { AuthService, CompaniesService } from '@/api/services'

const AuthContext = createContext({} as AuthContextValue)

const apiClient = NextApiClient({ isCacheEnabled: false })
apiClient.setBaseUrl(BROWSER_ENV.serverApiUrl)

type AuthContextProviderProps = {
  children: ReactNode
  jwt: string | null
}

const AuthContextProvider = ({ children, jwt }: AuthContextProviderProps) => {
  if (jwt) apiClient.setHeader('Authorization', `Bearer ${jwt}`)
  const authService = AuthService(apiClient)
  const companiesService = CompaniesService(apiClient)

  const contextValue = useAuthContextProvider({
    jwt,
    authService,
    companiesService,
    setCookieAction,
    deleteCookieAction,
  })

  return (
    <AuthContext.Provider value={{ jwt, ...contextValue }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthContextProvider, useAuthContext }
