import { useState } from 'react'
import { parseAsInteger, useQueryState } from 'nuqs'

import { PAGINATION } from '@stocker/core/constants'
import type { ProductDto } from '@stocker/core/dtos'
import { type Batch, Product } from '@stocker/core/entities'

import { CACHE } from '@/constants'
import { useApi, useCache } from '@/ui/hooks'

export function useProductStockPage(productDto: ProductDto) {
  const [product, setProduct] = useState(Product.create(productDto))
  const { inventoryMovementService } = useApi()
  const [pageState, setPage] = useQueryState('page', parseAsInteger)
  const page = pageState ?? 1

  async function fetchInventoryMovements() {
    const response = await inventoryMovementService.listInventoryMovements({
      page: page,
      productId: product.id,
    })
    return response.body
  }

  const { data, isFetching, refetch } = useCache({
    fetcher: fetchInventoryMovements,
    key: CACHE.inventoryMovements.key,
    dependencies: [page],
  })

  function handlePageChange(page: number) {
    setPage(page)
  }

  function handleBatchUpdate(updatedBatch: Batch) {
    setProduct((product) => {
      product.updateBatch(updatedBatch)
      return Product.create(product.dto)
    })
  }

  async function handleRegisterInboundInventoryMovementFormSubmit(newBatch: Batch) {
    setProduct((product) => {
      product.appendBatch(newBatch)
      return Product.create(product.dto)
    })
    refetch()
  }

  const inventoryMovements = data ? data.items : []
  const itemsCount = data ? data.itemsCount : 0

  return {
    product,
    inventoryMovements,
    totalPages: Math.round(itemsCount / PAGINATION.itemsPerPage),
    page,
    isFetching,
    handlePageChange,
    handleBatchUpdate,
    handleRegisterInboundInventoryMovementFormSubmit,
  }
}
