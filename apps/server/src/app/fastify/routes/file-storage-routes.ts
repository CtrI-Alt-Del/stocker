import type { FastifyInstance } from 'fastify'

import { FastifyHttp } from '../fastify-http'
import { UploadImageController } from '@/api/controllers/file-storage'
import { DeleteImageController } from '@/api/controllers/products/delete-image-controller'
import { VerifyJwtMiddleware, VerifyUserRoleMiddleware } from '@/api/middlewares'
import { FastifyHandler } from '../fastify-handler'

export const FileStorageRoutes = async (app: FastifyInstance) => {
  const uploadImageController = new UploadImageController()
  const deleteImageController = new DeleteImageController()
  const verifyJwtMiddleware = new FastifyHandler(new VerifyJwtMiddleware())
  const verifyManagerRoleMiddleware = new FastifyHandler(
    new VerifyUserRoleMiddleware('manager'),
  )
  const preHandlers = [verifyJwtMiddleware, verifyManagerRoleMiddleware].map((handler) =>
    handler.handle.bind(handler),
  )

  app.post('/image', { preHandler: preHandlers }, async (request, response) => {
    const http = new FastifyHttp(request, response)
    return uploadImageController.handle(http)
  })

  app.delete('/image', { preHandler: preHandlers }, async (request, response) => {
    const http = new FastifyHttp(request, response)
    return deleteImageController.handle(http)
  })
}
