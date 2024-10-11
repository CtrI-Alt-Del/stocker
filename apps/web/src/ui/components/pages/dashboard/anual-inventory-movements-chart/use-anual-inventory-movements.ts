import { CACHE } from '@/constants'
import { useApi, useCache, useToast, useUrlParamString } from '@/ui/hooks'
import { useState } from 'react'

type useAnualInventoryMovementCharProps = {
  productID?: string
}
export function useAnualInventoryMovementChar() {
  const [productId, setProductId] = useUrlParamString('annual-inventory-product', '')
  const { reportsService, productsService } = useApi()
  const { showError, showSuccess } = useToast()
  async function fetchAnualInventoryMovements() {
    const response = await reportsService.reportAnualInventoryMovements(productId)
    if (response.isFailure) {
      showError(response.errorMessage)
    }
    return response.body
  }
  const { data, isFetching, refetch } = useCache({
    fetcher: fetchAnualInventoryMovements,
    key: CACHE.anualInventoryMovements.key,
    dependencies: [productId],
  })
  function handleProductIDChange(id: string) {
    setProductId(id ? id : '')
    if (id) {
      refetch()
      
    }
  }
  async function fetchProducts() {
    const response = await productsService.getProduct(productId)
    if (response.isFailure) {
      showError(response.errorMessage)
    }
    return response.body
  }
  const { data: productData } = useCache({
    fetcher: fetchProducts,
    key: CACHE.productsList.key,
    dependencies: [productId],
  })

  const AnualMovements = data ? data : []
  return {
    productName: productData?.name || "",
    productId,
    handleProductIDChange,
    AnualMovements,
    isFetching,
  }
}
