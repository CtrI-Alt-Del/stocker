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
  const { usersService } = useApi()
  const { user } = useAuthContext()
  const {showError,showSuccess} = useToast()
  const userId = user ? user.id : ''
  const { register, formState, handleSubmit } = useForm<FirstPasswordEntryModalData>({
    resolver: zodResolver(FirstPasswordEntryModalSchema),
  })
  async function handleFormSubmit(formData: FirstPasswordEntryModalData) {
    const partialUser: Record<string, unknown> = {}
    partialUser['password'] = formData.password
    partialUser['hasFirstPasswordReset'] = true
    const response = await usersService.updateUser(partialUser, userId)
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
