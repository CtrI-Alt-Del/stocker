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
  isFetching: boolean
  isRefetching: boolean
  refetch: () => void
  mutate: (newCacheData: CacheData | null, consig?: MudateConfig) => void
  clearCache: VoidFunction
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
      revalidateOnFocus: shouldRefetchOnFocus,
      refreshInterval,
    },
  )

  function mutateCache(newCacheData: CacheData | null, mutateConfig?: MudateConfig) {
    if (newCacheData)
      mutate(
        newCacheData,
        mutateConfig
          ? { revalidate: mutateConfig.shouldRevalidate }
          : { revalidate: false },
      )
  }

  function clearCache() {
    mutate(undefined)
  }

  return {
    data: data ?? null,
    error,
    isFetching: isLoading,
    isRefetching: isValidating,
    refetch: () => mutate(),
    mutate: mutateCache,
    clearCache,
  }
}
