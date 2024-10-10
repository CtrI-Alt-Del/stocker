import type {
  ProductDto,
  StockLevelReportDto,
  WeeklyInventoryMovementsDto,
} from '../../dtos'
import { AnnualInventoryMovementsDto } from '../../dtos/annual-inventory-movements-dto'
import type { ApiResponse, PaginationResponse } from '../../responses'
import type { ProducsStocksListParams } from '../../types'
import type { MostTrendingProductsListParams } from '../../types/most-trending-products-list-params'

export interface IReportsService {
  reportAnualInventoryMovements(productID?:string): Promise<ApiResponse<AnnualInventoryMovementsDto>>
  reportSummary(): Promise<ApiResponse<any>>
  reportStockLevel(): Promise<ApiResponse<StockLevelReportDto>>
  reportMostTrendingProducts(
    params: MostTrendingProductsListParams,
  ): Promise<ApiResponse<PaginationResponse<ProductDto>>>
  reportInventory(
    params: ProducsStocksListParams,
  ): Promise<ApiResponse<PaginationResponse<ProductDto>>>
  reportWeeklyInventoryMovements(
    productId?: string,
  ): Promise<ApiResponse<WeeklyInventoryMovementsDto>>
}
