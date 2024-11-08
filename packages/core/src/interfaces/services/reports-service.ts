import type {
  AnnualInventoryMovementsDto,
  ProductDto,
  StockLevelReportDto,
  WeeklyInventoryMovementsDto,
} from '../../dtos'
import type { ApiResponse, PaginationResponse } from '../../responses'
import type { ExportMostTrendingProductsToCsvFileParams, ProducsStocksListParams } from '../../types'
import type { MostTrendingProductsListParams } from '../../types/most-trending-products-list-params'

export interface IReportsService {
  reportSummary(): Promise<ApiResponse<any>>
  reportStockLevel(): Promise<ApiResponse<StockLevelReportDto>>
  reportMostTrendingProducts(
    params: MostTrendingProductsListParams,
  ): Promise<ApiResponse<PaginationResponse<ProductDto>>>
  exportMostTrendingProductsToCsvFile(
  params: ExportMostTrendingProductsToCsvFileParams
  ): Promise<ApiResponse<PaginationResponse<Buffer>>>
  reportInventory(
    params: ProducsStocksListParams,
  ): Promise<ApiResponse<PaginationResponse<ProductDto>>>
  reportWeeklyInventoryMovements(
    productId?: string,
  ): Promise<ApiResponse<WeeklyInventoryMovementsDto[]>>
  reportAnualInventoryMovements(
    productID?: string,
  ): Promise<ApiResponse<AnnualInventoryMovementsDto[]>>
}
