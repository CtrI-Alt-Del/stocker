import { Button } from '@nextui-org/react'

export const ProductStockPage = () => {
  return (
    <div>
      <div className='flex items-center justify-between'>
        <div className='flex justify-end'>
          <h1 className='text-2xl'>Banana</h1>
          <small className='uppercase text-xl text-zinc-400'>K04-59</small>
        </div>

        <div className='space-x-2'>
          <Button color='primary'>Lançamento de entrada</Button>
          <Button color='primary'>Lançamento de saída</Button>
        </div>
      </div>
    </div>
  )
}
