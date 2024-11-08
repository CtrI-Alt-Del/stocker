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
  const { authService } = useApi()
  const { user } = useAuthContext()
  const {showError,showSuccess} = useToast()
  const userEmail = user ? user.email : ''
  const { register, formState, handleSubmit } = useForm<FirstPasswordEntryModalData>({
    resolver: zodResolver(FirstPasswordEntryModalSchema),
  })
  async function handleFormSubmit(formData: FirstPasswordEntryModalData) {
    const response = await authService.resetPassword(userEmail,formData.password) 
    if (response.isSuccess) {
      showSuccess("Senha definida com sucesso")
    }
    if (response.isFailure) {
      showError(response.errorMessage)
      
    }
  }

  return {
    register,
    errors: formState.errors,
    handleSubmit: handleSubmit(handleFormSubmit),
  }
}
