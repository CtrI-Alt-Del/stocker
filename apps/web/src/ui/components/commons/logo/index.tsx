import Image from 'next/image'

export const Logo = () => {
  return (
    <div className='flex items-center gap-2'>
      <Image
        src='/images/camel.png'
        width={40}
        height={40}
        alt='Camel'
        className='size-10'
      />
      <h1 className='font-bold text-zinc-900 text-3xl'>Stocker</h1>
    </div>
  )
}
