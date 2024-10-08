import { CACHE } from '@/constants'
import { useApi, useCache } from '@/ui/hooks'

export function useWeeklyInventoryMovementsChart() {
  const { reportsService } = useApi()

  async function fetchWeeklyInventoryMovements() {
    const response = await reportsService.reportWeeklyInventoryMovements()
    return response.body
  }

  const { data, isFetching } = useCache({
    fetcher: fetchWeeklyInventoryMovements,
    key: CACHE.weeklyInventoryMovements.key,
  })

  return {
    data,
    isFetching,
  }
}
