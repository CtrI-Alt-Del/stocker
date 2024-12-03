import { describe, expect, it } from 'vitest'
import { BatchesFaker } from '../../../../__tests__/fakers'
import { Batch } from '../batch'
import { Datetime } from '../../../libs'

describe('Batch entity', () => {
  it('should be created', () => {
    const fakeBatchDto = BatchesFaker.fakeDto()
    const batch = Batch.create(fakeBatchDto)

    expect(batch.dto).toEqual(fakeBatchDto)
  })

  it('should be updated', () => {
    const fakeBatchDto = BatchesFaker.fakeDto({ code: 'original code' })
    const batch = Batch.create(fakeBatchDto)

    expect(batch.code).toEqual('original code')

    const updatedBatch = batch.update({ code: 'updated code' })

    expect(updatedBatch.code).toEqual('updated code')
  })

  it('should reduce the count of its items', () => {
    const fakeBatchDto = BatchesFaker.fakeDto({ itemsCount: 5 })
    const batch = Batch.create(fakeBatchDto)

    expect(batch.itemsCount).toBe(5)

    batch.reduceItemsCount(2)

    expect(batch.itemsCount).toBe(3)
  })

  it('should have the state of updated stock if the count of its items changes', () => {
    const fakeBatchDto = BatchesFaker.fakeDto()
    const batch = Batch.create(fakeBatchDto)

    expect(batch.hasUpdatedStock).toBeFalsy()

    batch.reduceItemsCount(1)

    expect(batch.hasUpdatedStock).toBeTruthy()
  })

  it('should check if has items or not', () => {
    let batch = BatchesFaker.fake({ itemsCount: 10 })
    expect(batch.hasItems).toBeTruthy()

    batch = BatchesFaker.fake({ itemsCount: 0 })
    expect(batch.hasItems).toBeFalsy()
  })

  it('should return the days to expiration', () => {
    const differenceInDays = 10
    const fakeExpirationDate = new Datetime().addDays(differenceInDays)
    const batch = BatchesFaker.fake({ expirationDate: fakeExpirationDate })

    expect(batch.daysToExpiration).toBe(differenceInDays - 1)
  })
})
