import type { FastifyInstance } from 'fastify'
import { FastifyHttp } from '../fastify-http'
import { ReportStockLevelController } from '@/api/controllers/reports'
import { MostTrendingProductsController } from '@/api/controllers/products'

export const ReportsRoutes = async (app: FastifyInstance) => {
  const reportStockLevelController = new ReportStockLevelController()
  const mostTrendingProductsController = new MostTrendingProductsController()

  app.get('/stock-level', async (request, response) => {
    const http = new FastifyHttp(request, response)
    return reportStockLevelController.handle(http)
  })

  app.get('/most-trending-products', async (request, response) => {
    const http = new FastifyHttp(request, response)
    return mostTrendingProductsController.handle(http)
  })
}
