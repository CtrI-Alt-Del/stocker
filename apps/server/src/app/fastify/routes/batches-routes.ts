import type { FastifyInstance } from 'fastify'

import { FastifyHttp } from '../fastify-http'
import {
  DeleteBatchesController,
  UpdateBatchController,
} from '@/api/controllers/products'

export const BatchesRoutes = async (app: FastifyInstance) => {
  const updateBatchController = new UpdateBatchController()
  const deleteBatchesController = new DeleteBatchesController()

  app.put('/:batchId', async (request, response) => {
    const http = new FastifyHttp(request, response)
    return updateBatchController.handle(http)
  })

  app.delete('/', async (request, response) => {
    const http = new FastifyHttp(request, response)
    return deleteBatchesController.handle(http)
  })
}
