import { useApi, useToast } from '@/ui/hooks'
import { zodResolver } from '@hookform/resolvers/zod'
import { Location } from '@stocker/core/entities'
import { nameSchema } from '@stocker/validation/schemas'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

type useUpdateLocationFormProps = {
  location: Location
  onCancel: VoidFunction
  onSubmit: VoidFunction
}
const updateLocationFormSchema = z.object({
  name: nameSchema,
})
type updateLocationFormData = z.infer<typeof updateLocationFormSchema>
export function useUpdateLocationForm({
  location,
  onCancel,
  onSubmit,
}: useUpdateLocationFormProps) {
  const { formState, reset, register, handleSubmit } = useForm<updateLocationFormData>({
    defaultValues: {
      name: location.name,
    },
    resolver: zodResolver(updateLocationFormSchema),
  })
  const { locationsService } = useApi()
  const { showSuccess, showError } = useToast()
  async function handleFormSubmit(formData: updateLocationFormData) {
    const response = await locationsService.updateLocation(
      { name: formData.name },
      location.id,
    )
    if(response.isFailure){
      showError(response.errorMessage)
      return
    }
    if(response.isSuccess){
      showSuccess("Local atualizado com sucesso")
      reset()
      onSubmit()
    }
  }
  return {
    errors: formState.errors,
    isDirty: formState.isDirty,
    isSubmitting: formState.isSubmitting,
    register,
    handleSubmit: handleSubmit(handleFormSubmit)
  }
}
