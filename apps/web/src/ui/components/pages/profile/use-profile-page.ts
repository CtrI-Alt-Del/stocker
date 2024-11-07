import { useApi, useToast } from '@/ui/hooks'
import { zodResolver } from '@hookform/resolvers/zod'
import type { CompanyDto, UserDto } from '@stocker/core/dtos'
import { cnpjSchema, companyNameSchema, emailSchema, nameSchema } from '@stocker/validation/schemas'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

type useUpdateProfileFormProps = {
  user: UserDto
  company: CompanyDto
}

const updateProfileFormSchema = z.object({
  name: nameSchema,
  companyName: companyNameSchema,
  cnpj: cnpjSchema,
  email: emailSchema,
})
type updateProfileFormData = z.infer<typeof updateProfileFormSchema>
export function useUpdateProfileForm({
  user,
  company,
}: useUpdateProfileFormProps) {
  const { usersService } = useApi()
  const { showSuccess, showError } = useToast()
  const { formState, reset, register, handleSubmit, control } =
    useForm<updateProfileFormData>({
      defaultValues: {
        name: user.name,
        companyName: company.name,
        cnpj: company.cnpj,
        email: user.email,
      },
      resolver: zodResolver(updateProfileFormSchema),
    })
  async function handleFormSubmit(formData: updateProfileFormData) {
    const partialUser: Record<string, unknown> = {}
    const updatedFields = Object.keys(formState.dirtyFields)
    for (const updatedField of updatedFields) {
      const updatedValue = formData[updatedField as keyof updateProfileFormData]
      partialUser[updatedField] = updatedValue
    }
    if (!user.id) {
      return
    }
    const response = await usersService.updateUser(
      partialUser as Partial<UserDto>,
      user.id
    )
    if (response.isFailure) {
      showError(response.errorMessage)
      return
    }
    if (response.isSuccess) {
      showSuccess('Administrador atualizado com sucesso!')
      reset()
    }
  }
  return {
    errors: formState.errors,
    isDirty: formState.isDirty,
    isSubmiting: formState.isSubmitting,
    register,
    control,
    handleSubmit: handleSubmit(handleFormSubmit),
  }
}
