import { FastifyInstance } from "fastify"
import { FastifyHttp } from "../fastify-http"
import { DeleteNotificationController } from "@/api/controllers/notifications"

export const NotificationsRoutes = async (app: FastifyInstance) => {
  const deleteNotificationController = new DeleteNotificationController()
  
  app.delete('/:notificationId', async (request, response) => {
    const http = new FastifyHttp(request, response)
    return deleteNotificationController.handle(http)
  })
}
