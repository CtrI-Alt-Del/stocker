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
import { FastifyHandler } from '../fastify-handler'
import { VerifyJwtMiddleware, VerifyUserRoleMiddleware } from '@/api/middlewares'

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
  const verifyJwtMiddleware = new FastifyHandler(new VerifyJwtMiddleware())
  const verifyManagerRoleMiddleware = new FastifyHandler(
    new VerifyUserRoleMiddleware('manager'),
  )
  const verifyEmployeeRoleMiddleware = new FastifyHandler(
    new VerifyUserRoleMiddleware('employee'),
  )
  const preHandlers = [verifyJwtMiddleware, verifyManagerRoleMiddleware].map((handler) =>
    handler.handle.bind(handler),
  )

  app.get('/stock-level', { preHandler: preHandlers }, async (request, response) => {
    const http = new FastifyHttp(request, response)
    return reportStockLevelController.handle(http)
  })

  app.get(
    '/inventory',
    {
      preHandler: verifyEmployeeRoleMiddleware.handle.bind(verifyEmployeeRoleMiddleware),
    },
    async (request, response) => {
      const http = new FastifyHttp(request, response)
      return reportInventoryController.handle(http)
    },
  )

  app.get(
    '/most-trending-products',
    { preHandler: preHandlers },
    async (request, response) => {
      const http = new FastifyHttp(request, response)
      return reportMostTrendingProductsController.handle(http)
    },
  )

  app.get(
    '/most-trending-products/csv',
    { preHandler: preHandlers },
    async (request, response) => {
      const http = new FastifyHttp(request, response)
      return exportMostTrendingProductsToCsvFileController.handle(http)
    },
  )

  app.get(
    '/inventory/csv',
    {
      preHandler: verifyEmployeeRoleMiddleware.handle.bind(verifyEmployeeRoleMiddleware),
    },
    async (request, response) => {
      const http = new FastifyHttp(request, response)
      return exportInventoryToCsvFileController.handle(http)
    },
  )

  app.get(
    '/inventory-summary',
    { preHandler: preHandlers },
    async (request, response) => {
      const http = new FastifyHttp(request, response)
      return reportInventorySummaryController.handle(http)
    },
  )

  app.get(
    '/inventory-movements/weekly',
    { preHandler: preHandlers },
    async (request, response) => {
      const http = new FastifyHttp(request, response)
      return reportWeeklyInventoryMovementsController.handle(http)
    },
  )

  app.get(
    '/inventory-movements/annual',
    { preHandler: preHandlers },
    async (request, response) => {
      const http = new FastifyHttp(request, response)
      return reportAnnualInventorymovementsController.handle(http)
    },
  )
}
