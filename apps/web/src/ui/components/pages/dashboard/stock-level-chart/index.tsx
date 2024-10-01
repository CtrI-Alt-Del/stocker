import { Cell,  Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import { useStockLevelChart } from './use-stock-level'
import { ExternalLink } from 'lucide-react'
import Link from 'next/link'
export const StockLevelChart = () => {
  const { data } = useStockLevelChart()
  const COLORS = ['#17C964', '#E11D48', '#F5A524']
  return (
    <>
      <div className='max-w-sm mx-auto rounded-lg shadow p-5'>
        <div className='flex justify-between items-center'>
          <h1 className='text-2xl font-bold'>Nível do Estoque</h1>
          <Link href='/'>
            <ExternalLink className='size-5 text-zinc-400' />
          </Link>
        </div>
        <div className='flex justify-center items-center relative'>
          <ResponsiveContainer width={300} height={300}>
            <PieChart>
              <Pie
                data={data}
                dataKey='value'
                nameKey='name'
                aria-label='chart'
                innerRadius={90}
                outerRadius={120}
                className='focus:outline-none'
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <text
                x={150}
                y={140}
                textAnchor='middle'
                dominantBaseline='middle'
                fontSize='30'
                fontWeight='bold'
              >
                4900
              </text>
              <text
                x={150}
                y={170}
                textAnchor='middle'
                dominantBaseline='middle'
                fontSize='18'
                fill='gray'
              >
                Total de produtos
              </text>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className='flex justify-center space-x-2 items-center'>
          <div className='flex items-center gap-1'>
            <span className='w-3 h-3 bg-success rounded-full'></span>
            <span className='text-sm'>Ideal</span>
          </div>
          <div className='flex items-center gap-1'>
            <span className='w-3 h-3 bg-warning rounded-full'></span>
            <span className='text-sm'>Abaixo</span>
          </div>
          <div className='flex items-center gap-1'>
            <span className='w-3 h-3 bg-danger rounded-full'></span>
            <span className='text-sm'>Vazio</span>
          </div>
        </div>
      </div>
    </>
  )
}
