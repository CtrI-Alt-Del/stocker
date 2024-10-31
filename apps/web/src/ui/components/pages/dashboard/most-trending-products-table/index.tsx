'use client'

import { Input, Link, Pagination } from '@nextui-org/react'

import { Datetime } from '@stocker/core/libs'

import { BROWSER_ENV } from '@/constants'
import { Icon } from '@/ui/components/commons/icon'
import { Loading } from '@/ui/components/commons/loading'
import { ProductRow } from './produc-row'
import { useMostTrendingProductsTable } from './use-most-trending-products-table'
import { CategorySelect } from '@/ui/components/commons/category-select'

export const MostTrendingProductsTable = () => {
  const {
    products,
    isFetching,
    categoryId,
    startDate,
    endDate,
    datesDifference,
    page,
    totalPages,
    handleCategoryChange,
    handlePageChange,
    handleEndDateChange,
    handleStartDateChange,
  } = useMostTrendingProductsTable()

  return (
    <div className='w-full shadow px-6 py-3'>
      <div className='flex flex-col w-full'>
        <div className='flex items-center gap-2'>
          <Link
            href={`${BROWSER_ENV.serverUrl}/reports/most-trending-products/csv?startDate=${startDate.format('YYYY-MM-DD')}&endDate=${endDate.format('YYYY-MM-DD')}${categoryId ? `&categoryId=${categoryId}` : ''}`}
            aria-label='Exportar para arquivo csv'
            className='text-zinc-400'
          >
            <Icon name='download' size={20} />
          </Link>
          <h2 className='text-gray-800 text-lg font-bold'>Produtos com maior demanda</h2>
        </div>

        <div className='flex flex-col items-start md:flex-row gap-6 mt-3'>
          <div className='flex flex-col gap-1'>
            <CategorySelect
              defeaultCategoryId={categoryId}
              onSelectChange={handleCategoryChange}
              className='bg-gray-100 h-12'
            />
            {categoryId && (
              <button
                type='button'
                onClick={() => handleCategoryChange('')}
                className='flex items-center gap-1 text-sm mt-2 transition-opacity hover:opacity-75'
              >
                <Icon name='close' size={16} />
                remover filtro por categoria
              </button>
            )}
          </div>
          <div>
            <div className='flex items-start gap-3 mt-2 md:mt-0'>
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
            </div>
            <p className='mt-2 whitespace-nowrap capitalize text-xs text-zinc-700'>
              {datesDifference}
            </p>
          </div>
        </div>
      </div>

      {isFetching ? (
        <div className='grid place-content-center w-full h-full'>
          <Loading />
        </div>
      ) : (
        <>
          <div className='space-y-3 mt-6 overflow-x-auto'>
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
                className='w-full flex justify-start'
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
