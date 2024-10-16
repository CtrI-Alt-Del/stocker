import { AnualInventoryMovementsChart } from './annual-inventory-movements-chart'
import { MostTrendingProductsTable } from './most-trending-products-table'
import { StockLevelChart } from './stock-level-chart'
import { SummaryCards } from './summary-cards'
import { WeeklyInventoryMovementsChart } from './weekly-inventory-movements-chart'

export const DashboardPage = () => {
  return (
    <div className='  space-y-4 max-h-screen'>
      <div className='grid grid-cols-1 lg:grid-cols-[0.6fr_1fr] gap-8 '>
        <StockLevelChart />
        <MostTrendingProductsTable />
      </div>
      <SummaryCards />
      <div className='grid grid-cols-1 lg:grid-cols-2 '>
        <AnualInventoryMovementsChart />
        <WeeklyInventoryMovementsChart />
        <div className='h-24'/>
      </div>
    </div>
  )
}
