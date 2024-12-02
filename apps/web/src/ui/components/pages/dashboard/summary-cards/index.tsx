import { NextServerApiClient } from '@/api/next/clients/next-server-api-client'
import { ReportsService } from '@/api/services'
import { ROUTES } from '@/constants'
import { Card } from '@/ui/components/commons/card'
import { Price } from '@stocker/core/structs'

export const SummaryCards = async () => {
  const apiClient = await NextServerApiClient({ isCacheEnabled: false })
  const reportsService = ReportsService(apiClient)
  const data = await reportsService.reportSummary()
  const batchesCount = data.body.batchesCount
  const itemsCount = data.body.itemsCount
  const inboundMovementsCount = data.body.inboundInventoryMovementsCount
  const outboundMovementsCount = data.body.outboundInventoryMovementsCount
  const inventoryValue = Price.create(data.body.inventoryValue)

  return (
    <div className='flex justify-center  items-center gap-6  flex-1 flex-col lg:flex-row   '>
      <Card title='Lotes' value={batchesCount} href='/records/products' icon='package' />
      <Card title='Items' value={itemsCount} href='/inventory/stocks' icon='archive' />
      <Card
        title='Entradas'
        value={inboundMovementsCount}
        href={`${ROUTES.inventory.movements}?type=inbound`}
        icon='arrow-big-down-dash'
      />
      <Card
        title='Saídas'
        value={outboundMovementsCount}
        href={`${ROUTES.inventory.movements}?type=bound`}
        icon='arrow-big-up-dash'
      />
      <Card
        title='Valor em estoque'
        value={inventoryValue.brl}
        href={ROUTES.records.products}
        icon='money'
      />
    </div>
  )
}
