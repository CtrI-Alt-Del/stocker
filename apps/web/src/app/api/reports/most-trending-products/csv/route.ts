import { ExportMostTrendingProductsToCsvFileController } from "@/api/controllers";
import { NextServerApiClient } from "@/api/next/clients/next-server-api-client";
import { NextHttp } from "@/api/next/http";
import { ReportsService } from "@/api/services";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const http = NextHttp(request) 
  const apiClient = await NextServerApiClient()
  const service = ReportsService(apiClient)
  const controller = ExportMostTrendingProductsToCsvFileController(service)
  return controller.handle(http)
} 