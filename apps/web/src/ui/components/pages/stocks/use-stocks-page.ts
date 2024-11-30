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
import { useQueryState, parseAsInteger } from 'nuqs'

export function useStocksPage() {
  const { reportsService } = useApi()
  const { showError } = useToast()
  const [page, setPage] = useUrlParamNumber('page', 1)
  const [categorySearchValue, setCategorySearchChange] = useUrlParamString('categoryId')
  const [stockLevelSearch, setStockLeveLSaerchChange] = useUrlParamString('status')
  const [filterByNameValue, setFilterByNameValue] = useUrlParamString('name')

  async function fetchProducts() {
    const response = await reportsService.reportInventory({
      page,
      name: filterByNameValue,
      stockLevel: stockLevelSearch as StockLevel,
      categoryId: categorySearchValue,
    })

    if (response.isFailure) {
      showError(response.errorMessage)
      return
    }

    return response.body
  }

  function handleCategorySearchChange(categoryId: string) {
    setCategorySearchChange(categoryId)
  }
  function handleStockLevelSearchChange(status:string) {
    setStockLeveLSaerchChange(status)
  }
  const { data, isFetching } = useCache({
    fetcher: fetchProducts,
    key: CACHE.productsList.key,
    dependencies: [page, filterByNameValue, stockLevelSearch,categorySearchValue],
  })

  const products = data ? data.items.map(Product.create) : []
  const itemsCount = data ? data.itemsCount : 0

  function handlePageChange(page: number) {
    setPage(page)
  }

  function handleSearchChange(value: string) {
    setFilterByNameValue(value)
  }

  return {
    handlePageChange,
    page,
    stockLevelSearch,
    handleStockLevelSearchChange,
    fetchProducts,
    isFetching,
    products,
    filterByNameValue,
    handleSearchChange,
    categorySearchValue,
    handleCategorySearchChange,
    totalPages: Math.ceil(itemsCount / PAGINATION.itemsPerPage),
  }
}
