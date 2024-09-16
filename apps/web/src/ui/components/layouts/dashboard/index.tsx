import type { ReactNode } from 'react'

import { Navbar } from './navbar'

type DashboardLayoutProps = {
  children: ReactNode
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className='grid grid-cols-[12rem_1fr]'>
      <aside className='h-screen px-3 py-6 border-r border-zinc-200'>
        <Navbar />
      </aside>
      <main className='py-6 pl-6'>{children}</main>
    </div>
  )
}
