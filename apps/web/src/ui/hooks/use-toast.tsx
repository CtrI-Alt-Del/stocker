import { useCallback } from 'react'
import { toast } from 'react-hot-toast'
import { SuccessToast } from '../components/commons/toast/success'
import { ErrorToast } from '../components/commons/toast/error'

export function useToast() {
  const showSuccess = useCallback((message: string) => {
    toast.custom((t) => (
      <SuccessToast
        isVisible={t.visible}
        message={message}
        onClose={() => toast.dismiss(t.id)}
      />
    ))
  }, [])

  const showError = useCallback((message: string) => {
    toast.custom((t) => (
      <ErrorToast
        isVisible={t.visible}
        message={message}
        onClose={() => toast.dismiss(t.id)}
      />
    ))
  }, [])

  return { showSuccess, showError }
}
