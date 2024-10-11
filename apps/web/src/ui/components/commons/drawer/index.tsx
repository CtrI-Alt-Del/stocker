'use client'

import {
  type ForwardedRef,
  forwardRef,
  useImperativeHandle,
  type ReactNode,
  useEffect,
} from 'react'
import { Slot } from '@radix-ui/react-slot'
import RmDrawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'

import { IconButton } from '../icon-button'
import { useDrawer } from './use-drawer'
import type { DrawerRef } from './types'
import { useBreakpoint } from '@/ui/hooks'

type DrawerProps = {
  children: (closeDrawer: VoidFunction) => ReactNode
  trigger: ReactNode
  direction?: 'top' | 'left' | 'right' | 'bottom'
  width?: number
  zIndex?: number
  onOpen?: VoidFunction
  onClose?: VoidFunction
}

export const DrawerComponent = (
  {
    children,
    trigger,
    direction = 'right',
    zIndex = 1,
    width,
    onOpen,
    onClose,
  }: DrawerProps,
  ref: ForwardedRef<DrawerRef>,
) => {
  const { isOpen, open, close } = useDrawer(onOpen, onClose)
  const { md } = useBreakpoint()

  useImperativeHandle(
    ref,
    () => {
      return {
        close,
        open,
      }
    },
    [close, open],
  )

  return (
    <>
      <RmDrawer
        open={isOpen}
        onClose={close}
        size={width ?? 700}
        direction={direction}
        zIndex={zIndex}
      >
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

export const Drawer = forwardRef(DrawerComponent)
