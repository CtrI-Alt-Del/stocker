'use client'

import type { ReactNode } from 'react'
import { NextUIProvider } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import { Toaster } from 'react-hot-toast'

type ClientProviderProps = { children: ReactNode }

export function ClientProvider({ children }: ClientProviderProps) {
  const router = useRouter()

  return (
    <NextUIProvider navigate={router.push}>
      <Toaster position='top-left' />
      {children}
    </NextUIProvider>
  )
}
