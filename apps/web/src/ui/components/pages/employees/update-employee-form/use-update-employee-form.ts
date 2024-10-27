import { zodResolver } from '@hookform/resolvers/zod'
import type { User } from '@stocker/core/entities'
import { emailSchema, nameSchema, passwordSchema } from '@stocker/validation/schemas'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

type useUpdateEmployeeFormProps = {
  employee: User
  onCancel: VoidFunction
  onSubmit: VoidFunction
}

const updateEmployeeFormSchema = z
  .object({
    name: nameSchema,
    email: emailSchema,
    role: z.enum(['manager', 'employee'], {
      message: 'Cargo é obrigatório',
    }),
    password: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine((set) => set.password === set.confirmPassword, {
    message: 'As senhas não estão iguais',
    path: ['confirmPassword'],
  })
type updateEmployeeFormData = z.infer<typeof updateEmployeeFormSchema>
export function useUpdateEmployeeForm({
  employee,
  onCancel,
  onSubmit,
}: useUpdateEmployeeFormProps) {
  const { formState, reset, register, handleSubmit, control } =
    useForm<updateEmployeeFormData>({
      defaultValues: {
        name: employee.name,
        email: employee.email,
        password: employee.password,
        confirmPassword: employee.password,
        role: ['manager', 'employee'].includes(employee.role)
          ? (employee.role as 'manager' | 'employee')
          : undefined,
      },
      resolver: zodResolver(updateEmployeeFormSchema),
    })
  async function handleFormSubmit(formData: updateEmployeeFormData) {
    console.log(formData)
    onSubmit()
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
