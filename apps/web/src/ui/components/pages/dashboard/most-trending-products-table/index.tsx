'use client'

import { Input, Pagination } from '@nextui-org/react'

import { Datetime } from '@stocker/core/libs'

import { Loading } from '@/ui/components/commons/loading'
import { useMostTrendingProductsTable } from './use-most-trending-products-table'
import { ProductRow } from './produc-row'

export const MostTrendingProductsTable = () => {
  const {
    products,
    isFetching,
    startDate,
    endDate,
    datesDifference,
    page,
    totalPages,
    handlePageChange,
    handleEndDateChange,
    handleStartDateChange,
  } = useMostTrendingProductsTable()

  return (
    <div className='w-full shadow px-6 py-3'>
      <div className='flex items-center justify-between w-full'>
        <h2 className='text-gray-800 text-xl font-bold capitalize'>
          Produtos com maior demanda
        </h2>
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
                  position={index + 1 + 5 * (page - 1)}
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
          {totalPages > 1 && (
            <div className='mt-3'>
              <Pagination
                aria-label='paginação'
                showControls
                page={page}
                total={totalPages}
                onChange={handlePageChange}
              />
            </div>
          )}
        </>
      )}
    </div>
  )
}
