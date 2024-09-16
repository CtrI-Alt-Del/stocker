'use client'

import { useCallback, useState } from 'react'

export function useDrawer() {
  const [isOpen, setIsOpen] = useState(false)

  const open = useCallback(() => {
    setIsOpen(true)
  }, [])

  const close = useCallback(() => {
    setIsOpen(false)
  }, [])

  return {
    isOpen,
    open,
    close,
  }
}
