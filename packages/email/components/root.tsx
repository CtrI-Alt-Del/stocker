import * as React from 'react'
import type { ReactNode } from 'react'
import { Body, Head, Html, Preview, Tailwind } from '@react-email/components'

type RootProps = {
  children: ReactNode
  preview: string
}

export const Root = ({ children, preview }: RootProps) => (
  <Tailwind
    config={{
      theme: {
        extend: {
          colors: {
            brand: '#EF5C31',
          },
        },
      },
    }}
  >
    <Html className='bg-white font-sans'>
      <Head />
      <Preview>{preview}</Preview>
      <Body className='bg-white font-sans'>{children}</Body>
    </Html>
  </Tailwind>
)
