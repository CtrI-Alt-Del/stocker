'use client'

import { Input, Spinner } from '@nextui-org/react'

import { useMostTrendingProductsTable } from './use-most-trending-products-table'
import { ProductRow } from './produc-row'
import { Datetime } from '@stocker/core/libs'
import { Loading } from '@/ui/components/commons/loading'

export const MostTrendingProductsTable = () => {
  const {
    products,
    isFetching,
    startDate,
    endDate,
    datesDifference,
    handleEndDateChange,
    handleStartDateChange,
  } = useMostTrendingProductsTable()

  return (
    <div className='w-full shadow p-6'>
      <div className='flex items-center justify-between'>
        <h2 className='text-gray-800 text-xl font-bold'>Produtos com maior demanda</h2>
        <div className='flex items-center gap-3'>
          <Input
            type='date'
            size='sm'
            value={startDate.format('YYYY-MM-DD')}
            label='data inicial'
            onChange={({ target }) =>
              handleStartDateChange(new Datetime(new Date(target.value)).addDays(1))
            }
          />
          <Input
            type='date'
            size='sm'
            value={endDate.format('YYYY-MM-DD')}
            label='data final'
            onChange={({ target }) =>
              handleEndDateChange(new Datetime(new Date(target.value)).addDays(1))
            }
          />
          <p className='whitespace-nowrap capitalize text-zinc-700'>{datesDifference}</p>
        </div>
      </div>

      {isFetching ? (
        <div className='grid place-content-center w-full h-full'>
          <Loading />
        </div>
      ) : (
        <>
          <div className='space-y-3 mt-6'>
            {products.length > 0 ? (
              products.map((product, index) => (
                <ProductRow
                  key={product.id}
                  id={product.id}
                  position={index + 1}
                  image={product.image}
                  name={product.name}
                  currentStock={product.currentStock}
                  movementsCount={product.outboundInventoryMovementsCount}
                  minimumStock={product.minimumStock}
                  stockLevel={product.stockLevel}
                />
              ))
            ) : (
              <p className='text-lg font-semibold'>Nenhum produto encontrado</p>
            )}
          </div>
        </>
      )}
    </div>
  )
}
