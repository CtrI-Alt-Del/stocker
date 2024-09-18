import { useCallback } from 'react'
import { parseAsInteger, useQueryState } from 'nuqs'
import { ProductsFaker } from '@stocker/core/fakers'
import { useApi, useCache } from '@/ui/hooks'
import { ProductDto } from '@stocker/core/dtos'
import { usePagination } from '@/ui/hooks/use-pagination'
import { PAGINATION } from '@stocker/core/constants'

export const useProductsTableHook = () => {
  const [pageState, setPage] = useQueryState('page', parseAsInteger)
  const page = pageState ?? 1
  const [filterByNameValueState, setFilterByNameValue] = useQueryState('name')
  const filterByNameValue = filterByNameValueState ?? ''

  const useApiInstance = useApi()

  const fetchProducts = async () => {
    const response = await useApiInstance.productsService.listProducts({ page })
    return response.body.items
  }

  const { data, isLoading } = useCache<ProductDto[]>({
    fetcher: fetchProducts,
    key: '/products',
    dependencies: [page],
  })

  const products = data ?? generateMockProduct
  const loading = isLoading

  console.log(generateMockProduct)
  // Filter products by name Logic :)
  const filteredItemsByName = useMemo(() => {
    if (!filterByNameValue) return products
    return products.filter((product) =>
      product.name.toLowerCase().includes(filterByNameValue.toLowerCase()),
    )
  }, [products, filterByNameValue])

  // Pagination logic :)
  const itemsPerPage = PAGINATION.itemsPerPage
  const { paginatedItems, totalPages } = usePagination(
    filteredItemsByName,
    page,
    itemsPerPage
    ,
  )

  // Search change handle :)
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

//this is a VERY bad mock data,but use here for tests while backend is even worst than this mock
const generateMockProduct: ProductDto[] = ProductsFaker.fakeManyDto(10)
