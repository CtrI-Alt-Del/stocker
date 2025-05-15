'use client'

import { useRef, type ReactNode } from 'react'

import ChatBotButton from './chatbot-button'
import { Navbar } from './navbar'
import { Drawer } from '../../commons/drawer'
import { IconButton } from '../../commons/icon-button'
import { useDashboardLayout } from './use-dashboard-layout'
import type { DrawerRef } from '../../commons/drawer/types'
import { useAuthContext } from '../../contexts/auth-context'
import { FirstEntryPasswordModal } from '../../commons/first-entry-password-modal'

type DashboardLayoutProps = {
  children: ReactNode
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { user } = useAuthContext()
  const drawerRef = useRef<DrawerRef>(null)
  useDashboardLayout(drawerRef)

  return (
    <>
      <div>
        <div className='p-3 lg:hidden'>
          <Drawer
            ref={drawerRef}
            trigger={<IconButton name='menu-hamburguer' />}
            direction='left'
          >
            {() => <Navbar />}
          </Drawer>
        </div>
        <aside className='hidden lg:block fixed w-52 left-0 top-0 bottom-0 h-screen px-3 py-6 border-r border-zinc-200'>
          <Navbar />
        </aside>
      </div>

      <main className='pl-6 lg:pl-60 py-6 pr-6'>{children}</main>
      {user?.hasFirstPasswordReset && <FirstEntryPasswordModal />}

      <ChatBotButton />
    </>
  )
}
