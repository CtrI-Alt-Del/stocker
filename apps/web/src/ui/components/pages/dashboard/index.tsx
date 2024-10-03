'use client'

import { StockLevelChart } from './stock-level-chart'

export const DashboardPage = () => {
  return (
    <>
      <div className='flex justify-start items-start '>
        <StockLevelChart />
      </div>
      <div>Dashboard</div>
    </>
  )
}
