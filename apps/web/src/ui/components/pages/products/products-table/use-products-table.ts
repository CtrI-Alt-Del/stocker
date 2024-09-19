import { parseAsInteger, useQueryState } from 'nuqs'

import { useApi, useCache } from '@/ui/hooks'

import { ProductsFaker } from '@stocker/core/fakers'
import { PAGINATION } from '@stocker/core/constants'
import { CACHE } from '@/constants'

export const useProductsTable = () => {
  const { productsService } = useApi()
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

  const { data, isLoading } = useCache({
    fetcher: fetchProducts,
    key: CACHE.productsList.key,
    dependencies: [page],
  })

  const products = data ? data.items : ProductsFaker.fakeManyDto(20)
  const itemsCount = data ? data.itemsCount : 0

  return {
    page,
    filterByNameValue,
    isLoading,
    products,
    totalPages: itemsCount / PAGINATION.itemsPerPage,
    handlePageChange,
    handleSearchChange,
  }
}
