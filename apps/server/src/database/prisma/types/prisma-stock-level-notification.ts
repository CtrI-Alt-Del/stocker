import { StockLevelNotification } from "@prisma/client"

export type PrismaStockLevelNotification = StockLevelNotification & {
    company_id: string
    Product: {
        id: string
        name: string
        code: string
    }
}