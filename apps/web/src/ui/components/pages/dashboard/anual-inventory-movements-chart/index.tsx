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
import { useAnualInventoryMovementChar } from './use-anual-inventory-movements'
import { Spinner } from '@nextui-org/react'
import { AnualInventoryMovementChartToolTip } from './anual-chart-tooltip'

export const AnualInventoryMovementsChart = () => {
  const { AnualMovements, isFetching } = useAnualInventoryMovementChar()
  const data =
    AnualMovements.map((movement) => ({
      ...movement,
      month: movement.month.charAt(0).toUpperCase() + movement.month.slice(1, 3),
    })) || []

  return (
    <div>
      {isFetching ? (
        <div>
          <Spinner
            className='flex flex-1 h-80  shadow-lg'
            size='lg'
            label='Carregando...'
          />
        </div>
      ) : (
        <>
          <ResponsiveContainer width='100%' height={320} className='shadow-lg '>
            <LineChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid  vertical={false} />
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
                verticalAlign='top'
                align='right'
                iconType='circle'
                formatter={(value) => (
                  <span className='text-[#71717A] text-medium'>{value}</span>
                )}
              />
              <Tooltip content={<AnualInventoryMovementChartToolTip/>}/>
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
