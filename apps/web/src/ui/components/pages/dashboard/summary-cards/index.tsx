import { NextServerApiClient } from '@/api/next/clients'
import { ReportsService } from '@/api/services'
import { Card } from '@/ui/components/commons/card'

export const SummaryCards = async () => {
  const apiClient = NextServerApiClient({ isCacheEnabled: false })
  const reportsService = ReportsService(apiClient)
  const data = await reportsService.reportSummary()
  const batchesCount = data.body.batchescount
  const itemsCount = data.body.itemscount
  const inboundMovementsCount = data.body.inboundinventorymovementscount
  const outboundMovementsCount = data.body.outboundinventorymovementscount

  return (
    <>
      <div className='flex justify-center  items-center gap-6  flex-1 flex-col lg:flex-row   '>
        <Card
          title='Lotes'
          value={batchesCount}
          href='/records/products'
          icon='package'
        />
        <Card title='Items' value={itemsCount} href='/inventory/stocks' icon='archive' />
        <Card
          title='Lançamentos de Entrada'
          value={inboundMovementsCount}
          href='/?movement_type=inbound'
          icon='arrow-big-down-dash'
        />
        <Card
          title='Lançamenots de Saída'
          value={outboundMovementsCount}
          href='/?movement_type=outbound'
          icon='arrow-big-up-dash'
        />
      </div>
    </>
  )
}
