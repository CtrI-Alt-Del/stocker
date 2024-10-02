import type { IApiClient, IDashboardService  } from "@stocker/core/interfaces";
import { StockLevelReportDto } from "@stocker/core/dtos";

export const DashboardService = (apiClient:IApiClient):IDashboardService =>{
  return {
    async getStockLevel() {
      return await apiClient.get<StockLevelReportDto>('/reports/stock-level')
    },
  }
}
