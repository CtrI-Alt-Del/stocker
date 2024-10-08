import type { ProductDto, StockLevelReportDto } from '../../dtos'
import type { ApiResponse } from '../../responses'
import type { MostTrendingProductsListParams } from '../../types/most-trending-products-list-params'

export interface IReportsService {
  reportStockLevel(): Promise<ApiResponse<StockLevelReportDto>>
  reportMostTrendingProducts(
    params: MostTrendingProductsListParams,
  ): Promise<ApiResponse<ProductDto>>
}