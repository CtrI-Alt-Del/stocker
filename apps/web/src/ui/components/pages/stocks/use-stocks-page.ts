import { ReportsService } from "@/api/services"
import { CACHE } from "@/constants"
import { useApi, useCache, useToast, useUrlParamString } from "@/ui/hooks"
import { PAGINATION } from "@stocker/core/constants"
import { Product } from "@stocker/core/entities"
import { useQueryState, parseAsInteger } from "nuqs"

export function useStocksPage() {
  const { reportsService } = useApi()
  const { showError } = useToast()
  const [pageState, setPage] = useQueryState('page', parseAsInteger)
  const page = pageState ?? 1
  const [filterByNameValueState, setFilterByNameValue] = useUrlParamString('product')
  const filterByNameValue = filterByNameValueState ?? ''

  async function fetchProducts() {
    const response = await reportsService.reportInventory({ page })

    if (response.isFailure) {
      showError(response.errorMessage)
      return
    }

    return response.body
  }

  const { data, isFetching } = useCache({
    fetcher: fetchProducts,
    key: CACHE.productsList.key,
    dependencies: [page],
  })

  const products = data ? data.items.map(Product.create) : []
  const itemsCount = data ? data.itemsCount : 0

  function handlePageChange(page: number) {
    setPage(page)
  }

  function handleSearchChange(value: string) {
    setFilterByNameValue(value ?? '')
  }


  return {
    handlePageChange,
    page,
    fetchProducts,
    isFetching,
    products,
    filterByNameValue,
    handleSearchChange,
    totalPages: Math.ceil(itemsCount / PAGINATION.itemsPerPage),
  }
  
}
