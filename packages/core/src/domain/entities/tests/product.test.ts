import { describe, expect, it } from 'vitest'
import { BatchesFaker, ProductsFaker } from '../../../../__tests__/fakers'
import { Product } from '../product'
import { Datetime } from '../../../libs'
import { ConflictError } from '../../../errors'

describe('Product entity', () => {
  it('should be created', () => {
    const fakeProductDto = ProductsFaker.fakeDto()
    const product = Product.create(fakeProductDto)

    expect(product.dto).toEqual(fakeProductDto)
  })

  it('should be updated', () => {
    const fakeProductDto = ProductsFaker.fakeDto({ code: 'original code' })
    const product = Product.create(fakeProductDto)

    expect(product.code).toEqual('original code')

    const updatedProduct = product.update({ code: 'updated code' })

    expect(updatedProduct.code).toEqual('updated code')
  })

  it('should append a batch', () => {
    const fakeProductDto = ProductsFaker.fakeDto()
    const product = Product.create(fakeProductDto)

    const batch = BatchesFaker.fake()

    expect(product.batches).toEqual([])

    product.appendBatch(batch)

    expect(product.batches).toEqual([batch])
  })

  it('should sort its batches by registration date on append a new one', () => {
    const currentDate = new Date()
    const oldDate = new Datetime(currentDate).subtractYears(1)

    const product = Product.create(ProductsFaker.fakeDto())

    const oldBatch = BatchesFaker.fake({
      registeredAt: oldDate,
      expirationDate: undefined,
    })
    const newBatch = BatchesFaker.fake({
      registeredAt: currentDate,
      expirationDate: undefined,
    })
    product.appendBatch(newBatch)
    product.appendBatch(oldBatch)

    expect(product.batches).toEqual([oldBatch, newBatch])

    const oldestBatch = BatchesFaker.fake({
      registeredAt: new Datetime(oldDate).subtractYears(2),
    })

    product.appendBatch(oldestBatch)

    expect(product.batches).toEqual([oldestBatch, oldBatch, newBatch])
  })

  it('should sort its batches by registration date and expiration date on append a new one', () => {
    const currentDate = new Date()
    const oldDate = new Datetime(currentDate).subtractYears(1)

    const product = Product.create(ProductsFaker.fakeDto())

    const oldBatch = BatchesFaker.fake({
      registeredAt: oldDate,
      expirationDate: undefined,
    })
    const newBatch = BatchesFaker.fake({
      registeredAt: currentDate,
      expirationDate: undefined,
    })
    product.appendBatch(newBatch)
    product.appendBatch(oldBatch)

    expect(product.batches).toEqual([oldBatch, newBatch])

    const batchWithExpirationDate = BatchesFaker.fake({
      expirationDate: new Datetime(currentDate).addYears(2),
    })

    product.appendBatch(batchWithExpirationDate)

    expect(product.batches).toEqual([batchWithExpirationDate, oldBatch, newBatch])

    const batchWithClosestExpirationDate = BatchesFaker.fake({
      expirationDate: new Datetime(currentDate).addYears(1),
    })

    product.appendBatch(batchWithClosestExpirationDate)

    expect(product.batches).toEqual([
      batchWithClosestExpirationDate,
      batchWithExpirationDate,
      oldBatch,
      newBatch,
    ])
  })

  it('should update one of its batches', () => {
    const currentDate = new Date()
    const oldDate = new Datetime(currentDate).subtractYears(1)

    const fakeProductDto = ProductsFaker.fakeDto()
    const product = Product.create(fakeProductDto)
    const fakeBatch = BatchesFaker.fake({
      code: 'original code',
      registeredAt: currentDate,
      expirationDate: undefined,
    })
    product.appendBatch(
      BatchesFaker.fake({ registeredAt: oldDate, expirationDate: undefined }),
    )
    product.appendBatch(fakeBatch)

    expect(product.batches[0]?.code).not.toBe('original code')
    expect(product.batches[1]?.code).toBe('original code')

    const updatedFakeBatch = fakeBatch.update({ code: 'updated code' })

    product.updateBatch(updatedFakeBatch)

    expect(product.batches[0]?.code).not.toBe('original code')
    expect(product.batches[1]?.code).toBe('updated code')
  })

  it('should delete many of its batches', () => {
    const fakeProductDto = ProductsFaker.fakeDto()
    const product = Product.create(fakeProductDto)
    const fakeBatches = BatchesFaker.fakeMany(5)

    for (const fakeBatch of fakeBatches) {
      product.appendBatch(fakeBatch)
    }

    expect(product.batches).toHaveLength(5)

    product.deleteBatches(fakeBatches.slice(0, 4).map((product) => product.id))

    expect(product.batches).toHaveLength(1)
  })

  it('should return the count of batches', () => {
    const product = ProductsFaker.fake()

    expect(product.batchesCount).toBe(0)

    product.appendBatch(BatchesFaker.fake())
    product.appendBatch(BatchesFaker.fake())

    expect(product.batchesCount).toBe(2)
  })

  it('should sum the count of items of each batch to make up the current stock', () => {
    const fakeProductDto = ProductsFaker.fakeDto()
    const product = Product.create(fakeProductDto)

    product.appendBatch(BatchesFaker.fake({ itemsCount: 10 }))
    product.appendBatch(BatchesFaker.fake({ itemsCount: 10 }))

    expect(product.currentStock).toBe(20)
  })

  it('should not reduce its stock if the requested count of items is greater than the current stock', () => {
    const fakeProductDto = ProductsFaker.fakeDto()
    const product = Product.create(fakeProductDto)

    product.appendBatch(BatchesFaker.fake({ itemsCount: 10 }))

    expect(async () => {
      product.reduceStock(11)
    }).rejects.toThrowError(ConflictError)
  })

  it('should update the count of items of its batches on reduce stock', () => {
    const fakeProductDto = ProductsFaker.fakeDto()
    const product = Product.create(fakeProductDto)

    product.appendBatch(BatchesFaker.fake({ itemsCount: 10 }))

    expect(product.updatedBatches).toHaveLength(0)
    expect(product.batches[0]?.itemsCount).toBe(10)

    product.reduceStock(5)

    expect(product.updatedBatches).toHaveLength(1)
    expect(product.batches[0]?.itemsCount).toBe(5)
  })

  it('should have empty batches if the requested items of count to reduce stock is greater than the count of items of a batch', () => {
    const fakeProductDto = ProductsFaker.fakeDto()
    const product = Product.create(fakeProductDto)

    product.appendBatch(BatchesFaker.fake({ itemsCount: 10 }))
    product.appendBatch(BatchesFaker.fake({ itemsCount: 10 }))

    expect(product.emptyBatches).toHaveLength(0)

    product.reduceStock(11)

    expect(product.emptyBatches).toHaveLength(1)
    expect(product.batches[1]?.itemsCount).toBe(9)
  })

  it('should have safe stock level it the current stock is greater than the minimum stock', () => {
    const product = ProductsFaker.fake({ minimumStock: 100 })

    product.appendBatch(BatchesFaker.fake({ itemsCount: 100 }))
    product.appendBatch(BatchesFaker.fake({ itemsCount: 100 }))

    expect(product.stockLevel).toBe('safe')
  })

  it('should have average stock level it the current stock is less than the minimum stock but not zero', () => {
    const product = ProductsFaker.fake({ minimumStock: 100 })

    product.appendBatch(BatchesFaker.fake({ itemsCount: 50 }))

    expect(product.stockLevel).toBe('average')
  })

  it('should have danger stock level it the current stock is zero', () => {
    const product = ProductsFaker.fake({ minimumStock: 100 })

    expect(product.stockLevel).toBe('danger')
  })
})
