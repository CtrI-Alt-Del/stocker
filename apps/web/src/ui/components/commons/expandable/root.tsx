import type { ReactNode } from 'react'
import { Accordion } from '@nextui-org/react'

type RootProps = {
  children: ReactNode
}

export const Root = ({ children }: RootProps) => {
  return <Accordion>{children}</Accordion>
}
