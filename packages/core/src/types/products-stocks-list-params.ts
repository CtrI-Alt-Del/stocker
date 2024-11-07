import type { StockLevel } from './stock-level'

export type ProducsStocksListParams = {
  page?: number
  companyId?:string
  stockLevel?: StockLevel
}
