import type { IApiClient, IReportsService } from '@stocker/core/interfaces'
import type { ProductDto, StockLevelReportDto } from '@stocker/core/dtos'
import type { MostTrendingProductsListParams } from '@stocker/core/types'

export const ReportsService = (apiClient: IApiClient): IReportsService => {
  return {
    async reportStockLevel() {
      return await apiClient.get<StockLevelReportDto>('/reports/stock-level')
    },
    async reportMostTrendingProducts({
      page,
      startDate,
      endDate,
    }: MostTrendingProductsListParams) {
      apiClient.setParam('page', String(page))
      apiClient.setParam('startDate', String(startDate))
      apiClient.setParam('endDate', String(endDate))
      return await apiClient.get<ProductDto>('/reports/most-trending-products')
    },
  }
}