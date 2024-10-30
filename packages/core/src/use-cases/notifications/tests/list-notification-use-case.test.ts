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

    const fakeStockLevelNotifications = StockLevelNotificationsFaker.fakeMany(20)

    for (const fakeNotification of fakeStockLevelNotifications) {
      await notificationsRepository.addStockLevelNotification(fakeNotification)
    }

    const { stockNotifications } = await useCase.execute({
      companyId: fakeStockLevelNotifications[0]?.companyId ?? '',
    })
    expect(stockNotifications).toEqual(
      fakeStockLevelNotifications.map((notification) => notification.dto),
    )
  })

  it('should list all expiration date notifications', async () => {
    const notificationsRepository = new NotificationsRepositoryMock()
    const useCase = new ListNotificationsUseCase(notificationsRepository)

    const fakeExpirationDateNotifications = ExpirationDateNotificationsFaker.fakeMany(20)

    for (const fakeNotification of fakeExpirationDateNotifications) {
      await notificationsRepository.addExpirationDateNotification(fakeNotification)
    }

    const { expirationDateNotifications } = await useCase.execute({
      companyId: fakeExpirationDateNotifications[0]?.companyId ?? '',
    })
    expect(expirationDateNotifications).toEqual(
      fakeExpirationDateNotifications.map((notification) => notification.dto),
    )
  })

  it('should return an empty list if no notifications exist', async () => {
    const notificationsRepository = new NotificationsRepositoryMock()
    const useCase = new ListNotificationsUseCase(notificationsRepository)

    const { stockNotifications, expirationDateNotifications } = await useCase.execute({
      companyId: 'non-existent-company-id',
    })
    expect(stockNotifications).toEqual([])
    expect(expirationDateNotifications).toEqual([])
  })
})
