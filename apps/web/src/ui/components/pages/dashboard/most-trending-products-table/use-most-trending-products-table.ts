import { CACHE } from '@/constants'
import { useApi, useCache } from '@/ui/hooks'
import { parseAsInteger, useQueryState } from 'nuqs'

export function useMostTrendingProductsTable() {
  const { reportsService } = useApi()
  const [page, setPage] = useQueryState('most-trending-products-page', parseAsInteger)
  const 

  async function fetchProducts() {
    const response = await reportsService.reportMostTrendingProducts({ page })

    if (response.isFailure) {
      response.throwError()
      showError(response.errorMessage)
      return
    }

    return response.body
  }

  const { data, isFetching, refetch } = useCache({
    fetcher: fetchProducts,
    key: CACHE.mostTrendingProducts.key,
    dependencies: [page],
  })

  return {}
}
