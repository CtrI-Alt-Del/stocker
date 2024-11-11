import { beforeEach, describe, expect, it } from 'vitest'
import {
  NotificationsRepositoryMock,
  ProductsRepositoryMock,
} from '../../../../__tests__/mocks/repositories'
import { SendStockLevelNotificationsUseCase } from '../send-stock-level-notification-use-case'
import { NotFoundError } from '../../../errors'
import {
  BatchesFaker,
  ProductsFaker,
  StockLevelNotificationsFaker,
} from '../../../../__tests__/fakers'
import { NotificationsSocketMock } from '../../../../__tests__/mocks/sockets'

let notificationsRepository: NotificationsRepositoryMock
let productsRepository: ProductsRepositoryMock
let notificationsSocket: NotificationsSocketMock
let useCase: SendStockLevelNotificationsUseCase

describe('Send stock level notification use case', () => {
  beforeEach(() => {
    notificationsRepository = new NotificationsRepositoryMock()
    productsRepository = new ProductsRepositoryMock()
    notificationsSocket = new NotificationsSocketMock()
    useCase = new SendStockLevelNotificationsUseCase(
      notificationsRepository,
      productsRepository,
      notificationsSocket,
    )
  })

  it('should not send if the product does not exist', async () => {
    const fakeProductId = 'non-existent-product-id'

    expect(async () => {
      await useCase.execute(fakeProductId)
    }).rejects.toThrow(NotFoundError)
  })

  it('should send if the stock level of the product is danger', async () => {
    const fakeDangerLevelProduct = ProductsFaker.fake({ batches: [] })

    productsRepository.add(fakeDangerLevelProduct)
    productsRepository.add(
      ProductsFaker.fake({
        minimumStock: 10,
        batches: [BatchesFaker.fakeDto({ itemsCount: 50 })],
        companyId: fakeDangerLevelProduct.companyId,
      }),
    )

    expect(
      await notificationsRepository.findManyStockLevelNotificationsByCompany(
        fakeDangerLevelProduct.companyId,
      ),
    ).toHaveLength(0)

    await useCase.execute(fakeDangerLevelProduct.id)

    expect(
      await notificationsRepository.findManyStockLevelNotificationsByCompany(
        fakeDangerLevelProduct.companyId,
      ),
    ).toHaveLength(1)
  })

  it('should emit stock level notification with the dange level product data and its company id', async () => {
    const fakeDangerLevelProduct = ProductsFaker.fake({ batches: [] })

    productsRepository.add(fakeDangerLevelProduct)
    productsRepository.add(
      ProductsFaker.fake({
        minimumStock: 10,
        batches: [BatchesFaker.fakeDto({ itemsCount: 50 })],
        companyId: fakeDangerLevelProduct.companyId,
      }),
    )

    expect(notificationsSocket.emittedStockLevelNotifications).toHaveLength(0)

    await useCase.execute(fakeDangerLevelProduct.id)

    expect(notificationsSocket.emittedStockLevelNotifications).toHaveLength(1)
    expect(notificationsSocket.emittedStockLevelNotifications[0]?.product).toEqual({
      id: fakeDangerLevelProduct.id,
      name: fakeDangerLevelProduct.name,
      code: fakeDangerLevelProduct.code,
    })
    expect(notificationsSocket.emittedStockLevelNotifications[0]?.companyId).toBe(
      fakeDangerLevelProduct.companyId,
    )
  })

  it('should not emit stock level notification if there is already a notification for the same product', async () => {
    const fakeDangerLevelProduct = ProductsFaker.fake({ batches: [] })

    productsRepository.add(fakeDangerLevelProduct)
    productsRepository.add(
      ProductsFaker.fake({
        minimumStock: 10,
        batches: [BatchesFaker.fakeDto({ itemsCount: 50 })],
        companyId: fakeDangerLevelProduct.companyId,
      }),
    )

    notificationsRepository.addStockLevelNotification(
      StockLevelNotificationsFaker.fake({
        product: {
          id: fakeDangerLevelProduct.id,
          name: fakeDangerLevelProduct.name,
          code: fakeDangerLevelProduct.code,
        },
      }),
    )

    expect(notificationsSocket.emittedStockLevelNotifications).toHaveLength(0)

    await useCase.execute(fakeDangerLevelProduct.id)

    expect(notificationsSocket.emittedStockLevelNotifications).toHaveLength(0)
  })
})
