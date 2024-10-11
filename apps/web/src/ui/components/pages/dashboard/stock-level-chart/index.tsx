'use client'

import { useState } from 'react'
import { Cell, Pie, PieChart, Tooltip } from 'recharts'
import Link from 'next/link'

import { Loading } from '@/ui/components/commons/loading'
import { Icon } from '@/ui/components/commons/icon'
import { StockLevelChartToolTip } from './tooltip'
import { useStockLevelChart } from './use-stock-level'
import { Spinner } from '@nextui-org/react'

const COLORS: Record<string, string> = {
  'Acima do minimo': '#17C964',
  'Abaixo do minimo': '#F5A524',
  Esgotado: '#E11D48',
}

export const StockLevelChart = () => {
  const { isFetching, data, totalProducts } = useStockLevelChart()
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const handlePieMouseEnter = (_: any, index: number) => {
    setActiveIndex(index)
  }

  const handlePieMouseLeave = () => {
    setActiveIndex(null)
  }

  const chartData = data || []

  return (
    <div className='max-w-lg rounded-lg shadow p-5 w-full h-full'>
      <div className='flex justify-between items-center'>
        <h2 className='text-xl font-bold'>Nível do Estoque</h2>
        <Link href='/inventory/stocks'>
          <Icon name='link' className='size-5 text-zinc-400' />
        </Link>
      </div>
      <div className='flex flex-col w-full '>
        <div className='flex justify-center items-center relative flex-1'>
          <div
            className='w-full flex justify-center items-center'
            style={{ height: 300 }}
          >
            {isFetching ? (
              <div className='flex justify-center items-center w-full h-full'>
                <Spinner size='lg' label='Carregando...' />
              </div>
            ) : (
              <PieChart width={360} height={300}>
                <Pie
                  data={chartData}
                  dataKey='value'
                  nameKey='name'
                  aria-label='chart'
                  innerRadius={90}
                  outerRadius={120}
                  className='focus:outline-none'
                  onMouseEnter={handlePieMouseEnter}
                  onMouseLeave={handlePieMouseLeave}
                >
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index + 1}`}
                      fill={COLORS[entry.name] || '#808080'}
                      opacity={activeIndex === index ? 0.6 : 1}
                    />
                  ))}
                </Pie>
                <text
                  x={360 / 2}
                  y={300 / 2 - 10}
                  textAnchor='middle'
                  dominantBaseline='middle'
                  fontSize='30'
                  fontWeight='bold'
                >
                  {totalProducts}
                </text>
                <text
                  x={360 / 2}
                  y={300 / 2 + 20}
                  textAnchor='middle'
                  dominantBaseline='middle'
                  fontSize='18'
                  fill='gray'
                >
                  Total de produtos
                </text>
                <Tooltip content={<StockLevelChartToolTip />} />
              </PieChart>
            )}
          </div>
        </div>
        <div className='flex flex-col w-full space-y-2 md:ml-4'>
          {Object.keys(COLORS).map((key) => (
            <div key={key} className='flex items-center gap-1'>
              <span
                className='w-3 h-3 rounded-full'
                style={{ backgroundColor: COLORS[key] }}
              />
              <span className='text-sm'>{key}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
