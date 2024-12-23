'use client'

import type { RefObject } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { nameSchema } from '@stocker/validation/schemas'
import { useApi, useToast } from '@/ui/hooks'
import { Category } from '@stocker/core/entities'
import { CategoryDto } from '@stocker/core/dtos'
import { useAuthContext } from '@/ui/components/contexts/auth-context'

const registerCategoryFormSchema = z.object({
  name: nameSchema,
})

type RegisterCategoryFormData = z.infer<typeof registerCategoryFormSchema>

type useRegisterCategoryFormProps = {
  onSubmit: VoidFunction
  parentCategoryId?: string
}
export function useRegisterCategoryForm({
  onSubmit,
  parentCategoryId,
}: useRegisterCategoryFormProps) {
  const { control, formState, reset, register, handleSubmit } =
    useForm<RegisterCategoryFormData>({
      resolver: zodResolver(registerCategoryFormSchema),
    })
  const { showSuccess, showError } = useToast()
  const { categoriesService } = useApi()
  const {user} = useAuthContext()
  const companyId = user ? user.companyId : ""
  async function handleFormSubmit({ name }: RegisterCategoryFormData) {
    const category = Category.create({
      name,
      parentCategoryId: parentCategoryId ? parentCategoryId : undefined,
      companyId: companyId,
      subCategories: [],
    })
    const response = await categoriesService.registerCategory(category)
    if (response.isFailure) {
      showError(response.errorMessage)
    }

    if (response.isSuccess) {
      showSuccess('Categoria cadastrada com sucesso')
      reset()
      onSubmit()
    }
  }

  return {
    formControl: control,
    errors: formState.errors,
    isSubmiting: formState.isSubmitting,
    registerField: register,
    handleSubmit: handleSubmit(handleFormSubmit),
  }
}
