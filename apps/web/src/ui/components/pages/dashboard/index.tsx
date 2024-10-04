import { MostTrendingProductsTable } from './most-trending-products-table'
import { StockLevelChart } from './stock-level-chart'

export const DashboardPage = () => {
  return (
    <>
      <h1 className='text-2xl text-zinc-800 font-semibold'>Dashboard</h1>
      <div className='grid grid-cols-[0.5fr_1fr] gap-6 mt-3'>
        <StockLevelChart />
        <MostTrendingProductsTable />
      </div>
    </>
  )
}
