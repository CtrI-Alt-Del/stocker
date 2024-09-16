'use client'

import type { ReactNode } from 'react'

import { Navbar } from './navbar'
import { Drawer } from '../../commons/drawer'
import { IconButton } from '../../commons/icon-button'

type DashboardLayoutProps = {
  children: ReactNode
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className='grid grid-cols-[12.5rem_1fr]'>
      <div className='p-3 lg:hidden'>
        <Drawer trigger={<IconButton name='menu-hamburguer' />}>
          <Navbar />
        </Drawer>
      </div>
      <aside className='hidden lg:block h-screen px-3 py-6 border-r border-zinc-200'>
        <Navbar />
      </aside>
      <main className='py-6 pl-6'>{children}</main>
    </div>
  )
}
