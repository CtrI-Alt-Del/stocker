import type { IApiClient,  } from "@stocker/core/interfaces";
import { IDashboardService } from "../../../../../packages/core/src/interfaces/services/dashboard-services";
import { StockLevelReportDto } from "@stocker/core/dtos";

export const DashboardService = (apiClient:IApiClient):IDashboardService =>{
  return {
    async getStockLevel() {
      return await apiClient.get<StockLevelReportDto>('/reports/stock-level')
    },
  }
}
