import { zodResolver } from '@hookform/resolvers/zod'
import { passwordSchema } from '@stocker/validation/schemas'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useAuthContext } from '../../contexts/auth-context'
import { useApi, useToast } from '@/ui/hooks'

const FirstPasswordEntryModalSchema = z.object({
  password: passwordSchema,
})
type FirstPasswordEntryModalData = z.infer<typeof FirstPasswordEntryModalSchema>
export function useFirstPasswordEntryModal() {
  const { user, resetPassword } = useAuthContext()
  const {authService} = useApi()
  const { showError, showSuccess } = useToast()
  const userEmail = user ? user.email : ''
  const { register, formState, handleSubmit } = useForm<FirstPasswordEntryModalData>({
    resolver: zodResolver(FirstPasswordEntryModalSchema),
  })
  async function handleFormSubmit(formData: FirstPasswordEntryModalData) {
    await resetPassword(userEmail, formData.password)
  }

  return {
    register,
    isSubmiting: formState.isSubmitting,
    errors: formState.errors,
    handleSubmit: handleSubmit(handleFormSubmit),
  }
}
