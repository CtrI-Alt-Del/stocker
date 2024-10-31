'use client'

import { createContext, type ReactNode } from 'react'

import { deleteCookieAction, setCookieAction } from '@/actions'
import { useAuthContext, useAuthContextProvider } from './hooks'
import type { AuthContextValue } from './types'

const AuthContext = createContext({} as AuthContextValue)

type AuthContextProviderProps = {
  children: ReactNode
  jwt: string | null
}

const AuthContextProvider = ({ children, jwt }: AuthContextProviderProps) => {
  const contextValue = useAuthContextProvider({
    jwt,
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
