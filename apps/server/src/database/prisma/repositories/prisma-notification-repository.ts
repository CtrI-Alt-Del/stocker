import { INotificationsRepository } from "@stocker/core/interfaces";
import { PrismaExpirationDateNotificationMapper, PrismaStockLevelNotificationMapper } from "../mappers";
import { prisma } from '../prisma-client'
import { StockLevelNotification, ExpirationDateNotification } from "@stocker/core/entities";
import { PrismaError } from "../prisma-error";

export class PrismaNotificationsRepository implements INotificationsRepository {
  private readonly stockLevelNotificationMapper = new PrismaStockLevelNotificationMapper()
  private readonly expirationDateNotificationMapper = new PrismaExpirationDateNotificationMapper()

  async findById(notificationId: string): Promise<StockLevelNotification | ExpirationDateNotification | null> {
    try {
      const stockNotification = await prisma.stockLevelNotification.findUnique({
        where: {
          id: notificationId,
        },
        include: {
          Product: true,
        },
      })

      if (stockNotification) {
        return this.stockLevelNotificationMapper.toDomain({
          ...stockNotification,
          company_id: stockNotification.Product.company_id,
        })
      }

      const expirationNotification = await prisma.expirationDateNotification.findUnique({
        where: {
          id: notificationId,
        },
        include: {
          Batch: true,
        },
      })

      if (expirationNotification) {
        return this.expirationDateNotificationMapper.toDomain({
          ...expirationNotification,
        })
      }
      return null
    } catch (error) {
      throw new PrismaError(error)
    }
  }

  async findManyStockLevelNotifications(): Promise<StockLevelNotification[]> {
    try {
      const notifications = await prisma.stockLevelNotification.findMany({
        include: {
          Product: true,
        },
      });
      const mappedNotifications = notifications.map(notification => this.stockLevelNotificationMapper.toDomain({
        ...notification,
        company_id: notification.Product.company_id,
      }));
      return mappedNotifications;
    } catch (error) {
      throw new PrismaError(error);
    }
  }

  async findManyExpirationDateNotifications(): Promise<ExpirationDateNotification[]> {
    try {
      const notifications = await prisma.expirationDateNotification.findMany({
        include: {
          Batch: true,
        },
      });
      const mappedNotifications = notifications.map(notification => this.expirationDateNotificationMapper.toDomain({
        ...notification
      }));
      return mappedNotifications;
    } catch (error) {
      throw new PrismaError(error);
    }
  }

  async addStockLevelNotification(stockLevelNotification: StockLevelNotification): Promise<void> {
    try {
      await prisma.stockLevelNotification.create({
      data: {
          id: stockLevelNotification.id,
          created_at: stockLevelNotification.createdAt,
          product_id: stockLevelNotification.product.id,
          company_id: stockLevelNotification.companyId,
        },
      });
    } catch (error) {
      throw new PrismaError(error);
    }
  }

  async addExpirationDateNotification(expirationDateNotification: ExpirationDateNotification): Promise<void> {
    try {
      await prisma.expirationDateNotification.create({
        data: {
          id: expirationDateNotification.id,
          created_at: expirationDateNotification.createdAt,
          batch_id: expirationDateNotification.batch.id,
          company_id: expirationDateNotification.companyId,
        },
      });
    } catch (error) {
      throw new PrismaError(error);
    }
  }

  async deleteNotification(notificationId: string): Promise<void> {
    try {
      await prisma.stockLevelNotification.delete({
        where: { id: notificationId },
      });
    } catch (error) {
      throw new PrismaError(error);
    }
  }
}