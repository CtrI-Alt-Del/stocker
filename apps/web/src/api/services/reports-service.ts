import type { IApiClient, IReportsService } from '@stocker/core/interfaces'
import type {
  AnnualInventoryMovementsDto,
  ProductDto,
  StockLevelReportDto,
  WeeklyInventoryMovementsDto,
} from '@stocker/core/dtos'
import type { MostTrendingProductsListParams } from '@stocker/core/types'
import type { PaginationResponse } from '@stocker/core/responses'

export const ReportsService = (apiClient: IApiClient): IReportsService => {
  return {
    async reportStockLevel() {
      return await apiClient.get<StockLevelReportDto>('/reports/stock-level')
    },
    async reportSummary() {
      return await apiClient.get<any>('/reports/inventory-summary')
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

    async reportInventory() {
      return await apiClient.get<PaginationResponse<ProductDto>>('/reports/inventory')
    },

    async reportWeeklyInventoryMovements(productId?: string) {
      if (productId) apiClient.setParam('productId', productId)
      return await apiClient.get<WeeklyInventoryMovementsDto[]>(
        '/reports/inventory-movements/weekly',
      )
    },
    async reportAnualInventoryMovements(productID?: string) {
      if (productID) {
        apiClient.setParam('productId', productID)
      }
      return await apiClient.get<AnnualInventoryMovementsDto[]>(
        '/reports/inventory-movements/annual',
      )
    },
  }
}
