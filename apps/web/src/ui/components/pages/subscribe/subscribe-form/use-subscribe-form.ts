import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import {
  emailSchema,
  nameSchema,
  cnpjSchema,
  passwordSchema,
} from '@stocker/validation/schemas'
import type { CompanyDto, UserDto } from '@stocker/core/dtos'
import { useApi, useNavigation, useToast } from '@/ui/hooks'
import { ROUTES } from '@/constants'

const subscribeFormSchema = z
  .object({
    name: nameSchema,
    email: emailSchema,
    companyName: nameSchema,
    cnpj: cnpjSchema,
    password: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não estão iguais',
    path: ['confirmPassword'],
  })

type SubscribeFormData = z.infer<typeof subscribeFormSchema>

export function useSubscribeForm() {
  const { formState, control, register, handleSubmit } = useForm<SubscribeFormData>({
    resolver: zodResolver(subscribeFormSchema),
  })
  const { authService } = useApi()
  const { showError } = useToast()
  const { navigateTo } = useNavigation()

  async function handleFormSubmit(formData: SubscribeFormData) {
    const userDto: UserDto = {
      role: 'admin',
      name: formData.name,
      email: formData.email,
      password: formData.password,
      companyId: '',
    }

    const companyDto: CompanyDto = {
      cnpj: formData.cnpj,
      name: formData.companyName,
    }

    const response = await authService.subscribe(userDto, companyDto)

    if (response.isFailure) {
      showError(response.errorMessage)
      return
    }

    if (response.isSuccess) {
      navigateTo(ROUTES.records.employees)
    }
  }

  return {
    control,
    errors: formState.errors,
    isSubmitting: formState.isSubmitting,
    registerField: register,
    handleSubmit: handleSubmit(handleFormSubmit),
  }
}
