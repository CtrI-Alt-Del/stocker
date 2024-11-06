import type { ReactNode } from 'react'

import { AuthLayout } from '@/ui/components/layouts/auth'

type LayoutProps = {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return <AuthLayout>{children}</AuthLayout>
}

export default Layout
