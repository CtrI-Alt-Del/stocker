import { describe, expect, it } from 'vitest'
import { NotificationsRepositoryMock } from '../../../../__tests__/mocks/repositories'
import { ListNotificationsUseCase } from '../list-notifications-use-case'
import {
  StockLevelNotificationsFaker,
  ExpirationDateNotificationsFaker,
} from '../../../../__tests__/fakers'

describe('List notification use case', () => {
  it('should list all stock level notifications', async () => {
    const notificationsRepository = new NotificationsRepositoryMock()
    const useCase = new ListNotificationsUseCase(notificationsRepository)

    const companyId = 'fixed-company-id'
    const fakeStockLevelNotifications = StockLevelNotificationsFaker.fakeMany(20, {
      companyId,
    })

    for (const fakeNotification of fakeStockLevelNotifications) {
      await notificationsRepository.addStockLevelNotification(fakeNotification)
    }

    const { stockLevelNotifications } = await useCase.execute(companyId)
    expect(stockLevelNotifications).toEqual(
      fakeStockLevelNotifications.map((notification) => notification.dto),
    )
  })

  it('should list all expiration date notifications', async () => {
    const notificationsRepository = new NotificationsRepositoryMock()
    const useCase = new ListNotificationsUseCase(notificationsRepository)

    const companyId = 'fixed-company-id'
    const fakeExpirationDateNotifications = ExpirationDateNotificationsFaker.fakeMany(
      20,
      { companyId },
    )

    await notificationsRepository.addManyExpirationDateNotifications(
      fakeExpirationDateNotifications,
    )

    const { expirationDateNotifications } = await useCase.execute(companyId)
    expect(expirationDateNotifications).toEqual(
      fakeExpirationDateNotifications.map((notification) => notification.dto),
    )
  })

  it('should return an empty list if no notifications exist', async () => {
    const notificationsRepository = new NotificationsRepositoryMock()
    const useCase = new ListNotificationsUseCase(notificationsRepository)

    const { stockLevelNotifications, expirationDateNotifications } =
      await useCase.execute('non-existent-company-id')
    expect(stockLevelNotifications).toEqual([])
    expect(expirationDateNotifications).toEqual([])
  })
})
