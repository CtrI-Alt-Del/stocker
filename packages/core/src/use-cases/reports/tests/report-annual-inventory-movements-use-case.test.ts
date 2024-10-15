import { beforeEach, describe, expect, it } from 'vitest'
import { InventoryMovementsFaker, ProductsFaker } from '../../../../__tests__/fakers'
import { Datetime } from '../../../libs'
import { InventoryMovementsRepositoryMock } from '../../../../__tests__/mocks/repositories'
import { ReportAnnualOutboundInventoryMovementsUseCase } from '../report-annual-outbound-inventorymovements-use-case'

let useCase: ReportAnnualOutboundInventoryMovementsUseCase
let inventoryMovementsRepositoryMock: InventoryMovementsRepositoryMock

describe('Report annual inventory movements use case', () => {
  beforeEach(() => {
    inventoryMovementsRepositoryMock = new InventoryMovementsRepositoryMock()
    useCase = new ReportAnnualOutboundInventoryMovementsUseCase(
      inventoryMovementsRepositoryMock,
    )
  })

  it('should return the count of inbound and outbound inventory movements of each weekday of last days', async () => {
    const currentDate = new Datetime(new Date(2024, 9, 15))

    await inventoryMovementsRepositoryMock.addMany([
      InventoryMovementsFaker.fake({
        movementType: 'inbound',
        registeredAt: currentDate.getDate(),
      }),
      InventoryMovementsFaker.fake({
        movementType: 'inbound',
        registeredAt: currentDate.getDate(),
      }),
      InventoryMovementsFaker.fake({
        movementType: 'outbound',
        registeredAt: currentDate.getDate(),
      }),
      InventoryMovementsFaker.fake({
        movementType: 'outbound',
        registeredAt: currentDate.getDate(),
      }),
      InventoryMovementsFaker.fake({
        movementType: 'inbound',
        registeredAt: currentDate.subtractMonths(1),
      }),
      InventoryMovementsFaker.fake({
        movementType: 'outbound',
        registeredAt: currentDate.subtractMonths(1),
      }),
      InventoryMovementsFaker.fake({
        movementType: 'outbound',
        registeredAt: currentDate.subtractMonths(2),
      }),
      InventoryMovementsFaker.fake({
        movementType: 'inbound',
        registeredAt: currentDate.subtractMonths(3),
      }),
    ])

    const annualInventoryMovements = await useCase.execute({
      currentDate: currentDate.getDate(),
    })

    expect(annualInventoryMovements).toEqual([
      {
        month: 'novembro',
        year: 2023,
        inboundMovementsCount: 0,
        outboundMovementsCount: 0,
      },
      {
        month: 'dezembro',
        year: 2023,
        inboundMovementsCount: 0,
        outboundMovementsCount: 0,
      },
      {
        month: 'janeiro',
        year: 2024,
        inboundMovementsCount: 0,
        outboundMovementsCount: 0,
      },
      {
        month: 'fevereiro',
        year: 2024,
        inboundMovementsCount: 0,
        outboundMovementsCount: 0,
      },
      {
        month: 'março',
        year: 2024,
        inboundMovementsCount: 0,
        outboundMovementsCount: 0,
      },
      {
        month: 'abril',
        year: 2024,
        inboundMovementsCount: 0,
        outboundMovementsCount: 0,
      },
      {
        month: 'maio',
        year: 2024,
        inboundMovementsCount: 0,
        outboundMovementsCount: 0,
      },
      {
        month: 'junho',
        year: 2024,
        inboundMovementsCount: 0,
        outboundMovementsCount: 0,
      },
      {
        month: 'julho',
        year: 2024,
        inboundMovementsCount: 1,
        outboundMovementsCount: 0,
      },
      {
        month: 'agosto',
        year: 2024,
        inboundMovementsCount: 0,
        outboundMovementsCount: 1,
      },
      {
        month: 'setembro',
        year: 2024,
        inboundMovementsCount: 1,
        outboundMovementsCount: 1,
      },
      {
        month: 'outubro',
        year: 2024,
        inboundMovementsCount: 2,
        outboundMovementsCount: 2,
      },
    ])
  })

  it('should return the count of inbound and outbound inventory movements for a given a product', async () => {
    const currentDate = new Datetime(new Date(2024, 9, 15))
    const fakeProduct = ProductsFaker.fake()

    await inventoryMovementsRepositoryMock.addMany([
      InventoryMovementsFaker.fake({
        movementType: 'inbound',
        registeredAt: currentDate.getDate(),
        product: { id: fakeProduct.id },
      }),
      InventoryMovementsFaker.fake({
        movementType: 'inbound',
        registeredAt: currentDate.getDate(),
      }),
    ])

    const annualInventoryMovements = await useCase.execute({
      currentDate: currentDate.getDate(),
      productId: fakeProduct.id,
    })

    expect(annualInventoryMovements.at(-1)).toEqual({
      month: 'outubro',
      year: 2024,
      inboundMovementsCount: 1,
      outboundMovementsCount: 0,
    })
  })
})
