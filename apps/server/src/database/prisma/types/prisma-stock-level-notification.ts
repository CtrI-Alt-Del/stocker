import { StockLevelNotification } from "@prisma/client"

export type PrismaStockLevelNotification = StockLevelNotification & {
    Product: {
        id: string
        name: string
        code: string
    }
}