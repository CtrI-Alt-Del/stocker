import type { ReactNode } from 'react'

type DashboardLayoutProps = {
  children: ReactNode
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div>
      <main>{children}</main>
    </div>
  )
}
