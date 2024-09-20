'use client'

import { useSWRConfig } from 'swr'

export function useGlobalCache() {
  const { mutate } = useSWRConfig()

  async function refetch(key: string) {
    await mutate(key, [], { revalidate: true })
  }

  return {
    refetch,
  }
}
