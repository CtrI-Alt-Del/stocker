import type { ReactNode } from 'react'

import { ClientProvider } from './client-provider'
import { ServerProvider } from './server-provider'

type RootLayoutProps = { children: ReactNode }

export const RootLayout = async ({ children }: RootLayoutProps) => {
  return (
    <html lang='pt-BR'>
      <body className='min-h-screen w-full bg-zinc-50'>
        <ClientProvider>
          <ServerProvider>{children}</ServerProvider>
        </ClientProvider>
      </body>
    </html>
  )
}
