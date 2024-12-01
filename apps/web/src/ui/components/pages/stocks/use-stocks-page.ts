import { CACHE } from '@/constants'
import {
  useApi,
  useCache,
  useToast,
  useUrlParamNumber,
  useUrlParamString,
} from '@/ui/hooks'
import { PAGINATION } from '@stocker/core/constants'
import { Product } from '@stocker/core/entities'
import type { StockLevel } from '@stocker/core/types'

export function useStocksPage() {
  const { reportsService } = useApi()
  const { showError } = useToast()
  const [page, setPage] = useUrlParamNumber('page', 1)
  const [stockLevel, setStockLeveL] = useUrlParamString('stockLevel')
  const [categoryId, setCategoryId] = useUrlParamString('categoryId')
  const [locationId, setLocationId] = useUrlParamString('locationId')
  const [supplierId, setSupplierId] = useUrlParamString('supplierId')
  const [productName, setProductName] = useUrlParamString('productName')

  async function fetchProducts() {
    const response = await reportsService.reportInventory({
      page,
      productName,
      stockLevel: stockLevel as StockLevel,
      categoryId,
      locationId,
      supplierId,
    })

    if (response.isFailure) {
      showError(response.errorMessage)
      return
    }

    return response.body
  }

  function handleStockLevelChange(status: string) {
    setStockLeveL(status)
  }

  function handleCategoryIdChange(categoryId: string) {
    setCategoryId(categoryId)
  }

  function handleSupplierIdChange(supplierId: string) {
    setSupplierId(supplierId)
  }

  function handleLocationIdChange(locationId: string) {
    setLocationId(locationId)
  }

  function handlePageChange(page: number) {
    setPage(page)
  }

  function handleSearchChange(value: string) {
    setProductName(value)
  }

  const { data, isFetching } = useCache({
    fetcher: fetchProducts,
    key: CACHE.productsList.key,
    dependencies: [page, productName, stockLevel, categoryId, locationId, supplierId],
  })

  const products = data ? data.items.map(Product.create) : []
  const itemsCount = data ? data.itemsCount : 0

  return {
    page,
    stockLevel,
    isFetching,
    products,
    productName,
    supplierId,
    categoryId,
    locationId,
    totalPages: Math.ceil(itemsCount / PAGINATION.itemsPerPage),
    handleCategoryIdChange,
    handleSupplierIdChange,
    handleLocationIdChange,
    handleStockLevelChange,
    fetchProducts,
    handleSearchChange,
    handlePageChange,
  }
}
