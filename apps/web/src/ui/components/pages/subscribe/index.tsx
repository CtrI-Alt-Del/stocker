'use client'
import { useBreakpoint } from '@/ui/hooks'
import { Logo } from '../../commons/logo'
import { SubscribeForm } from './subscribe-form'

export const SubscribePage = () => {
  const { sm, md } = useBreakpoint()

  return (
    <div className='grid place-content-center w-full bg-white md:bg-orange md:h-screen'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-16 px-12 py-4 md:bg-white rounded-xl'>
        <div className='md:hidden'>
          <Logo direction='flex-col' width={64} height={64} text='md' />
        </div>
        <div className='w-full'>
          <SubscribeForm />
        </div>
        <div className='hidden md:grid place-content-center pt-12'>
          <Logo direction='flex-col' width={380} height={380} text='lg' />
        </div>
      </div>
    </div>
  )
}
