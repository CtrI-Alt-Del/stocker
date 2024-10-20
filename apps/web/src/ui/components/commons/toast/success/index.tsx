'use client'

import { Icon } from '../../icon'
import { IconButton } from '../../icon-button'
import { AnimatedContainer } from '../animated-container'
import type { ToastProps } from '../toast-props'

export const SuccessToast = ({ message, isVisible, onClose }: ToastProps) => {
  return (
    <AnimatedContainer isVisible={isVisible}>
      <div className='bg-green-500 h-full w-2 absolute inset-y-0 left-0' />
      <div className='bg-green-100 px-6 py-3 flex items-center gap-5 rounded-md'>
        <Icon
          name='close'
          className='text-white flex items-center justify-center bg-green-500 rounded-full'
        />
        <div className='flex flex-col'>
          <p className='text-md font-semibold'>Sucesso</p>
          <strong className='font-medium text-sm text-zinc-600'>{message}</strong>
        </div>
        <IconButton name='close' className='bg-green-100' onClick={onClose} />
      </div>
    </AnimatedContainer>
  )
}
