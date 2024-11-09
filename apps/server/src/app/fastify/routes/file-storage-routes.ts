import type { FastifyInstance } from 'fastify'

import { FastifyHttp } from '../fastify-http'
import { UploadImageController } from '@/api/controllers/file-storage'
import { DeleteImageController } from '@/api/controllers/products/delete-image-controller'

export const FileStorageRoutes = async (app: FastifyInstance) => {
  const uploadImageController = new UploadImageController()
  const deleteImageController = new DeleteImageController()

  app.post('/image', async (request, response) => {
    const http = new FastifyHttp(request, response)
    return uploadImageController.handle(http)
  })

  app.delete('/image', async (request, response) => {
    const http = new FastifyHttp(request, response)
    return deleteImageController.handle(http)
  })
}
