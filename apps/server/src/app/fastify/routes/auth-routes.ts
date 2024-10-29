import { DeleteCompanyController } from "@/api/controllers/companies";
import type { FastifyInstance } from "fastify";
import { FastifyHttp } from "../fastify-http";
import { SubscribeController } from "@/api/controllers/auth";

export const AuthRoutes = async (app: FastifyInstance) => {
    const subscribeController = new SubscribeController()

    app.post('/subscribe', async (request, response) => {
        const http = new FastifyHttp(request, response)
        return subscribeController.handle(http)
    })
}