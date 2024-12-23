'use client'

import {
  type ForwardedRef,
  forwardRef,
  useImperativeHandle,
  type ReactNode,
  useEffect,
  useState,
} from 'react'
import { Slot } from '@radix-ui/react-slot'
import 'react-modern-drawer/dist/index.css'
import dynamic from 'next/dynamic'

import { IconButton } from '../icon-button'
import { useDrawer } from './use-drawer'
import type { DrawerRef } from './types'
import { useBreakpoint } from '@/ui/hooks'

const RmDrawer = dynamic(() => import('react-modern-drawer'), { ssr: false })

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
    trigger,
    direction = 'right',
    zIndex = 1,
    width,
    children,
    onOpen,
    onClose,
  }: DrawerProps,
  ref: ForwardedRef<DrawerRef>,
) => {
  const { isOpen, open, close } = useDrawer(onOpen, onClose)
  const { md } = useBreakpoint()
  const [drawerKey, setDrawerKey] = useState(0)

  useEffect(() => {
    if (isOpen) {
      setDrawerKey((prevKey) => prevKey + 1)
    }
  }, [isOpen, md, width])

  useImperativeHandle(
    ref,
    () => ({
      close,
      open,
    }),
    [close, open],
  )

  return (
    <div suppressHydrationWarning={true}>
      <RmDrawer
        key={drawerKey}
        open={isOpen}
        onClose={close}
        size={md ? width ?? 700 : 350}
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
    </div>
  )
}

export const Drawer = forwardRef(DrawerComponent)
