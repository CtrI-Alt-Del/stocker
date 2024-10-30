import type { ReactNode } from 'react'
import { cookies } from 'next/headers'
import { jwtDecode } from 'jwt-decode'

import { COOKIES } from '@/constants'
import { AuthContextProvider } from '@/ui/components/contexts/auth-context'
import type { UserDto } from '@stocker/core/dtos'

type ServerProviderProps = { children: ReactNode }

export function ServerProvider({ children }: ServerProviderProps) {
  const jwtCookie = cookies().get(COOKIES.jwt.key)
  const jwt = jwtCookie?.value
  const userDto = jwt ? jwtDecode<UserDto>(jwt) : null

  return <AuthContextProvider userDto={userDto}>{children}</AuthContextProvider>
}
