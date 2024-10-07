import type { ProductDto, StockLevelReportDto } from '../../dtos'
import type { ApiResponse, PaginationResponse } from '../../responses'
import type { MostTrendingProductsListParams } from '../../types/most-trending-products-list-params'

export interface IReportsService {
  reportSummary(): Promise<ApiResponse<any>>
  reportStockLevel(): Promise<ApiResponse<StockLevelReportDto>>
  reportMostTrendingProducts(
    params: MostTrendingProductsListParams,
  ): Promise<ApiResponse<PaginationResponse<ProductDto>>>
}
