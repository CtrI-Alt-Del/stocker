import { useState } from 'react'

export function usePasswordInput() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  function handleIconClick() {
    setIsPasswordVisible((isPasswordVisible) => !isPasswordVisible)
  }

  return {
    isPasswordVisible,
    handleIconClick,
  }
}
