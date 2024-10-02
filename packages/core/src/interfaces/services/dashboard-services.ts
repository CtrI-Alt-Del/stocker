import { StockLevelReportDto } from "../../dtos";
import type { ApiResponse } from "../../responses";

export interface IDashboardService {
  getStockLevel(): Promise<ApiResponse<StockLevelReportDto>>
}
