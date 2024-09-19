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
    <>
      <div>
        <div className='p-3 md:hidden'>
          <Drawer trigger={<IconButton name='menu-hamburguer' />} direction='left'>
            {() => <Navbar />}
          </Drawer>
        </div>
        <aside className='hidden md:block fixed w-52 left-0 top-0 bottom-0 h-screen px-3 py-6 border-r border-zinc-200'>
          <Navbar />
        </aside>
      </div>

      <main className='pl-6 md:pl-60 py-6 pr-6'>{children}</main>
    </>
  )
}
