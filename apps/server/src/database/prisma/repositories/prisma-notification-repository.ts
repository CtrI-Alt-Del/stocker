import { INotificationsRepository } from "@stocker/core/interfaces";
import { PrismaExpirationDateNotificationMapper, PrismaStockLevelNotificationMapper } from "../mappers";
import { prisma } from '../prisma-client'
import { StockLevelNotification } from "@stocker/core/entities";
import { PrismaError } from "../prisma-error";

export class PrismaNotificationsRepository implements INotificationsRepository {
  private readonly stockLevelNotificationMapper = new PrismaStockLevelNotificationMapper()
private readonly expirationDateNotificationMapper = new PrismaExpirationDateNotificationMapper()

  async findById(notificationId: string): Promise<StockLevelNotification | null> {
    try {
      const notification = await prisma.stockLevelNotification.findUnique({
        where: {
          id: notificationId,
        },
        include: {
          Product: true,
        },
      })

      if (!notification) return null

      return this.stockLevelNotificationMapper.toDomain(notification)
    } catch (error) {
      throw new PrismaError(error)
    }
  }
  

}
