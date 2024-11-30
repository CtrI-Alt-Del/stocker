'use client'

import { createContext, useRef, type ReactNode } from 'react'

import { deleteCookieAction, setCookieAction } from '@/actions'
import { useAuthContext, useAuthContextProvider } from './hooks'
import type { AuthContextValue } from './types'
import { NextApiClient } from '@/api/next/clients/next-api-client'
import { BROWSER_ENV } from '@/constants'
import { AuthService, CompaniesService } from '@/api/services'
import { AlertDialog } from '../../commons/alert-dialog'
import type { DialogRef } from '../../commons/dialog/types'

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
  const alertDialogRef = useRef<DialogRef>(null)

  const contextValue = useAuthContextProvider({
    jwt,
    authService,
    companiesService,
    alertDialogRef,
    setCookieAction,
    deleteCookieAction,
  })

  return (
    <AuthContext.Provider value={{ jwt, ...contextValue }}>
      <AlertDialog
        ref={alertDialogRef}
        trigger={null}
        onConfirm={contextValue.handleUnkownAccountDetect}
      >
        Detectamos alguém fazendo login na sua conta? É você mesmo? Clique em confirmar
        para fazer logout da outra conta ou clique em cancelar para continuar.
      </AlertDialog>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthContextProvider, useAuthContext }
