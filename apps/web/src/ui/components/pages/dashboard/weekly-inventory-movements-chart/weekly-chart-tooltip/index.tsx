
import { TooltipProps } from 'recharts'

interface PayLoadItem {
  weekday: string
  inboundInventoryMovementsCount: number
  outboundInventoryMovementsCount: number
}
export const WeeklyInventoryMovementsChartTooltip = ({
  active,
  payload,
}: TooltipProps<any, any>) => {
  if (active && payload && payload.length) {
    const { weekday, outboundInventoryMovementsCount, inboundInventoryMovementsCount } = payload[0]
      ?.payload as PayLoadItem
    return (
      <>
        <div className='bg-white flex flex-col p-4 justify-center items-start shadow rounded-md gap-2'>
          <p className='text-zinc-500 gap-2 flex flex-row justify-center items-center'>
            <span className='w-3 h-3 rounded-full bg-[#F6C679] bg-opacity-60 text-opacity-60 flex flex-1 text-[#F6C679]'>
              "
            </span>
            Entradas: <strong className='text-zinc-700 '>{inboundInventoryMovementsCount}</strong>
          </p>
          <p className='text-zinc-500 gap-2 flex flex-row justify-center items-center'>
            <span className='w-3 h-3 rounded-full bg-[#F5A524] flex-1 flex text-[##F5A524]'>
              '
            </span>
            Saídas: <strong className='text-zinc-700'>{outboundInventoryMovementsCount}</strong>
          </p>
        </div>
      </>
    )
  }
  return null
}
