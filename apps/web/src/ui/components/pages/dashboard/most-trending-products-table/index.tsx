'use client'

import { Input, Link, Pagination } from '@nextui-org/react'

import { Datetime } from '@stocker/core/libs'

import { Loading } from '@/ui/components/commons/loading'
import { useMostTrendingProductsTable } from './use-most-trending-products-table'
import { ProductRow } from './produc-row'
import { Icon } from '@/ui/components/commons/icon'
import { ENV } from '@/constants'

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
        <div className='flex items-center gap-3'>
          <Link
            href={`${ENV.serverUrl}/reports/most-trending-products/csv?startDate=${startDate.format('YYYY-MM-DD')}&endDate=${endDate.format('YYYY-MM-DD')}`}
            aria-label='Exportar para arquivo csv'
            className='text-zinc-400'
          >
            <Icon name='download' size={20} />
          </Link>
          <h2 className='text-gray-800 text-xl font-bold'>Produtos com Maior Demanda</h2>
        </div>

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
          <p className='whitespace-nowrap capitalize text-xs text-zinc-700'>
            {datesDifference}
          </p>
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
