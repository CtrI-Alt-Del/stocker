'use client'

import { createContext, type ReactNode } from 'react'

import type { UserDto } from '@stocker/core/dtos'

import type { AuthContextValue } from './types'
import { useAuthContext, useAuthContextProvider } from './hooks'

const AuthContext = createContext({} as AuthContextValue)

type AuthContextProviderProps = {
  children: ReactNode
  userDto: UserDto | null
}

const AuthContextProvider = ({ children, userDto }: AuthContextProviderProps) => {
  const contextValue = useAuthContextProvider(userDto)

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthContextProvider, useAuthContext }
