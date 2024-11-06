'use client'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { emailSchema } from '@stocker/validation/schemas'
import { useApi, useToast } from '@/ui/hooks'

const RequestPasswordFormSchema = z.object({
  email: emailSchema,
})

type RequestPasswordFormData = z.infer<typeof RequestPasswordFormSchema>

export function useRequestPasswordForm() {
  const { formState, register, handleSubmit } = useForm<RequestPasswordFormData>({
    resolver: zodResolver(RequestPasswordFormSchema),
  })
  const { authService } = useApi()
  const { showError, showSuccess } = useToast()

  async function handleFormSubmit({ email }: RequestPasswordFormData) {
    const response = await authService.requestPasswordReset(email)

    if (response.isFailure) {
      showError(response.errorMessage)
      return
    }

    showSuccess(`Pedido de redefinição de senha enviado para ${email}`)
  }

  return {
    fieldErrors: formState.errors,
    isSubmitting: formState.isSubmitting,
    registerField: register,
    handleSubmit: handleSubmit(handleFormSubmit),
  }
}
