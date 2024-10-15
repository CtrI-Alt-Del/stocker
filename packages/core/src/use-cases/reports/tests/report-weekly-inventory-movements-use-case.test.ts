import { beforeEach, describe, expect, it } from 'vitest'
import { InventoryMovementsFaker, ProductsFaker } from '../../../../__tests__/fakers'
import { Datetime } from '../../../libs'
import { ReportWeeklyInventoryMovementsUseCase } from '../report-weekly-inventory-movements-use-case'
import { InventoryMovementsRepositoryMock } from '../../../../__tests__/mocks/repositories'

let useCase: ReportWeeklyInventoryMovementsUseCase
let inventoryMovementsRepositoryMock: InventoryMovementsRepositoryMock

describe('Report weekly inventory movements use case', () => {
  beforeEach(() => {
    inventoryMovementsRepositoryMock = new InventoryMovementsRepositoryMock()
    useCase = new ReportWeeklyInventoryMovementsUseCase(inventoryMovementsRepositoryMock)
  })

  it('should return the count of inbound and outbound inventory movements of each weekday of last days', async () => {
    const endDate = new Datetime(new Date(2024, 10, 15))

    await inventoryMovementsRepositoryMock.addMany([
      InventoryMovementsFaker.fake({
        movementType: 'inbound',
        registeredAt: endDate.getDate(),
      }),
      InventoryMovementsFaker.fake({
        movementType: 'inbound',
        registeredAt: endDate.getDate(),
      }),
      InventoryMovementsFaker.fake({
        movementType: 'outbound',
        registeredAt: endDate.getDate(),
      }),
      InventoryMovementsFaker.fake({
        movementType: 'outbound',
        registeredAt: endDate.getDate(),
      }),
      InventoryMovementsFaker.fake({
        movementType: 'inbound',
        registeredAt: endDate.subtractDays(1),
      }),
      InventoryMovementsFaker.fake({
        movementType: 'outbound',
        registeredAt: endDate.subtractDays(1),
      }),
      InventoryMovementsFaker.fake({
        movementType: 'outbound',
        registeredAt: endDate.subtractDays(2),
      }),
      InventoryMovementsFaker.fake({
        movementType: 'inbound',
        registeredAt: endDate.subtractDays(3),
      }),
    ])

    const weeklyInventoryMovements = await useCase.execute({
      endDate: endDate.getDate(),
    })

    expect(weeklyInventoryMovements).toEqual([
      {
        weekday: 'sáb',
        inboundInventoryMovementsCount: 0,
        outboundInventoryMovementsCount: 0,
      },
      {
        weekday: 'dom',
        inboundInventoryMovementsCount: 0,
        outboundInventoryMovementsCount: 0,
      },
      {
        weekday: 'seg',
        inboundInventoryMovementsCount: 0,
        outboundInventoryMovementsCount: 0,
      },
      {
        weekday: 'ter',
        inboundInventoryMovementsCount: 1,
        outboundInventoryMovementsCount: 0,
      },
      {
        weekday: 'qua',
        inboundInventoryMovementsCount: 0,
        outboundInventoryMovementsCount: 1,
      },
      {
        weekday: 'qui',
        inboundInventoryMovementsCount: 1,
        outboundInventoryMovementsCount: 1,
      },
      {
        weekday: 'sex',
        inboundInventoryMovementsCount: 2,
        outboundInventoryMovementsCount: 2,
      },
    ])
  })

  it('should return the count of inbound and outbound inventory movements for a given product', async () => {
    const endDate = new Datetime(new Date(2024, 10, 15))

    const fakeProduct = ProductsFaker.fake()

    await inventoryMovementsRepositoryMock.addMany([
      InventoryMovementsFaker.fake({
        movementType: 'inbound',
        registeredAt: endDate.getDate(),
        product: { id: fakeProduct.id },
      }),
      InventoryMovementsFaker.fake({
        movementType: 'inbound',
        registeredAt: endDate.getDate(),
      }),
    ])

    const weeklyInventoryMovements = await useCase.execute({
      endDate: endDate.getDate(),
      productId: fakeProduct.id,
    })

    expect(weeklyInventoryMovements?.at(-1)).toEqual({
      weekday: 'sex',
      inboundInventoryMovementsCount: 1,
      outboundInventoryMovementsCount: 0,
    })
  })
})
