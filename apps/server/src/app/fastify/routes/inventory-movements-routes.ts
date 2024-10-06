import type { FastifyInstance } from 'fastify'
import { FastifyHttp } from '../fastify-http'
import {
  ListInventoryMovementsController,
  RegisterInboundInventoryMovementController,
  RegisterOutboundInventoryMovementController,
  ReportAnnualOutboundInventorymovementsController
} from '@/api/controllers/inventory-movements'

export const InventoryMovementsRoutes = async (app: FastifyInstance) => {
  const listInventoryMovementsController = new ListInventoryMovementsController()
  const registerInboundInventoryMovementController =
    new RegisterInboundInventoryMovementController()
  const registerOutboundInventoryMovementController =
    new RegisterOutboundInventoryMovementController()
  const reportAnnualOutboundInventorymovementsController =
    new ReportAnnualOutboundInventorymovementsController()

  app.get('/', async (request, response) => {
    const http = new FastifyHttp(request, response)
    return listInventoryMovementsController.handle(http)
  })

  app.post('/inbound', async (request, response) => {
    const http = new FastifyHttp(request, response)
    return registerInboundInventoryMovementController.handle(http)
  })

  app.post('/outbound', async (request, response) => {
    const http = new FastifyHttp(request, response)
    return registerOutboundInventoryMovementController.handle(http)
  })

  app.get('/reports/annual-outbound-inventory-movements', async (request, response) => {
    const http = new FastifyHttp(request, response)
    return reportAnnualOutboundInventorymovementsController.handle(http)
  })
}