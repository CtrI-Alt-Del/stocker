import { NextServerApiClient } from '@/api/next/clients'
import { ReportsService } from '@/api/services'
import { Card } from '@/ui/components/commons/card'

export const SummaryCards = async () => {
  const apiClient = NextServerApiClient()
  const reportsService = ReportsService(apiClient)
  const data = await reportsService.reportSummary()
  return (
    <>
      <div className='flex justify-center  items-center gap-6  flex-1 flex-col lg:flex-row   '>
        <Card title='Lotes' value={640} href='/records/products' icon='package' />
        <Card title='Items' value={640} href='/inventory/stocks' icon='archive' />
        <Card
          title='Lançamentos de Entrada'
          value={640}
          href='/?movement_type=inbound'
          icon='arrow-big-down-dash'
        />
        <Card
          title='Lançamenots de Saída'
          value={640}
          href='/?movement_type=outbound'
          icon='arrow-big-up-dash'
        />
      </div>
    </>
  )
}
