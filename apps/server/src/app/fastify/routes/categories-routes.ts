import {
  DeleteCategoryController,
  ListCategoryController,
  RegisterCategoryController,
  UpdateCategoryController,
  GetCategoryController,
} from '@/api/controllers/categories'
import type { FastifyInstance } from 'fastify'
import { FastifyHttp } from '../fastify-http'

export const CategoriesRoutes = async (app: FastifyInstance) => {
  const registerCategoryController = new RegisterCategoryController()
  const getCategoryController = new GetCategoryController()
  const listCategoryController = new ListCategoryController()
  const deleteCategoryController = new DeleteCategoryController()
  const updateCategoryController = new UpdateCategoryController()

  app.post('/', async (request, response) => {
    const http = new FastifyHttp(request, response)
    return registerCategoryController.handle(http)
  })

  app.get('/', async (request, response) => {
    const http = new FastifyHttp(request, response)
    return listCategoryController.handle(http)
  })

  app.get('/:categoryId', async (request, response) => {
    const http = new FastifyHttp(request, response)
    return getCategoryController.handle(http)
  })

  app.delete('/:categoryId', async (request, response) => {
    const http = new FastifyHttp(request, response)
    return deleteCategoryController.handle(http)
  })

  app.put('/:categoryId', async (request, response) => {
    const http = new FastifyHttp(request, response)
    return updateCategoryController.handle(http)
  })
}
