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
    <div className='flex flex-wrap justify-between items-start w-full py-2 border-b-2 border-gray-200'>
      <div className='flex items-start gap-3 w-full sm:w-auto'>
        {position === 1 && (
          <NextImage
            src='/images/first-place-medal.png'
            width={36}
            height={36}
            className='flex-shrink-0'
            alt='First Place'
          />
        )}
        {position === 2 && (
          <NextImage
            src='/images/second-place-medal.png'
            width={36}
            height={36}
            className='flex-shrink-0'
            alt='Second Place'
          />
        )}
        {position === 3 && (
          <NextImage
            src='/images/third-place-medal.png'
            width={36}
            height={36}
            className='flex-shrink-0'
            alt='Third Place'
          />
        )}
        {position > 3 && (
          <span className='w-9 h-9 flex items-center justify-center text-center text-zinc-800 font-semibold'>
            {position}
          </span>
        )}

        <Image
          src={image}
          width={48}
          height={48}
          radius='sm'
          alt={name}
          className='object-cover flex-shrink-0 min-w-12'
        />

        <div className='flex flex-col'>
          <div className='flex items-center gap-2'>
            <p className='font-semibold text-sm text-zinc-900 truncate'>{name}</p>
            <Link href={`/inventory/stocks/${id}`} aria-label={`View ${name}`}>
              <Icon name='link' className='text-zinc-600' size={16} />
            </Link>
          </div>
          <div className='flex items-center gap-3 text-sm text-zinc-400'>
            {stockLevel === 'safe' && <Tag type='sucess'>Estoque ideal</Tag>}
            {stockLevel === 'average' && <Tag type='warning'>Estoque em baixa</Tag>}
            {stockLevel === 'danger' && <Tag type='danger'>Estoque esgotado</Tag>}
            <span className='flex '>Estoque atual: {currentStock}</span>
            <span>Estoque mínimo: {minimumStock}</span>
          </div>
        </div>
      </div>

      <div className='flex flex-row sm:flex-col gap-2 sm:gap-0 items-end mt-2 sm:mt-0'>
        <span className='text-sm text-zinc-700'>Qtd: Lançamentos de saída</span>
        <strong className='text-sm text-zinc-700'>{movementsCount}</strong>
      </div>
    </div>
  )
}
