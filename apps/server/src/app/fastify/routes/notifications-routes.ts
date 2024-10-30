import { FastifyInstance } from "fastify"
import { FastifyHttp } from "../fastify-http"
import { DeleteNotificationController, ListNotificationsController } from "@/api/controllers/notifications"

export const NotificationsRoutes = async (app: FastifyInstance) => {
  const deleteNotificationController = new DeleteNotificationController()
  const listNotificationsController = new ListNotificationsController()
  
  app.get('/', async (request, response) => {
    const http = new FastifyHttp(request, response)
    return listNotificationsController.handle(http)
  })
  
  app.delete('/:notificationId', async (request, response) => {
    const http = new FastifyHttp(request, response)
    return deleteNotificationController.handle(http)
  })
}
