import { useApi, useToast } from '@/ui/hooks'
import { zodResolver } from '@hookform/resolvers/zod'
import type { SupplierDto } from '@stocker/core/dtos'
import { cnpjSchema, emailSchema, nameSchema, passwordSchema } from '@stocker/validation/schemas'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

type useUpdateSupplierFormProps = {
  supplier: SupplierDto
  onCancel: VoidFunction
  onSubmit: VoidFunction
}

const updateSupplierFormSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  cnpj: cnpjSchema,
  phone: phoneSchema
})
type updateSupplierFormData = z.infer<typeof updateSupplierFormSchema>
export function useUpdateSupplierForm({
  supplier,
  onCancel,
  onSubmit,
}: useUpdateSupplierFormProps) {
  const { usersService } = useApi()
  const { showSuccess, showError } = useToast()
  const { formState, reset, register, handleSubmit, control } =
    useForm<updateSupplierFormData>({
      defaultValues: {
        name: supplier.name,
        email: supplier.email,
        cnpj: supplier.cnpj,
        phone: supplier.phone
      },
      resolver: zodResolver(updateSupplierFormSchema),
    })
  async function handleFormSubmit(formData: updateSupplierFormData) {
    const partialUser: Record<string, unknown> = {}
    const updatedFields = Object.keys(formState.dirtyFields)
    for (const updatedField of updatedFields) {
      const updatedValue = formData[updatedField as keyof updateSupplierFormData]
      partialUser[updatedField] = updatedValue
    }
    if (!supplier.id) {
      return
    }
    const response = await usersService.updateUser(
      partialUser as Partial<SupplierDto>,
      supplier.id,
    )
    if (response.isFailure) {
      showError(response.errorMessage)
      return
    }
    if (response.isSuccess) {
      showSuccess('Fornecedor atualizado com sucesso!')
      reset()
      onCancel()
      onSubmit()
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
