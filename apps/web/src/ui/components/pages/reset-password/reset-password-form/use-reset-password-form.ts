import { zodResolver } from '@hookform/resolvers/zod'
import { passwordSchema } from '@stocker/validation/schemas'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

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
  const [isSucess,setIsSucess] = useState<boolean>(false)
  const { register, handleSubmit, formState, reset } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(ResetPasswordFormSchema),
  })
  async function handleFormSubmit(formData: ResetPasswordFormData) {
    console.log(formData)
    setIsSucess(true)
  }
  return {
    isSucess,
    errors: formState.errors,
    register,
    handleSubmit: handleSubmit(handleFormSubmit),
    reset,
  }
}