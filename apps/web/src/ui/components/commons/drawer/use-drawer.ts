'use client'

import { useCallback, useState } from 'react'

export function useDrawer(onClose?: VoidFunction) {
  const [isOpen, setIsOpen] = useState(false)

  const open = useCallback(() => {
    setIsOpen(true)
  }, [])

  const close = useCallback(() => {
    setIsOpen(false)
    if (onClose) onClose()
  }, [onClose])

  return {
    isOpen,
    open,
    close,
  }
}
