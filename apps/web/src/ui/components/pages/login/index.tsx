'use client'
import { useBreakpoint } from '@/ui/hooks'
import { Logo } from '../../commons/logo'
import { LoginAdminForm } from './login-admin-form'

export const LoginPage = () => {
  const { sm } = useBreakpoint()
  return (
    <div className='h-screen w-screen bg-orange flex justify-center items-center'>
      <div className='bg-white    sm:w-1/2 w-full  rounded-xl grid grid-cols-1 md:grid-cols-2'>
        <div className='flex justify-center items-center mr-5 md:order-2 pt-12 sm:pt-0'>
          <Logo
            direction={sm ? 'flex-col' : 'flex-row'}
            width={sm ? 400 : 50}
            height={sm ? 400 : 50}
            text={sm ? 'lg' : 'md'}
          />
        </div>
        <div className='flex justify-center items-center p-5  md:order-1 '>
          <LoginAdminForm />
        </div>
      </div>
    </div>
  )
}
