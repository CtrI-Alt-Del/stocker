import type * as React from 'react'
import { Tailwind } from '@react-email/components'

export type StyleProps = {
  children: React.ReactNode
}

export const Style = ({ children }: StyleProps) => (
  // @ts-ignore
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
    {children}
  </Tailwind>
)
