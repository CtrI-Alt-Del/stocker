import { StockLevelChart } from './stock-level-chart'
import { SummaryCard } from './summary-cards'

export const DashboardPage = () => {
  return (
    <>
      <div className='space-y-2'>
        <div className='flex justify-start items-start '>
          <StockLevelChart />
        </div>
        <div className='w-full flex items-center  gap-10 flex-col lg:flex-row '>
          <SummaryCard
            text='Lotes no Estoque'
            value={640}
            icon='package'
            url='/bananinha'
          />
          <SummaryCard
            text='Lançamentos de entrada'
            value={640}
            icon='arrow-big-down-dash'
            url='/bananinha'
          />
          <SummaryCard
            text='Lançamentos de saída'
            value={640}
            icon='arrow-big-up-dash'
            url='/bananinha'
          />
          <SummaryCard
            text='Funcionários'
            value={640}
            icon='square-user-round'
            url='/bananinha'
          />
        </div>
      </div>
    </>
  )
}
