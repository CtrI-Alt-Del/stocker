import type { FastifyInstance } from 'fastify'
import { FastifyHttp } from '../fastify-http'
import {
  ListInventoryMovementsController,
  RegisterInboundInventoryMovementController,
  RegisterOutboundInventoryMovementController,
} from '@/api/controllers/inventory-movements'
import { FastifyHandler } from '../fastify-handler'
import { VerifyJwtMiddleware, VerifyUserRoleMiddleware } from '@/api/middlewares'

export const InventoryMovementsRoutes = async (app: FastifyInstance) => {
  const listInventoryMovementsController = new ListInventoryMovementsController()
  const registerInboundInventoryMovementController =
    new RegisterInboundInventoryMovementController()
  const registerOutboundInventoryMovementController =
    new RegisterOutboundInventoryMovementController()
  const verifyJwtMiddleware = new FastifyHandler(new VerifyJwtMiddleware())
  const verifyEmployeeRoleMiddleware = new FastifyHandler(
    new VerifyUserRoleMiddleware('employee'),
  )
  const preHandlers = [verifyJwtMiddleware, verifyEmployeeRoleMiddleware].map((handler) =>
    handler.handle.bind(handler),
  )

  app.get('/', { preHandler: preHandlers }, async (request, response) => {
    const http = new FastifyHttp(request, response)
    return listInventoryMovementsController.handle(http)
  })

  app.post('/inbound', { preHandler: preHandlers }, async (request, response) => {
    const http = new FastifyHttp(request, response)
    return registerInboundInventoryMovementController.handle(http)
  })

  app.post('/outbound', { preHandler: preHandlers }, async (request, response) => {
    const http = new FastifyHttp(request, response)
    return registerOutboundInventoryMovementController.handle(http)
  })
}
