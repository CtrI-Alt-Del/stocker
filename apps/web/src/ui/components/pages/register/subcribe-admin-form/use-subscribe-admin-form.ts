import { emailSchema, nameSchema, cnpjSchema } from '@stocker/validation/schemas'
import { z } from 'zod'
import { passwordSchema } from '../../../../../../../../packages/validation/src/schemas/password-schema'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

const subscribeAdminFormSchema = z
  .object({
    adminName: nameSchema,
    adminEmail: emailSchema,
    companyName: nameSchema,
    CNPJ: cnpjSchema,
    password: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não estão iguais',
    path: ['confirmPassword'],
  })

type SubscribeAdminFormData = z.infer<typeof subscribeAdminFormSchema>

export function useSubscribeAdminForm(onSubmit: VoidFunction) {
  const { control, formState, reset, register, handleSubmit } =
    useForm<SubscribeAdminFormData>({
      resolver: zodResolver(subscribeAdminFormSchema),
    })
  async function handleFormSubmit(formData: SubscribeAdminFormData) {
    console.log(formData)
  }
  return {
    control,
    reset,
    register,
    errors: formState.errors,
    handleSubmit: handleSubmit(handleFormSubmit),
  }
}
