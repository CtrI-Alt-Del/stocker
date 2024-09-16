'use client'

import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'

export function useNavigation() {
  const { push } = useRouter()
  const pathname = usePathname()

  function navigateTo(route: string) {
    push(route)
  }

  return {
    navigateTo,
    currentRoute: pathname,
  }
}
