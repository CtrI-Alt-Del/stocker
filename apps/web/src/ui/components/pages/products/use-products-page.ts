import { parseAsInteger, useQueryState } from 'nuqs'

import { useApi, useCache } from '@/ui/hooks'
import { CACHE } from '@/constants'
import { PAGINATION } from '@stocker/core/constants'

export function useProductsPage() {
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

  return {
    page,
    filterByNameValue,
    isFetching,
    products,
    totalPages: Math.round(itemsCount / PAGINATION.itemsPerPage),
    handleUpdateProduct,
    handleRegisterProductFormSubmit,
    handlePageChange,
    handleSearchChange,
  }
}
