'use client'

import { Button } from '@nextui-org/button'

export default function Home() {
  return (
    <div className='flex flex-col items-center justify-center h-screen font-sans bg-gray-100'>
      <h1 className='text-6xl text-gray-800'>Stocker</h1>
      <div className='mt-5'>
        <Button className='px-5 py-2.5 text-base bg-transparent text-black border border-gray-500 rounded cursor-pointer mr-2.5 hover:bg-gray-200 transition-colors'>
          Login
        </Button>
        <Button className='px-5 py-2.5 text-base bg-[#f05d31] text-white rounded cursor-pointer hover:bg-[#e04d21] transition-colors'>
          Register
        </Button>
      </div>
    </div>
  )
}
