import { z } from 'zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { passwordSchema } from '@stocker/validation/schemas'

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
export function useResetPasswordForm() {
  const [isSuccess, setIsSuccess] = useState<boolean>(false)

  const { formState, control, handleSubmit } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(ResetPasswordFormSchema),
  })

  async function handleFormSubmit(formData: ResetPasswordFormData) {
    console.log(formData)
    setIsSuccess(true)
  }

  return {
    isSuccess,
    fieldErrors: formState.errors,
    formControl: control,
    handleSubmit: handleSubmit(handleFormSubmit),
  }
}
