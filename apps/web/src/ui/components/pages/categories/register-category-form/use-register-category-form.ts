'use client'

import type { RefObject } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { nameSchema } from '@stocker/validation/schemas'
import { useApi, useToast } from '@/ui/hooks'
import { Category } from '@stocker/core/entities'

const registerCategoryFormSchema = z.object({
  name: nameSchema,
})

type RegisterCategoryFormData = z.infer<typeof registerCategoryFormSchema>

export function useRegisterCategoryForm(onSubmit: VoidFunction) {
  const { control, formState, reset, register, handleSubmit } =
    useForm<RegisterCategoryFormData>({
      resolver: zodResolver(registerCategoryFormSchema),
    })
  const { showSuccess, showError } = useToast()
  const { categoriesService } = useApi()

  async function handleFormSubmit({ name }: RegisterCategoryFormData) {
    const category = Category.create({ name })
    const response = await categoriesService.registerCategory(category)

    if (response.isFailure) {
      showError(response.errorMessage)
    }

    if (response.isSuccess) {
      showSuccess('Produto cadastrado com sucesso')
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
