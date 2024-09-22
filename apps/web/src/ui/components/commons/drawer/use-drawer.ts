'use client'

import { useCallback, useState } from 'react'

export function useDrawer(onOpen?: VoidFunction, onClose?: VoidFunction) {
  const [isOpen, setIsOpen] = useState(false)

  const open = useCallback(() => {
    setIsOpen(true)
    if (onOpen) onOpen()
  }, [onOpen])

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
