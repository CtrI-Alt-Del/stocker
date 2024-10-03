import { parseAsInteger, useQueryState } from 'nuqs'

import { useApi, useCache, useToast } from '@/ui/hooks'
import { CACHE } from '@/constants'
import { PAGINATION } from '@stocker/core/constants'
import { useState } from 'react'
import { Product } from '@stocker/core/entities'

export function useProductsPage() {
  const { productsService } = useApi()
  const { showSuccess, showError } = useToast()
  const [selectedProductsIds, setSelectedProductsIds] = useState<string[]>([])
  const [pageState, setPage] = useQueryState('page', parseAsInteger)
  const [filterByNameValueState, setFilterByNameValue] = useQueryState('name')
  const [isDeleting, setIsDeleting] = useState(false)
  const page = pageState ?? 1
  const filterByNameValue = filterByNameValueState ?? ''

  async function fetchProducts() {
    const response = await productsService.listProducts({ page })

    if (response.isFailure) {
      response.throwError()
      showError(response.errorMessage)
      return
    }

    return response.body
  }

  function handlePageChange(page: number) {
    setPage(page)
  }

  function handleSearchChange(value: string) {
    setFilterByNameValue(value ?? '')
  }

  const { data, isFetching, refetch } = useCache({
    fetcher: fetchProducts,
    key: CACHE.productsList.key,
    dependencies: [page],
  })

  const products = data ? data.items.map(Product.create) : []
  const itemsCount = data ? data.itemsCount : 0

  async function handleRegisterProductFormSubmit() {
    refetch()
  }

  async function handleUpdateProduct() {
    refetch()
  }

  async function handleDeleteProductsAlertDialogConfirm() {
    setIsDeleting(true)
    const response = await productsService.deleteProducts(selectedProductsIds)

    if (response.isFailure) {
      showError(response.errorMessage)
    }

    if (response.isSuccess) {
      refetch()
      showSuccess('Produto(s) deletado(s) com sucesso')
    }

    setSelectedProductsIds([])
    setIsDeleting(false)
  }

  function handleProductsSelectionChange(productsIds: string[]) {
    setSelectedProductsIds(productsIds)
  }

  return {
    page,
    filterByNameValue,
    isFetching,
    isDeleting,
    products,
    totalPages: Math.ceil(itemsCount / PAGINATION.itemsPerPage),
    selectedProductsIds,
    handleUpdateProduct,
    handleDeleteProductsAlertDialogConfirm,
    handleRegisterProductFormSubmit,
    handleProductsSelectionChange,
    handlePageChange,
    handleSearchChange,
  }
}
