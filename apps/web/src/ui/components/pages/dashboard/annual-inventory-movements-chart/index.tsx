'use client'

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { useAnualInventoryMovementChar } from './use-annual-inventory-movements'
import { Button, Spinner } from '@nextui-org/react'
import { AnualInventoryMovementChartToolTip } from './annual-chart-tooltip'
import { useState } from 'react'
import { Gem } from 'lucide-react'
import { InventoryMovementsTable } from '../../product-stock/inventory-movements-table'
import { ProductsTable } from '../../products/products-table'
import { useProductsPage } from '../../products/use-products-page'
import { Icon } from '@/ui/components/commons/icon'
import { Dialog } from '@/ui/components/commons/dialog'
import { SelectComponent } from '@/ui/components/commons/select-component'

export const AnualInventoryMovementsChart = () => {
  const { AnualMovements, isFetching, handleProductIDChange, productId, productName } =
    useAnualInventoryMovementChar()
  const { page, products, handlePageChange, totalPages, handleUpdateProduct } =
    useProductsPage()
  const data = AnualMovements || []
  return (
    <div>
      {isFetching ? (
        <div className='min-h-80'>
          <Spinner
            className='flex flex-1 min-h-80  shadow-lg'
            size='lg'
            label='Carregando...'
          />
        </div>
      ) : (
        <>
          <div className='flex justify-between flex-col md:flex-row p-5 items-center'>
            <h2 className='font-bold text-xl   '>Lançamentos de Estoque anual</h2>
            <div className='gap-3 flex flex-col sm:flex-row'>
              {productId && (
                <Button
                  color='default'
                  size='md'
                  variant='flat'
                  className='justify-between items-center flex max-w-48   text-default-600 '
                  onClick={() => handleProductIDChange('')}
                >
                  Remover Filtros
                  <Icon name='close' className='size-4' />
                </Button>
              )}
              <Dialog
                size='5xl'
                title='Selecione o produto'
                trigger={
                  <SelectComponent onClick={() => { }}>
                    {productName ? productName : 'Selecione o produto'}
                  </SelectComponent>
                }
              >
                {() => (
                  <ProductsTable
                    selectionMode='single'
                    page={page}
                    products={products}
                    onPageChange={handlePageChange}
                    onUpdateProduct={handleUpdateProduct}
                    totalPages={totalPages}
                    isLoading={isFetching}
                    onProductsSelectionChange={handleProductIDChange}
                    selectedProductsIds={productId}
                  />
                )}
              </Dialog>
            </div>
          </div>

          <ResponsiveContainer width='100%' className='shadow-lg max-h-80 '>
            <LineChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                tickLine={false}
                axisLine={false}
                dataKey='month'
                stroke='#71717A'
                tick={{ fill: '#888888' }}
                padding={{ left: 40, right: 40 }}
              />
              <YAxis
                type='number'
                width={70}
                padding={{ top: 40, bottom: 40 }}
                strokeWidth={0}
                stroke='#71717A'
                tick={{ fill: '#888888' }}
                tickLine={false}
                axisLine={false}
              />
              <Legend
                wrapperStyle={{ paddingBottom: '20px' }}
                verticalAlign='top'
                align='right'
                iconType='circle'
                formatter={(value) => (
                  <span className='text-[#71717A] text-medium'>{value}</span>
                )}
              />
              <Tooltip content={<AnualInventoryMovementChartToolTip />} />
              <Line
                type='monotone'
                dataKey='inboundMovementsCount'
                stroke='#F6C679'
                strokeOpacity={0.6}
                strokeWidth={3}
                activeDot={{ r: 8, opacity: 0.6 }}
                dot={{ r: 4, opacity: 0.6 }}
                name='Entrada'
                fill='#F6C679'
              />
              <Line
                dataKey='outboundMovementsCount'
                name='Saída'
                type='monotone'
                stroke='#F5A524'
                fill='#F5A524'
                strokeWidth={3}
                dot={{ r: 4 }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </>
      )}
    </div>
  )
}
