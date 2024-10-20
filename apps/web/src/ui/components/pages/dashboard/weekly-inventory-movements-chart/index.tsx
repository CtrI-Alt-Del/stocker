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
import { Button, Spinner } from '@nextui-org/react'

import { Icon } from '@/ui/components/commons/icon'
import { ProductSelect } from '@/ui/components/commons/product-select'
import { WeeklyInventoryMovementsChartTooltip } from './weekly-chart-tooltip'
import { useWeeklyInventoryMovementsChart } from './use-weekly-inventory-movements-chart'

export const WeeklyInventoryMovementsChart = () => {
  const { data, isFetching, productId, handleProductIdChange } =
    useWeeklyInventoryMovementsChart()

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
          <div className='flex justify-between flex-col md:flex-row p-5 items-center translate-y-3'>
            <h2 className='font-bold text-lg'>Lançamentos de estoque anual</h2>
            <div className='gap-3 flex flex-col items-end mt-3 md:mt-0'>
              <ProductSelect
                productId={productId}
                onSelectChange={handleProductIdChange}
              />
              {productId && (
                <button
                  type='button'
                  className='items-center gap-1 flex max-w-48 text-xs text-gray-700'
                  onClick={() => handleProductIdChange('')}
                >
                  Remover filtro
                  <Icon name='close' className='size-4' />
                </button>
              )}
            </div>
          </div>

          <ResponsiveContainer width='100%' className='shadow-lg max-h-80'>
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
