import {
  useApi,
  useCache,
  useToast,
  useUrlParamNumber,
  useUrlParamString,
} from '@/ui/hooks'
import { CACHE } from '@/constants'
import { PAGINATION } from '@stocker/core/constants'
import { useState } from 'react'
import { Product } from '@stocker/core/entities'

export function useProductsPage() {
  const { productsService } = useApi()
  const { showSuccess, showError } = useToast()
  const [selectedProductsIds, setSelectedProductsIds] = useState<string[]>([])
  const [page, setPage] = useUrlParamNumber('page', 1)
  const [filterByName, setFilterByNameValue] = useUrlParamString('name')
  const [categoryId, setCategoryIdValue] = useUrlParamString('categoryId')
  const [isDeleting, setIsDeleting] = useState(false)

  async function fetchProducts() {
    const response = await productsService.listProducts({
      page,
      name: filterByName,
      categoryId,
    })

    if (response.isFailure) {
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
  function handleCategoryIdSearchChange(categoryId: string) {
    setCategoryIdValue(categoryId ?? '')
  }
  const { data, isFetching, refetch } = useCache({
    fetcher: fetchProducts,
    key: CACHE.productsList.key,
    dependencies: [page, filterByName,categoryId],
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
    categoryId,
    handleCategoryIdSearchChange,
    page,
    filterByNameValue: filterByName,
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
