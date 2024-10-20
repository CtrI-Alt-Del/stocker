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
import { Button, Spinner } from '@nextui-org/react'

import { Icon } from '@/ui/components/commons/icon'
import { useAnnualInventoryMovementChart } from './use-annual-inventory-movements-chart'
import { AnualInventoryMovementChartToolTip } from './annual-chart-tooltip'
import { ProductSelect } from '@/ui/components/commons/product-select'

export const AnualInventoryMovementsChart = () => {
  const { data, isFetching, productId, handleProductIdChange } =
    useAnnualInventoryMovementChart()

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
