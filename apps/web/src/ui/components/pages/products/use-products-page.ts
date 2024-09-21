import { parseAsInteger, useQueryState } from 'nuqs'

import { useApi, useCache } from '@/ui/hooks'
import { CACHE } from '@/constants'
import { PAGINATION } from '@stocker/core/constants'
import { useState } from 'react'

export function useProductsPage() {
  const { productsService } = useApi()
  const [selectedProductsIds, setSelectedProductsIds] = useState<string[]>([])
  const [pageState, setPage] = useQueryState('page', parseAsInteger)
  const [filterByNameValueState, setFilterByNameValue] = useQueryState('name')
  const page = pageState ?? 1
  const filterByNameValue = filterByNameValueState ?? ''

  async function fetchProducts() {
    const response = await productsService.listProducts({ page })
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

  const products = data ? data.items : []
  const itemsCount = data ? data.itemsCount : 0

  async function handleRegisterProductFormSubmit() {
    refetch()
  }

  async function handleUpdateProduct() {
    refetch()
  }

  async function handleDeleteProductsAlertDialogConfirm() {
    const response = await productsService.deleteProducts(selectedProductsIds)

    if (response.isFailure) {
      alert(response.errorMessage)
    }

    if (response.isSuccess) {
      refetch()
      alert('Produto(s) deletado(s) com sucesso')
    }

    setSelectedProductsIds([])
  }

  function handleProductsSelectionChange(productsIds: string[]) {
    setSelectedProductsIds(productsIds)
  }

  return {
    page,
    filterByNameValue,
    isFetching,
    products,
    totalPages: Math.round(itemsCount / PAGINATION.itemsPerPage),
    isDeleteProductsButtonVisible: selectedProductsIds.length > 0,
    handleUpdateProduct,
    handleDeleteProductsAlertDialogConfirm,
    handleRegisterProductFormSubmit,
    handleProductsSelectionChange,
    handlePageChange,
    handleSearchChange,
  }
}
