'use client'

import { Logo } from '../../commons/logo'
import { LoginForm } from './login-form'

export const LoginPage = () => {
  return (
    <div className='grid place-content-center w-full bg-white shadow-md md:bg-orange md:h-screen'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-16 p-12 md:bg-white rounded-xl'>
        <div className='md:hidden'>
          <Logo direction='flex-col' width={64} height={64} text='md' />
        </div>
        <div className='w-full'>
          <LoginForm />
        </div>
        <div className='hidden md:grid place-content-center pt-12'>
          <Logo direction='flex-col' width={240} height={240} text='lg' />
        </div>
      </div>
    </div>
  )
}
