'use client'

import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'

export function useNavigation() {
  const { push, refresh } = useRouter()
  const pathname = usePathname()

  function navigateTo(route: string) {
    push(route)
  }

  function refreshPage() {
    refresh()
  }

  return {
    navigateTo,
    refreshPage,
    currentRoute: pathname,
  }
}
