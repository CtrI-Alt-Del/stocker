import type { FastifyInstance } from 'fastify'
import { FastifyHttp } from '../fastify-http'
import {
  ReportMostTrendingProductsController,
  ReportStockLevelController,
} from '@/api/controllers/reports'

export const ReportsRoutes = async (app: FastifyInstance) => {
  const reportStockLevelController = new ReportStockLevelController()
  const reportMostTrendingProductsController = new ReportMostTrendingProductsController()

  app.get('/stock-level', async (request, response) => {
    const http = new FastifyHttp(request, response)
    return reportStockLevelController.handle(http)
  })

  app.get('/most-trending-products', async (request, response) => {
    const http = new FastifyHttp(request, response)
    return reportMostTrendingProductsController.handle(http)
  })
}
