import type { ReactNode } from 'react'
import { cookies } from 'next/headers'

import { COOKIES } from '@/constants'
import { AuthContextProvider } from '@/ui/components/contexts/auth-context'

type ServerProviderProps = { children: ReactNode }

export async function ServerProvider({ children }: ServerProviderProps) {
  const jwtCookie = (await cookies()).get(COOKIES.jwt.key)
  const jwt = jwtCookie?.value ?? null

  return <AuthContextProvider jwt={jwt}>{children}</AuthContextProvider>
}
