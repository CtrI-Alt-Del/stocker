import type { FastifyInstance } from "fastify";
import { FastifyHttp } from "../fastify-http";

import { RegisterInboundInventoryMovementController } from '@/api/controllers/inbound-inventory-movement/register-inbound-inventory-movement-controller'

export const InboundInventoryMovement = async (app: FastifyInstance) => {
  const registerInboundInventoryMovementController = new RegisterInboundInventoryMovementController()

  app.post('/inbound', async (request, response) => {
    const http = new FastifyHttp(request, response)
    return registerInboundInventoryMovementController.handle(http)
  })  
}
