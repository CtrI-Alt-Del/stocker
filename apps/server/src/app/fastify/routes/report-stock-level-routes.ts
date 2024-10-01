import { FastifyInstance } from "fastify"
import { FastifyHttp } from "../fastify-http"
import { ReportStockLevelController } from "@/api/controllers/reports"

export const ReportsRoutes = async (app: FastifyInstance) => {
  const reportStockLevelController = new ReportStockLevelController()

  app.get('/stock-level', async (request, response) => {
    const http = new FastifyHttp(request, response)
    return reportStockLevelController.handle(http)
  })
}
