import type { ReactNode } from 'react'
import { Navbar } from './navbar'

type DashboardLayoutProps = {
  children: ReactNode
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className='grid grid-cols-[12rem_1fr]'>
      <aside className='block h-screen border-r border-zinc-200'>
        <Navbar />
      </aside>
      <main>{children}</main>
    </div>
  )
}
