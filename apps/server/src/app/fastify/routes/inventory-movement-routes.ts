import type { FastifyInstance } from 'fastify'
import { FastifyHttp } from '../fastify-http'

import { RegisterInboundInventoryMovementController } from '@/api/controllers/inventory-movement/register-inbound-inventory-movement-controller'
import { RegisterOutboundInventoryMovementController } from '@/api/controllers/inventory-movement/register-outbound-inventory-movement-controller'
import { ListInventoryMovementsController } from '@/api/controllers/inventory-movement'

export const InventoryMovement = async (app: FastifyInstance) => {
  const listInventoryMovementsController = new ListInventoryMovementsController()
  const registerInboundInventoryMovementController =
    new RegisterInboundInventoryMovementController()
  const registerOutboundInventoryMovementController =
    new RegisterOutboundInventoryMovementController()

  app.get('/inventory-movements', async (request, response) => {
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
}
