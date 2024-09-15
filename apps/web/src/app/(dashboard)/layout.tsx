import type { ReactNode } from 'react'

import { DashboardLayout } from '@/ui/components/layouts/dashboard'

type LayoutProps = {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return <DashboardLayout>{children}</DashboardLayout>
}

export default Layout
