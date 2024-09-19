'use client'

import type { ReactNode } from 'react'
import RmDrawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'
import { Slot } from '@radix-ui/react-slot'

import { IconButton } from '../icon-button'
import { useDrawer } from './use-drawer'

type DrawerProps = {
  children: (closeDrawer: VoidFunction) => ReactNode
  trigger: ReactNode
  width?: number
  direction?: 'top' | 'left' | 'right' | 'bottom'
}

export const Drawer = ({
  children,
  trigger,
  width = 220,
  direction = 'right',
}: DrawerProps) => {
  const { isOpen, open, close } = useDrawer()

  return (
    <>
      <RmDrawer open={isOpen} onClose={close} size={width} direction={direction}>
        <div className='p-6 pb-12 h-full overflow-y-auto'>
          <div className='ml-auto w-max'>
            <IconButton name='close' onClick={close} size={20} />
          </div>
          <div className='mt-1 h-full sm:h-auto'>{children(close)}</div>
        </div>
      </RmDrawer>
      <Slot onClick={open}>{trigger}</Slot>
    </>
  )
}
