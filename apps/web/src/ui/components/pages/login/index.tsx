'use client'

import { Button } from '@nextui-org/button'

export const LoginPage = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen font-sans bg-gray-100'>
      <h1 className='text-6xl text-gray-800'>Stocker</h1>
      <div className='mt-5'>
        <Button className='px-5 py-2.5 text-base bg-transparent text-black border border-gray-500 rounded cursor-pointer mr-2.5 hover:bg-gray-200 transition-colors'>
          Login
        </Button>
        <Button className='px-5 py-2.5 text-base bg-default-500 text-white rounded cursor-pointer hover:bg-default-700 transition-colors'>
          Register
        </Button>
      </div>
    </div>
  )
}
