import { DeleteLocationsController, RegisterLocationController } from "@/api/controllers/locations";
import type { FastifyInstance } from "fastify";
import { FastifyHttp } from "../fastify-http";
import { UpdateLocationController } from "@/api/controllers/locations/update-location-controller";

export const LocationsRoutes = async (app: FastifyInstance) => {
  const registerLocationController = new RegisterLocationController()
  const deleteLocationsController = new DeleteLocationsController()
  const updateLocationController = new UpdateLocationController()

  app.post('/', async (request, response) => {
    const http = new FastifyHttp(request, response)
    return registerLocationController.handle(http)
  })

  app.delete('/', async (request, response) => {
    const http = new FastifyHttp(request, response)
    return deleteLocationsController.handle(http)
  })

  app.put('/:locationId', async (request, Response) => {
    const http = new FastifyHttp(request, Response)
    return updateLocationController.handle(http)
  })
}