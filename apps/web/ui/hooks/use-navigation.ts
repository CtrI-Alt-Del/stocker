import { useRouter } from 'next/router'

export function useNavigation() {
  const { push } = useRouter()

  function navigateTo(route: string) {
    push(route)
  }

  return {
    navigateTo,
  }
}
