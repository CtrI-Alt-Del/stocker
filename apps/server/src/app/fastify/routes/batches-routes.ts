import type { FastifyInstance } from 'fastify'

import { FastifyHttp } from '../fastify-http'
import {
  DeleteBatchesController,
  UpdateBatchController,
} from '@/api/controllers/products'
import { FastifyHandler } from '../fastify-handler'
import { VerifyJwtMiddleware, VerifyUserRoleMiddleware } from '@/api/middlewares'

export const BatchesRoutes = async (app: FastifyInstance) => {
  const updateBatchController = new UpdateBatchController()
  const deleteBatchesController = new DeleteBatchesController()
  const verifyJwtMiddleware = new FastifyHandler(new VerifyJwtMiddleware())
  const verifyManagerRoleMiddleware = new FastifyHandler(
    new VerifyUserRoleMiddleware('manager'),
  )
  const preHandlers = [verifyJwtMiddleware, verifyManagerRoleMiddleware].map((handler) =>
    handler.handle.bind(handler),
  )

  app.put('/:batchId', { preHandler: preHandlers }, async (request, response) => {
    const http = new FastifyHttp(request, response)
    return updateBatchController.handle(http)
  })

  app.delete('/', { preHandler: preHandlers }, async (request, response) => {
    const http = new FastifyHttp(request, response)
    return deleteBatchesController.handle(http)
  })
}
