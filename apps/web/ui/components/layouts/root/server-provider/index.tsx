import type { ReactNode } from 'react'
import { cookies } from 'next/headers'

type ServerProviderProps = { children: ReactNode }

export function ServerProvider({ children }: ServerProviderProps) {

  return <div>{children}</div>
}
