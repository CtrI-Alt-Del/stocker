'use client'

import type { ReactNode } from 'react'
// @ts-ignore
import { NextUIProvider } from '@nextui-org/react'
import { useRouter } from 'next/navigation'

type ClientProviderProps = { children: ReactNode }

export function ClientProvider({ children }: ClientProviderProps) {
  const router = useRouter()

  return <NextUIProvider navigate={router.push}>{children}</NextUIProvider>
}
