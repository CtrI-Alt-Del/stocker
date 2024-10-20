import { CACHE } from '@/constants'
import { useApi, useCache, useToast, useUrlParamNumber } from '@/ui/hooks'
import { PAGINATION } from '@stocker/core/constants'
import { Product } from '@stocker/core/entities'
import { useState } from 'react'

export function useProductSelect(
  productId: string,
  onSelectChange: (productId: string) => void,
) {
  // const [productId, setProductId] = useState('')
  const [page, setPage] = useState(1)
  const { productsService } = useApi()
  const { showError } = useToast()

  function handleProductIdChange(selectedProductsIds: string[]) {
    const productId = selectedProductsIds[0]
    if (!productId) return

    // setProductId(productId)
    onSelectChange(productId)
  }

  function handlePageChange(page: number) {
    setPage(page)
  }

  async function fetchProduct() {
    if (!productId) return

    const response = await productsService.getProduct(productId)
    if (response.isFailure) {
      showError(response.errorMessage)
    }
    return response.body
  }

  async function fetchProducts() {
    const response = await productsService.listProducts({ page })

    if (response.isFailure) {
      showError(response.errorMessage)
      return
    }

    return response.body
  }

  const { data: productData } = useCache({
    fetcher: fetchProduct,
    key: CACHE.product.key,
    dependencies: [productId],
  })

  const { data: productsData, isFetching } = useCache({
    fetcher: fetchProducts,
    key: CACHE.productsList.key,
    dependencies: [page],
  })

  const products = productsData
    ? productsData.items.map(Product.create).filter((product) => product.isActive)
    : []
  const itemsCount = productsData ? productsData.itemsCount : 0

  return {
    productId,
    productName: productData?.name || '',
    page,
    products,
    totalPages: Math.ceil(itemsCount / PAGINATION.itemsPerPage),
    isFetching,
    handleProductIdChange,
    handlePageChange,
  }
}
