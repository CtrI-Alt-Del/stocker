import type { StockLevel } from './stock-level'

export type ProducsStocksListParams = {
  name?: string
  companyId: string
  locationId?: string
  categoryId?: string
  stockLevel?: StockLevel
  supplierId?: string
  page: number
}
