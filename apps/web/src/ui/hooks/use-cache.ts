'use client'

import useSWR from 'swr'

type MudateConfig = {
  shouldRevalidate: boolean
}

type CacheConfig<CacheData> = {
  key: string
  fetcher: () => Promise<CacheData | undefined>
  dependencies?: unknown[]
  isEnabled?: boolean
  initialData?: CacheData
  refreshInterval?: number
  shouldRefetchOnFocus?: boolean
}

type Cache<CacheData> = {
  data: CacheData | null
  error: string
  isLoading: boolean
  isRefetching: boolean
  refetch: () => void
  mutate: (newCacheData: CacheData | null, consig: MudateConfig) => void
}

export function useCache<CacheData>({
  key,
  fetcher,
  dependencies,
  isEnabled = true,
  shouldRefetchOnFocus = true,
  refreshInterval = 0,
  initialData,
}: CacheConfig<CacheData>): Cache<CacheData> {
  const dependenciesQuery = dependencies
    ? dependencies.map((dependency, index) => `dep_${index + 1}=${dependency}`)
    : ''

  const { data, error, isLoading, isValidating, mutate } = useSWR(
    () => (isEnabled ? `${key}?${dependenciesQuery}` : null),
    fetcher,
    {
      fallbackData: initialData,
      refreshInterval,
      revalidateOnFocus: shouldRefetchOnFocus,
    },
  )

  function mutateCache(newCacheData: CacheData | null, mutateConfig: MudateConfig) {
    if (newCacheData) mutate(newCacheData, { revalidate: mutateConfig.shouldRevalidate })
  }

  return {
    data: data ?? null,
    error,
    isLoading,
    isRefetching: isValidating,
    refetch: () => mutate(),
    mutate: mutateCache,
  }
}
