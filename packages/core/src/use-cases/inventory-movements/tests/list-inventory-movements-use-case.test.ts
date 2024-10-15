import { beforeEach, describe, expect, it } from 'vitest'
import type { InventoryMovement } from '../../../domain/entities'
import { InventoryMovementsRepositoryMock } from '../../../../__tests__/mocks/repositories'
import { ListInventoryMovementsUseCase } from '../list-inventory-movements-use-case'
import { InventoryMovementsFaker, ProductsFaker } from '../../../../__tests__/fakers'
import { PAGINATION } from '../../../constants'

let inventoryMovementsRepository: InventoryMovementsRepositoryMock
let useCase: ListInventoryMovementsUseCase
let fakeInventoryMovements: InventoryMovement[] = []

describe('List inventory movements use case', () => {
  beforeEach(async () => {
    fakeInventoryMovements = InventoryMovementsFaker.fakeMany(20)
    inventoryMovementsRepository = new InventoryMovementsRepositoryMock()

    for (const fakeInventoryMovement of fakeInventoryMovements) {
      await inventoryMovementsRepository.add(fakeInventoryMovement)
    }
    useCase = new ListInventoryMovementsUseCase(inventoryMovementsRepository)
  })

  it('should list all the inventory movements', async () => {
    const { items } = await useCase.execute({})
    expect(items).toEqual(fakeInventoryMovements.map((movement) => movement.dto))
  })

  it(`should list ${PAGINATION.itemsPerPage} inventory movements per page`, async () => {
    let pagination = await useCase.execute({ page: 1 })
    expect(pagination.items).toHaveLength(PAGINATION.itemsPerPage)

    pagination = await useCase.execute({ page: 2 })
    expect(pagination.items).toHaveLength(PAGINATION.itemsPerPage)
  })

  it('should return the count of all inventory movements', async () => {
    const { itemsCount } = await useCase.execute({})
    expect(itemsCount).toEqual(fakeInventoryMovements.length)
  })

  it('should list inventory movements according to the current page', async () => {
    let pagination = await useCase.execute({ page: 1 })

    expect(pagination.items).toEqual(
      fakeInventoryMovements
        .slice(0, 10)
        .map((inventoryMovement) => inventoryMovement.dto),
    )

    pagination = await useCase.execute({ page: 2 })

    expect(pagination.items).toEqual(
      fakeInventoryMovements
        .slice(10, 20)
        .map((inventoryMovement) => inventoryMovement.dto),
    )
  })

  it('should list only the inventory movements for a given product', async () => {
    const fakeProduct = ProductsFaker.fake()
    const productFakeInventoryMovements = InventoryMovementsFaker.fakeMany(5, {
      product: { id: fakeProduct.id },
    })

    inventoryMovementsRepository.inventoryMovements = []

    for (const fakeInventoryMovement of productFakeInventoryMovements) {
      await inventoryMovementsRepository.add(fakeInventoryMovement)
    }
    for (const fakeInventoryMovement of InventoryMovementsFaker.fakeMany(10)) {
      await inventoryMovementsRepository.add(fakeInventoryMovement)
    }
    useCase = new ListInventoryMovementsUseCase(inventoryMovementsRepository)

    const { items } = await useCase.execute({ productId: fakeProduct.id })

    expect(items).toHaveLength(5)
  })
})
