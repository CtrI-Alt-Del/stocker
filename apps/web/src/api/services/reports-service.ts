import type { IApiClient, IReportsService } from '@stocker/core/interfaces'
import type { ProductDto, StockLevelReportDto } from '@stocker/core/dtos'
import type { MostTrendingProductsListParams } from '@stocker/core/types'
import type { PaginationResponse } from '@stocker/core/responses'

export const ReportsService = (apiClient: IApiClient): IReportsService => {
  return {
    async reportStockLevel() {
      return await apiClient.get<StockLevelReportDto>('/reports/stock-level')
    },
    async reportMostTrendingProducts({
      startDate,
      endDate,
      page,
    }: MostTrendingProductsListParams) {
      if (page) apiClient.setParam('page', page ? String(page) : '1')
      if (startDate) apiClient.setParam('startDate', String(startDate))
      if (endDate) apiClient.setParam('endDate', String(endDate))

      return await apiClient.get<PaginationResponse<ProductDto>>(
        '/reports/most-trending-products',
      )
    },
  }
}
