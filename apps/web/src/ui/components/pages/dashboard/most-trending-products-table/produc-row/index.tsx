import { Link, Image } from '@nextui-org/react'
import NextImage from 'next/image'

import type { StockLevel } from '@stocker/core/types'

import { Tag } from '@/ui/components/commons/tag'
import { Icon } from '@/ui/components/commons/icon'

type ProductRowProps = {
  id: string
  name: string
  image: string
  currentStock: number
  minimumStock: number
  movementsCount: number
  stockLevel: StockLevel
  position: number
}

export const ProductRow = ({
  id,
  name,
  image,
  movementsCount,
  currentStock,
  minimumStock,
  stockLevel,
  position,
}: ProductRowProps) => {
  return (
    <div className='flex justify-between w-full'>
      <div className='flex items-center gap-3'>
        {position === 1 && (
          <NextImage src='/images/first-place-medal.png' width={36} height={36} alt='' />
        )}
        {position === 2 && (
          <NextImage src='/images/second-place-medal.png' width={36} height={36} alt='' />
        )}
        {position === 3 && (
          <NextImage src='/images/third-place-medal.png' width={36} height={36} alt='' />
        )}
        {position > 3 && (
          <span className='size-9 text-center text-zinc-800 font-semibold'>
            {position}
          </span>
        )}
        <Image src={image} width={48} height={48} radius='sm' alt='' />
        <div>
          <div className='flex items-center gap-3'>
            <p>{name}</p>
            <Link href={`/inventory/stock/${id}`}>
              <Icon name='link' className='text-zinc-640' size={16} />
            </Link>
          </div>
          <div className='flex items-center gap-3'>
            {stockLevel === 'safe' && <Tag type='sucess'>Ideal</Tag>}
            {stockLevel === 'average' && <Tag type='sucess'>Em baixa</Tag>}
            {stockLevel === 'danger' && <Tag type='sucess'>Esgotado</Tag>}
            <span className='text-zinc-400 text-sm'>Estoque atual: {currentStock}</span>
            <span className='text-zinc-400 text-sm'>Estoque mínimo: {minimumStock}</span>
          </div>
        </div>
      </div>
      <div className='flex flex-col items-end justify-center'>
        <span className='text-sm text-zinc-700 '>Qtd: Lançamentos de saída</span>
        <strong className='text-sm text-zinc-700'>{movementsCount}</strong>
      </div>
    </div>
  )
}
