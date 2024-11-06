import { useApi, useToast } from '@/ui/hooks'
import { zodResolver } from '@hookform/resolvers/zod'
import type { UserDto } from '@stocker/core/dtos'
import type { User } from '@stocker/core/entities'
import { emailSchema, nameSchema, passwordSchema } from '@stocker/validation/schemas'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

type useUpdateEmployeeFormProps = {
  employee: UserDto
  onCancel: VoidFunction
  onSubmit: VoidFunction
}

const updateEmployeeFormSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  role: z.enum(['manager', 'employee'], {
    message: 'Cargo é obrigatório',
  }),
})
type updateEmployeeFormData = z.infer<typeof updateEmployeeFormSchema>
export function useUpdateEmployeeForm({
  employee,
  onCancel,
  onSubmit,
}: useUpdateEmployeeFormProps) {
  const { usersService } = useApi()
  const { showSuccess, showError } = useToast()
  const { formState, reset, register, handleSubmit, control } =
    useForm<updateEmployeeFormData>({
      defaultValues: {
        name: employee.name,
        email: employee.email,
        role: ['manager', 'employee'].includes(employee.role)
          ? (employee.role as 'manager' | 'employee')
          : undefined,
      },
      resolver: zodResolver(updateEmployeeFormSchema),
    })
  async function handleFormSubmit(formData: updateEmployeeFormData) {
    const partialUser: Record<string, unknown> = {}
    const updatedFields = Object.keys(formState.dirtyFields)
    for (const updatedField of updatedFields) {
      const updatedValue = formData[updatedField as keyof updateEmployeeFormData]
      partialUser[updatedField] = updatedValue
    }
    if (!employee.id) {
      return
    }
    const response = await usersService.updateUser(
      partialUser as Partial<UserDto>,
      employee.id
    )
    if (response.isFailure) {
      showError(response.errorMessage)
      return
    }
    if (response.isSuccess) {
      showSuccess('Funcionário atualizado com sucesso!')
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
