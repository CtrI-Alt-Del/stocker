import type { TooltipProps } from 'recharts'
interface PayLoadItem {
  name: string
  value: number
}
export const StockLevelChartToolTip = ({ active, payload }: TooltipProps<any, any>) => {
  if (active && payload && payload.length) {
    const { name, value } = payload[0] as PayLoadItem
    return (
      <>
        <div className='bg-white flex flex-row p-4 justify-center items-center shadow rounded-md gap-2'>
          <p className='text-zinc-500 font-medium'>{`${name}:`}</p>
          <strong className='font-black'>{value}</strong>
        </div>
      </>
    )
  }
  return null
}
