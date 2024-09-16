'use client'

import { useState } from 'react'

export function useNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  function handleMenuOpenChange(isOpen: boolean) {}

  return {
    isMenuOpen,
  }
}
