import type { FastifyInstance } from 'fastify'

import { FastifyHttp } from '../fastify-http'
import {
  ExportInventoryToCsvFileController,
  ExportMostTrendingProductsToCsvFileController,
  ReportMostTrendingProductsController,
  ReportInventoryController,
  ReportStockLevelController,
  ReportInventorySummaryController,
  ReportWeeklyInventoryMovementsController,
  ReportAnnualInventorymovementsController,
} from '@/api/controllers/reports'

export const ReportsRoutes = async (app: FastifyInstance) => {
  const reportStockLevelController = new ReportStockLevelController()
  const reportMostTrendingProductsController = new ReportMostTrendingProductsController()
  const reportInventoryController = new ReportInventoryController()
  const exportMostTrendingProductsToCsvFileController =
    new ExportMostTrendingProductsToCsvFileController()
  const exportInventoryToCsvFileController = new ExportInventoryToCsvFileController()

  const reportInventorySummaryController = new ReportInventorySummaryController()

  const reportWeeklyInventoryMovementsController =
    new ReportWeeklyInventoryMovementsController()
  const reportAnnualInventorymovementsController =
    new ReportAnnualInventorymovementsController()

  app.get('/stock-level', async (request, response) => {
    const http = new FastifyHttp(request, response)
    return reportStockLevelController.handle(http)
  })

  app.get('/inventory', async (request, response) => {
    const http = new FastifyHttp(request, response)
    return reportInventoryController.handle(http)
  })

  app.get('/most-trending-products', async (request, response) => {
    const http = new FastifyHttp(request, response)
    return reportMostTrendingProductsController.handle(http)
  })

  app.get('/most-trending-products/csv', async (request, response) => {
    const http = new FastifyHttp(request, response)
    return exportMostTrendingProductsToCsvFileController.handle(http)
  })

  app.get('/inventory/csv', async (request, response) => {
    const http = new FastifyHttp(request, response)
    return exportInventoryToCsvFileController.handle(http)
  })

  app.get('/inventory-summary', async (request, response) => {
    const http = new FastifyHttp(request, response)
    return reportInventorySummaryController.handle(http)
  })

  app.get('/inventory-movements/weekly', async (request, response) => {
    const http = new FastifyHttp(request, response)
    return reportWeeklyInventoryMovementsController.handle(http)
  })

  app.get('/inventory-movements/annual', async (request, response) => {
    const http = new FastifyHttp(request, response)
    return reportAnnualInventorymovementsController.handle(http)
  })
}
