'use client'

import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { useWeeklyInventoryMovementsChart } from './use-weekly-inventory-movements-chart'
import { WeeklyInventoryMovementsChartTooltip } from './weekly-chart-tooltip'
import { Button, Spinner } from '@nextui-org/react'
import { useProductsPage } from '../../products/use-products-page'
import { Dialog } from '@/ui/components/commons/dialog'
import { ProductsTable } from '../../products/products-table'

export const WeeklyInventoryMovementsChart = () => {
  const { weeklyMovements, isFetching, handleProductIdChange, productId, productName } =
    useWeeklyInventoryMovementsChart()
  const data = weeklyMovements || []
  const { page, products, handlePageChange, totalPages, handleUpdateProduct } =
    useProductsPage()

  return (
    <div>
      {isFetching ? (
        <div>
          <Spinner
            className='flex flex-1 min-h-80  shadow-lg'
            size='lg'
            label='Carregando...'
          />
        </div>
      ) : (
        <>
          <div className='flex justify-between p-5 items-center'>
            <div>
              <h2 className='font-bold text-xl'>Lançamentos de Estoque semanal</h2>
              {productName && (
                <h2 className='text-zinc-400'>Produto selecionado: {productName}</h2>
              )}
            </div>
            <div className='gap-3 flex flex-col sm:flex-row'>
              {productId && (
                <Button
                  color='primary'
                  className='text-white'
                  onClick={() => handleProductIdChange('')}
                >
                  Remover Filtros
                </Button>
              )}
              <Dialog
                size='5xl'
                title='Selecione o produto'
                trigger={
                  <Button color='primary' className='text-white'>
                    Produtos
                  </Button>
                }
              >
                {() => (
                  <ProductsTable
                    selectionMode='single'
                    page={page}
                    products={products}
                    onPageChange={handlePageChange}
                    totalPages={totalPages}
                    onUpdateProduct={handleUpdateProduct}
                    isLoading={isFetching}
                    onProductsSelectionChange={handleProductIdChange}
                    selectedProductsIds={productId}
                  />
                )}
              </Dialog>
            </div>
          </div>

          <ResponsiveContainer width='100%'  className='shadow-lg max-h-80'>
            <BarChart
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
                dataKey='weekday'
                tickLine={false}
                axisLine={false}
                stroke='#71717A'
                tick={{ fill: '#888888' }}
                padding={{ left: 40 }}
              />
              <YAxis
                axisLine={false}
                type='number'
                width={70}
                padding={{ top: 40 }}
                strokeWidth={0}
                stroke='#71717A'
                tick={{ fill: '#888888' }}
                tickLine={false}
              />
              <Tooltip content={<WeeklyInventoryMovementsChartTooltip />} />
              <Legend
                wrapperStyle={{ paddingBottom: '20px' }}
                verticalAlign='top'
                align='right'
                iconType='circle'
                formatter={(value) => (
                  <span className='text-[#71717A] text-medium'>{value}</span>
                )}
              />
              <Bar
                dataKey='inboundInventoryMovementsCount'
                fill='#F6C679'
                fillOpacity={0.8}
                activeBar={<Rectangle />}
                name='Entradas'
              />
              <Bar
                dataKey='outboundInventoryMovementsCount'
                fill='#F5A524'
                name='Saídas'
                activeBar={<Rectangle />}
              />
            </BarChart>
          </ResponsiveContainer>
        </>
      )}
    </div>
  )
}
