import { emailSchema } from '@stocker/validation/schemas'
import { z } from 'zod'
import { passwordSchema } from '../../../../../../../../packages/validation/src/schemas/password-schema'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

const loginAdminFormSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
  })

type LoginAdminFormData = z.infer<typeof loginAdminFormSchema>

export function useLoginAdminForm(onSubmit: VoidFunction) {
  const { register, formState, handleSubmit } =
    useForm<LoginAdminFormData>({
      resolver: zodResolver(loginAdminFormSchema),
    })
  async function handleFormSubmit(formData: LoginAdminFormData) {
    console.log(formData)
  }
  return {
    registerField: register,
    errors: formState.errors,
    handleSubmit: handleSubmit(handleFormSubmit),
  }
}
