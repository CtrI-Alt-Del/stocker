import { useState } from 'react'
import { parseAsInteger, useQueryState } from 'nuqs'

import { PAGINATION } from '@stocker/core/constants'
import type { ProductDto } from '@stocker/core/dtos'
import { type Batch, InventoryMovement, Product } from '@stocker/core/entities'

import { CACHE } from '@/constants'
import { useApi, useCache, useToast } from '@/ui/hooks'

export function useProductStockPage(productDto: ProductDto) {
  const { batchesService, inventoryMovementService } = useApi()
  const [product, setProduct] = useState(Product.create(productDto))
  const [selectedBatchesIds, setSelectedBatchesIds] = useState<string[]>([])
  const [pageState, setPage] = useQueryState('page', parseAsInteger)
  const [isDeletingBatches, setIsDeletingBatches] = useState(false)
  const { showError, showSuccess } = useToast()
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

  function handleBatchesIdsSelectionChange(selectedBatchesIds: string[]) {
    setSelectedBatchesIds(selectedBatchesIds)
  }

  async function handleDeleteBatchesButtonClick() {
    setIsDeletingBatches(true)
    const respose = await batchesService.deleteBatches(selectedBatchesIds)

    if (respose.isFailure) {
      showError(respose.errorMessage)
    }

    if (respose.isSuccess) {
      showSuccess('Lote(s) deletado(s) com sucesso')

      setProduct((product) => {
        product.deleteBatches(selectedBatchesIds)
        return Product.create(product.dto)
      })
    }

    setIsDeletingBatches(false)
    setSelectedBatchesIds([])
  }

  async function handleRegisterInboundInventoryMovementFormSubmit(newBatch: Batch) {
    setProduct((product) => {
      product.appendBatch(newBatch)
      return Product.create(product.dto)
    })
    refetch()
  }

  async function handleRegisterOutboundInventoryMovementFormSubmit() {
    refetch()
  }

  const inventoryMovements = data ? data.items.map(InventoryMovement.create) : []
  const itemsCount = data ? data.itemsCount : 0

  return {
    product,
    inventoryMovements,
    totalPages: Math.ceil(itemsCount / PAGINATION.itemsPerPage),
    page,
    isFetching,
    isDeletingBatches,
    selectedBatchesIds,
    handlePageChange,
    handleBatchUpdate,
    handleDeleteBatchesButtonClick,
    handleBatchesIdsSelectionChange,
    handleRegisterInboundInventoryMovementFormSubmit,
    handleRegisterOutboundInventoryMovementFormSubmit,
  }
}
