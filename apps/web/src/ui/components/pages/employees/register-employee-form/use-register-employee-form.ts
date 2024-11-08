import { useAuthContext } from '@/ui/components/contexts/auth-context'
import { useApi, useToast } from '@/ui/hooks'
import { zodResolver } from '@hookform/resolvers/zod'
import { User } from '@stocker/core/entities'
import {
  emailSchema,
  nameSchema,
  passwordSchema,
  stringSchema,
} from '@stocker/validation/schemas'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const registerEmployeeFormSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  role: z.enum(['manager', 'employee'], {
    errorMap: () => ({ message: 'Cargo é obrigatório' }),
  }),
})
type registerEmployeeFormData = z.infer<typeof registerEmployeeFormSchema>

export function useRegisterEmployeeForm(onSubmit: VoidFunction) {
  const { usersService } = useApi()
  const { showError, showSuccess } = useToast()
  const { user } = useAuthContext()
  const { control, formState, reset, register, handleSubmit } =
    useForm<registerEmployeeFormData>({
      resolver: zodResolver(registerEmployeeFormSchema),
    })
  async function handleFormSubmit(formData: registerEmployeeFormData) {
    if (!user) return

    const newUser = User.create({
      name: formData.name,
      role: formData.role,
      email: formData.email,
      hasFirstPasswordReset: false,
      companyId: user.companyId,
    })
    const response = await usersService.registerUser(newUser)

    if (response.isFailure) {
      showError(response.errorMessage)
    }

    if (response.isSuccess) {
      showSuccess('Funcinário cadastrado com sucesso!')
      reset()
      onSubmit()
    }
  }
  return {
    control,
    reset,
    register,
    errors: formState.errors,
    isSubmiting: formState.isSubmitting,
    handleSubmit: handleSubmit(handleFormSubmit),
  }
}
