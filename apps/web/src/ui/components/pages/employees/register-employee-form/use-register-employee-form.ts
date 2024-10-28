import { useApi, useToast } from '@/ui/hooks'
import { zodResolver } from '@hookform/resolvers/zod'
import { User } from '@stocker/core/entities'
import {
  emailSchema,
  nameSchema,
  passwordSchema,
  stringSchema,
} from '@stocker/validation/schemas'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const registerEmployeeFormSchema = z
  .object({
    name: nameSchema,
    email: emailSchema,
    role: z.enum(['manager', 'employee'], {
      errorMap: () => ({ message: 'Cargo é obrigatório' }),
    }),
    password: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine((set) => set.password === set.confirmPassword, {
    message: 'As senhas não estão iguais',

    path: ['confirmPassword'],
  })

type registerEmployeeFormData = z.infer<typeof registerEmployeeFormSchema>

export function useRegisterEmployeeForm(onSubmit: VoidFunction) {
  const { usersService } = useApi()
  const { showError, showSuccess } = useToast()
  const { control, formState, reset, register, handleSubmit } =
    useForm<registerEmployeeFormData>({
      resolver: zodResolver(registerEmployeeFormSchema),
    })
  async function handleFormSubmit(formData: registerEmployeeFormData) {
    const user = User.create({
      name: formData.name,
      role: formData.role,
      password: formData.password,
      email: formData.email,
      companyId: 'eceda392-06df-4ed2-8c90-db6bf1e38830',
    })
    const response = await usersService.registerUser(user)
    if (response.isFailure) {
      console.log(response.errorMessage)
      showError(response.errorMessage)
    }
    if (response.isSuccess) {
      showSuccess('Funcinário cadastrado com sucesso!')
      reset()
      onSubmit()
    }
  }
  return {
    control,
    reset,
    register,
    errors: formState.errors,
    isSubmiting: formState.isSubmitting,
    handleSubmit: handleSubmit(handleFormSubmit),
  }
}
