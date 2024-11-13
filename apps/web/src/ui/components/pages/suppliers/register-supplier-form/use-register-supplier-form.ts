import { useAuthContext } from '@/ui/components/contexts/auth-context'
import { useApi, useToast } from '@/ui/hooks'
import { zodResolver } from '@hookform/resolvers/zod'
import { Supplier } from '@stocker/core/entities'
import {
  emailSchema,
  idSchema,
  nameSchema,
} from '@stocker/validation/schemas'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const registerSupplierFormSchema = z.object({
    id: idSchema,
  name: nameSchema,
  email: emailSchema
})
type registerSupplierFormData = z.infer<typeof registerSupplierFormSchema>

export function useRegisterSupplierForm(onSubmit: VoidFunction) {
  const { suppliersService } = useApi()
  const { showError, showSuccess } = useToast()
  const { control, formState, reset, register, handleSubmit } =
    useForm<registerSupplierFormData>({
      resolver: zodResolver(registerSupplierFormSchema),
    })
  async function handleFormSubmit(formData: registerSupplierFormData) {
    if (!supplier) return

    const newSupplier = Supplier.create({
        id: this.id, //não está certo ainda
      name: formData.name,
      email: formData.email,
    })
    const response = await suppliersService.registerSupplier(newSupplier)

    if (response.isFailure) {
      showError(response.errorMessage)
    }

    if (response.isSuccess) {
      showSuccess('Fornecedor cadastrado com sucesso!')
      reset()
      onSubmit()
    }
  }
  return {
    control,
    errors: formState.errors,
    isSubmiting: formState.isSubmitting,
    reset,
    register,
    handleSubmit: handleSubmit(handleFormSubmit),
  }
}
