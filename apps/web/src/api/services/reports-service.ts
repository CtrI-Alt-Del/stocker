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
      categoryId,
      startDate,
      endDate,
      page,
    }: MostTrendingProductsListParams) {
      if (page) apiClient.setParam('page', page ? String(page) : '1')
      if (startDate) apiClient.setParam('startDate', String(startDate))
      if (endDate) apiClient.setParam('endDate', String(endDate))
      if (categoryId) apiClient.setParam('categoryId', categoryId)

      return await apiClient.get<PaginationResponse<ProductDto>>(
        '/reports/most-trending-products',
      )
    },

    async exportMostTrendingProductsToCsvFile({ startDate, endDate, categoryId }) {
      apiClient.setParam('startDate', String(startDate))
      apiClient.setParam('endDate', String(endDate))
      if (categoryId) apiClient.setParam('categoryId', categoryId)

      return await apiClient.fetchBuffer('/reports/most-trending-products/csv')
    },

    async reportInventory({
      page,
      stockLevel,
      productName,
      categoryId,
      locationId,
      supplierId,
    }) {
      apiClient.setParam('page', String(page))
      if (stockLevel) apiClient.setParam('stockLevel', stockLevel)
      if (productName) apiClient.setParam('productName', productName)
      if (categoryId) apiClient.setParam('categoryId', categoryId)
      if (locationId) apiClient.setParam('locationId', locationId)
      if (supplierId) apiClient.setParam('supplierId', supplierId)
      return await apiClient.get<PaginationResponse<ProductDto>>('/reports/inventory')
    },

    async exportInventoryToCsvFile({
      stockLevel,
      productName,
      categoryId,
      locationId,
      supplierId,
    }) {
      if (stockLevel) apiClient.setParam('stockLevel', stockLevel)
      if (productName) apiClient.setParam('productName', productName)
      if (categoryId) apiClient.setParam('categoryId', categoryId)
      if (locationId) apiClient.setParam('locationId', locationId)
      if (supplierId) apiClient.setParam('supplierId', supplierId)
      return await apiClient.fetchBuffer('/reports/inventory/csv')
    },

    async reportWeeklyInventoryMovements(productId?: string) {
      if (productId) apiClient.setParam('productId', productId)
      return await apiClient.get<WeeklyInventoryMovementsDto[]>(
        '/reports/inventory-movements/weekly',
      )
    },

    async reportAnualInventoryMovements(productId?: string) {
      if (productId) {
        apiClient.setParam('productId', productId)
      }

      return await apiClient.get<AnnualInventoryMovementsDto[]>(
        '/reports/inventory-movements/annual',
      )
    },
  }
}
