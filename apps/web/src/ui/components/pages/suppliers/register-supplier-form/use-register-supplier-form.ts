import { useAuthContext } from '@/ui/components/contexts/auth-context'
import { useApi, useToast } from '@/ui/hooks'
import { zodResolver } from '@hookform/resolvers/zod'
import { Supplier } from '@stocker/core/entities'
import {
  cnpjSchema,
  emailSchema,
  nameSchema,
  phoneSchema
} from '@stocker/validation/schemas'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const registerSupplierFormSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  cnpj: cnpjSchema,
  phone: phoneSchema
})
type registerSupplierFormData = z.infer<typeof registerSupplierFormSchema>

export function useRegisterSupplierForm(onSubmit: VoidFunction) {
  const { suppliersService } = useApi()
  const { showError, showSuccess } = useToast()
  const { user } = useAuthContext()

  const { control, formState, reset, register, handleSubmit } =
    useForm<registerSupplierFormData>({
      resolver: zodResolver(registerSupplierFormSchema),
    })
  async function handleFormSubmit(formData: registerSupplierFormData) {

if(!user?.companyId) {
  console.error("Company ID não definido");
  return;
}
    const newSupplier = Supplier.create({
      name: formData.name,
      email: formData.email,
      cnpj: formData.cnpj,
      phone: formData.phone,
      companyId: user?.companyId,
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
