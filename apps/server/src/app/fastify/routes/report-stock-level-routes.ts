import { FastifyInstance } from "fastify"
import { FastifyHttp } from "../fastify-http"
import { ReportStockLevelController } from "@/api/controllers/reports"

export const StockLevelRoutes = async (app: FastifyInstance) => {
  const reportStockLevelController = new ReportStockLevelController()

  app.get('/stocks', async (request, response) => {
    const http = new FastifyHttp(request, response)
    return reportStockLevelController.handle(http)
  })
}
