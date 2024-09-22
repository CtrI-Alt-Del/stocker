import { useCallback } from 'react'
import { toast } from 'react-hot-toast'

export function useToast() {
  const showSuccess = useCallback((message: string) => {
    toast.success(message)
  }, [])

  const showError = useCallback((message: string) => {
    toast.error(message)
  }, [])

  return {
    showSuccess,
    showError,
  }
}
