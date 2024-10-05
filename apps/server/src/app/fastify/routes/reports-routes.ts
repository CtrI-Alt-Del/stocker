import type { FastifyInstance } from 'fastify'
import { FastifyHttp } from '../fastify-http'
import {
  ExportInventoryToCsvFileController,
  ExportMostTrendingProductsToCsvFileController,
  ReportMostTrendingProductsController,
  ReportStockLevelController,
} from '@/api/controllers/reports'

export const ReportsRoutes = async (app: FastifyInstance) => {
  const reportStockLevelController = new ReportStockLevelController()
  const reportMostTrendingProductsController = new ReportMostTrendingProductsController()
  const exportMostTrendingProductsToCsvFileController =
    new ExportMostTrendingProductsToCsvFileController()
  const exportInventoryToCsvFileController = new ExportInventoryToCsvFileController()

  app.get('/stock-level', async (request, response) => {
    const http = new FastifyHttp(request, response)
    return reportStockLevelController.handle(http)
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

  
}
