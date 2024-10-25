import { ExpirationDateNotification } from "@prisma/client"

export type PrismaExpirationDateNotification = ExpirationDateNotification & {
    Batch: {
        id: string
        code: string
    }
}

