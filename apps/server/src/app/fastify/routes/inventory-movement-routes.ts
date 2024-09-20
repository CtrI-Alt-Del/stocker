import type { FastifyInstance } from 'fastify'
import { FastifyHttp } from '../fastify-http'
import { RegisterInboundInventoryMovementController } from '@/api/controllers/inventory-movement'
import { RegisterOutboundInventoryMovementController } from '@/api/controllers/inventory-movement'

export const InventoryMovementRoutes = async (app: FastifyInstance) => {
  const registerInboundInventoryMovementController =
    new RegisterInboundInventoryMovementController()
  const registerOutboundInventoryMovementController =
    new RegisterOutboundInventoryMovementController()

  app.post('/inbound', async (request, response) => {
    const http = new FastifyHttp(request, response)
    return registerInboundInventoryMovementController.handle(http)
  })
  app.post('/outbound', async (request, response) => {
    const http = new FastifyHttp(request, response)
    return registerOutboundInventoryMovementController.handle(http)
  })
}
