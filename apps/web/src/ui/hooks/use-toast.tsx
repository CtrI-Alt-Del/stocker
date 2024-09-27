import { useCallback } from 'react'
import { toast } from 'react-hot-toast'
import { SuccessToast } from '../components/commons/toast/sucess'
import { ErrorToast } from '../components/commons/toast/error'

export function useToast() {
  const showSuccess = useCallback((message: string) => {
    toast.custom((t) => <SuccessToast message={message} t={t} />)
  }, [])

  const showError = useCallback((message: string) => {
    toast.custom((t) => <ErrorToast message={message} t={t} />)
  }, [])

  return { showSuccess, showError }
}
