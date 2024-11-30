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
import { VerifyJwtMiddleware, VerifyRolePermissionMiddleware } from '@/api/middlewares'
import { FastifyWs } from '../fastify-ws'
import { AiReportRoom } from '@/realtime/rooms'

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
  const verifyReportsPermissionMiddleware = new FastifyHandler(
    new VerifyRolePermissionMiddleware('reports'),
  )
  const verifyCsvExportPermissionMiddleware = new FastifyHandler(
    new VerifyRolePermissionMiddleware('csv-export'),
  )
  const preHandlers = [verifyJwtMiddleware, verifyReportsPermissionMiddleware].map(
    (handler) => handler.handle.bind(handler),
  )
  const ws = new FastifyWs(app)

  app.get('/stock-level', { preHandler: preHandlers }, async (request, response) => {
    const http = new FastifyHttp(request, response)
    return reportStockLevelController.handle(http)
  })

  app.get(
    '/inventory',
    {
      preHandler: verifyJwtMiddleware.handle,
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
      preHandler: verifyCsvExportPermissionMiddleware.handle.bind(
        verifyCsvExportPermissionMiddleware,
      ),
    },
    async (request, response) => {
      const http = new FastifyHttp(request, response)
      return exportInventoryToCsvFileController.handle(http)
    },
  )

  app.get(
    '/inventory/ai/:userId',
    {
      websocket: true,
    },
    async (socket, request) => {
      const { userId } = request.params as { userId: string }
      const room = new AiReportRoom(userId)
      room.handle(ws)

      ws.join(userId, socket)
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
