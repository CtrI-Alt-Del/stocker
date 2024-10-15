import { beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { RegisterInboundInventoryMovementUseCase } from '../register-inbound-inventory-movement-use-case'
import {
  BatchesRepositoryMock,
  InventoryMovementsRepositoryMock,
  ProductsRepositoryMock,
} from '../../../../__tests__/mocks/repositories'
import {
  BatchesFaker,
  InventoryMovementsFaker,
  ProductsFaker,
} from '../../../../__tests__/fakers'
import { NotAllowedError, NotFoundError } from '../../../errors'

let productsRepository: ProductsRepositoryMock
let batchesRepository: BatchesRepositoryMock
let inventoryMovementRepository: InventoryMovementsRepositoryMock

describe('Register inbound inventory movement use case', () => {
  beforeEach(() => {
    productsRepository = new ProductsRepositoryMock()
    batchesRepository = new BatchesRepositoryMock()
    inventoryMovementRepository = new InventoryMovementsRepositoryMock()
  })

  it('should not register an inbound inventory movement for a product that does not exist', async () => {
    const useCase = new RegisterInboundInventoryMovementUseCase(
      productsRepository,
      batchesRepository,
      inventoryMovementRepository,
    )

    const fakeBatchDto = BatchesFaker.fakeDto()
    const fakeInventoryMovementDto = InventoryMovementsFaker.fakeDto()

    expect(async () => {
      await useCase.execute({
        batchDto: fakeBatchDto,
        inventoryMovementDto: fakeInventoryMovementDto,
      })
    }).rejects.toThrowError(NotFoundError)
  })

  it('should not register an inbound inventory movement for a product that is not active', async () => {
    const fakeProduct = ProductsFaker.fake({ isActive: false })
    await productsRepository.add(fakeProduct)

    const useCase = new RegisterInboundInventoryMovementUseCase(
      productsRepository,
      batchesRepository,
      inventoryMovementRepository,
    )

    const fakeBatchDto = BatchesFaker.fakeDto({ productId: fakeProduct.id })
    const fakeInventoryMovementDto = InventoryMovementsFaker.fakeDto()

    expect(async () => {
      await useCase.execute({
        batchDto: fakeBatchDto,
        inventoryMovementDto: fakeInventoryMovementDto,
      })
    }).rejects.toThrowError(NotAllowedError)
  })

  it('should register an inbound inventory movement', async () => {
    const fakeProduct = ProductsFaker.fake()
    const fakeBatchDto = BatchesFaker.fakeDto({ productId: fakeProduct.id })
    const fakeInventoryMovementDto = InventoryMovementsFaker.fakeDto()

    await productsRepository.add(fakeProduct)

    expect(inventoryMovementRepository.inventoryMovements).toHaveLength(0)

    const useCase = new RegisterInboundInventoryMovementUseCase(
      productsRepository,
      batchesRepository,
      inventoryMovementRepository,
    )

    await useCase.execute({
      batchDto: fakeBatchDto,
      inventoryMovementDto: fakeInventoryMovementDto,
    })

    expect(inventoryMovementRepository.inventoryMovements).toHaveLength(1)
    expect(inventoryMovementRepository.inventoryMovements[0]?.dto).toEqual(
      fakeInventoryMovementDto,
    )
  })

  it('should register a batch on register an inbound inventory movement', async () => {
    const fakeProduct = ProductsFaker.fake()
    const fakeBatchDto = BatchesFaker.fakeDto({ productId: fakeProduct.id })
    const fakeInventoryMovementDto = InventoryMovementsFaker.fakeDto()

    await productsRepository.add(fakeProduct)

    const useCase = new RegisterInboundInventoryMovementUseCase(
      productsRepository,
      batchesRepository,
      inventoryMovementRepository,
    )

    await useCase.execute({
      batchDto: fakeBatchDto,
      inventoryMovementDto: fakeInventoryMovementDto,
    })

    expect(batchesRepository.batches[0]?.dto).toEqual(fakeBatchDto)
  })
})
