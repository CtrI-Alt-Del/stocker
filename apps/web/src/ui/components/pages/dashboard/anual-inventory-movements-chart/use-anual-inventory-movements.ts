import { CACHE } from '@/constants'
import { useApi, useCache, useToast } from '@/ui/hooks'

export function useAnualInventoryMovementChar() {
  const { reportsService } = useApi()
  const {showError,showSuccess} =useToast()
  async function fetchAnualInventoryMovements() {
    const response = await reportsService.reportAnualInventoryMovements()
    if (response.isFailure) {
      showError(response.errorMessage)
      
    }
    return response.body
  }
  const {data,isFetching,refetch} = useCache({
    fetcher:fetchAnualInventoryMovements,
    key: CACHE.anualInventoryMovements.key,
  })
}
