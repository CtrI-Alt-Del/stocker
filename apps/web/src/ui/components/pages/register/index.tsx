'use client'
import { useBreakpoint } from '@/ui/hooks'
import { Logo } from '../../commons/logo'
import { SubscribeAdminForm } from './subcribe-admin-form'

export const RegisterPage = () => {
  const { sm } = useBreakpoint()
  return (
    <div className='h-full w-full lg:h-screen lg:w-screen md:bg-orange bg-fixed flex justify-center items-center'>
      <div className='bg-white sm:w-1/2 md:w-4/5 md:h-screen w-full rounded-xl grid grid-cols-1 md:grid-cols-2'>
        <div className='flex justify-center items-center mr-5 md:order-2 pt-12 sm:pt-0'>
          <Logo
            direction={sm ? 'flex-col' : 'flex-row'}
            width={sm ? 400 : 50}
            height={sm ? 400 : 50}
            text={sm ? 'lg' : 'md'}
          />
        </div>
        <div className='flex justify-center h-4/5 p-16 items-center md:order-1 '>
          <SubscribeAdminForm />
        </div>
      </div>
    </div>
  )
}
