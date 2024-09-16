import type { ReactNode } from 'react'

type ServerProviderProps = { children: ReactNode }

export function ServerProvider({ children }: ServerProviderProps) {
  return <div>{children}</div>
}
