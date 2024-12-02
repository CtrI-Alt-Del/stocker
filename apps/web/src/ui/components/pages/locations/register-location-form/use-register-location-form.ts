import { useAuthContext } from '@/ui/components/contexts/auth-context'
import { useApi, useToast } from '@/ui/hooks'
import { zodResolver } from '@hookform/resolvers/zod'
import { Category, Location } from '@stocker/core/entities'
import { nameSchema } from '@stocker/validation/schemas'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const registerLocationFormSchema = z.object({
  name: nameSchema,
})
type RegisterLocationFormData = z.infer<typeof registerLocationFormSchema>
type useRegisterLocationFormProps = {
  onSubmit: VoidFunction
  parentLocationId?: string
}
export function useRegisterLocationForm({
  onSubmit,
  parentLocationId,
}: useRegisterLocationFormProps) {
  const { control, formState, reset, register, handleSubmit } =
    useForm<RegisterLocationFormData>({
      resolver: zodResolver(registerLocationFormSchema),
    })
  const { showSuccess, showError } = useToast()
  const { locationsService } = useApi()
  const { company } = useAuthContext()
  const companyId = company ? company.id : ''
  async function handleFormSubmit(formData: RegisterLocationFormData) {
    const location = Location.create({
      name: formData.name,
      parentLocationId: parentLocationId ? parentLocationId : undefined,
      companyId: companyId,
      subLocations: [],
    })
    const response = await locationsService.registerLocation(location)
    if (response.isFailure) {
      showError(response.errorMessage)
    }
    if (response.isSuccess) {
      showSuccess('Local cadastrado com sucesso')
      reset()
      onSubmit()
    }
  }
  return {
    errors: formState.errors,
    isSubmiting: formState.isSubmitting,
    register,
    handleSubmit: handleSubmit(handleFormSubmit),
  }
}
