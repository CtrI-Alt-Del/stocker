import { beforeEach, describe, expect, it } from 'vitest'
import {
  NotificationsRepositoryMock,
  ProductsRepositoryMock,
} from '../../../../__tests__/mocks/repositories'
import { SendStockLevelNotificationsUseCase } from '../send-stock-level-notification-use-case'
import { NotFoundError } from '../../../errors'
import { BatchesFaker, ProductsFaker } from '../../../../__tests__/fakers'

let notificationsRepository: NotificationsRepositoryMock
let productsRepository: ProductsRepositoryMock
let useCase: SendStockLevelNotificationsUseCase

describe('Send stock level notification use case', () => {
  beforeEach(() => {
    notificationsRepository = new NotificationsRepositoryMock()
    productsRepository = new ProductsRepositoryMock()
    useCase = new SendStockLevelNotificationsUseCase(
      notificationsRepository,
      productsRepository,
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
})