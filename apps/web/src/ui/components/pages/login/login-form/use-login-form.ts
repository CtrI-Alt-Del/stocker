import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { emailSchema, passwordSchema } from '@stocker/validation/schemas'

import { useAuthContext } from '@/ui/components/contexts/auth-context'

const loginAdminFormSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
})

type LoginAdminFormData = z.infer<typeof loginAdminFormSchema>

export function useLoginForm() {
  const { control, formState, handleSubmit, register } = useForm<LoginAdminFormData>({
    resolver: zodResolver(loginAdminFormSchema),
  })
  const { login } = useAuthContext()

  async function handleFormSubmit({ email, password }: LoginAdminFormData) {
    await login(email, password)
  }

  return {
    formControl: control,
    errors: formState.errors,
    isSubmitting: formState.isSubmitting,
    registerField: register,
    handleSubmit: handleSubmit(handleFormSubmit),
  }
}
