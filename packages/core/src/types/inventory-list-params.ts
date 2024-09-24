import type { StockLevel } from "./stock-level"

export type InventoryListParams = {
    page: number
    stockLevel: StockLevel | 'all'
}