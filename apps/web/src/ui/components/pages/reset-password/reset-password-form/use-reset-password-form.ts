import { z } from 'zod'
import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { passwordSchema } from '@stocker/validation/schemas'
import { useApi, useToast } from '@/ui/hooks'
import { deleteCookieAction } from '@/actions'
import { COOKIES } from '@/constants'

const ResetPasswordFormSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine((set) => set.password === set.confirmPassword, {
    message: 'As senhas não estão iguais!',
    path: ['confirmPassword'],
  })

type ResetPasswordFormData = z.infer<typeof ResetPasswordFormSchema>
export function useResetPasswordForm(email: string) {
  const { authService } = useApi()
  const { showError } = useToast()
  const [isSuccess, setIsSuccess] = useState<boolean>(false)

  const { formState, control, reset, handleSubmit } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(ResetPasswordFormSchema),
  })

  async function handleFormSubmit({ password }: ResetPasswordFormData) {
    const response = await authService.resetPassword(email, password)

    if (response.isFailure) {
      showError(response.errorMessage)
      reset()
      return
    }

    setIsSuccess(true)
  }

  const deletePasswordResetToken = useCallback(async () => {
    await deleteCookieAction(COOKIES.passwordResetToken.key)
  }, [])

  useEffect(() => {
    return () => {
      if (isSuccess) deletePasswordResetToken()
    }
  }, [isSuccess, deletePasswordResetToken])

  return {
    isSuccess,
    isSubmitting: formState.isSubmitting,
    fieldErrors: formState.errors,
    formControl: control,
    handleSubmit: handleSubmit(handleFormSubmit),
  }
}
