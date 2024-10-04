import type { FastifyInstance } from 'fastify'
import { FastifyHttp } from '../fastify-http'
import {
  ExportMostTrendingProductsToCsvFileController,
  ReportMostTrendingProductsController,
  ReportInventoryController,
  ReportStockLevelController,
} from '@/api/controllers/reports'

export const ReportsRoutes = async (app: FastifyInstance) => {
  const reportStockLevelController = new ReportStockLevelController()
  const reportMostTrendingProductsController = new ReportMostTrendingProductsController()
  const reportInventoryController = new ReportInventoryController()
  const exportMostTrendingProductsToCsvFileController =
    new ExportMostTrendingProductsToCsvFileController()

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
}
