import { DeleteLocationsController, RegisterLocationController } from "@/api/controllers/locations";
import type { FastifyInstance } from "fastify";
import { FastifyHttp } from "../fastify-http";

export const LocationsRoutes = async (app: FastifyInstance) => {
  const registerLocationController = new RegisterLocationController()
  const deleteLocationsController = new DeleteLocationsController()

  app.post('/', async (request, response) => {
    const http = new FastifyHttp(request, response)
    return registerLocationController.handle(http)
  })

  app.delete('/', async (request, response) => {
    const http = new FastifyHttp(request, response)
    return deleteLocationsController.handle(http)
  })
}