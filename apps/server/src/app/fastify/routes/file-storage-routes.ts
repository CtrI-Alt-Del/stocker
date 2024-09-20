import type { FastifyInstance } from 'fastify'

import { FastifyHttp } from '../fastify-http'
import { UploadImageController } from '@/api/controllers/file-storage'

export const FileStorageRoutes = async (app: FastifyInstance) => {
  const uploadImageController = new UploadImageController()

  app.post('/upload/image', async (request, response) => {
    const http = new FastifyHttp(request, response)
    return uploadImageController.handle(http)
  })
}
