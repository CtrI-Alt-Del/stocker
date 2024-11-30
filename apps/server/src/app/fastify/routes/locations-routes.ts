import { DeleteLocationsController, GetLocationController, RegisterLocationController } from "@/api/controllers/locations";
import type { FastifyInstance } from "fastify";
import { FastifyHttp } from "../fastify-http";
import { UpdateLocationController } from '@/api/controllers/locations/update-location-controller'
import { ListLocationsController } from '@/api/controllers/locations/list-locations-controller'

export const LocationsRoutes = async (app: FastifyInstance) => {
  const registerLocationController = new RegisterLocationController()
  const deleteLocationsController = new DeleteLocationsController()
  const updateLocationController = new UpdateLocationController()
  const listLocationsController = new ListLocationsController()
  const getLocationController = new GetLocationController()
  app.post('/', async (request, response) => {
    const http = new FastifyHttp(request, response)
    return registerLocationController.handle(http)
  })

  app.get("/:locationId",async (request,response) => {
    const http = new FastifyHttp(request,response)
    return getLocationController.handle(http)
  })
  app.delete('/:locationId', async (request, response) => {
    const http = new FastifyHttp(request, response)
    return deleteLocationsController.handle(http)
  })

  app.put('/:locationId', async (request, response) => {
    const http = new FastifyHttp(request, response)
    return updateLocationController.handle(http)
  })

  app.get('/', async (request, response) => {
    const http = new FastifyHttp(request, response)
    return listLocationsController.handle(http)
  })
}
