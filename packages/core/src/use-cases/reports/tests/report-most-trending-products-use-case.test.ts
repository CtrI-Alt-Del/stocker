import { beforeEach, describe, expect, it } from 'vitest'

import { ProductsRepositoryMock } from '../../../../__tests__/mocks/repositories'
import { Datetime } from '../../../libs'
import { ValidationError } from '../../../errors'
import { ReportMostTrendingProductsUseCase } from '../report-most-trending-products-use-case'
import {
  CategoriesFaker,
  InventoryMovementsFaker,
  ProductsFaker,
} from '../../../../__tests__/fakers'
import { PAGINATION } from '../../../constants'

let useCase: ReportMostTrendingProductsUseCase
let productsRepository: ProductsRepositoryMock

describe('Report most trending products to csv file use case', () => {
  beforeEach(() => {
    productsRepository = new ProductsRepositoryMock()
    useCase = new ReportMostTrendingProductsUseCase(productsRepository)
  })

  it('should not export if the start date is greater than the end date', async () => {
    const endDate = new Date()
    const startDate = new Datetime(endDate).addDays(1)

    expect(async () => {
      await useCase.execute({
        startDate,
        endDate,
        page: 1,
        companyId: '',
        categoryId: '',
      })
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

    const { items, itemsCount } = await useCase.execute({
      page: 1,
      companyId: '',
      categoryId: '',
    })

    expect(itemsCount).toBe(2)
    expect(items).toEqual([fakeProductA.dto, fakeProductB.dto])
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

    const { items, itemsCount } = await useCase.execute({
      page: 1,
      startDate: currentDate.subtractYears(1),
      endDate: currentDate.getDate(),
      companyId: '',
      categoryId: '',
    })

    expect(itemsCount).toBe(2)
    expect(items).toEqual([fakeProductA.dto, fakeProductB.dto])
  })

  it('should paginate products', async () => {
    const fakeProducts = ProductsFaker.fakeMany(20)

    for (const fakeProduct of fakeProducts) {
      productsRepository.inventoryMovements.push(
        InventoryMovementsFaker.fake({
          product: { id: fakeProduct.id },
          movementType: 'outbound',
        }),
      )
      await productsRepository.add(fakeProduct)
    }

    const currentDate = new Datetime()

    let pagination = await useCase.execute({
      page: 1,
      startDate: currentDate.subtractYears(10),
      endDate: currentDate.getDate(),
      companyId: '',
      categoryId: '',
    })
    expect(pagination.itemsCount).toBe(PAGINATION.itemsPerPage)
    expect(pagination.items).toEqual(
      fakeProducts.slice(0, 10).map((product) => product.dto),
    )

    pagination = await useCase.execute({
      page: 2,
      startDate: currentDate.subtractYears(10),
      endDate: currentDate.getDate(),
      companyId: '',
      categoryId: '',
    })
    expect(pagination.itemsCount).toBe(PAGINATION.itemsPerPage)
    expect(pagination.items).toEqual(
      fakeProducts.slice(10, 20).map((product) => product.dto),
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

    const { items } = await useCase.execute({
      page: 1,
      startDate: currentDate.subtractYears(10),
      endDate: currentDate.getDate(),
      companyId: '',
      categoryId: '',
    })

    expect(items).toEqual([fakeProductB.dto, fakeProductA.dto, fakeProductC.dto])
  })

  it('should filter products by category', async () => {
    const fakeCategory = CategoriesFaker.fake()

    const fakeProductA = ProductsFaker.fake({
      name: 'Product A',
      category: { id: fakeCategory.id },
    })
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

    const { items } = await useCase.execute({
      categoryId: fakeCategory.id,
      page: 1,
      startDate: currentDate.subtractYears(10),
      endDate: currentDate.getDate(),
      companyId: '',
    })

    expect(items).toEqual([fakeProductA.dto])
  })
})
