import { zodResolver } from '@hookform/resolvers/zod'
import { emailSchema } from '@stocker/validation/schemas'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const RequestPasswordFormSchema = z.object({
  email: emailSchema,
})
type RequestPasswordFormData = z.infer<typeof RequestPasswordFormSchema>
export function useRequestPasswordForm() {
  const { register, formState, reset, handleSubmit } = useForm<RequestPasswordFormData>({
    resolver: zodResolver(RequestPasswordFormSchema),
  })
  async function handleFormSubmit(formData: RequestPasswordFormData) {
    console.log(formData)
  }
  return {
    register,
    errors: formState.errors,
    handleSubmit: handleSubmit(handleFormSubmit),
    reset,
  }
}
