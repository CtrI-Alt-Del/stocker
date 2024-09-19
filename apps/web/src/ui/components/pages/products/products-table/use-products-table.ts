import { useCallback } from 'react'
import { parseAsInteger, useQueryState } from 'nuqs'

import { useApi, useCache } from '@/ui/hooks'
import { usePagination } from '@/ui/hooks/use-pagination'

import type { ProductDto } from '@stocker/core/dtos'
import { ProductsFaker } from '@stocker/core/fakers'
import { PAGINATION } from '@stocker/core/constants'

const generateMockProduct: ProductDto[] = ProductsFaker.fakeManyDto(20)

export const useProductsTable = () => {
  const [pageState, setPage] = useQueryState('page', parseAsInteger)
  const page = pageState ?? 1
  const [filterByNameValueState, setFilterByNameValue] = useQueryState('name')
  const filterByNameValue = filterByNameValueState ?? ''

  const { productsService } = useApi()

  const fetchProducts = async () => {
    const response = await productsService.listProducts({ page })
    return response.body.items
  }

  const { data, isLoading } = useCache<[]>({
    fetcher: fetchProducts,
    key: '/products',
    dependencies: [page],
  })

  const products = data ?? generateMockProduct
  const loading = isLoading

  const filteredItemsByName = products.filter((product) =>
    product.name.toLowerCase().includes(filterByNameValue.toLowerCase()),
  )

  const itemsPerPage = PAGINATION.itemsPerPage
  const { paginatedItems, totalPages } = usePagination(
    filteredItemsByName,
    page,
    itemsPerPage,
  )

  const onSearchChange = useCallback(
    (value: string | null) => {
      setFilterByNameValue(value ?? '')
      if (value) setPage(1)
    },
    [setFilterByNameValue, setPage],
  )

  return {
    page,
    setPage,
    filterByNameValue,
    onSearchChange,
    paginatedProducts: paginatedItems,
    totalPages,
    loading,
  }
}
