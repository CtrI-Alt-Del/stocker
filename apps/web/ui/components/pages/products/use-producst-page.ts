'use client'

import { useState } from 'react'

export function useProductsPage() {
  const [isDisabled, setIsDisabled] = useState(false)

  function handleButtonClick(quantinty: number) {
    setIsDisabled(false)
  }

  return {
    isDisabled,
    handleButtonClick,
  }
}
