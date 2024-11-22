import { describe, expect, it, beforeEach } from 'vitest'
import { ReportInventorySummaryUseCase } from '../report-inventory-summary-use-case'
import { BatchesRepositoryMock, InventoryMovementsRepositoryMock, ProductsRepositoryMock } from '../../../../__tests__/mocks/repositories'

let useCase: ReportInventorySummaryUseCase
let batchesRepository: BatchesRepositoryMock
let inventoryMovementsRepository: InventoryMovementsRepositoryMock
let productsRepository: ProductsRepositoryMock

describe('ReportInventorySummaryUseCase', () => {
  beforeEach(() => {
    batchesRepository = new BatchesRepositoryMock()
    inventoryMovementsRepository = new InventoryMovementsRepositoryMock()
    productsRepository = new ProductsRepositoryMock()
    useCase = new ReportInventorySummaryUseCase(
      batchesRepository,
      inventoryMovementsRepository,
      productsRepository,
    )
  })

  it('should return the correct inventory summary including inventory value', async () => {
    const companyId = 'company-123'

    const result = await useCase.execute({ companyId })

    const batchesCount = await batchesRepository.count()
    const itemsCount = await batchesRepository.countItems()
    const inboundInventoryMovementsCount = await inventoryMovementsRepository.countInbound()
    const outboundInventoryMovementsCount = await inventoryMovementsRepository.countOutbound()
    const inventoryValue = await productsRepository.calculateInventoryValue()

    expect(result).toEqual({
      batchesCount,
      itemsCount,
      inboundInventoryMovementsCount,
      outboundInventoryMovementsCount,
      inventoryValue,
    })
  })
})