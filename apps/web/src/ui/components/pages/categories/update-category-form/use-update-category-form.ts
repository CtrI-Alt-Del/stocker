import { useApi, useToast } from '@/ui/hooks'
import { zodResolver } from '@hookform/resolvers/zod'
import { CategoryDto } from '@stocker/core/dtos'
import { nameSchema } from '@stocker/validation/schemas'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

type useUpdateCateryFormProps = {
  category: CategoryDto
  onCancel: VoidFunction
  onSubmit: VoidFunction
}
const updateCategoryFormSchema = z.object({
  name: nameSchema,
})
type updateCategoryFormData = z.infer<typeof updateCategoryFormSchema>
export function useUpdateCateryForm({
  category,
  onCancel,
  onSubmit,
}: useUpdateCateryFormProps) {
  const { control, formState, reset, register, handleSubmit } =
    useForm<updateCategoryFormData>({
      defaultValues: {
        name: category.name,
      },
      resolver: zodResolver(updateCategoryFormSchema),
    })
  const { categoriesService } = useApi()
  const { showSuccess, showError } = useToast()
  async function handleFormSubmit(formData: updateCategoryFormData) {
    const response = await categoriesService.updateCategory(
      { name: formData.name },
      category.id || "",
    )
    if (response.isFailure) {
      showError(response.errorMessage)
      return
    }
    if (response.isSuccess) {
      showSuccess("Categoria atualizada com sucesso")
      reset() 
      onCancel()
      onSubmit()
    }
  }
  return {
    errors: formState.errors,
    isDirty: formState.isDirty,
    isSubmiting: formState.isSubmitting,
    control,
    register,
    handleSubmit: handleSubmit(handleFormSubmit),
  }
}
