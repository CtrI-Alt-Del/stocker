import { beforeEach, describe, expect, it } from 'vitest'

import { ProductsRepositoryMock } from '../../../../__tests__/mocks/repositories'
import { CsvProviderMock } from '../../../../__tests__/mocks/providers'
import { Datetime } from '../../../libs'
import { ValidationError } from '../../../errors'
import { InventoryMovementsFaker, ProductsFaker } from '../../../../__tests__/fakers'
import { ExportMostTrendingProductsToCsvFileUseCase } from '../export-most-trending-products-use-case'
import { MOST_TRENDING_PRODUCTS_CSV_FILE_COLUMNS } from '../../../constants'

let useCase: ExportMostTrendingProductsToCsvFileUseCase
let productsRepository: ProductsRepositoryMock
let csvProviderMock: CsvProviderMock

describe('Export most trending products to csv file use case', () => {
  beforeEach(() => {
    productsRepository = new ProductsRepositoryMock()
    csvProviderMock = new CsvProviderMock()
    useCase = new ExportMostTrendingProductsToCsvFileUseCase(
      productsRepository,
      csvProviderMock,
    )
  })

  it('should not export if the start date is greater than the end date', async () => {
    const endDate = new Date()
    const startDate = new Datetime(endDate).addDays(1)

    expect(async () => {
      await useCase.execute({ startDate, endDate })
    }).rejects.toThrowError(ValidationError)
  })

  it('should set the range of date to the last 7 days if the start date or end date is undefined', async () => {
    const fakeProductA = ProductsFaker.fake()
    const fakeProductB = ProductsFaker.fake()
    const fakeProductC = ProductsFaker.fake()

    const currentDate = new Datetime()

    await Promise.all([
      productsRepository.add(fakeProductA),
      productsRepository.add(fakeProductB),
      productsRepository.add(fakeProductC),
    ])
    productsRepository.inventoryMovements.push(
      InventoryMovementsFaker.fake({
        product: { id: fakeProductA.id },
        registeredAt: currentDate.subtractDays(6),
        movementType: 'outbound',
      }),
      InventoryMovementsFaker.fake({
        product: { id: fakeProductB.id },
        registeredAt: currentDate.getDate(),
        movementType: 'outbound',
      }),
      InventoryMovementsFaker.fake({
        product: { id: fakeProductC.id },
        registeredAt: currentDate.subtractDays(9),
        movementType: 'outbound',
      }),
    )

    const fileBuffer = await useCase.execute({})
    expect(fileBuffer).toEqual(
      Buffer.from(
        [
          MOST_TRENDING_PRODUCTS_CSV_FILE_COLUMNS,
          [fakeProductA.dto, fakeProductB.dto],
        ].toString(),
      ),
    )
  })

  it('should filter the products by a range of date', async () => {
    const fakeProductA = ProductsFaker.fake()
    const fakeProductB = ProductsFaker.fake()
    const fakeProductC = ProductsFaker.fake()

    const currentDate = new Datetime()

    await Promise.all([
      productsRepository.add(fakeProductA),
      productsRepository.add(fakeProductB),
      productsRepository.add(fakeProductC),
    ])
    productsRepository.inventoryMovements.push(
      InventoryMovementsFaker.fake({
        product: { id: fakeProductA.id },
        registeredAt: currentDate.subtractYears(1),
        movementType: 'outbound',
      }),
      InventoryMovementsFaker.fake({
        product: { id: fakeProductB.id },
        registeredAt: currentDate.getDate(),
        movementType: 'outbound',
      }),
      InventoryMovementsFaker.fake({
        product: { id: fakeProductC.id },
        registeredAt: currentDate.addYears(1),
        movementType: 'outbound',
      }),
    )

    const csvBuffer = await useCase.execute({
      startDate: currentDate.subtractYears(1),
      endDate: currentDate.getDate(),
    })

    expect(csvBuffer).toEqual(
      Buffer.from(
        [
          MOST_TRENDING_PRODUCTS_CSV_FILE_COLUMNS,
          [fakeProductA.dto, fakeProductB.dto],
        ].toString(),
      ),
    )
  })

  it('should sort products by outbound inventory movements count', async () => {
    const fakeProductA = ProductsFaker.fake({ name: 'Product A' })
    const fakeProductB = ProductsFaker.fake({ name: 'Product B' })
    const fakeProductC = ProductsFaker.fake({ name: 'Product C' })

    const currentDate = new Datetime()

    await Promise.all([
      productsRepository.add(fakeProductA),
      productsRepository.add(fakeProductB),
      productsRepository.add(fakeProductC),
    ])
    productsRepository.inventoryMovements.push(
      InventoryMovementsFaker.fake({
        movementType: 'outbound',
        product: { id: fakeProductA.id },
        registeredAt: currentDate.getDate(),
      }),
      InventoryMovementsFaker.fake({
        movementType: 'outbound',
        product: { id: fakeProductA.id },
        registeredAt: currentDate.getDate(),
      }),
      InventoryMovementsFaker.fake({
        movementType: 'outbound',
        product: { id: fakeProductB.id },
        registeredAt: currentDate.getDate(),
      }),
      InventoryMovementsFaker.fake({
        movementType: 'outbound',
        product: { id: fakeProductB.id },
        registeredAt: currentDate.getDate(),
      }),
      InventoryMovementsFaker.fake({
        movementType: 'outbound',
        product: { id: fakeProductB.id },
        registeredAt: currentDate.getDate(),
      }),
      InventoryMovementsFaker.fake({
        movementType: 'outbound',
        product: { id: fakeProductC.id },
        registeredAt: currentDate.getDate(),
      }),
    )

    const csvBuffer = await useCase.execute({
      startDate: currentDate.subtractYears(10),
      endDate: currentDate.getDate(),
    })

    expect(csvBuffer).toEqual(
      Buffer.from(
        [
          MOST_TRENDING_PRODUCTS_CSV_FILE_COLUMNS,
          [fakeProductB.dto, fakeProductA.dto, fakeProductC.dto],
        ].toString(),
      ),
    )
  })
})
