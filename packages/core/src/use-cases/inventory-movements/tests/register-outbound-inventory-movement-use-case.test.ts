import { beforeEach, describe, expect, it } from 'vitest'
import {
  BatchesRepositoryMock,
  InventoryMovementsRepositoryMock,
  ProductsRepositoryMock,
} from '../../../../__tests__/mocks/repositories'
import { RegisterOutboundInventoryMovementUseCase } from '../register-outbound-inventory-movement-use-case'
import {
  BatchesFaker,
  InventoryMovementsFaker,
  ProductsFaker,
} from '../../../../__tests__/fakers'
import { NotAllowedError, NotFoundError } from '../../../errors'
import { QueueProviderMock } from '../../../../__tests__/mocks/providers'

let productsRepository: ProductsRepositoryMock
let batchesRepository: BatchesRepositoryMock
let inventoryMovementsRepository: InventoryMovementsRepositoryMock
let queueProvider: QueueProviderMock
let useCase: RegisterOutboundInventoryMovementUseCase

describe('Register outbound inventory movement use case', () => {
  beforeEach(() => {
    productsRepository = new ProductsRepositoryMock()
    batchesRepository = new BatchesRepositoryMock()
    inventoryMovementsRepository = new InventoryMovementsRepositoryMock()
    queueProvider = new QueueProviderMock()
    useCase = new RegisterOutboundInventoryMovementUseCase(
      batchesRepository,
      productsRepository,
      inventoryMovementsRepository,
      queueProvider,
    )
  })

  it('should not register an inbound inventory movement for a product that does not exist', () => {
    const fakeInventoryMovementDto = InventoryMovementsFaker.fakeDto()

    expect(async () => {
      await useCase.execute({
        inventoryMovementDto: fakeInventoryMovementDto,
      })
    }).rejects.toThrowError(NotFoundError)
  })

  it('should not register an inbound inventory movement for a product that is not active', async () => {
    const fakeProduct = ProductsFaker.fake({ isActive: false })
    await productsRepository.add(fakeProduct)

    useCase = new RegisterOutboundInventoryMovementUseCase(
      batchesRepository,
      productsRepository,
      inventoryMovementsRepository,
      queueProvider,
    )
    const fakeInventoryMovementDto = InventoryMovementsFaker.fakeDto({
      product: { id: fakeProduct.id },
    })

    expect(async () => {
      await useCase.execute({
        inventoryMovementDto: fakeInventoryMovementDto,
      })
    }).rejects.toThrowError(NotAllowedError)
  })

  it('should update the batches whose count of items was reduced', async () => {
    const fakeProduct = ProductsFaker.fake()
    const fakeBatch = BatchesFaker.fake({ itemsCount: 10 })

    fakeProduct.appendBatch(fakeBatch)
    await productsRepository.add(fakeProduct)
    await batchesRepository.add(fakeBatch)

    expect(batchesRepository.batches[0]?.itemsCount).toBe(10)

    useCase = new RegisterOutboundInventoryMovementUseCase(
      batchesRepository,
      productsRepository,
      inventoryMovementsRepository,
      queueProvider,
    )
    const fakeInventoryMovementDto = InventoryMovementsFaker.fakeDto({
      itemsCount: 5,
      product: { id: fakeProduct.id },
    })

    await useCase.execute({
      inventoryMovementDto: fakeInventoryMovementDto,
    })

    expect(batchesRepository.batches[0]?.itemsCount).toBe(5)
  })

  it('should delete the batches whose count of items was reset to zero', async () => {
    const fakeProduct = ProductsFaker.fake()
    const fakeBatch = BatchesFaker.fake({ itemsCount: 10 })

    fakeProduct.appendBatch(fakeBatch)
    await productsRepository.add(fakeProduct)
    await batchesRepository.add(fakeBatch)

    expect(batchesRepository.batches).toHaveLength(1)

    useCase = new RegisterOutboundInventoryMovementUseCase(
      batchesRepository,
      productsRepository,
      inventoryMovementsRepository,
      queueProvider,
    )
    const fakeInventoryMovementDto = InventoryMovementsFaker.fakeDto({
      itemsCount: 10,
      product: { id: fakeProduct.id },
    })

    await useCase.execute({
      inventoryMovementDto: fakeInventoryMovementDto,
    })

    expect(batchesRepository.batches).toHaveLength(0)
  })

  it('should register an ounbound inventory movement', async () => {
    const fakeProduct = ProductsFaker.fake()
    const fakeBatch = BatchesFaker.fake({ itemsCount: 10 })

    fakeProduct.appendBatch(fakeBatch)
    await productsRepository.add(fakeProduct)
    await batchesRepository.add(fakeBatch)

    expect(inventoryMovementsRepository.inventoryMovements).toHaveLength(0)

    useCase = new RegisterOutboundInventoryMovementUseCase(
      batchesRepository,
      productsRepository,
      inventoryMovementsRepository,
      queueProvider,
    )
    const fakeInventoryMovementDto = InventoryMovementsFaker.fakeDto({
      itemsCount: 10,
      product: { id: fakeProduct.id },
    })

    await useCase.execute({
      inventoryMovementDto: fakeInventoryMovementDto,
    })

    expect(inventoryMovementsRepository.inventoryMovements).toHaveLength(1)
    expect(inventoryMovementsRepository.inventoryMovements[0]?.dto).toEqual(
      fakeInventoryMovementDto,
    )
  })

  it('should push to the queue a job that sends stock level notification', async () => {
    const fakeProduct = ProductsFaker.fake({
      batches: [BatchesFaker.fakeDto({ itemsCount: 10 })],
      minimumStock: 1,
    })
    productsRepository.add(fakeProduct)
    const fakeInventoryMovementDto = InventoryMovementsFaker.fakeDto({
      itemsCount: 10,
      product: { id: fakeProduct.id },
    })

    expect(queueProvider.jobs).toHaveLength(0)

    await useCase.execute({
      inventoryMovementDto: fakeInventoryMovementDto,
    })

    expect(queueProvider.jobs).toHaveLength(1)
    expect(queueProvider.jobs).toEqual([
      {
        key: 'send-stock-level-notification',
        data: { productId: fakeProduct.id, companyId: fakeProduct.companyId },
      },
    ])
  })
})
