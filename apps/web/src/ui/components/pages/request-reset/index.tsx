'use client'
import { useBreakpoint } from '@/ui/hooks'
import { Logo } from '../../commons/logo'
import { RequestPasswordResetForm } from './request-password-reset-form'

export const RequestPasswordResetPage = () => {
  const { sm } = useBreakpoint()
  return (
    <div className='h-screen w-screen   bg-white md:bg-orange  flex justify-center items-center'>
      <div className='bg-white sm:w-1/2 md:w-3/5 md:h-3/5 w-screen rounded-xl grid  md:grid-cols-2'>
        <div className='flex justify-center  items-center  md:order-2 pt-12 sm:pt-0'>
          <Logo
            direction={sm ? 'flex-col' : 'flex-row'}
            width={sm ? 400 : 50}
            height={sm ? 400 : 50}
            text={sm ? 'lg' : 'md'}
          />
        </div>
        <div className='flex   p-16  items-end md:mt-16 mt-0  md:order-1 '>
          <RequestPasswordResetForm />
        </div>
      </div>
    </div>
  )
}
