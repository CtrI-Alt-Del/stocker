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
import { useAuthContext } from '../../contexts/auth-context'

export function useProductsPage() {
  const { user } = useAuthContext()
  const { productsService } = useApi()
  const { showSuccess, showError } = useToast()
  const [selectedProductsIds, setSelectedProductsIds] = useState<string[]>([])
  const [page, setPage] = useUrlParamNumber('page', 1)
  const [productName, productNameValue] = useUrlParamString('name')
  const [categoryId, setCategoryIdValue] = useUrlParamString('categoryId')
  const [locationId, setLocationIdValue] = useUrlParamString('locationId')
  const [supplierId, setsupplierIdValue] = useUrlParamString('supplierId')
  const [isDeleting, setIsDeleting] = useState(false)

  async function fetchProducts() {
    if (!user) return

    const response = await productsService.listProducts({
      page,
      categoryId,
      locationId,
      supplierId,
      name: productName,
      companyId: user.companyId,
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
    productNameValue(value ?? '')
  }
  function handleLocationIdchange(locationId: string) {
    setLocationIdValue(locationId)
  }
  function handleCategoryIdSearchChange(categoryId: string) {
    setCategoryIdValue(categoryId ?? null)
  }
  function handleSupplierIdSearchChange(supplierId: string) {
    setsupplierIdValue(supplierId ?? null)
  }
  const { data, isFetching, refetch } = useCache({
    fetcher: fetchProducts,
    key: CACHE.productsList.key,
    dependencies: [page, productName, categoryId,locationId],
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
    productName,
    categoryId,
    isFetching,
    isDeleting,
    products,
    selectedProductsIds,
    totalPages: Math.ceil(itemsCount / PAGINATION.itemsPerPage),
    handleCategoryIdSearchChange,
    handleSupplierIdSearchChange,
    handleUpdateProduct,
    handleDeleteProductsAlertDialogConfirm,
    handleRegisterProductFormSubmit,
    handleProductsSelectionChange,
    handlePageChange,
    handleLocationIdchange,
    handleSearchChange,
  }
}
