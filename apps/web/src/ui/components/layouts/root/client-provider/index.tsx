'use client'

import type { ReactNode } from 'react'
import { NextUIProvider } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import { Toaster } from 'react-hot-toast'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
type ClientProviderProps = { children: ReactNode }

export function ClientProvider({ children }: ClientProviderProps) {
  const router = useRouter()

  return (
    <NuqsAdapter>
      <NextUIProvider navigate={router.push}>
        <Toaster position='top-left' />
        {children}
      </NextUIProvider>
    </NuqsAdapter>
  )
}
