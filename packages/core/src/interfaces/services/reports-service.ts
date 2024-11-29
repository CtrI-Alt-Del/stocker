import type {
  AnnualInventoryMovementsDto,
  ProductDto,
  StockLevelReportDto,
  WeeklyInventoryMovementsDto,
} from '../../dtos'
import type { ApiResponse, PaginationResponse } from '../../responses'
import type {
  ExportMostTrendingProductsToCsvFileParams,
  ProducsStocksListParams,
} from '../../types'
import type { MostTrendingProductsListParams } from '../../types/most-trending-products-list-params'

export interface IReportsService {
  reportSummary(): Promise<
    ApiResponse<{
      batchesCount: number
      itemsCount: number
      inboundInventoryMovementsCount: number
      outboundInventoryMovementsCount: number
      inventoryValue: number
    }>
  >
  reportStockLevel(): Promise<ApiResponse<StockLevelReportDto>>
  reportMostTrendingProducts(
    params: MostTrendingProductsListParams,
  ): Promise<ApiResponse<PaginationResponse<ProductDto>>>
  exportMostTrendingProductsToCsvFile(
    params: ExportMostTrendingProductsToCsvFileParams,
  ): Promise<ApiResponse<Buffer>>
  reportInventory(
    params: ProducsStocksListParams,
  ): Promise<ApiResponse<PaginationResponse<ProductDto>>>
  exportInventoryToCsvFile(): Promise<ApiResponse<Buffer>>
  reportWeeklyInventoryMovements(
    productId?: string,
  ): Promise<ApiResponse<WeeklyInventoryMovementsDto[]>>
  reportAnualInventoryMovements(
    productID?: string,
  ): Promise<ApiResponse<AnnualInventoryMovementsDto[]>>
}
