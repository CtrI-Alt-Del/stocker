import { zodResolver } from '@hookform/resolvers/zod'
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
  const { control, formState, reset, register, handleSubmit } =
    useForm<registerEmployeeFormData>({
      resolver: zodResolver(registerEmployeeFormSchema),
    })
  async function handleFormSubmit(formData: registerEmployeeFormData) {
    console.log(formData)
  }
  return {
    control,
    reset,
    register,
    errors: formState.errors,
    handleSubmit: handleSubmit(handleFormSubmit),
  }
}
