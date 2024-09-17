import { useMediaQuery } from 'usehooks-ts'

export function useBreakpoint() {
  const xs = useMediaQuery('(max-width: 440px)')
  const sm = useMediaQuery('(max-width: 640px)')
  const md = useMediaQuery('(max-width: 768px)')
  const lg = useMediaQuery('(max-width: 1024px)')
  const xl = useMediaQuery('(max-width: 1280px)')

  return {
    xs,
    sm,
    md,
    lg,
    xl,
  }
}
