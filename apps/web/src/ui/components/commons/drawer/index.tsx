'use client'

import type { ReactNode } from 'react'
import RmDrawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'
import { Slot } from '@radix-ui/react-slot'

import { useDrawer } from './use-drawer'
import { IconButton } from '../icon-button'

type DrawerProps = {
  children: ReactNode
  trigger: ReactNode
  width?: number
  direction?: string
}

export const Drawer = ({ children, trigger, width = 220 }: DrawerProps) => {
  const { isOpen, open, close } = useDrawer()

  return (
    <>
      <RmDrawer open={isOpen} onClose={close} size={width} direction='left'>
        <div className='p-6 pb-12 h-full'>
          <div className='ml-auto w-max '>
            <IconButton name='close' onClick={close} />
          </div>
          {children}
        </div>
      </RmDrawer>
      <Slot className='bg-transparent' onClick={open}>
        {trigger}
      </Slot>
    </>
  )
}
