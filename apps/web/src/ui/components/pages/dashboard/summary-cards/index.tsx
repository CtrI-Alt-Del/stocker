import { NextApiClient } from '@/api/next/clients'
import { ReportsService } from '@/api/services'
import { Card } from '@/ui/components/commons/card'
import { useApi } from '@/ui/hooks'

export const SummaryCards = async () => {
  // const nextApiClient = NextApiClient()
  // const reportsService = ReportsService(nextApiClient)
  // const data = await reportsService.reportSummary()
  return (
    <>
      <div className='flex justify-center  items-center gap-6  flex-1 flex-col lg:flex-row   '>
        <Card
          title='Produtos no Estoque'
          value={640}
          href='/records/products'
          icon='package'
        />
        <Card
          title='Lotes no Estoque'
          value={640}
          href='/inventory/stocks'
          icon='archive'
        />
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
