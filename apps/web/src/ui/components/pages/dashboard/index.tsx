import { StockLevelChart } from './stock-level-chart'

export const DashboardPage = () => {
  return (
    <>
      <h1>Dashboard</h1>
      <div className='flex justify-start items-start '>
        <StockLevelChart />
      </div>
    </>
  )
}
